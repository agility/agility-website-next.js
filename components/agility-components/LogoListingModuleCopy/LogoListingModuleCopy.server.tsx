import { UnloadedModuleProps, ImageField, URLField, ContentItem } from "@agility/nextjs"
import { IPartner } from "lib/types/IPartner"

export interface LogoItem {
	title: string
	logo: ImageField
	uRL?: URLField
}

interface ILogoListingModule {
	title: string
	logos: ContentItem<IPartner>[]
}

export const LogoListingModuleCopy = async ({ module, languageCode }: UnloadedModuleProps) => {
	//this component is not used anymore
	return null
}
