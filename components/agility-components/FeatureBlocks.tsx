/* eslint-disable @next/next/no-img-element */
import { UnloadedModuleProps } from "@agility/nextjs"
import { getAgilityGraphQLClient } from "lib/cms/getAgilityGraphQLClient"
import { getContentItem } from "lib/cms/getContentItem"
import { gql } from "@apollo/client"
import { Container } from "components/micro/Container"
import Link from "next/link"
import { sortByIDs } from "lib/utils/sortByIDs"

interface IFeatureMini {
	contentID: number
	fields: {
		title: string
		subtitle: string
		textBlob: string
		icon: {
			height: number
			width: number
			label: string
			url: string
		}
		bottomLink?: {
			href: string
			target: string
			text: string
		}
	}
}

interface IFeatureBlocks {
	title?: string

	featureBlocks: {
		referencename: string
		sortids: string
	}

	background: {
		contentid: number
	}
}

export const FeatureBlocks = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields } = await getContentItem<IFeatureBlocks>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	const refName = fields.featureBlocks.referencename
	const sortIDs = fields.featureBlocks.sortids

	const filter = `contentID[in]\"${sortIDs}\"`

	const gqlQuery = gql(`
		query features($filter: String = "") {
			${refName} (filter: $filter) {
				contentID
				fields {
					title
					subtitle
					textBlob
					icon {
						height
						width
						label
						url
					}
					bottomLink {
						href
						target
						text
					}
				}
			}
			}


	`)

	const { query } = await getAgilityGraphQLClient({ referenceNames: [refName], filter })
	const { data } = await query({ query: gqlQuery, variables: { filter } })

	if (!data[refName]) return null

	const featuresPre = data[refName] as IFeatureMini[]
	const features = sortByIDs(featuresPre, sortIDs)

	return (
		<Container >
			<div className="mx-auto max-w-7xl">
				<div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
					{features.map((feature) => {
						if (feature.fields.bottomLink) {
							return (
								<Link
									href={feature.fields.bottomLink?.href || "#"}
									key={feature.contentID}
									className="flex flex-col items-center gap-4 border border-background dark:border-gray-700 dark:bg-gray-800 p-6 pt-7 shadow-md transition-all hover:shadow-lg"
								>
									{/* these are always SVGs, so no need to formatting */}
									<img className="w-28" src={feature.fields.icon.url} alt={feature.fields.icon.label} />
									<h2 className="text-lg font-medium dark:text-white">{feature.fields.title}</h2>
									<h3 className="dark:text-gray-300">{feature.fields.subtitle}</h3>
									<p className="flex-1 dark:text-gray-300">{feature.fields.textBlob}</p>
								</Link>
							)
						} else {
							return (
								<div
									key={feature.contentID}
									className="flex flex-col items-center gap-4 border border-background dark:border-gray-700 dark:bg-gray-800 p-6 pt-7 shadow-md transition-all hover:shadow-lg"
								>
									{/* these are always SVGs, so no need to formatting */}
									<img className="w-28" src={feature.fields.icon.url} alt={feature.fields.icon.label} />
									<h2 className="text-lg font-medium dark:text-white">{feature.fields.title}</h2>
									<h3 className="dark:text-gray-300">{feature.fields.subtitle}</h3>
									<p className="flex-1 dark:text-gray-300">{feature.fields.textBlob}</p>
								</div>
							)
						}
					})}
				</div>
			</div>
		</Container>
	)
}
