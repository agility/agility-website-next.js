import { UnloadedModuleProps, ImageField, ContentItem } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import { LogoListingClient } from "./LogoListing.client"
import { sampleSize, shuffle } from "lodash"
import { getContentList } from "lib/cms/getContentList"
import { ThreeDashLine } from "components/micro/ThreeDashLine"

export interface LogoItem {
	title: string
	logo: ImageField
}

interface ILogoListing {
	heading: string
	logos: {
		referencename: string
	}
	logoCount: number
}

export const LogoListing = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<ILogoListing>({
		contentID: module.contentid,
		languageCode
	})

	const { logoCount, heading, logos } = fields

	const lstLogos = await getContentList({
		referenceName: logos.referencename,
		languageCode
	})

	const lst: ContentItem<LogoItem>[] = shuffle(sampleSize(lstLogos.items, logoCount || 6))

	return (
		<Container id={`${contentID}`} data-agility-component={contentID}>
			<div className="mx-auto max-w-7xl">
				<div className="flex justify-center">
					{heading && (
						<div className="mb-5">
							<h2 className="mb-3 text-balance text-5xl font-medium leading-10 sm:leading-tight">
								{heading}
							</h2>
							<ThreeDashLine />
						</div>
					)}
				</div>
				<LogoListingClient logos={lst.map((l) => l.fields)} />
			</div>
		</Container>
	)
}
