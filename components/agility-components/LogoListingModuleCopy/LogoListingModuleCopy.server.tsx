import { renderHTML, Module, UnloadedModuleProps, ImageField, URLField, ContentItem } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import { LogoListingModuleCopyClient } from "./LogoListingModuleCopy.client"
import { shuffle } from "lodash"
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
