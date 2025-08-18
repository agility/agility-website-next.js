/* eslint-disable @next/next/no-img-element */
"use client"
import Script from "next/script"
import { posthog } from "posthog-js"
import { useCallback, useEffect, useRef } from "react"

import { useRouter } from "next/router"

interface IGatedDownloadClient {
	hubspotForm?: string
	redirectURL: string
}

interface IHubspotForm {
	name: string
	portalId: number
	formId: string
}
export const GatedDownloadClient = ({ hubspotForm, redirectURL }: IGatedDownloadClient) => {

	const router = useRouter()

	let hsForm: IHubspotForm = {
		name: "Gated Download",
		portalId: 23239214,
		formId: "4879f91f-730d-4b2b-9307-67c6670724b1"
	}

	if (hubspotForm) {
		hsForm = JSON.parse(hubspotForm || "{'portalId': '', 'formId': ''}")
	}
	const divID = `gatedownload-form-${hsForm.formId}`
	const formLoadRef = useRef<Boolean>(false)

	const loadForm = useCallback(() => {
		if (formLoadRef.current) return
		formLoadRef.current = true

		/**
		 * docs for this are here: https://legacydocs.hubspot.com/docs/methods/forms/advanced_form_options
		 */
		window.hbspt.forms.create({
			portalId: hsForm.portalId,
			formId: hsForm.formId,
			target: `#${divID}`,
			//redirectUrl: redirectURL,
			onFormSubmitted: function (_: any, data: any) {
				// Your custom JavaScript code to execute after successful submission
				console.log("Form submitted successfully:", hsForm.name)
				const emailAddress = data?.submissionValues?.email
				if (emailAddress) {
					posthog.identify(emailAddress);
				}

				posthog.capture('website-form-submission', {
					name: hsForm.name
				});

				router.push(redirectURL)

			}
		})
	}, [divID, redirectURL, hsForm])

	useEffect(() => {
		if (window.hbspt) {
			loadForm()
		}
	}, [loadForm])

	return (
		<>
			<Script src={`https://js.hsforms.net/forms/v2.js`} async onLoad={() => loadForm()} />
			<div id={divID}></div>
		</>
	)
}
