import { renderHTML, Module, UnloadedModuleProps, ImageField, URLField, ContentItem } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import { PartnerLogoListingClient } from "./PartnerLogoListing.client"
import { sample, sampleSize, shuffle } from "lodash"
import { getContentList } from "lib/cms/getContentList"
import { ThreeDashLine } from "components/micro/ThreeDashLine"
import { IPartner } from "lib/types/IPartner"

export interface LogoItem {
	title: string
	logo: ImageField
}

interface IPartnerLogoListing {
	heading: string
	partners: ContentItem<IPartner>[]
	logoCount: number
}

export const PartnerLogoListing = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<IPartnerLogoListing>({
		contentID: module.contentid,
		languageCode
	})

	const { logoCount, heading, partners } = fields

	const lstPartners = shuffle(sampleSize(partners, logoCount || 6))

	return (
		<Container id={`${contentID}`} data-agility-component={contentID}>
			<div className="mx-auto max-w-screen-xl">
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
				<PartnerLogoListingClient logos={lstPartners.map((l) => l.fields)} />
			</div>
		</Container>
	)
}
