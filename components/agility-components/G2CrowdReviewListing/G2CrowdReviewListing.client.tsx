"use client"
import Script from "next/script"
import { IG2CrowdReviewListing } from "./G2CrowdReviewListing"
import { useId, useRef } from "react"
import { set } from "lodash"

export const G2CrowdReviewListingClient = ({
	gartnerSourcingLink,
	gartnerWidgetID,
	gartnerWidgetSize,
	gartnerWidgetTheme
}: IG2CrowdReviewListing) => {
	const idStr = useId()

	const cRef = useRef<HTMLDivElement>(null)

	const loadGarterWidget = () => {
		const container = document.getElementById(`#${idStr}`)

		window.GartnerPI_Widget({
			size: gartnerWidgetSize,
			theme: gartnerWidgetTheme,
			sourcingLink: gartnerSourcingLink,
			widget_id: gartnerWidgetID,

			container: cRef.current
		})
	}

	return (
		<>
			<div ref={cRef} className="mt-10"></div>
			<Script
				src="https://www.gartner.com/reviews/public/Widget/js/widget.js"
				strategy="afterInteractive"
				onLoad={() => {
					setTimeout(() => {
						loadGarterWidget()
					}, 100)
				}}
			></Script>
		</>
	)
}
