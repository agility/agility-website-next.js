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

export const GatedDownload = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<IGatedDownload>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	// Fetch the HubSpot form definition SERVER-SIDE from the item's own form
	// config so the browser never loads js.hsforms.net (ad-blocker / InPrivate
	// resilient). null -> client fallback (LEAD_FORM_FALLBACK).
	let formDefinition = null
	if (fields.hubspotForm) {
		try {
			const { portalId, formId } = JSON.parse(fields.hubspotForm)
			formDefinition = await getHubSpotFormDefinition(portalId, formId)
		} catch (error) {
			console.error("GatedDownload: failed to load HubSpot form definition:", error)
		}
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
						contentID={contentID}
						languageCode={languageCode}
					/>
				</div>
			</div>
		</Container>
	)
}
