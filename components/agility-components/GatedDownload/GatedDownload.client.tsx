"use client"

import { HubSpotNativeForm, LEAD_FORM_FALLBACK } from "components/common/HubSpotNativeForm"
import type { HubSpotFormDefinition } from "lib/hubspot/getHubSpotFormDefinition"

interface IGatedDownloadClient {
	hubspotForm?: string
	redirectURL: string
	/** Fetched server-side in GatedDownload.tsx. Null -> LEAD_FORM_FALLBACK. */
	formDefinition?: HubSpotFormDefinition | null
	/** Agility content item + locale — the submission route resolves the form from these. */
	contentID?: number
	languageCode?: string
}

interface IHubspotForm {
	name: string
	portalId: number | string
	formId: string
}

const DEFAULT_FORM: IHubspotForm = {
	name: "Gated Download",
	portalId: 23239214,
	formId: "4879f91f-730d-4b2b-9307-67c6670724b1",
}

export const GatedDownloadClient = ({ hubspotForm, redirectURL, formDefinition, contentID, languageCode }: IGatedDownloadClient) => {
	let hsForm = DEFAULT_FORM
	if (hubspotForm) {
		try {
			hsForm = JSON.parse(hubspotForm)
		} catch {
			hsForm = DEFAULT_FORM
		}
	}

	return (
		<HubSpotNativeForm
			portalId={hsForm.portalId}
			formId={hsForm.formId}
			contentID={contentID}
			languageCode={languageCode}
			formName={hsForm.name}
			formDefinition={formDefinition}
			fallbackDefinition={LEAD_FORM_FALLBACK}
			redirectURL={redirectURL}
			idPrefix={`gated-${hsForm.formId}`}
		/>
	)
}
