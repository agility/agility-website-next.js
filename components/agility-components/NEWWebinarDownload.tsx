import { AgilityPic, ImageField, renderHTML, UnloadedModuleProps, URLField } from "@agility/nextjs"
import { gql } from "@apollo/client"
import { IconChevronRight } from "@tabler/icons-react"

import { Container } from "components/micro/Container"
import { LinkButton } from "components/micro/LinkButton"

import { getAgilityGraphQLClient } from "lib/cms/getAgilityGraphQLClient"
import { getContentItem } from "lib/cms/getContentItem"
import Link from "next/link"

interface IMiniResource {
	contentID: number
	fields: {
		title: string
		uRL: string
		image: ImageField
		resourceTypeName: string
		resourceType: {
			contentID: number
			fields: {
				title: string
			}
		}
		excerpt: string
		formTitle: string
	}
}

interface INEWWebinarDownload {
	content: string
	listWebinar?: {
		referencename: string
		sortids: string
	}
	cTAButton?: URLField
}

export const NEWWebinarDownload = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<INEWWebinarDownload>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	if (!fields.listWebinar) return null

	const refName = fields.listWebinar.referencename
	const sortIDs = fields.listWebinar.sortids

	const filter = `contentID[in]\"${sortIDs}\"`

	const gqlQuery = gql(`
		query downloadablebooks($filter: String = "") {
			resources(filter: $filter) {
				contentID
				fields {
					title
					uRL
					image {
						label
						url
						fileSize
						height
						width
					}
					resourceTypeName
					resourceType {
						contentID
						fields {
							title
						}
					}
					excerpt
					formTitle
				}
			}
			}

	`)

	const { query } = await getAgilityGraphQLClient({ referenceNames: [refName], filter })
	const { data } = await query({ query: gqlQuery, variables: { filter } })

	const resources = data["resources"] as IMiniResource[]

	return (
		<div className="bg-gradient-to-b from-background/40 to-white">
			<Container className="mx-auto flex max-w-7xl flex-col">
				<div className="flex w-full justify-center">
					<div
						className="prose prose-xl w-full max-w-screen-xl prose-h2:mb-4 prose-h2:text-balance prose-h2:text-center prose-h2:font-medium prose-h2:leading-tight prose-p:text-center prose-p:leading-tight"
						dangerouslySetInnerHTML={renderHTML(fields.content)}
					/>
				</div>

				<div className="mt-8 flex w-full flex-col items-center justify-center gap-6 lg:flex-row lg:items-start">
					{resources.map((resource, index) => {
						const url = `/resources/${resource.fields.resourceTypeName?.toLowerCase().replace(/ /g, "-")}/${resource.fields.uRL}`

						return (
							<div key={`top-book-${resource.contentID}`} className="flex w-80 flex-col">
								<Link href={url} className="group">
									<AgilityPic
										image={resource.fields.image}
										fallbackWidth={400}
										className="w-full rounded-md shadow-md transition-all group-hover:shadow-xl"
									/>
								</Link>
								<h3 className="mt-4 min-h-16 text-balance text-center text-xl font-medium">
									{resource.fields.title}
								</h3>
								<p className="line-clamp-2 text-left">{resource.fields.excerpt}</p>
								<div className="mt-4">
									<Link
										href={url}
										className="flex items-center gap-1 font-medium text-highlight-light hover:text-highlight-dark"
									>
										Watch
										<IconChevronRight size={20} stroke={2} />
									</Link>
								</div>
							</div>
						)
					})}
				</div>
				<div className="mt-8 flex justify-center">
					<LinkButton type="secondary" size="md" href={fields.cTAButton?.href}>
						{fields.cTAButton?.text}
					</LinkButton>
				</div>
			</Container>
		</div>
	)
}
