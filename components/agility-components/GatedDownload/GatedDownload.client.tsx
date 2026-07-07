"use client"

import { HubSpotNativeForm, LEAD_FORM_FALLBACK } from "components/common/HubSpotNativeForm"
import type { HubSpotFormDefinition } from "lib/hubspot/getHubSpotFormDefinition"

interface IGatedDownloadClient {
	hubspotForm?: string
	redirectURL: string
	/** Fetched server-side in GatedDownload.tsx. Null -> LEAD_FORM_FALLBACK. */
	formDefinition?: HubSpotFormDefinition | null
	/** Content item + locale — the submission route resolves the form from these. */
	contentID?: number
	languageCode?: string
}

export const GatedDownloadClient = ({ hubspotForm, redirectURL, formDefinition, contentID, languageCode }: IGatedDownloadClient) => {
	// Only used for the PostHog event name + a11y id prefix; the portal/form IDs
	// come from the CMS content item via contentID (see the submission route).
	let formName = "Gated Download"
	let formId: string | undefined
	if (hubspotForm) {
		try {
			const parsed = JSON.parse(hubspotForm)
			formName = parsed.name || formName
			formId = parsed.formId
		} catch {
			/* keep defaults */
		}
	}

	return (
		<HubSpotNativeForm
			contentID={contentID}
			languageCode={languageCode}
			formName={formName}
			formDefinition={formDefinition}
			fallbackDefinition={LEAD_FORM_FALLBACK}
			redirectURL={redirectURL}
			idPrefix={`gated-${formId || contentID || "form"}`}
		/>
	)
}
