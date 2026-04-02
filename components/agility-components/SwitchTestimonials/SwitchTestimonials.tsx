import { UnloadedModuleProps } from "@agility/nextjs"
import { ContentItem } from "@agility/content-fetch"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import { getContentList } from "lib/cms/getContentList"

interface ISwitchTestimonial {
	quote: string
	personTitle: string
	company: string
}

interface ISwitchTestimonials {
	heading: string
	description?: string
	testimonials: {
		referencename: string
	}
}

export const SwitchTestimonials = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<ISwitchTestimonials>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0,
	})

	const lstTestimonials = fields.testimonials?.referencename
		? await getContentList({
				referenceName: fields.testimonials.referencename,
				languageCode,
				take: 10,
		  })
		: null

	if (!lstTestimonials || lstTestimonials.items.length === 0) return null

	const testimonials = lstTestimonials.items as ContentItem<ISwitchTestimonial>[]

	return (
		<Container id={`${contentID}`} data-agility-component={contentID} className="bg-white">
			<div className="mx-auto max-w-7xl pb-14">
				<div className="mb-10 text-center">
					{fields.heading && (
						<h2 className="text-balance text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
							{fields.heading}
						</h2>
					)}
					{fields.description && (
						<p className="mx-auto mt-3 max-w-2xl text-gray-500">{fields.description}</p>
					)}
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{testimonials.map((t) => (
						<div
							key={t.contentID}
							className="flex flex-col rounded-2xl border border-gray-200/60 bg-[#f8f4ff] p-6 shadow-sm"
						>
							<span
								className="mb-2 select-none font-serif text-4xl leading-none text-primary/25"
								aria-hidden="true"
							>
								&ldquo;
							</span>
							<p className="flex-1 text-sm leading-relaxed text-gray-700">
								{t.fields.quote}
							</p>
							<div className="mt-5 border-t border-gray-200/40 pt-4">
								<p className="text-sm font-semibold text-primary">
									{t.fields.personTitle}
								</p>
								<p className="text-sm text-gray-500">{t.fields.company}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</Container>
	)
}
