// Server-side PostHog capture, safe to call from Edge middleware.
//
// This is deliberately separate from lib/analytics/posthog.ts: that module wraps
// posthog-js for the browser and must never be imported into middleware (it
// pulls a browser bundle and touches `window`). This one is a bare fetch to the
// ingestion endpoint with no SDK.
//
// Rules for anything added here:
//   - never throw: telemetry must not be able to break a page render
//   - never block: callers pass the promise to NextFetchEvent.waitUntil
//   - never create person profiles for non-humans (see $process_person_profile)

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST

/** Hard cap so a slow ingestion endpoint can never hold an edge invocation open. */
const TIMEOUT_MS = 1500

/**
 * The browser SDK accepts a same-origin reverse-proxy path for `api_host`
 * (`/ingest`), a common PostHog setup. `fetch` from the edge cannot: a relative
 * URL throws, the catch below swallows it, and every event silently disappears —
 * indistinguishable from "nothing happened". Fail loudly-in-the-logs-once here
 * instead of quietly forever.
 */
const HOST_IS_ABSOLUTE = /^https?:\/\//i.test(POSTHOG_HOST || '')
if (POSTHOG_HOST && !HOST_IS_ABSOLUTE) {
	console.warn(
		`[posthogServer] NEXT_PUBLIC_POSTHOG_HOST is not an absolute URL ("${POSTHOG_HOST}"). ` +
			`Server-side capture is disabled — set an absolute ingestion host to re-enable it.`
	)
}

interface CaptureArgs {
	event: string
	distinctId: string
	properties?: Record<string, unknown>
	/** Client IP, so PostHog geo-resolves the caller and not our edge PoP. */
	ip?: string | null
	/**
	 * Request host. REQUIRED, and the environment gate — anything other than the
	 * production host is dropped. Not optional on purpose: a caller that forgets
	 * it should fail closed, not quietly ship preview traffic to production.
	 */
	host: string | null | undefined
	/**
	 * Fraction of calls to actually send, 0..1. Defaults to 1 (send everything).
	 *
	 * The rate in force is recorded on every sent event as `sample_rate`, so
	 * counts stay recoverable — estimate volume with `sum(1 / sample_rate)`, not
	 * `count()`. Anything below 1 makes the number an estimate, so only sample a
	 * population where volume is the point and precision is not.
	 */
	sampleRate?: number
}

/**
 * The only host whose traffic belongs in the production PostHog project.
 *
 * This gate used to read `process.env.CONTEXT` / `VERCEL_ENV`, which DID NOT
 * WORK: Netlify does not surface CONTEXT into the Next edge bundle, so it fell
 * through to NODE_ENV ('production' for any production build, previews
 * included) and preview traffic landed in the production project. Observed
 * directly — 1,546 events stamped `deploy_context: production` on host
 * `deploy-preview-95--agility-cms-website.netlify.app`.
 *
 * The request's own host is the reliable signal, and it needs no build-time
 * plumbing. Middleware already canonicalises every other host to this one.
 */
const PRODUCTION_HOST = 'agilitycms.com'

function isProductionHost(host: string | null | undefined): boolean {
	return !!host && host.toLowerCase().split(':')[0] === PRODUCTION_HOST
}

/** Recorded for diagnostics only — never used to decide whether to send. */
function deployContext(): string {
	return (
		process.env.CONTEXT || // Netlify: production | deploy-preview | branch-deploy
		process.env.VERCEL_ENV || // Vercel: production | preview | development
		process.env.NODE_ENV ||
		'unknown'
	)
}

/**
 * Send one event to PostHog. Resolves false when telemetry is unconfigured,
 * suppressed for this environment, or the request fails — callers should
 * ignore the result.
 */
export async function captureServerEvent({
	event,
	distinctId,
	properties = {},
	ip,
	host,
	sampleRate = 1,
}: CaptureArgs): Promise<boolean> {
	if (!POSTHOG_KEY || !POSTHOG_HOST || !HOST_IS_ABSOLUTE) return false

	//Fail closed on anything that is not production: previews, branch deploys,
	//localhost, and the netlify.app/publishwithagility.com aliases.
	if (!isProductionHost(host)) return false

	const ctx = deployContext()

	//Clamp before use: a misconfigured rate must not silently mean "send nothing".
	const rate = Number.isFinite(sampleRate) ? Math.min(1, Math.max(0, sampleRate)) : 1
	if (rate <= 0) return false
	if (rate < 1 && Math.random() >= rate) return false

	const controller = new AbortController()
	const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

	try {
		const res = await fetch(`${POSTHOG_HOST.replace(/\/$/, '')}/capture/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				api_key: POSTHOG_KEY,
				event,
				distinct_id: distinctId,
				timestamp: new Date().toISOString(),
				properties: {
					deploy_context: ctx,
					// Forward the caller's IP. The POST originates from the edge
					// runtime, so without this PostHog geo-stamps every event with
					// the serving PoP — plausible-looking and meaningless. Keeping
					// the IP also allows a claimed bot UA to be checked later
					// against a vendor's published crawler ranges.
					...(ip ? { $ip: ip } : {}),
					...properties,
					// Both spread LAST so a caller cannot override them.
					//
					// Bots are not people: without $process_person_profile
					// PostHog creates a person profile per distinct_id,
					// polluting person analytics and billable MAU.
					$process_person_profile: false,
					// Always stamped, even at rate 1, so a query written today
					// keeps working unchanged if sampling is turned on later.
					sample_rate: rate,
				},
			}),
			signal: controller.signal,
			// Telemetry must never be served from a cache.
			cache: 'no-store',
		})
		return res.ok
	} catch {
		// Swallowed on purpose: an abort, DNS failure or 5xx must be invisible
		// to the request that triggered it.
		return false
	} finally {
		clearTimeout(timer)
	}
}
