import { UnloadedModuleProps, URLField } from "@agility/nextjs"
import { gql } from "@apollo/client"
import { Container } from "components/micro/Container"

import { getAgilityGraphQLClient } from "lib/cms/getAgilityGraphQLClient"
import { getContentItem } from "lib/cms/getContentItem"

interface INEWDownloadableeBooks {
	content: string
	listeBooks?: {
		referencename: string
		sortids: string
	}
	cTAButton?: URLField
}

export const NEWDownloadableeBooks = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<INEWDownloadableeBooks>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	if (!fields.listeBooks) return null

	const refName = fields.listeBooks.referencename
	const sortIDs = fields.listeBooks.sortids

	//TODO: finish this query
	const q = `
		query resources {
			${refName} (filter: "contentID[in]\\"${sortIDs}\\"") {
				contentID
				fields {
					title
					uRL
					partnerLogo {
						url
						height
						width
						label
					}
				}
			}
		}
	`

	const gqlQuery = gql(q)

	const { query } = await getAgilityGraphQLClient({ referenceNames: [refName] })
	const { data } = await query({ query: gqlQuery })

	console.log(data)

	return (
		<div className="bg-gradient-to-b from-background/40 to-white">
			<Container className="mx-auto flex max-w-5xl flex-col lg:flex-row"></Container>
		</div>
	)
}
