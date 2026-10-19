"use client"
import Script from "next/script"
import { useEffect, useRef, useState } from "react"
import { capture } from "lib/analytics/posthog"
import { pushDataLayer } from "lib/analytics/dataLayer"

// HubSpot's meetings embed posts this message to the parent page when a booking succeeds.
const HUBSPOT_ORIGIN = /^https:\/\/([a-z0-9-]+\.)*hubspot\.com$/

interface Props {
	schedulerIFrameURL: string
}

export const ScheduleADemoClient = ({ schedulerIFrameURL }: Props) => {
	const refIframe = useRef<HTMLIFrameElement>(null)
	const [iframeUrl, setIframeUrl] = useState("")

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
	useEffect(() => {
		const onMessage = (e: MessageEvent) => {
			if (!HUBSPOT_ORIGIN.test(e.origin)) return
			if (!e.data?.meetingBookSucceeded) return
			const props = { scheduler: schedulerIFrameURL.split("?")[0], page: window.location.pathname }
			capture("demo-booked", props, { transport: "sendBeacon", send_instantly: true })
			pushDataLayer("demo_booked", props)
		}
		window.addEventListener("message", onMessage)
		return () => window.removeEventListener("message", onMessage)
	}, [schedulerIFrameURL])

	return (
		<>
			<div className="meetings-iframe-container h-[800px] w-full" data-src={schedulerIFrameURL}></div>
		</>
	)
}
