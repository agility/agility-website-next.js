/* eslint-disable @next/next/no-img-element */
import { AgilityPic, renderHTML, UnloadedModuleProps, URLField } from "@agility/nextjs"
import { IconQuote } from "@tabler/icons-react"
import { Container } from "components/micro/Container"
import { LinkButton } from "components/micro/LinkButton"
import { getPartnerListing } from "lib/cms-content/getPartnerListing"
import { getContentItem } from "lib/cms/getContentItem"
import { IPartner } from "lib/types/IPartner"
import Link from "next/link"
import { PartnerListingItem } from "../PartnerListing/PartnerListingItem"

interface IPartnerDetails {
	cTAContent: string
	cTAButton: URLField
	titleMorePartners: string
	exploreAllPartners: URLField
}

export const PartnerDetails = async ({ languageCode, dynamicPageItem, module }: UnloadedModuleProps) => {
	if (!dynamicPageItem) return null

	const { fields, contentID } = await getContentItem<IPartnerDetails>({
		contentID: module.contentid,
		languageCode
	})

	const partner: IPartner = dynamicPageItem.fields

	const otherPartners = await getPartnerListing({
		referenceName: dynamicPageItem.properties.referenceName,
		skip: 0,
		take: 4,
		contentTagID: partner.customTags[0].contentID || undefined
	})

	const otherPartnersFiltered = otherPartners.filter((p) => p.contentID !== dynamicPageItem.contentID)

	return (
		<Container className="mx-auto max-w-7xl px-8">
			<div className="flex flex-col lg:flex-row">
				<div className="lg:w-2/3">
					<h2 className="text-3xl font-medium">Partner Overview</h2>
					<div className="prose mt-4" dangerouslySetInnerHTML={renderHTML(partner.textblob)}></div>

					{partner.quote && (
						<div
							className="max-2 mt-10 rounded-md border border-highlight-light p-4"
							style={{ maxWidth: "65ch" }}
						>
							<IconQuote size={24} className="text-highlight-dark" />
							<div className="mt-4">{partner.quote}</div>
						</div>
					)}
				</div>
				<div className="mt-10 bg-background/60 p-8 lg:mt-0 lg:w-1/3 lg:bg-white lg:p-0">
					<div className="font-bold">Region</div>
					<div className="mt-2 flex flex-wrap gap-1">
						{partner.customTags.map((tag: any, index) => (
							<Link
								key={tag.contentID}
								href={`../implementation?region=${encodeURIComponent(tag.fields.title.toLowerCase().replaceAll(" ", "-"))}`}
								className="rounded bg-background px-2 py-1 hover:text-highlight-light"
							>
								{tag.fields.title}
							</Link>
						))}
					</div>

					<div className="mt-14 bg-highlight-light px-6 py-8 text-center">
						<div
							className="prose prose-invert"
							dangerouslySetInnerHTML={renderHTML(fields.cTAContent)}
						></div>
						<div className="mt-6">
							<LinkButton
								type="secondary-inverted"
								href={fields.cTAButton.href}
								target={fields.cTAButton.target}
							>
								{fields.cTAButton.text}
							</LinkButton>
						</div>
					</div>
				</div>
			</div>

			<div>
				<h2 className="mt-14 text-center text-3xl font-medium">{fields.titleMorePartners}</h2>
				<div className="mt-10 flex flex-col items-center justify-center gap-3 lg:flex-row">
					{otherPartnersFiltered.map((item) => (
						<div key={item.contentID} className="flex flex-col md:w-[400px] lg:w-[300px] xl:w-[480px]">
							<PartnerListingItem
								item={item}
								partnerType={
									dynamicPageItem.properties.referenceName.includes("implementation")
										? "implementation"
										: "integration"
								}
							/>
						</div>
					))}
				</div>
			</div>

			<div className="mt-10 text-center">
				<LinkButton
					size="md"
					type="secondary"
					href={fields.exploreAllPartners.href}
					target={fields.exploreAllPartners.target}
				>
					{fields.exploreAllPartners.text}
				</LinkButton>
			</div>
		</Container>
	)
}
