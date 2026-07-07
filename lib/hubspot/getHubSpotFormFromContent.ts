import { getContentItem } from "lib/cms/getContentItem"

/**
 * Resolves a HubSpot form's portal/form IDs from an Agility content item,
 * SERVER-SIDE. The submission route uses this so the form a request targets is
 * determined by the CMS content item (the source of truth marketers edit), not
 * by whatever portal/form IDs the browser sends — a client can't point our
 * proxy at an arbitrary form. See issues #85 / #87.
 *
 * `fieldName` is the field on the content item holding the HubSpot form JSON
 * (`{ portalId, formId, name }`) — "hubspotForm" for most components,
 * "newsletterSignupForm" for the footer subscribe form. If that field isn't a
 * form JSON, we fall back to the ROI-calculator shape where the portal/form IDs
 * live in separate `hubspotPortalId` / `hubspotFormId` fields.
 */

export interface ResolvedHubSpotForm {
	portalId: string
	formId: string
	name?: string
}

const DEFAULT_LANGUAGE_CODE = process.env.AGILITY_LOCALES || "en-us"

export async function getHubSpotFormFromContent(
	contentID: number,
	languageCode?: string,
	fieldName: string = "hubspotForm"
): Promise<ResolvedHubSpotForm | null> {
	if (!contentID || Number.isNaN(contentID)) return null

	try {
		const { fields } = await getContentItem<Record<string, unknown>>({
			contentID,
			languageCode: languageCode || DEFAULT_LANGUAGE_CODE,
			contentLinkDepth: 0,
		})

		// Shape 1: a single field holding the form JSON ({ portalId, formId, name }).
		const raw = fields?.[fieldName]
		if (typeof raw === "string" && raw.trim()) {
			try {
				const parsed = JSON.parse(raw)
				if (parsed?.portalId && parsed?.formId) {
					return {
						portalId: `${parsed.portalId}`,
						formId: `${parsed.formId}`,
						name: parsed.name,
					}
				}
			} catch {
				// fall through to shape 2
			}
		}

		// Shape 2: separate hubspotPortalId / hubspotFormId fields (ROI calculator).
		const portalId = fields?.hubspotPortalId
		const formId = fields?.hubspotFormId
		if (portalId && formId) {
			return {
				portalId: `${portalId}`,
				formId: `${formId}`,
				name: typeof fields?.name === "string" ? fields.name : undefined,
			}
		}

		return null
	} catch (e) {
		console.error(`getHubSpotFormFromContent(${contentID}, ${fieldName}) failed:`, e)
		return null
	}
}
