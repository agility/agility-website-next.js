import { ImageField } from "@agility/nextjs"
import { gql } from "@apollo/client"
import { getAgilityGraphQLClient } from "lib/cms/getAgilityGraphQLClient"


interface Props {
	skip: number
	take: number
}

export interface ICaseStudyListingItem {
	contentID: number
	properties: {
		itemOrder: number
	}
	fields: {
		excerpt: string
		title: string
		uRL: string
		image: ImageField
		customerLogo: ImageField
		customerWhiteLogo: ImageField
		caseStudyChallenges: {
			contentID: number
			fields: {
				title: string
			}
		}[]
		caseStudyIndustries: {
			contentID: number
			fields: {
				title: string
			}
		}[]
		isPurpleBackground: boolean
	}
}

export const getCaseStudyListing = async ({ skip, take }: Props) => {


	const gqlQuery = gql(`
		query casestudies ($skip:Int = 0, $take: Int = 1)  {
			casestudies (skip: $skip, take: $take) {
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
					customerLogo {
						url
						label
						fileSize
						height
						width
					}

					customerWhiteLogo {
						fileSize
						height
						label
						pixelHeight
						pixelWidth
						url
						width
					}
					caseStudyChallenges {
						contentID
						fields {
							title
						}
					}
					caseStudyIndustries {
						contentID
						fields {
							title
						}
					}
					isPurpleBackground
				}
			}
		}
	`)

	const { query } = await getAgilityGraphQLClient({ referenceNames: ["casestudies"] })
	const { data } = await query({ query: gqlQuery, variables: { skip, take } })

	return data["casestudies"] as ICaseStudyListingItem[]


}