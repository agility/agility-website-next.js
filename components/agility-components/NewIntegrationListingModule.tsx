import { renderHTML, Module, UnloadedModuleProps } from "@agility/nextjs"
import { gql } from "@apollo/client"
import { Container } from "components/micro/Container"
import { getAgilityGraphQLClient } from "lib/cms/getAgilityGraphQLClient"
import { getContentItem } from "lib/cms/getContentItem"

interface INewIntegrationListingModule {
	cTATitle: string
}

const NewIntegrationListingModule = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<INewIntegrationListingModule>({
		contentID: module.contentid,
		languageCode
	})

	console.log("NewIntegrationListingModule -> fields", fields)
	const { cTATitle } = fields

	console.log("NewIntegrationListingModule -> integrations", cTATitle)

	const { query } = await getAgilityGraphQLClient({ referenceNames: ["integrations"] })
	const { data } = await query({
		query: gql`
			{
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
		`
	})

	console.log("NewIntegrationListingModule -> data", data)

	return (
		<Container id={`${contentID}`} data-agility-component={contentID}>
			<div className="md:mt-18 mx-auto my-12 max-w-5xl lg:mt-20">INTEGRATIONS</div>
		</Container>
	)
}

export default NewIntegrationListingModule
