"use client"

import Script from "next/script"
import { posthog } from "posthog-js"
import { useCallback, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

interface Props {
	hubspotForm?: string
	redirectURL?: string
}

export const GetADemoClient = ({ hubspotForm, redirectURL }: Props) => {
	const { portalId, formId, name } = JSON.parse(hubspotForm || '{"portalId": "", "formId": ""}')
	const divID = `get-a-demo-form-${formId}`
	const formLoadRef = useRef<boolean>(false)
	const router = useRouter()

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
					posthog.identify(emailAddress)
				}

				posthog.capture("website-form-submission", {
					name: name,
				})

				if (redirectURL) {
					router.push(redirectURL)
				}
			},
		})
	}, [divID, formId, portalId, name, redirectURL, router])

	useEffect(() => {
		if (window.hbspt) {
			loadForm()
		}
	}, [loadForm])

	return (
		<>
			<Script src="https://js.hsforms.net/forms/v2.js" async onLoad={() => loadForm()} />
			<div id={divID}></div>
		</>
	)
}
