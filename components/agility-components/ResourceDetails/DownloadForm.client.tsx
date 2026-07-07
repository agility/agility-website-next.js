/* eslint-disable @next/next/no-img-element */
"use client"
import { HubSpotNativeForm, LEAD_FORM_FALLBACK } from "components/common/HubSpotNativeForm"
import type { HubSpotFormDefinition } from "lib/hubspot/getHubSpotFormDefinition"

interface IDownloadForm {
	redirectURL?: string
	hubspotForm?: string
	/** Fetched server-side in ResourceDetails.tsx. Null -> LEAD_FORM_FALLBACK. */
	formDefinition?: HubSpotFormDefinition | null
	/** Agility content item + locale — the submission route resolves the form from these. */
	contentID?: number
	languageCode?: string
}

export const DownloadForm = ({ hubspotForm, redirectURL, formDefinition, contentID, languageCode }: IDownloadForm) => {
	const { portalId, formId, name } = JSON.parse(hubspotForm || '{"portalId":"","formId":"","name":""}')

	return (
		<div>
			<div className="relative">
				<div className="relative z-[2] border-t-2 border-t-highlight-light bg-white p-6 shadow-lg">
					<HubSpotNativeForm
						portalId={portalId}
						formId={formId}
						contentID={contentID}
						languageCode={languageCode}
						formName={name}
						formDefinition={formDefinition}
						fallbackDefinition={LEAD_FORM_FALLBACK}
						redirectURL={redirectURL}
						idPrefix={`download-${formId}`}
					/>
				</div>
				<img
					src="https://static.agilitycms.com/layout/static/triangle-pattern.svg"
					className="absolute -right-14 -top-14"
					alt=""
				/>
				<img
					src="https://static.agilitycms.com/layout/static/triangle-pattern.svg"
					className="absolute -bottom-14 -left-14"
					alt=""
				/>
			</div>
		</div>
	)
}
