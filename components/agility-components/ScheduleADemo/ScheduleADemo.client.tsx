"use client"
import Script from "next/script"
import { useEffect, useRef, useState } from "react"

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

	return (
		<>
			<div className="meetings-iframe-container h-[800px] w-full" data-src={schedulerIFrameURL}></div>
		</>
	)
}
