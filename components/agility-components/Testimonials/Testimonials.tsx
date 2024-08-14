import { UnloadedModuleProps } from "@agility/nextjs"
import { ContentItem } from "@agility/content-fetch"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import { getContentList } from "lib/cms/getContentList"
import { ICaseStudy } from "lib/types/ICaseStudy"
import { TestimonialsClient, MinCaseStudy } from "./Testimonials.client"
import { stripHtml } from "lib/utils/strip-html"
import { ITestimonial } from "lib/types/ITestimonial"

interface ITestimonials {
	header?: string
	subHeading?: string

	testimonials: {
		referencename: string
		sortids: string
	}
}

export const Testimonials = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<ITestimonials>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	const f = {
		operator: "in",
		property: "contentID",
		value: `"${fields.testimonials.sortids}"`
	}

	const lst = await getContentList({
		referenceName: fields.testimonials.referencename,
		languageCode,
		//@ts-ignore
		filters: [f],
		expandAllContentLinks: true
	})

	if (!lst || !lst.items || lst.items.length === 0) return null

	const { header, subHeading } = fields

	const items: ContentItem<ITestimonial>[] = lst.items

	return (
		<Container id={`${contentID}`} data-agility-component={contentID}>
			<div className="mx-auto max-w-5xl text-center">
				{header && <h2 className="text-balance text-4xl">{header}</h2>}
				{subHeading && <p className="mt-4 text-balance text-lg">{subHeading}</p>}
			</div>
			<TestimonialsClient {...{ items: items }} />
		</Container>
	)
}
