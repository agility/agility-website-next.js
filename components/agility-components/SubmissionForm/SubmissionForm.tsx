import { UnloadedModuleProps } from "@agility/nextjs"
import { getContentItem } from "lib/cms/getContentItem"
import Script from "next/script"
import { SubmissionFormClient } from "./SubmissionForm.client"

export interface ISubmissionForm {
	leftColumnTitle: string
	leftColumnBody: string
	redirectURL?: string
	hubspotForm?: string
}

export const SubmissionForm = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<ISubmissionForm>({
		contentID: module.contentid,
		languageCode
	})

	if (!fields.hubspotForm) {
		console.warn(`SubmissionForm module with contentID ${contentID} is missing a HubSpot form ID`)
		return null
	}

	return <SubmissionFormClient {...fields} />
}
