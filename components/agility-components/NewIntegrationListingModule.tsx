import { renderHTML, Module, UnloadedModuleProps, AgilityPic } from "@agility/nextjs"
import { gql } from "lib/__generated__"
import { Container } from "components/micro/Container"
import { getAgilityGraphQLClient } from "lib/cms/getAgilityGraphQLClient"
import { getContentItem } from "lib/cms/getContentItem"
import { url } from "inspector"
import Link from "next/link"

interface INewIntegrationListingModule {
	cTATitle: string
}

const NewIntegrationListingModule = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<INewIntegrationListingModule>({
		contentID: module.contentid,
		languageCode
	})

	const { cTATitle } = fields

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

	return (
		<Container id={`${contentID}`} data-agility-component={contentID}>
			<div className="md:mt-18 mx-auto my-12 max-w-5xl lg:mt-20">
				INTEGRATIONS
				<div>
					{data.integrations?.map((integration) => {
						if (!integration || !integration.fields) return null

						const {
							uRL,
							title,
							logo,
							integrationType: integrationTypes,
							companyDescription
						} = integration.fields

						const integrationType =
							integrationTypes && integrationTypes?.length > 0 ? integrationTypes[0] : null

						let url = `/partners/integrations/${uRL}`

						return (
							<div
								key={integration.contentID}
								className="flex flex-col items-center rounded-lg bg-gray-100 p-4"
							>
								{logo && (
									<AgilityPic
										image={{
											url: logo.url,
											label: logo.label || title || "",
											height: logo.height,
											width: logo.width,
											filesize: 0,
											target: "_blank"
										}}
										fallbackWidth={200}
									/>
								)}
								<h3>{title}</h3>
								<p>{companyDescription}</p>
								{integrationType && <p>{integrationType.fields?.title}</p>}

								<Link href={url}>Learn More</Link>
							</div>
						)
					})}
				</div>
			</div>
		</Container>
	)
}

export default NewIntegrationListingModule
