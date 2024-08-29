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
			{iframeUrl && <iframe ref={refIframe} className="h-[800px] w-full" src={iframeUrl}></iframe>}
		</>
	)
}
