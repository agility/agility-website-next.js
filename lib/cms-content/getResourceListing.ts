import { ImageField } from "@agility/nextjs"
import { gql } from "@apollo/client"
import { getAgilityGraphQLClient } from "lib/cms/getAgilityGraphQLClient"


interface Props {
	skip: number
	take: number
}

export interface IResourceListingItem {
	contentID: number
	properties: {
		itemOrder: number
	}
	fields: {
		excerpt: string
		title: string
		uRL: string
		image: ImageField
		resourceTypeName: string
		resourceTypeID: string | null
		resourceType: {
			contentID: number
			fields: {
				title: string
			}
		}
		resourceTopics: {
			contentID: number
			fields: {
				title: string
			}
		}[]
	}
}

export const getResourceListing = async ({ skip, take }: Props) => {


	const gqlQuery = gql(`
		query resources ($skip:Int = 0, $take: Int = 1)  {
			resources (skip: $skip, take: $take, sort: "fields.date", direction: "desc") {
				properties {
					itemOrder
				}
				contentID
				fields {
					excerpt
					title
					uRL
					image {
						url
						label
						fileSize
						height
						width
					}
					resourceTypeName
					resourceTypeID
					resourceType {
						contentID
						fields {
							title
						}
					}
					resourceTopics {
						contentID
						fields {
							title
						}
					}
				}
			}
		}
	`)

	const { query } = await getAgilityGraphQLClient({ referenceNames: ["resources"], filter: `skip:${skip}-take:${take}` })
	const { data } = await query({ query: gqlQuery, variables: { skip, take } })

	return data["resources"] as IResourceListingItem[]


}