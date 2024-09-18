
import { ImageField } from "@agility/nextjs"
import { getAgilityGraphQLClient } from "lib/cms/getAgilityGraphQLClient"
import { gql } from "@apollo/client"
import { DateTime } from "luxon"


export interface IEventMin {
	contentID: number
	fields: {
		title: string
		uRL: string
		date: string
		mainImage: ImageField
		description: string
	}
}

interface LoadProp {

	locale: string
	skip: number
	take: number
	upcoming: boolean
}

/**
 * Get a list of events, resolve urls.  Based on a Date if upcoming
 * @param param0
 * @returns
 */
export const getEventListing = async ({ skip, take, upcoming }: LoadProp) => {


	try {

		//filter before or after today depending on upcoming
		let dateStr = DateTime.now().toISODate()

		let filter = upcoming ? `fields.date[gt]"${dateStr}"` : `fields.date[lt]"${dateStr}"`

		const gqlQuery = gql(`
		query eventquery  ($filter: String = "", $skip: Int = 0, $take: Int = 1) {

			events (filter: $filter, skip: $skip, take: $take) {
				contentID
				fields {
					title
					uRL
					date
					mainImage {
						label
						url
						fileSize
						height
						width
					}
					description
				}
			}
		}
	`)

		const { query } = await getAgilityGraphQLClient({ referenceNames: ["events"], filter })
		const { data } = await query({ query: gqlQuery, variables: { filter, skip, take } })

		if (!data["events"]) return []

		const events = data["events"] as IEventMin[]
		return events

	} catch (error) {
		throw new Error(`Error loading data for Events Listing: ${error}`)
	}
}
