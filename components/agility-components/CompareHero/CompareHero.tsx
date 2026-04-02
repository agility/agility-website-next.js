import { UnloadedModuleProps, URLField } from "@agility/nextjs"
import { ContentItem } from "@agility/content-fetch"
import { Container } from "components/micro/Container"
import { LinkButton } from "components/micro/LinkButton"
import { getContentItem } from "lib/cms/getContentItem"
import { getContentList } from "lib/cms/getContentList"
import { IconArrowRight } from "@tabler/icons-react"

interface ICompareHeroStat {
	value: string
	label: string
}

interface ICompareHero {
	label?: string
	heading: string
	highlightedText?: string
	description?: string
	primaryCTA?: URLField
	secondaryCTA?: URLField
	stats: {
		referencename: string
	}
}

export const CompareHero = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<ICompareHero>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0,
	})

	const lstStats = await getContentList({
		referenceName: fields.stats.referencename,
		languageCode,
		take: 10,
	})

	const stats = (lstStats?.items || []) as ContentItem<ICompareHeroStat>[]

	return (
		<div className="bg-linear-to-b from-[#f8f4ff] to-white">
			<Container id={`${contentID}`} data-agility-component={contentID}>
				<div className="mx-auto max-w-4xl pb-16 text-center md:pb-24">
					{fields.label && (
						<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-highlight-light/20 bg-highlight-light/5 px-3 py-1 text-xs font-semibold text-highlight-light">
							{fields.label}
						</div>
					)}
					{fields.heading && (
						<h1 className="mx-auto max-w-4xl text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-black sm:text-5xl lg:text-6xl">
							{fields.heading}{" "}
							{fields.highlightedText && (
								<span className="text-highlight">{fields.highlightedText}</span>
							)}
						</h1>
					)}
					{fields.description && (
						<p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-500">
							{fields.description}
						</p>
					)}
					{(fields.primaryCTA || fields.secondaryCTA) && (
						<div className="mt-8 flex flex-wrap items-center justify-center gap-4">
							{fields.primaryCTA && fields.primaryCTA.href && (
								<LinkButton type="alternate" size="lg" href={fields.primaryCTA.href} target={fields.primaryCTA.target} className="rounded-full px-10 text-base font-bold shadow-md">
									{fields.primaryCTA.text} <IconArrowRight className="ml-2 h-4 w-4" />
								</LinkButton>
							)}
							{fields.secondaryCTA && fields.secondaryCTA.href && (
								<LinkButton type="secondary" size="lg" href={fields.secondaryCTA.href} target={fields.secondaryCTA.target} className="rounded-full px-8 text-base font-medium">
									{fields.secondaryCTA.text}
								</LinkButton>
							)}
						</div>
					)}
				</div>
			</Container>

			{stats.length > 0 && (
				<div className="border-y border-gray-200/40 bg-white py-8">
					<div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 px-4 text-center md:grid-cols-4">
						{stats.map((stat) => (
							<div key={stat.contentID}>
								<p className="text-3xl font-extrabold text-highlight lg:text-4xl">
									{stat.fields.value}
								</p>
								<p className="mt-1 text-xs text-gray-500">{stat.fields.label}</p>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
