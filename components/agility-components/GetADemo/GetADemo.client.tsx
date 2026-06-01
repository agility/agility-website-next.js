"use client"

import Script from "next/script"
import { capture, identify } from "lib/analytics/posthog"
import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

interface Props {
	hubspotForm?: string
	redirectURL?: string
}

const FormBlockedFallback = () => (
	<div className="min-h-[400px]">
		<p className="text-sm text-gray-600">
			Form not loading?{" "}
			<a
				href="https://agilitycms.com/thank-you/get-a-demo-step-2-book"
				target="_blank"
				rel="noopener noreferrer"
				className="text-highlight underline hover:text-highlight-dark"
			>
				Find the calendar here
			</a>{" "}
			to book a demo or reach out to us at{" "}
			<a href="mailto:sales@agilitycms.com" className="text-highlight underline hover:text-highlight-dark">
				sales@agilitycms.com
			</a>
			.
		</p>
	</div>
)

export const GetADemoClient = ({ hubspotForm, redirectURL }: Props) => {
	const { portalId, formId, name } = JSON.parse(hubspotForm || '{"portalId": "", "formId": ""}')
	const divID = `get-a-demo-form-${formId}`
	const formLoadRef = useRef<boolean>(false)
	const router = useRouter()
	const [formBlocked, setFormBlocked] = useState(false)

	const loadForm = useCallback(() => {
		if (formLoadRef.current) return
		formLoadRef.current = true

		window.hbspt.forms.create({
			portalId,
			formId,
			target: `#${divID}`,
			onFormSubmitted: function (_: any, data: any) {
				console.log("Form submitted successfully:", name)
				const emailAddress = data?.submissionValues?.email
				if (emailAddress) {
					identify(emailAddress)
				}

				capture("website-form-submission", {
					name: name
				})

				if (redirectURL) {
					router.push(redirectURL)
				}
			}
		})

		// Check after 3s whether the form actually rendered (some blockers allow
		// the script to load but prevent the form iframe from rendering)
		setTimeout(() => {
			const el = document.getElementById(divID)
			if (el && el.children.length === 0) {
				setFormBlocked(true)
			}
		}, 3000)
	}, [divID, formId, portalId, name, redirectURL, router])

	useEffect(() => {
		if (window.hbspt) {
			loadForm()
		}
	}, [loadForm])

	return (
		<>
			<Script
				src="https://js.hsforms.net/forms/v2.js"
				async
				onLoad={() => loadForm()}
				onError={() => setFormBlocked(true)}
			/>
			{formBlocked ? <FormBlockedFallback /> : <div id={divID} className="min-h-[400px]"></div>}
		</>
	)
}
