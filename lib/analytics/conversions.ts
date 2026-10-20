import { useEffect } from "react"
import { capture } from "./posthog"
import { pushDataLayer } from "./dataLayer"

const HANDOFF_TIMEOUT_MS = 1000

/**
 * Record a completed conversion in PostHog, and push it to GTM under the same name
 * in snake_case (demo-booked -> demo_booked). `gtmProps` defaults to `props`. Pass a
 * smaller object to keep form values out of GTM, or null to skip GTM.
 *
 * The PostHog event goes by beacon, so a page that unloads right after the call
 * doesn't lose it. Before a hard navigation, await the returned promise. It resolves
 * once PostHog and GTM have both taken the event, or after 1s. It never rejects,
 * because tracking must never break the conversion it records.
 */
export async function trackConversion(
	event: string,
	props: Record<string, unknown> = {},
	gtmProps: Record<string, unknown> | null = props
): Promise<void> {
	try {
		const sent = Promise.all([
			capture(event, props, { transport: "sendBeacon", send_instantly: true }),
			gtmProps && pushDataLayer(event.replace(/-/g, "_"), gtmProps),
		])
		await Promise.race([sent, new Promise((r) => setTimeout(r, HANDOFF_TIMEOUT_MS))])
	} catch (err) {
		console.error(`Tracking ${event} failed:`, err)
	}
}

// The scheduler embeds we know: the iframes each one renders, and the message it
// posts to the page when a booking succeeds.
const SCHEDULERS = [
	{ frames: ".meetings-iframe-container iframe", isBooked: (data: any) => !!data?.meetingBookSucceeded },
	{ frames: ".calendly-inline-widget iframe", isBooked: (data: any) => data?.event === "calendly.event_scheduled" },
]

/**
 * Record `demo-booked` when any scheduler on the page reports a booking. Mounted once
 * for the whole site, because the booking step embeds HubSpot's scheduler through CMS
 * rich text, where no component owns it. A message counts only if it comes from one of
 * the scheduler iframes, so nothing else on the page can fake a booking.
 */
export function useBookingTracking() {
	useEffect(() => {
		const onMessage = (e: MessageEvent) => {
			for (const { frames, isBooked } of SCHEDULERS) {
				const frame = Array.from(document.querySelectorAll<HTMLIFrameElement>(frames)).find(
					(f) => f.contentWindow === e.source
				)
				if (frame && isBooked(e.data)) {
					trackConversion("demo-booked", { scheduler: frame.src.split("?")[0], page: window.location.pathname })
					return
				}
			}
		}
		window.addEventListener("message", onMessage)
		return () => window.removeEventListener("message", onMessage)
	}, [])
}
