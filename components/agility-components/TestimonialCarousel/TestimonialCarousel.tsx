import { UnloadedModuleProps, URLField } from "@agility/nextjs"
import { ContentItem } from "@agility/content-fetch"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import { getContentList } from "lib/cms/getContentList"
import { TestimonialCarouselClient, TestimonialItem } from "./TestimonialCarousel.client"

interface ICarouselTestimonial {
	quote: string
	personName: string
	personRole: string
	company: string
	companyLink?: URLField
}

interface ITestimonialCarousel {
	sectionLabel?: string
	heading: string
	testimonials: {
		referencename: string
	}
	ctaButton?: URLField
}

export const TestimonialCarousel = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<ITestimonialCarousel>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0,
	})

	const lstTestimonials = await getContentList({
		referenceName: fields.testimonials.referencename,
		languageCode,
		take: 50,
	})

	if (!lstTestimonials || !lstTestimonials.items || lstTestimonials.items.length === 0) return null

	const items: TestimonialItem[] = (lstTestimonials.items as ContentItem<ICarouselTestimonial>[]).map((t) => ({
		contentID: t.contentID,
		quote: t.fields.quote,
		personName: t.fields.personName,
		personRole: t.fields.personRole,
		company: t.fields.company,
		companyLink: t.fields.companyLink
			? { href: t.fields.companyLink.href, target: t.fields.companyLink.target, text: t.fields.companyLink.text }
			: undefined,
	}))

	return (
		<Container
			id={`${contentID}`}
			data-agility-component={contentID}
			className="bg-gradient-to-br from-highlight-dark via-highlight to-highlight-light text-white"
		>
			<div className="mx-auto max-w-7xl pb-14">
				{/* Section Label + Heading */}
				<div className="text-center">
					{fields.sectionLabel && (
						<p className="text-sm font-semibold uppercase tracking-widest text-white/70">
							{fields.sectionLabel}
						</p>
					)}
					{fields.heading && (
						<h2 className="mt-3 text-balance text-4xl font-bold lg:text-5xl">
							{fields.heading}
						</h2>
					)}
				</div>

				{/* Carousel (client) */}
				<TestimonialCarouselClient
					items={items}
					ctaButton={
						fields.ctaButton
							? { href: fields.ctaButton.href, target: fields.ctaButton.target, text: fields.ctaButton.text }
							: undefined
					}
				/>
			</div>
		</Container>
	)
}
