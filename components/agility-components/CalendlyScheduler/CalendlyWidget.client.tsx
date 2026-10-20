"use client"
import { useRef } from "react"
import { useBookingTracker } from "lib/analytics/conversions"

// Calendly's inline widget posts this from its iframe when a booking succeeds.
const isBooked = (data: any) => data?.event === "calendly.event_scheduled"

export const CalendlyWidget = ({ url }: { url: string }) => {
	const containerRef = useRef<HTMLDivElement>(null)
	useBookingTracker(containerRef, url, isBooked)

	return (
		<div
			ref={containerRef}
			className="calendly-inline-widget px-3 -mt-10"
			data-url={url}
			style={{ minWidth: "320px", height: "1100px" }}
			data-agility-field="iFrameURL"></div>
	)
}
