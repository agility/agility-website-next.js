"use client"

import { HubSpotNativeForm } from "components/common/HubSpotNativeForm"
import type { HubSpotFormDefinition } from "lib/hubspot/getHubSpotFormDefinition"

interface Props {
	portalId: string
	formId: string
	formName?: string
	formDefinition?: HubSpotFormDefinition | null
	submitLabel?: string
	redirectURL?: string
	confirmationMessage?: string
}

// Newsletter forms accept personal email addresses, so no business-email block.
const NEWSLETTER_FALLBACK: HubSpotFormDefinition = {
	submitText: "Subscribe",
	redirectUrl: "",
	fields: [
		{ name: "email", label: "Email Address", fieldType: "email", required: true, hidden: false, placeholder: "Email Address", defaultValue: "", objectTypeId: "0-1", blockFreeEmail: false, options: [] },
	],
	processingConsentText: "I agree to allow Agility Inc. to store and process my personal data.",
	processingConsentType: "IMPLICIT",
	isLegitimateInterest: false,
	communicationConsentCheckboxes: [],
	captchaEnabled: false,
}

export const FooterSubscribeClient = ({
	portalId,
	formId,
	formName,
	formDefinition,
	submitLabel,
	redirectURL,
	confirmationMessage
}: Props) => {
	const def = formDefinition
		? { ...formDefinition, submitText: submitLabel || formDefinition.submitText }
		: { ...NEWSLETTER_FALLBACK, submitText: submitLabel || NEWSLETTER_FALLBACK.submitText }

	return (
		<div className="mt-4">
			<HubSpotNativeForm
				portalId={portalId}
				formId={formId}
				formName={formName}
				formDefinition={def}
				fallbackDefinition={NEWSLETTER_FALLBACK}
				redirectURL={redirectURL}
				redirectStrategy="soft"
				trackingEventName="newsletter-signup"
				trackingProps={{}}
				theme="dark"
				submitButtonType="secondary-inverted"
				successMessage={confirmationMessage || "Thanks for subscribing!"}
				idPrefix={`newsletter-${formId}`}
			/>
		</div>
	)
}
