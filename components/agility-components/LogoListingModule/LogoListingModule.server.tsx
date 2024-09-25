import { renderHTML, Module, UnloadedModuleProps, ImageField, URLField, ContentItem } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import { LogoListingModuleClient } from "./LogoListingModule.client"
import { shuffle } from "lodash"

export interface LogoItem {
	title: string
	logo: ImageField
	uRL: URLField
}

interface ILogoListingModule {
	title: string
	logos: ContentItem<LogoItem>[]
}

export const LogoListingModule = async ({ module, languageCode }: UnloadedModuleProps) => {
	const {
		fields: { logos, title },
		contentID
	} = await getContentItem<ILogoListingModule>({
		contentID: module.contentid,
		languageCode
	})

	return (
		<Container id={`${contentID}`} data-agility-component={contentID}>
			<div className="mx-auto max-w-7xl">
				<div className="border-t border-t-background"></div>
				<div className="flex justify-center">
					<h3 className="-mt-3 text-balance bg-white px-8 text-center text-sm font-medium uppercase text-highlight-light">
						{title}
					</h3>
				</div>
				<LogoListingModuleClient logos={shuffle(logos.map((l) => l.fields))} />
				<div className="border-t border-t-background"></div>
			</div>
		</Container>
	)
}
