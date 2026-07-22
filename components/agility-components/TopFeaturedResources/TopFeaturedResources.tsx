import { AgilityPic, ImageField, UnloadedModuleProps } from "@agility/nextjs"
import clsx from "clsx"
import { ContentItem } from "@agility/content-fetch"
import { Container } from "components/micro/Container"
import { ThreeDashLine } from "components/micro/ThreeDashLine"
import { LinkButton } from "components/micro/LinkButton"
import { getContentItem } from "lib/cms/getContentItem"
import { getContentList } from "lib/cms/getContentList"
import { IResource } from "lib/types/IResource"
import { IResourceType } from "lib/types/IResourceType"
import { IEvent } from "lib/types/IEvent"
import Link from "next/link"

interface ITopFeaturedResources {
	title?: string
	featuredEvent?: { contentid: number }
	resources?: {
		referencename: string
		sortids: string
	}
}

interface FeaturedCard {
	key: string
	href: string
	image?: ImageField
	imageFit: "cover" | "contain"
	isVertical: boolean
	typeLabel: string
	ctaText: string
}

const EBOOK_RESOURCE_TYPE_ID = 4384

const isWatchType = (label: string) => /webinar|video|podcast/i.test(label)

const TopFeaturedResources = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<ITopFeaturedResources>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	const cards: FeaturedCard[] = []

	if (fields.featuredEvent?.contentid) {
		const event = await getContentItem<IEvent>({
			contentID: fields.featuredEvent.contentid,
			languageCode,
			contentLinkDepth: 1
		})

		const eventTypeTitle = event.fields.eventType?.fields?.title || "On-Demand Webinar"

		cards.push({
			key: `event-${event.contentID}`,
			href: `/resources/events/${event.fields.uRL}`,
			image: event.fields.mainImage,
			imageFit: "cover",
			isVertical: false,
			typeLabel: eventTypeTitle,
			ctaText: "Watch now"
		})
	}

	if (fields.resources?.sortids) {
		const sortIDs = fields.resources.sortids
			.split(",")
			.map((s) => s.trim())
			.filter(Boolean)

		if (sortIDs.length > 0) {
			const filter = {
				operator: "in" as const,
				property: "contentID",
				value: `"${fields.resources.sortids}"`
			}

			const res = await getContentList({
				referenceName: fields.resources.referencename,
				languageCode,
				filters: [filter]
			})

			const items = (res.items as ContentItem<IResource>[]) || []

			const ordered = sortIDs
				.map((id) => items.find((it) => `${it.contentID}` === id))
				.filter((it): it is ContentItem<IResource> => Boolean(it))

			ordered.forEach((resource) => {
				const resType = resource.fields.resourceType as ContentItem<IResourceType> | undefined
				const typeTitle = resType?.fields?.title || ""
				const typeSlug = typeTitle.toLowerCase().replace(/ /g, "-")
				const href = `/resources/${typeSlug}/${resource.fields.uRL}`

				const isEbook = resType?.contentID === EBOOK_RESOURCE_TYPE_ID
				const usingBookCover = isEbook && Boolean(resource.fields.bookCover)
				const image =
					(isEbook ? resource.fields.bookCover : undefined) || resource.fields.image

				cards.push({
					key: `resource-${resource.contentID}`,
					href,
					image,
					imageFit: usingBookCover ? "contain" : "cover",
					isVertical: usingBookCover,
					typeLabel: typeTitle,
					ctaText: isWatchType(typeTitle) ? "Watch now" : "Download now"
				})
			})
		}
	}

	if (cards.length === 0) return null

	const title = fields.title || "Featured"

	return (
        <Container id={`agility-component-${contentID}`} data-agility-component={contentID}>
            <div className="mx-auto max-w-7xl text-center">
				<h2 className="text-balance text-5xl font-medium" data-agility-field="title">{title}</h2>
				<ThreeDashLine />

				<div className="relative mt-10">
					<div
						aria-hidden
						className="pointer-events-none absolute -left-6 -top-8 -z-10 h-40 w-32 bg-secondary md:h-48 md:w-40"
						style={{
							WebkitMaskImage: "url(/images/triangle-pattern.svg)",
							maskImage: "url(/images/triangle-pattern.svg)",
							WebkitMaskRepeat: "no-repeat",
							maskRepeat: "no-repeat",
							WebkitMaskSize: "contain",
							maskSize: "contain"
						}}
					/>
					<div
						aria-hidden
						className="pointer-events-none absolute -bottom-8 -right-6 -z-10 h-40 w-32 bg-secondary md:h-48 md:w-40"
						style={{
							WebkitMaskImage: "url(/images/triangle-pattern.svg)",
							maskImage: "url(/images/triangle-pattern.svg)",
							WebkitMaskRepeat: "no-repeat",
							maskRepeat: "no-repeat",
							WebkitMaskSize: "contain",
							maskSize: "contain"
						}}
					/>

					<div className="flex flex-col items-stretch gap-8 lg:flex-row">
						{cards.map((card) => (
							<div
								key={card.key}
								className={clsx(
									"flex flex-col text-left",
									card.isVertical ? "lg:flex-[1_1_0]" : "lg:flex-[2_1_0]"
								)}
							>
							<Link
								href={card.href}
								className={clsx(
									"group block overflow-hidden rounded-lg lg:h-64",
									card.isVertical
										? "h-64"
										: "aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto",
									card.imageFit === "contain" && "bg-background/40"
								)}
							>
								{card.image && (
									<AgilityPic
										image={card.image}
										className={clsx(
											"h-full w-full transition-transform duration-300 group-hover:scale-105",
											card.imageFit === "contain" ? "object-contain p-3" : "object-cover"
										)}
										fallbackWidth={card.isVertical ? 320 : 640}
									/>
								)}
							</Link>
							{card.typeLabel && (
								<h3 className="mt-5 flex-1 text-xl font-bold text-primary">
									<Link href={card.href} className="hover:text-highlight-light">
										{card.typeLabel}
									</Link>
								</h3>
							)}
							<div className="mt-3">
								<LinkButton type="primary" size="sm" href={card.href}>
									{card.ctaText}
								</LinkButton>
							</div>
						</div>
						))}
					</div>
				</div>
			</div>
        </Container>
    );
}

export default TopFeaturedResources
