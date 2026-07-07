/* eslint-disable @next/next/no-img-element */
"use client"
import { ISubmissionForm } from "./SubmissionForm"
import { Container } from "components/micro/Container"
import { HubSpotNativeForm, LEAD_FORM_FALLBACK } from "components/common/HubSpotNativeForm"
import type { HubSpotFormDefinition } from "lib/hubspot/getHubSpotFormDefinition"

interface Props extends ISubmissionForm {
	/** Fetched server-side in SubmissionForm.tsx. Null -> LEAD_FORM_FALLBACK. */
	formDefinition?: HubSpotFormDefinition | null
	/** Agility content item + locale — the submission route resolves the form from these. */
	contentID?: number
	languageCode?: string
}

export const SubmissionFormClient = ({
	leftColumnBody,
	leftColumnTitle,
	hubspotForm,
	redirectURL,
	formDefinition,
	contentID,
	languageCode
}: Props) => {
	const { portalId, formId, name } = JSON.parse(hubspotForm || '{"portalId":"","formId":"","name":""}')

	return (
		<Container>
			<div className="bg-background relative py-14">
				<div className="mx-auto max-w-5xl">
					<div className="flex flex-col gap-10 md:flex-row">
						<div className="width-1/2 relative flex-1">
							<div className="relative z-[2] border-t-2 border-t-highlight-light bg-white p-6 shadow-lg">
								<HubSpotNativeForm
									portalId={portalId}
									formId={formId}
									contentID={contentID}
									languageCode={languageCode}
									formName={name}
									formDefinition={formDefinition}
									fallbackDefinition={LEAD_FORM_FALLBACK}
									redirectURL={redirectURL}
									idPrefix={`submission-${formId}`}
								/>
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
							<div className="prose" dangerouslySetInnerHTML={{ __html: leftColumnBody }} />
						</div>
					</div>
				</div>
			</div>
		</Container>
	)
}
