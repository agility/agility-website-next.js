/* eslint-disable @next/next/no-img-element */
"use client"
import Script from "next/script"
import { ISubmissionForm } from "./SubmissionForm"
import { useCallback, useEffect, useRef } from "react"
import { Container } from "components/micro/Container"
import { posthog } from "posthog-js"
import { useRouter } from "next/navigation"

export const SubmissionFormClient = ({
	leftColumnBody,
	leftColumnTitle,
	hubspotForm,
	redirectURL
}: ISubmissionForm) => {
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
					posthog.identify(emailAddress)
				}

				posthog.capture("website-form-submission", {
					name: name
				})

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
		<Container >
			<div className="bg-background dark:bg-gray-900 relative py-14">
				<Script src={`https://js.hsforms.net/forms/v2.js`} async onLoad={() => loadForm()} />
				<div className="mx-auto max-w-5xl">
					<div className="flex flex-col gap-10 md:flex-row">
						<div className="width-1/2 relative flex-1">
							<div className="relative z-2 border-t-2 border-t-highlight-light bg-white dark:bg-gray-300 p-6 shadow-lg">
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
						<div className="width-1/2 flex-1">
							<h2 className="text-balance text-5xl font-medium">{leftColumnTitle}</h2>
							<div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: leftColumnBody }} />
						</div>
					</div>
				</div>
			</div>
		</Container>
	)
}
