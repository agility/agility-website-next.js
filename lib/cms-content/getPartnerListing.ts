import { ImageField } from "@agility/nextjs"
import { gql } from "@apollo/client"
import { getAgilityGraphQLClient } from "lib/cms/getAgilityGraphQLClient"


interface Props {
	referenceName: string
	skip: number
	take: number
	contentTagID?: number

}

export interface IPartnerListingItem {
	contentID: number
	fields: {
		title: string
		customTags: {
			contentID: number
			fields: {
				title: string
			}
		}
		excerpt: string
		partnerLogo: ImageField
		uRL: string

	}
}

export const getPartnerListing = async ({ referenceName, skip, take, contentTagID }: Props) => {


	const filter = contentTagID ? `fields.customTagsIDs[like]\",${contentTagID}\" or fields.customTagsIDs[like]\",${contentTagID},\" or fields.customTagsIDs[like]\"${contentTagID},\"` : "contentID[ne]0"

	const gqlQuery = gql(`
		query partners ($skip:Int = 0, $take: Int = 1, $filter: String = "") {
			${referenceName} (skip: $skip, take: $take, filter: $filter) {
				contentID
				fields {
					title
					customTags {
						contentID
						fields {
							title
						}
					}
					excerpt
					partnerLogo {
						url
						height
						width
						label
						fileSize
					}
					title
					uRL
				}
			}
		}
	`)

	const { query } = await getAgilityGraphQLClient({ referenceNames: ["casestudies"] })
	const { data } = await query({ query: gqlQuery, variables: { skip, take, filter } })


	return data[referenceName] as IPartnerListingItem[]


}