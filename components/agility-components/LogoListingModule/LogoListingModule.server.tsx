import { renderHTML, Module, UnloadedModuleProps, ImageField, URLField, ContentItem } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import { LogoListingModuleClient } from "./LogoListingModule.client"

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
			<div className="max-w-screen-xl mx-auto">
				<div className="border-t border-t-background "></div>
				<div className="flex justify-center">
					<h3 className="bg-white px-8 text-highlight-light font-medium uppercase text-sm text-balance text-center -mt-3">
						{title}
					</h3>
				</div>
				<LogoListingModuleClient logos={logos.map((l) => l.fields)} />
				<div className="border-t border-t-background "></div>
			</div>
		</Container>
	)
}
