"use client"
import { useEffect, useRef } from "react"
import { useBookingTracker } from "lib/analytics/conversions"

// HubSpot's meetings embed posts this from its iframe when a booking succeeds.
const isBooked = (data: any) => !!data?.meetingBookSucceeded

interface Props {
	schedulerIFrameURL: string
}

export const ScheduleADemoClient = ({ schedulerIFrameURL }: Props) => {
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (typeof window === "undefined") return

		//add the script to the page dynamically
		const script = document.createElement("script")
		script.src = "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
		script.async = true
		document.body.appendChild(script)

		return () => {
			if (typeof window === "undefined") return
			//clean up the script when the component is unmounted
			document.body.removeChild(script)
		}
	}, [])

	// Record completed bookings, the real MQL. Before this, a booking was only
	// visible in HubSpot, so a stop in bookings could go unnoticed for weeks.
	useBookingTracker(containerRef, schedulerIFrameURL, isBooked)

	return (
		<>
			<div ref={containerRef} className="meetings-iframe-container h-[800px] w-full" data-src={schedulerIFrameURL}></div>
		</>
	)
}
