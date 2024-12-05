import { renderHTML, Module, UnloadedModuleProps, AgilityPic } from "@agility/nextjs"
import { gql } from "gql/__generated__"
import { Container } from "components/micro/Container"
import { getAgilityGraphQLClient } from "lib/cms/getAgilityGraphQLClient"
import { getContentItem } from "lib/cms/getContentItem"
import { url } from "inspector"
import Link from "next/link"
import { ComboboItem, FilterComboBox } from "components/micro/FilterComboBox"
import { NewIntegrationListingModuleClient } from "./NewIntegrationListingModule.client"

interface INewIntegrationListingModule {
	cTATitle: string
	filterLabel?: string
}

const NewIntegrationListingModule = async ({ module, languageCode, globalData }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<INewIntegrationListingModule>({
		contentID: module.contentid,
		languageCode
	})

	//we passed the search params in via the global data
	const searchParams: URLSearchParams | undefined = globalData?.searchParams

	let integrationQStr = decodeURIComponent(searchParams?.get("integration") || "")

	const { cTATitle, filterLabel = "All integrations" } = fields

	const gqlQuery = gql(`
			query integrations {
				integrations {
					contentID
					fields {
						title
						companyDescription
						integrationType {
							contentID
							fields {
								title
							}
						}

						uRL
						logo {
							label
							url
							height
							width
						}
					}
				}
			}
		`)

	const { query } = await getAgilityGraphQLClient({ referenceNames: ["integrations"] })
	const { data } = await query({ query: gqlQuery })

	const allTypes: ComboboItem[] = []

	let currentIntegration: ComboboItem | null = null

	data.integrations?.forEach((integration) => {
		if (!integration || !integration.fields) return null

		const { integrationType: integrationTypes } = integration.fields

		const integrationType = integrationTypes && integrationTypes?.length > 0 ? integrationTypes[0] : null

		if (integrationType) {
			const comboItem = {
				text: integrationType.fields?.title || "",
				value: integrationType.contentID
			}

			if (integrationQStr && integrationQStr === comboItem.text.replaceAll(" ", "-").toLowerCase()) {
				currentIntegration = comboItem
			}
			if (!allTypes.find((item) => item.text === comboItem.text)) {
				allTypes.push(comboItem)
			}
		}
	})

	return (
		<Container id={`${contentID}`} data-agility-component={contentID}>
			<NewIntegrationListingModuleClient {...{ data, allTypes, cTATitle, filterLabel, currentIntegration }} />
		</Container>
	)
}

export default NewIntegrationListingModule
