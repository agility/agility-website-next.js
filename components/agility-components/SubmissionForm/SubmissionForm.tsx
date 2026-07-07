import { UnloadedModuleProps } from "@agility/nextjs"
import { getContentItem } from "lib/cms/getContentItem"
import { SubmissionFormClient } from "./SubmissionForm.client"
import { getHubSpotFormDefinition } from "lib/hubspot/getHubSpotFormDefinition"

export interface ISubmissionForm {
	leftColumnTitle: string
	leftColumnBody: string
	redirectURL?: string
	hubspotForm?: string
}

export const SubmissionForm = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<ISubmissionForm>({
		contentID: module.contentid,
		languageCode
	})

	if (!fields.hubspotForm) {
		console.warn(`SubmissionForm module with contentID ${contentID} is missing a HubSpot form ID`)
		return null
	}

	// Fetch the HubSpot form definition SERVER-SIDE so the browser never loads
	// js.hsforms.net (ad-blocker / InPrivate resilient). null -> client fallback.
	let formDefinition = null
	try {
		const { portalId, formId } = JSON.parse(fields.hubspotForm)
		formDefinition = await getHubSpotFormDefinition(portalId, formId)
	} catch (error) {
		console.error("SubmissionForm: failed to load HubSpot form definition:", error)
	}

	return (
		<SubmissionFormClient
			{...fields}
			formDefinition={formDefinition}
			contentID={contentID}
			languageCode={languageCode}
		/>
	)
}
