"use client"
import Script from "next/script"
import { useRef, useState } from "react"

interface Props {
	schedulerIFrameURL: string
}

export const ScheduleADemoClient = ({ schedulerIFrameURL }: Props) => {
	const refIframe = useRef<HTMLIFrameElement>(null)
	const [iframeUrl, setIframeUrl] = useState("")

	return (
		<>
			<Script
				src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
				onLoad={() => {
					setIframeUrl(schedulerIFrameURL)
				}}
			/>
			{iframeUrl && <div className="meetings-iframe-container h-[800px] w-full" data-src={iframeUrl}></div>}
		</>
	)
}
