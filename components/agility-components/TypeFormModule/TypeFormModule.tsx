import { UnloadedModuleProps } from "@agility/nextjs"
import { getContentItem } from "lib/cms/getContentItem"
import { TypeFormClient } from "./TypeFormModule.client"

export interface ITypeFormModule {
	form: string
	display: string
	buttonLabel?: string
	buttonColor?: string
}

export const TypeFormModule = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<ITypeFormModule>({
		contentID: module.contentid,
		languageCode
	})

	if (!fields.form) {
		console.warn(`TypeFormModule module with contentID ${contentID} is missing a TypeForm ID`)
		return null
	}

	return <TypeFormClient {...fields} />
}
