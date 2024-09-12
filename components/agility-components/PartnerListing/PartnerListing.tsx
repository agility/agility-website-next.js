import { URLField, UnloadedModuleProps } from "@agility/nextjs"
import { gql } from "@apollo/client"
import { getAgilityGraphQLClient } from "lib/cms/getAgilityGraphQLClient"
import { getContentItem } from "lib/cms/getContentItem"
import { PartnerListingClient } from "./PartnerListing.client"
import { ComboboItem } from "components/micro/FilterComboBox"
import { getPartnerListing } from "lib/cms-content/getPartnerListing"

interface IPartnerListing {
	title?: string
	subTitle?: string
	leftTypeTitle?: string
	leftButton?: URLField

	partners: { referencename: string; fulllist: boolean }
	showPagination: string
}

export const PartnerListing = async ({ module, languageCode, globalData }: UnloadedModuleProps) => {
	//we passed the search params in via the global data
	const searchParams: URLSearchParams | undefined = globalData?.searchParams

	let tagQStr = decodeURIComponent(searchParams?.get("region") || "")

	const { fields, contentID } = await getContentItem<IPartnerListing>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	const gqlQuery = gql(`
		query tags {
			implementationpartnertags {
				contentID
				fields {
					title
				}
			}
		}
	`)

	const { query } = await getAgilityGraphQLClient({ referenceNames: ["casestudyindustries", "casestudychallenges"] })
	const { data } = await query({ query: gqlQuery })

	const tagList: ComboboItem[] = data.implementationpartnertags.map((tag: any) => ({
		text: tag.fields.title,
		value: tag.fields.title.toLowerCase().replaceAll(" ", "-")
	}))

	const currentTagID: number | undefined = data.implementationpartnertags.find(
		(tag: any) => tag.fields.title.toLowerCase().replaceAll(" ", "-") === tagQStr
	)?.contentID

	const pageSize = 15
	const firstPage = await getPartnerListing({
		referenceName: fields.partners.referencename,
		skip: 0,
		take: pageSize,
		contentTagID: currentTagID
	})

	//get the next items
	const getNextItems = async ({ skip }: { skip: number }) => {
		"use server"
		const lst = await getPartnerListing({
			referenceName: fields.partners.referencename,
			skip: skip,
			take: pageSize
		})

		return lst
	}

	return (
		<PartnerListingClient
			{...{
				pageSize,
				partnerType: fields.partners.referencename.includes("implementation")
					? "implementation"
					: "integration",
				tagList,
				tagQStr,
				firstPage,
				getNextItems
			}}
		/>
	)
}
