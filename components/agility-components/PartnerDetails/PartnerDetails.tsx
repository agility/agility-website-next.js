/* eslint-disable @next/next/no-img-element */
import { UnloadedModuleProps, URLField } from "@agility/nextjs"
import { IconCheckbox, IconQuote } from "@tabler/icons-react"
import { Container } from "components/micro/Container"
import { LinkButton } from "components/micro/LinkButton"
import { getPartnerListing, IPartnerListingItem } from "lib/cms-content/getPartnerListing"
import { getContentItem } from "lib/cms/getContentItem"
import { IPartner } from "lib/types/IPartner"
import Link from "next/link"
import { PartnerListingItem } from "../PartnerListing/PartnerListingItem"
import { getContentList } from "lib/cms/getContentList"
import { CaseStudyDetailRotator } from "../CaseStudyDetails/CaseStudyDetailRotator"
import { GuideLink, GuideWithLinks } from "components/common/GuideWithLinks"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"

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
	let otherPartnersFiltered: IPartnerListingItem[] = []

	const customTags = partner.customTags || []

	if (customTags.length > 0) {
		const otherPartners = await getPartnerListing({
			referenceName: dynamicPageItem.properties.referenceName,
			skip: 0,
			take: 4,
			contentTagID: customTags[0].contentID || undefined
		})

		otherPartnersFiltered = otherPartners.filter((p) => p.contentID !== dynamicPageItem.contentID)
	}

	let overviewItems = []
	if (partner.overviewItems?.referencename) {
		// get the overview items
		const lstOverviewitems = await getContentList({
			referenceName: partner.overviewItems.referencename,
			languageCode
		})

		overviewItems = lstOverviewitems?.items || []
	}

	let guideLinks: GuideLink[] = []
	if (partner.steps?.referencename) {
		// get the guide links
		const lstGuideLinks = await getContentList({
			referenceName: partner.steps.referencename,
			languageCode
		})

		guideLinks = lstGuideLinks?.items.map((item: any) => ({
			title: item.fields.heading,
			description: item.fields.description,
			uRL: item.fields.link
		}))
	}

	let documentationItems = []
	if (partner.documentationLinks?.referencename) {
		// get the overview items
		const lstOverviewitems = await getContentList({
			referenceName: partner.documentationLinks.referencename,
			languageCode
		})

		documentationItems = lstOverviewitems?.items || []
	}

	const heading =
		dynamicPageItem.properties.referenceName === "integrations" ? "Integration Overview" : "Partner Overview"

	const gallery = partner.gallery || partner.screenshots

	const websiteLink: URLField | null | undefined =
		typeof partner.website === "string"
			? { href: partner.website, text: partner.website, target: "_blank" }
			: partner.website

	return (
		<Container className="mx-auto max-w-7xl px-8">
			<div className="flex flex-col lg:flex-row">
				<div className="lg:w-2/3">
					<h2 className="text-3xl font-medium">{heading}</h2>
					<div
						className="prose mt-4"
						dangerouslySetInnerHTML={renderHTMLCustom(partner.textblob || partner.overviewContent)}
					></div>

					{overviewItems.length > 0 && (
						<div>
							{overviewItems.map((item: any) => (
								<div key={item.contentID} className="mt-8">
									<div className="flex gap-4">
										<div className="pt-1">
											<IconCheckbox className="text-highlight-light" size={20} />
										</div>
										<div>
											<h3 className="text-lg font-medium">{item.fields.heading}</h3>
											<div
												className="prose mt-2"
												dangerouslySetInnerHTML={renderHTMLCustom(item.fields.description)}
											></div>
										</div>
									</div>
								</div>
							))}
						</div>
					)}

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
					{websiteLink && (
						<>
							<div className="font-bold">Website</div>
							<div className="mt-2 flex flex-wrap gap-1">
								<a
									href={websiteLink.href}
									className="text-highlight-light hover:text-highlight-dark"
									target="_blank"
									rel="noreferrer"
								>
									{websiteLink.text}
								</a>
							</div>
						</>
					)}

					{customTags.length > 0 && (
						<>
							<div className="mt-8 font-bold">Region</div>
							<div className="mt-2 flex flex-wrap gap-1">
								{customTags.map((tag: any) => (
									<Link
										key={tag.contentID}
										href={`../implementation?region=${encodeURIComponent(tag.fields.title.toLowerCase().replaceAll(" ", "-"))}`}
										className="rounded bg-background px-2 py-1 hover:text-highlight-light"
									>
										{tag.fields.title}
									</Link>
								))}
							</div>
						</>
					)}

					{partner.integrationType && partner.integrationType.length > 0 && (
						<>
							<div className="mt-8 font-bold">Integration Type</div>
							<div className="mt-2 flex flex-wrap gap-1">
								{partner.integrationType.map((tag: any) => (
									<Link
										key={tag.contentID}
										href={`/partners/integrations?integration=${encodeURIComponent(tag.fields.title.toLowerCase().replaceAll(" ", "-"))}`}
										className="rounded bg-background px-2 py-1 hover:text-highlight-light"
									>
										{tag.fields.title}
									</Link>
								))}
							</div>
						</>
					)}

					{documentationItems.length > 0 && (
						<>
							<div className="mt-8 font-bold">Documentation</div>
							<div className="mt-2 flex flex-wrap gap-1">
								{documentationItems
									.filter((item: any) => item.fields.uRL)
									.map((item: any) => (
										<Link
											key={item.contentID}
											href={item.fields.uRL.href}
											className="text-highlight-light hover:text-highlight-dark"
										>
											{item.fields.uRL.text}
										</Link>
									))}
							</div>
						</>
					)}

					{fields.cTAButton && (
						<div className="mt-14 bg-highlight-light px-6 py-8 text-center">
							<div
								className="prose prose-invert"
								dangerouslySetInnerHTML={renderHTMLCustom(fields.cTAContent)}
							></div>
							<div className="mt-6">
								{fields.cTAButton && (
									<LinkButton
										type="secondary-inverted"
										href={fields.cTAButton.href}
										target={fields.cTAButton.target}
									>
										{fields.cTAButton.text}
									</LinkButton>
								)}
							</div>
						</div>
					)}
				</div>
			</div>

			{gallery && gallery.media && gallery.media.length > 0 && (
				<div>
					<CaseStudyDetailRotator galleryItems={gallery.media} />
				</div>
			)}

			{partner.setupHeading && partner.descriptionStepImplementation && partner.cTA && guideLinks.length > 0 && (
				<div>
					<GuideWithLinks
						mainInfo={{
							heading: partner.setupHeading,
							description: partner.descriptionStepImplementation,
							mainCTA: partner.cTA,
							guideIcon: partner.stepIcon
						}}
						items={guideLinks}
					/>
				</div>
			)}

			{otherPartnersFiltered.length > 0 && (
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
			)}

			<div className="mt-10 text-center">
				{fields.exploreAllPartners && (
					<LinkButton
						size="md"
						type="secondary"
						href={fields.exploreAllPartners.href}
						target={fields.exploreAllPartners.target}
					>
						{fields.exploreAllPartners.text}
					</LinkButton>
				)}
			</div>
		</Container>
	)
}
