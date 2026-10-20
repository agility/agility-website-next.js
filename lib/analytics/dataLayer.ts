// Push an event to Google Tag Manager's dataLayer (GTM is loaded in app/layout.tsx).
// GA4 key events should be triggered from these events in GTM, not from page views,
// so they count completed actions only.

// GTM's data model keeps every key until something overwrites it, so each push
// clears the keys earlier pushes set. Otherwise an event inherits stale values.
const pushedKeys = new Set<string>()

// Resolves when GTM has run the event's tags. Never resolves if GTM hasn't loaded,
// so callers wait with a timeout (see trackConversion).
export function pushDataLayer(event: string, params: Record<string, unknown> = {}): Promise<void> {
	if (typeof window === "undefined") return Promise.resolve()
	const cleared = Object.fromEntries(Array.from(pushedKeys, (k) => [k, undefined]))
	Object.keys(params).forEach((k) => pushedKeys.add(k))
	return new Promise((resolve) => {
		window.dataLayer = window.dataLayer || []
		window.dataLayer.push({ ...cleared, ...params, event, eventCallback: () => resolve() })
	})
}
