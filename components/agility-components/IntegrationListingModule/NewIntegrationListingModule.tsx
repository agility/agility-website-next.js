import { renderHTML, Module, UnloadedModuleProps, AgilityPic } from "@agility/nextjs"
import { gql } from "lib/__generated__"
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

const NewIntegrationListingModule = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<INewIntegrationListingModule>({
		contentID: module.contentid,
		languageCode
	})

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

	data.integrations?.forEach((integration) => {
		if (!integration || !integration.fields) return null

		const { integrationType: integrationTypes } = integration.fields

		const integrationType = integrationTypes && integrationTypes?.length > 0 ? integrationTypes[0] : null

		if (integrationType) {
			allTypes.push({
				text: integrationType.fields?.title || "",
				value: integrationType.contentID
			})
		}
	})

	return (
		<Container id={`${contentID}`} data-agility-component={contentID}>
			<NewIntegrationListingModuleClient {...{ data, allTypes, cTATitle, filterLabel }} />
		</Container>
	)
}

export default NewIntegrationListingModule
