/**
 * Fetches a HubSpot form's definition SERVER-SIDE from the public embed JSON
 * endpoint and normalizes it into a shape our native forms can render.
 *
 * Because this runs in a Server Component (server -> HubSpot), the browser
 * never requests `forms.hsforms.com`, so ad blockers / InPrivate can't block
 * it. The parsed result ships to the client inside our own page payload.
 *
 * Callers should treat a `null` return as "use hardcoded fallbacks" so the
 * form still renders if HubSpot is unreachable. See GitHub issue #85.
 */

export interface HubSpotFormField {
	name: string
	label: string
	/** HubSpot fieldType: "text" | "textarea" | "select" | "phonenumber" | ... */
	fieldType: string
	required: boolean
	hidden: boolean
	placeholder: string
	defaultValue: string
	/** HubSpot object type, almost always "0-1" (Contact). */
	objectTypeId: string
	/** email field with "block free/personal email domains" enabled. */
	blockFreeEmail: boolean
	options: { label: string; value: string }[]
}

export interface HubSpotConsentCheckbox {
	/** Maps to `subscriptionTypeId` in the Forms submission API. */
	communicationTypeId: number
	label: string
	required: boolean
}

export interface HubSpotFormDefinition {
	submitText: string
	redirectUrl: string
	fields: HubSpotFormField[]
	/** Processing-consent copy (shown as text when type is IMPLICIT). */
	processingConsentText: string
	processingConsentType: string
	isLegitimateInterest: boolean
	communicationConsentCheckboxes: HubSpotConsentCheckbox[]
	captchaEnabled: boolean
}

// HubSpot returns consent labels with HTML entities (e.g. "&amp;").
const decodeEntities = (s: string): string =>
	s
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&nbsp;/g, " ")

// Cache the definition for 30 min so marketer edits in HubSpot propagate
// without a redeploy, while keeping the server->HubSpot call off the hot path.
const REVALIDATE_SECONDS = 1800

export async function getHubSpotFormDefinition(
	portalId: string | number,
	formId: string
): Promise<HubSpotFormDefinition | null> {
	if (!portalId || !formId) return null

	try {
		const url = `https://forms.hsforms.com/embed/v3/form/${portalId}/${formId}/json`
		const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } })
		if (!res.ok) {
			console.warn(`HubSpot form definition fetch failed (${res.status}) for form ${formId}`)
			return null
		}

		const json = await res.json()
		const form = json?.form
		if (!form) return null

		const fields: HubSpotFormField[] = []
		for (const group of form.formFieldGroups || []) {
			for (const fl of group.fields || []) {
				fields.push({
					name: fl.name,
					label: fl.label ?? "",
					fieldType: fl.fieldType ?? "text",
					required: !!fl.required,
					hidden: !!fl.hidden,
					placeholder: fl.placeholder ?? "",
					defaultValue: fl.defaultValue ?? "",
					objectTypeId: fl.objectTypeId ?? "0-1",
					blockFreeEmail: !!fl.validation?.useDefaultBlockList,
					options: (fl.options || []).map((o: { label: string; value: string }) => ({
						label: o.label,
						value: o.value,
					})),
				})
			}
		}

		let processingConsentText = ""
		let processingConsentType = ""
		let isLegitimateInterest = false
		let communicationConsentCheckboxes: HubSpotConsentCheckbox[] = []

		const lcoRaw = (form.metaData || []).find(
			(m: { name: string; value: string }) => m.name === "legalConsentOptions"
		)?.value
		if (lcoRaw) {
			try {
				const lco = JSON.parse(lcoRaw)
				processingConsentText = decodeEntities(lco.processingConsentCheckboxLabel ?? "")
				processingConsentType = lco.processingConsentType ?? ""
				isLegitimateInterest = !!lco.isLegitimateInterest
				communicationConsentCheckboxes = (lco.communicationConsentCheckboxes || []).map(
					(c: { communicationTypeId: number; label: string; required: boolean }) => ({
						communicationTypeId: c.communicationTypeId,
						label: decodeEntities(c.label ?? ""),
						required: !!c.required,
					})
				)
			} catch (e) {
				console.warn("Failed to parse HubSpot legalConsentOptions:", e)
			}
		}

		return {
			submitText: form.submitText || "Submit",
			redirectUrl: form.redirectUrl || "",
			fields,
			processingConsentText,
			processingConsentType,
			isLegitimateInterest,
			communicationConsentCheckboxes,
			captchaEnabled: !!form.captchaEnabled,
		}
	} catch (e) {
		console.error("Failed to fetch HubSpot form definition:", e)
		return null
	}
}
