"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import Script from "next/script"

const HubspotTracker = () => {
	const pathname = usePathname()

	useEffect(() => {
		//track the page view in Hubspot
		if (typeof window !== "undefined") {
			//@ts-ignore
			var _hsq = (window._hsq = window._hsq || [])

			_hsq.push(["setPath", pathname])
			_hsq.push(["trackPageView"])
		}
	}, [pathname])

	return (
		<>
			<Script
				type="text/javascript"
				id="hs-script-loader"
				async
				defer
				strategy="afterInteractive"
				src="//js.hs-scripts.com/23239214.js"
			></Script>
		</>
	)
}

export default HubspotTracker
