import { UnloadedModuleProps, URLField } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import { GatedDownloadClient } from "./GatedDownload.client"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"
import { getHubSpotFormDefinition } from "lib/hubspot/getHubSpotFormDefinition"

interface IGatedDownload {
	hubspotForm?: string
	redirectURL: URLField
	leftColumnTitle?: string
	leftColumnBody?: string
}

// Fallback IDs must match GatedDownloadClient's DEFAULT_FORM.
const DEFAULT_PORTAL_ID = 23239214
const DEFAULT_FORM_ID = "4879f91f-730d-4b2b-9307-67c6670724b1"

export const GatedDownload = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<IGatedDownload>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	// Fetch the HubSpot form definition SERVER-SIDE so the browser never loads
	// js.hsforms.net (ad-blocker / InPrivate resilient). null -> client fallback.
	let formDefinition = null
	try {
		let portalId: string | number = DEFAULT_PORTAL_ID
		let formId = DEFAULT_FORM_ID
		if (fields.hubspotForm) {
			const parsed = JSON.parse(fields.hubspotForm)
			portalId = parsed.portalId ?? DEFAULT_PORTAL_ID
			formId = parsed.formId ?? DEFAULT_FORM_ID
		}
		formDefinition = await getHubSpotFormDefinition(portalId, formId)
	} catch (error) {
		console.error("GatedDownload: failed to load HubSpot form definition:", error)
	}

	return (
		<Container className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row">
			<div className="lg:w-1/2">
				<h2 className="text-balance text-4xl font-medium">{fields.leftColumnTitle}</h2>
				<div className="prose mt-10" dangerouslySetInnerHTML={renderHTMLCustom(fields.leftColumnBody)}></div>
			</div>
			<div className="lg:w-1/2">
				<div className="border-t-4 border-t-highlight-light p-6 shadow-lg">
					<GatedDownloadClient
						redirectURL={fields.redirectURL.href}
						hubspotForm={fields.hubspotForm}
						formDefinition={formDefinition}
						contentID={fields.hubspotForm ? contentID : undefined}
						languageCode={languageCode}
					/>
				</div>
			</div>
		</Container>
	)
}
