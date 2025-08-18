/* eslint-disable @next/next/no-img-element */
"use client"
import Script from "next/script"
import { useCallback, useEffect, useRef } from "react"
import posthog from "posthog-js"
import { useRouter } from 'next/navigation'

interface IDownloadForm {
	redirectURL?: string
	hubspotForm?: string
}

export const DownloadForm = ({ hubspotForm, redirectURL }: IDownloadForm) => {
	const { portalId, formId, name } = JSON.parse(hubspotForm || "{'portalId': '', 'formId': ''}")
	const divID = `submission-form-${formId}`
	const formLoadRef = useRef<Boolean>(false)

	const router = useRouter()

	const loadForm = useCallback(() => {
		if (formLoadRef.current) return
		formLoadRef.current = true

		/**
		 * docs for this are here: https://legacydocs.hubspot.com/docs/methods/forms/advanced_form_options
		 */
		window.hbspt.forms.create({
			portalId,
			formId,
			target: `#${divID}`,
			//redirectUrl: redirectURL,
			onFormSubmitted: function (_: any, data: any) {
				// Your custom JavaScript code to execute after successful submission
				console.log("Form submitted successfully:", name)
				const emailAddress = data?.submissionValues?.email
				if (emailAddress) {
					posthog.identify(emailAddress);
				}

				posthog.capture('website-form-submission', {
					name: name
				});

				if (redirectURL) {
					router.push(redirectURL)
				}

			}
		})
	}, [divID, formId, portalId, redirectURL])

	useEffect(() => {
		if (window.hbspt) {
			loadForm()
		}
	}, [loadForm])

	return (
		<div>
			<Script src={`https://js.hsforms.net/forms/v2.js`} async onLoad={() => loadForm()} />

			<div className="relative">
				<div className="relative z-[2] border-t-2 border-t-highlight-light bg-white p-6 shadow-lg">
					<div id={divID}></div>
				</div>
				<img
					src="https://static.agilitycms.com/layout/static/triangle-pattern.svg"
					className="absolute -right-14 -top-14"
					alt=""
				/>
				<img
					src="https://static.agilitycms.com/layout/static/triangle-pattern.svg"
					className="absolute -bottom-14 -left-14"
					alt=""
				/>
			</div>
		</div>
	)
}
