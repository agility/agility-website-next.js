import { HubspotForm } from "lib/types/HubspotForm"
import { getHubSpotFormDefinition } from "lib/hubspot/getHubSpotFormDefinition"
import { FooterSubscribeClient } from "./FooterSubscribe.client"

interface Props {
	subscribeButtonLabel?: string
	subscribeEmailPlaceholder?: string
	subscribeRedirect?: string
	newsletterSignupForm?: string
	subscribeConfirmationMessage?: string
	/** Footer content item — the submission route resolves the form from it. */
	contentID?: number
	languageCode?: string
}

/**
 * Newsletter signup, rendered NATIVELY (no js.hsforms.net embed) so it works
 * for ad-blocker / InPrivate visitors. Fetches the HubSpot form definition
 * server-side; the client submits through our first-party proxy. See issue #87.
 */
export const FooterSubscribe = async ({
	subscribeButtonLabel,
	subscribeRedirect,
	subscribeConfirmationMessage,
	newsletterSignupForm,
	contentID,
	languageCode
}: Props) => {
	if (!newsletterSignupForm) {
		return null
	}

	let portalId = ""
	let formId = ""
	let name = "Newsletter Signup"
	try {
		const parsed: HubspotForm = JSON.parse(newsletterSignupForm)
		portalId = parsed.portalId
		formId = parsed.formId
		name = parsed.name || name
	} catch {
		return null
	}

	const formDefinition = await getHubSpotFormDefinition(portalId, formId)

	return (
		<FooterSubscribeClient
			portalId={portalId}
			formId={formId}
			formName={name}
			contentID={contentID}
			languageCode={languageCode}
			formDefinition={formDefinition}
			submitLabel={subscribeButtonLabel}
			redirectURL={subscribeRedirect}
			confirmationMessage={subscribeConfirmationMessage}
		/>
	)
}
