import { UnloadedModuleProps } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { ThreeDashLine } from "components/micro/ThreeDashLine"
import { getContentItem } from "lib/cms/getContentItem"
import Script from "next/script"
import { G2CrowdReviewListingClient } from "./G2CrowdReviewListing.client"

export interface IG2CrowdReviewListing {
	heading: string
	gartnerSourcingLink: string
	gartnerWidgetID: string
	gartnerWidgetSize: string
	gartnerWidgetTheme: string
}

export const G2CrowdReviewListing = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<IG2CrowdReviewListing>({
		contentID: module.contentid,
		languageCode
	})

	const { heading } = fields

	return (
		<Container id={`${contentID}`} data-agility-component={contentID}>
			<div className="mx-auto max-w-5xl text-center">
				{heading && (
					<>
						<h1 className="text-balance text-5xl dark:text-white">{heading}</h1>
						<ThreeDashLine />
					</>
				)}

				<G2CrowdReviewListingClient {...fields} />
			</div>
		</Container>
	)
}
