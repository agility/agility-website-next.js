/* eslint-disable @next/next/no-img-element */
"use client"
import Script from "next/script"
import { ISubmissionForm } from "./SubmissionForm"
import { useCallback, useEffect, useRef } from "react"
import { Container } from "components/micro/Container"

export const SubmissionFormClient = ({
	leftColumnBody,
	leftColumnTitle,
	hubspotForm,
	redirectURL
}: ISubmissionForm) => {
	const { portalId, formId } = JSON.parse(hubspotForm || "{'portalId': '', 'formId': ''}")
	const divID = `submission-form-${formId}`
	const formLoadRef = useRef<Boolean>(false)

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
			redirectUrl: redirectURL
		})
	}, [divID, formId, portalId, redirectURL])

	useEffect(() => {
		if (window.hbspt) {
			loadForm()
		}
	}, [loadForm])

	return (
		<Container className="bg-background">
			<Script src={`https://js.hsforms.net/forms/v2.js`} async onLoad={() => loadForm()} />
			<div className="mx-auto max-w-5xl">
				<div className="flex flex-col gap-10 md:flex-row">
					<div className="width-1/2 flex-1">
						<h2 className="text-balance text-5xl font-medium">{leftColumnTitle}</h2>
						<div className="prose mt-10" dangerouslySetInnerHTML={{ __html: leftColumnBody }} />
					</div>
					<div className="width-1/2 relative flex-1">
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
			</div>
		</Container>
	)
}
