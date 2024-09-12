import { URLField, UnloadedModuleProps } from "@agility/nextjs"
import { getAgilityGraphQLClient } from "lib/cms/getAgilityGraphQLClient"
import { getContentItem } from "lib/cms/getContentItem"

import { gql } from "gql/__generated__"
import { CaseStudyListingClient } from "./CaseStudyListing.client"
import { getCaseStudyListing } from "lib/cms-content/getCaseStudyListing"

interface ICaseStudyListing {
	caseCount: string
	darkMode: string
	cTAButton: URLField
	testimonials: {
		referencename: string
		sortids: string
	}
}

export const CaseStudyListing = async ({ module, languageCode, globalData }: UnloadedModuleProps) => {
	//we passed the search params in via the global data
	const searchParams: URLSearchParams | undefined = globalData?.searchParams
	let page = parseInt(searchParams?.get("page") || "1")
	if (isNaN(page)) page = 1

	let industryQStr = decodeURIComponent(searchParams?.get("industry") || "")
	let challengeQStr = decodeURIComponent(searchParams?.get("challenge") || "")

	const { fields, contentID } = await getContentItem<ICaseStudyListing>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	const caseCount = parseInt(fields.caseCount)

	//get all the case studis from the server so we can filter client side...
	const skip = 0
	const take = 250

	const start = (page - 1) * caseCount
	const end = start + caseCount

	const gqlQuery = gql(`
		query supporting {

			casestudyindustries {
				contentID
				fields {
					title
				}
			}

			casestudychallenges {
				contentID
				fields {
					title
				}
			}
		}
	`)

	const { query } = await getAgilityGraphQLClient({ referenceNames: ["casestudyindustries", "casestudychallenges"] })
	const { data } = await query({ query: gqlQuery })

	const currentIndustry = industryQStr
		? data.casestudyindustries?.find((i) => i?.fields?.title?.toLowerCase().replaceAll(" ", "-") === industryQStr)
		: null
	const currentChallenge = challengeQStr
		? data.casestudychallenges?.find((c) => c?.fields?.title?.toLowerCase().replaceAll(" ", "-") === challengeQStr)
		: null

	//filter the case studies
	const caseStudies = await getCaseStudyListing({ skip, take })

	const filteredCaseStudies = caseStudies
		?.filter((cs) => {
			const foundChallenge =
				!currentChallenge ||
				cs?.fields?.caseStudyChallenges?.find((c) => c?.contentID === currentChallenge?.contentID) !== undefined
			const foundIndustry =
				!currentIndustry ||
				cs?.fields?.caseStudyIndustries?.find((c) => c?.contentID === currentIndustry?.contentID) !== undefined

			return foundChallenge && foundIndustry
		})
		.slice(start, end)

	//get the next items
	const getNextItems = async ({ skip, take }: { skip: number; take: number }) => {
		"use server"
		const caseStudies = await getCaseStudyListing({ skip: 0, take: 250 })

		const filteredCaseStudies = caseStudies?.filter((cs) => {
			const foundChallenge =
				!currentChallenge ||
				cs?.fields?.caseStudyChallenges?.find((c) => c?.contentID === currentChallenge?.contentID)
			const foundIndustry =
				!currentIndustry ||
				cs?.fields?.caseStudyChallenges?.find((c) => c?.contentID === currentChallenge?.contentID)

			return foundChallenge && foundIndustry
		})

		return filteredCaseStudies.slice(skip, skip + take)
	}

	return (
		<CaseStudyListingClient
			{...{
				caseCount,
				getNextItems,
				industryQStr,
				challengeQStr,
				caseStudies: filteredCaseStudies || [],
				industries:
					data.casestudyindustries?.map((industry: any) => ({
						text: `${industry.fields.title}`,
						value: industry.contentID
					})) || [],
				challenges:
					data.casestudychallenges?.map((c: any) => ({
						text: `${c.fields.title}`,
						value: c.contentID
					})) || []
			}}
		/>
	)
}
