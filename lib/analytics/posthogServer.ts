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

interface CaptureArgs {
	event: string
	distinctId: string
	properties?: Record<string, unknown>
}

/**
 * Send one event to PostHog. Resolves false when telemetry is unconfigured or
 * the request fails — callers should ignore the result.
 */
export async function captureServerEvent({
	event,
	distinctId,
	properties = {},
}: CaptureArgs): Promise<boolean> {
	if (!POSTHOG_KEY || !POSTHOG_HOST) return false

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
					// Bots are not people. Without this PostHog would create a person
					// profile per distinct_id, polluting person analytics and counting
					// toward billable MAU.
					$process_person_profile: false,
					...properties,
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
