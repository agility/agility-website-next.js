// Push an event to Google Tag Manager's dataLayer (GTM is loaded in app/layout.tsx).
// GA4 key events should be triggered from these events in GTM, not from page views,
// so they count completed actions only.

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] }

export function pushDataLayer(event: string, params?: Record<string, unknown>) {
	if (typeof window === "undefined") return
	const w = window as DataLayerWindow
	w.dataLayer = w.dataLayer || []
	w.dataLayer.push({ event, ...params })
}
