import { UnloadedModuleProps, URLField } from "@agility/nextjs"
import { ContentItem } from "@agility/content-fetch"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import { getContentList } from "lib/cms/getContentList"
import Link from "next/link"

interface ICompetitorCard {
	title: string
	description: string
	painPoint1?: string
	painPoint2?: string
	painPoint3?: string
	avatarColor?: string
	link?: URLField
}

interface ICompetitorCards {
	heading: string
	description?: string
	competitors: {
		referencename: string
	}
}

export const CompetitorCards = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<ICompetitorCards>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0,
	})

	const lstCompetitors = fields.competitors?.referencename
		? await getContentList({
				referenceName: fields.competitors.referencename,
				languageCode,
				take: 20,
		  })
		: null

	if (!lstCompetitors || lstCompetitors.items.length === 0) return null

	const competitors = lstCompetitors.items as ContentItem<ICompetitorCard>[]

	return (
		<Container id={`${contentID}`} data-agility-component={contentID} className="bg-white">
			<div className="mx-auto max-w-7xl pb-14">
				<div className="mb-10 max-w-2xl">
					{fields.heading && (
						<h2 className="text-balance text-4xl font-bold text-primary lg:text-5xl">
							{fields.heading}
						</h2>
					)}
					{fields.description && (
						<p className="mt-3 text-gray-600">{fields.description}</p>
					)}
				</div>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{competitors.map((comp) => {
						const painPoints = [
							comp.fields.painPoint1,
							comp.fields.painPoint2,
							comp.fields.painPoint3,
						].filter(Boolean)

						const avatarColor = comp.fields.avatarColor || "#5800d4"
						const initial = comp.fields.title.charAt(0).toUpperCase()

						const cardContent = (
							<div className="group flex h-full flex-col rounded-2xl border border-gray-200/60 bg-white p-5 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-lg">
								<div className="mb-3 flex items-center gap-3">
									<div
										className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
										style={{ backgroundColor: avatarColor }}
									>
										{initial}
									</div>
									<h3 className="text-base font-bold text-primary">
										{comp.fields.title}
									</h3>
								</div>
								<p className="flex-1 text-sm leading-relaxed text-gray-600">
									{comp.fields.description}
								</p>
								{painPoints.length > 0 && (
									<div className="mt-4 flex flex-wrap gap-1.5">
										{painPoints.map((point, i) => (
											<span
												key={i}
												className="inline-block rounded-full border border-red-100 bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-500"
											>
												{point}
											</span>
										))}
									</div>
								)}
								{comp.fields.link && comp.fields.link.href && (
									<p className="mt-4 text-sm font-semibold text-highlight-light group-hover:underline">
										{comp.fields.link.text || "See comparison"} &rarr;
									</p>
								)}
							</div>
						)

						if (comp.fields.link && comp.fields.link.href) {
							return (
								<Link key={comp.contentID} href={comp.fields.link.href} target={comp.fields.link.target}>
									{cardContent}
								</Link>
							)
						}

						return <div key={comp.contentID}>{cardContent}</div>
					})}
				</div>
			</div>
		</Container>
	)
}
