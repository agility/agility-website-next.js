"use client"

import { HubSpotNativeForm } from "components/common/HubSpotNativeForm"
import type { HubSpotFormDefinition } from "lib/hubspot/getHubSpotFormDefinition"

interface Props {
	hubspotForm?: string
	redirectURL?: string
	/** Fetched server-side in GetADemo.tsx. Null -> use FALLBACK_DEFINITION. */
	formDefinition?: HubSpotFormDefinition | null
	/** Agility content item + locale — the submission route resolves the form from these. */
	contentID?: number
	languageCode?: string
}

// Used ONLY if the server-side definition fetch failed, so the form always
// renders. Mirrors the live "Demo Request On All Agility.com Webpages" form.
const FALLBACK_DEFINITION: HubSpotFormDefinition = {
	submitText: "Let's chat",
	redirectUrl: "",
	fields: [
		{ name: "firstname", label: "First name", fieldType: "text", required: true, hidden: false, placeholder: "", defaultValue: "", objectTypeId: "0-1", blockFreeEmail: false, options: [] },
		{ name: "lastname", label: "Last name", fieldType: "text", required: true, hidden: false, placeholder: "", defaultValue: "", objectTypeId: "0-1", blockFreeEmail: false, options: [] },
		{ name: "company", label: "Company name", fieldType: "text", required: true, hidden: false, placeholder: "", defaultValue: "", objectTypeId: "0-1", blockFreeEmail: false, options: [] },
		{ name: "email", label: "Business Email", fieldType: "text", required: true, hidden: false, placeholder: "", defaultValue: "", objectTypeId: "0-1", blockFreeEmail: true, options: [] },
	],
	processingConsentText: "I agree to allow Agility Inc. to store and process my personal data.",
	processingConsentType: "IMPLICIT",
	isLegitimateInterest: false,
	communicationConsentCheckboxes: [
		{ communicationTypeId: 61656565, label: "I would like to receive marketing communications from Agility CMS on product & industry updates, services and events. I understand I can unsubscribe at any time.", required: false },
	],
	captchaEnabled: false,
}

export const GetADemoClient = ({ hubspotForm, redirectURL, formDefinition, contentID, languageCode }: Props) => {
	const { portalId, formId, name: formName } = JSON.parse(
		hubspotForm || '{"portalId":"","formId":"","name":""}'
	)

	return (
		<HubSpotNativeForm
			portalId={portalId}
			formId={formId}
			contentID={contentID}
			languageCode={languageCode}
			formName={formName}
			formDefinition={formDefinition}
			fallbackDefinition={FALLBACK_DEFINITION}
			redirectURL={redirectURL}
			// Hard nav: the thank-you destination mounts a third-party scheduling
			// widget that only initializes on a real document load (see PR #88).
			redirectStrategy="hard"
			idPrefix="demo"
		/>
	)
}
