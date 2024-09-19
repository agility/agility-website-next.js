import { renderHTML, UnloadedModuleProps } from "@agility/nextjs"
import { gql } from "@apollo/client"
import { getResourceListing } from "lib/cms-content/getResourceListing"
import { getAgilityGraphQLClient } from "lib/cms/getAgilityGraphQLClient"
import { getContentItem } from "lib/cms/getContentItem"
import { ResourceListingClient } from "./ResourceListing.client"
import { Container } from "components/micro/Container"

interface INewAllResources {
	categorySelectText: string
	topicSelectText: string
	content?: string
	numberItemPerPage: number
}

interface IExtra {
	contentID: number
	fields: {
		title: string
	}
}

export const NEWAllResources = async ({ module, languageCode, globalData }: UnloadedModuleProps) => {
	const { fields } = await getContentItem<INewAllResources>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	//we passed the search params in via the global data
	const searchParams: URLSearchParams | undefined = globalData?.searchParams

	let categoryQStr = decodeURIComponent(searchParams?.get("category") || "")
	let topicQStr = decodeURIComponent(searchParams?.get("topic") || "")

	const pageSize = 15

	//determine the skip and take
	const skip = 0
	const take = pageSize

	const gqlQuery = gql(`
		query resourceExtra {
			resourcetopics (take: 100, sort: "fields.title", direction: "asc") {
				contentID
				fields {
					title
				}
			}

			resourcetypes (take: 100, sort: "fields.title", direction: "asc") {
				contentID
				fields {
					title
				}
			}
		}
	`)

	const { query } = await getAgilityGraphQLClient({ referenceNames: ["resourcetopics", "resourcetypes"] })
	const { data } = await query({ query: gqlQuery })

	const topics = (data.resourcetopics as IExtra[]) || undefined
	const types = (data.resourcetypes as IExtra[]) || undefined

	const currentTopic = topicQStr
		? topics?.find((i) => i?.fields?.title?.toLowerCase().replaceAll(" ", "-") === topicQStr)
		: null

	const currentCategory = categoryQStr
		? types?.find((c) => c?.fields?.title?.toLowerCase().replaceAll(" ", "-") === categoryQStr)
		: null

	//filter the resources
	const resources = await getResourceListing({ skip, take })

	const filteredResources = resources?.filter((res) => {
		const foundTopic =
			!currentTopic ||
			res.fields.resourceTopics?.find((r) => r?.contentID === currentTopic.contentID) !== undefined

		const foundCategory = !currentCategory || res.fields.resourceType.contentID === currentCategory.contentID

		return foundTopic && foundCategory
	})

	//get the next items
	const getNextItems = async ({ skip, take }: { skip: number; take: number }) => {
		"use server"
		const resources = await getResourceListing({ skip, take })

		const filteredResources = resources?.filter((cs) => {
			const foundTopic =
				!currentTopic ||
				cs?.fields?.resourceTopics?.find((c) => c?.contentID === currentTopic?.contentID) !== undefined
			const foundCategory =
				!currentCategory || (cs?.fields?.resourceType?.contentID === currentCategory?.contentID) !== undefined

			return foundTopic && foundCategory
		})

		return filteredResources
	}

	return (
		<>
			<Container className="mx-auto max-w-7xl">
				<div
					dangerouslySetInnerHTML={renderHTML(fields.content)}
					className="prose-xl mx-auto max-w-5xl text-center prose-h2:my-4 prose-h2:text-balance prose-p:text-balance prose-p:leading-snug"
				></div>

				<ResourceListingClient
					{...{
						pageSize,
						getNextItems,
						categoryQStr,
						topicQStr,
						resources: filteredResources || [],

						topics:
							topics?.map((topic) => ({
								text: `${topic.fields.title}`,
								value: topic.contentID
							})) || [],
						categories:
							types?.map((t) => ({
								text: `${t.fields.title}`,
								value: t.contentID
							})) || []
					}}
				/>
			</Container>
		</>
	)
}
