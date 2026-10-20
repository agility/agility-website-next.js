import { useEffect, type RefObject } from "react"
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

/**
 * Record `demo-booked` when the scheduler iframe inside `containerRef` posts a message
 * that `isBooked` recognises. Matching on the message's source rather than its origin
 * works on any scheduler domain, and two schedulers on one page can't count each
 * other's bookings. Define `isBooked` at module level so the listener isn't rebound.
 */
export function useBookingTracker(
	containerRef: RefObject<HTMLElement>,
	scheduler: string,
	isBooked: (data: any) => boolean
) {
	useEffect(() => {
		const onMessage = (e: MessageEvent) => {
			const frame = containerRef.current?.querySelector("iframe")
			if (!frame || e.source !== frame.contentWindow || !isBooked(e.data)) return
			trackConversion("demo-booked", { scheduler: scheduler.split("?")[0], page: window.location.pathname })
		}
		window.addEventListener("message", onMessage)
		return () => window.removeEventListener("message", onMessage)
	}, [containerRef, scheduler, isBooked])
}
