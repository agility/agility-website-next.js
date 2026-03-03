/* eslint-disable @next/next/no-img-element */
import { ImageField, UnloadedModuleProps, URLField } from "@agility/nextjs"
import { ContentItem } from "@agility/content-fetch"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import { getContentList } from "lib/cms/getContentList"
import Link from "next/link"

interface ICustomerResult {
	logo: ImageField
	statValue: string
	statLabel: string
	link?: URLField
}

interface ICustomerResults {
	heading: string
	results: {
		referencename: string
	}
}

export const CustomerResults = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<ICustomerResults>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0,
	})

	const lstResults = await getContentList({
		referenceName: fields.results.referencename,
		languageCode,
		take: 50,
	})

	if (!lstResults || !lstResults.items || lstResults.items.length === 0) return null

	const results = lstResults.items as ContentItem<ICustomerResult>[]

	return (
		<Container id={`${contentID}`} data-agility-component={contentID}>
			<div className="mx-auto max-w-7xl">
				{fields.heading && (
					<h2 className="text-balance text-center text-sm font-semibold uppercase tracking-widest text-gray-500">
						{fields.heading}
					</h2>
				)}
				<div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
					{results.map((item) => {
						const { logo, statValue, statLabel, link } = item.fields
						let logoSrc: string | null = null
						if (logo?.url) {
							logoSrc = logo.url.endsWith(".svg") ? logo.url : `${logo.url}?format=auto&w=200`
						}

						const cardContent = (
							<div className="flex h-full flex-col items-center gap-4 rounded-2xl bg-white p-8 shadow-md transition-all hover:shadow-lg">
								{logoSrc ? (
									<img
										src={logoSrc}
										alt={logo.label || ""}
										className="h-10 w-auto"
										loading="lazy"
									/>
								) : (
									<div className="h-10" />
								)}
								<div className="text-4xl font-bold text-highlight-light lg:text-5xl">
									{statValue}
								</div>
								<p className="text-center text-sm text-gray-600">{statLabel}</p>
							</div>
						)

						if (link && link.href) {
							return (
								<Link key={item.contentID} href={link.href} target={link.target}>
									{cardContent}
								</Link>
							)
						}

						return <div key={item.contentID}>{cardContent}</div>
					})}
				</div>
			</div>
		</Container>
	)
}
