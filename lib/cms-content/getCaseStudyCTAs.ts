import { ImageField } from "@agility/nextjs"
import { gql } from "@apollo/client"
import { getAgilityGraphQLClient } from "lib/cms/getAgilityGraphQLClient"

export interface ICaseStudyCTA {
	contentID: number
	fields: {
		title: string
		heading1: string
		heading2: string
		backgroundImage: ImageField | null
		cTALink: {
			href: string
			text: string
			target: string
		}
		caseStudyIndustries: {
			contentID: number
			fields: {
				title: string
			}
		}[] | null
	}
}

export const getCaseStudyCTAs = async () => {
	const gqlQuery = gql(`
		query casestudyctas {
			casestudyctas {
				contentID
				fields {
					title
					heading1
					heading2
					backgroundImage {
						url
						label
						fileSize
						height
						width
					}
					cTALink {
						href
						text
						target
					}
					caseStudyIndustries {
						contentID
						fields {
							title
						}
					}
				}
			}
		}
	`)

	const { query } = await getAgilityGraphQLClient({ referenceNames: ["casestudyctas"] })
	const { data } = await query({ query: gqlQuery })

	return (data["casestudyctas"] as ICaseStudyCTA[]) || []
}
