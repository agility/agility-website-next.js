// Lazy-loaded PostHog wrapper. Do not import posthog-js directly elsewhere —
// use `capture` / `identify` from this module so posthog-js stays out of the
// initial JS bundle.

type PostHogModule = typeof import('posthog-js')['default']
type CaptureOptions = import('posthog-js').CaptureOptions

let instance: PostHogModule | null = null
let loadPromise: Promise<PostHogModule | null> | null = null
const queue: Array<(ph: PostHogModule) => void> = []

function shouldLoad(): boolean {
	return typeof window !== 'undefined' && !!process.env.NEXT_PUBLIC_POSTHOG_KEY
}

function load(): Promise<PostHogModule | null> {
	if (!shouldLoad()) return Promise.resolve(null)
	if (loadPromise) return loadPromise

	loadPromise = import('posthog-js').then((m) => {
		const posthog = m.default
		posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
			api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
			defaults: '2025-05-24',
			before_send: (event) => {
				const exceptionList = event?.properties?.['$exception_list']
				if (
					Array.isArray(exceptionList) &&
					exceptionList.some((e: any) =>
						e?.value?.includes('ResizeObserver loop')
					)
				) {
					return null
				}
				return event
			},
		})
		instance = posthog
		while (queue.length) {
			const fn = queue.shift()!
			fn(posthog)
		}
		return posthog
	})
	return loadPromise
}

// Schedule the load during browser idle time. Falls back to setTimeout for
// Safari < 16.4 which lacks requestIdleCallback.
export function initPostHog() {
	if (!shouldLoad()) return
	const w = window as typeof window & {
		requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
	}
	if (typeof w.requestIdleCallback === 'function') {
		w.requestIdleCallback(() => { load() }, { timeout: 2000 })
	} else {
		setTimeout(() => { load() }, 1000)
	}
}

// `options` passes through to posthog-js. Use { transport: 'sendBeacon',
// send_instantly: true } for an event fired just before the page navigates away
// (e.g. a HubSpot embed that redirects on submit), so it isn't lost in the batch.
export function capture(
	event: string,
	properties?: Record<string, unknown>,
	options?: CaptureOptions
) {
	if (instance) {
		instance.capture(event, properties, options)
	} else {
		queue.push((ph) => ph.capture(event, properties, options))
		// If a capture is called before initPostHog() has run, trigger the load
		// so the event eventually fires.
		load()
	}
}

export function identify(
	distinctId: string,
	properties?: Record<string, unknown>
) {
	if (instance) {
		instance.identify(distinctId, properties)
	} else {
		queue.push((ph) => ph.identify(distinctId, properties))
		load()
	}
}
