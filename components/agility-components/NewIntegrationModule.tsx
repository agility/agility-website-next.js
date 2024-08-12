import { AgilityPic, ImageField, URLField, UnloadedModuleProps, renderHTML } from "@agility/nextjs"
import { getAgilityGraphQLClient } from "lib/cms/getAgilityGraphQLClient"
import { getContentItem } from "lib/cms/getContentItem"

import { Container } from "components/micro/Container"
import { gql } from "@apollo/client"
import { LinkButton } from "components/micro/LinkButton"
import Link from "next/link"
import clsx from "clsx"

interface IIntegration {
	contentID: number
	fields: {
		title: string
		uRL: string
		partnerLogo: ImageField
	}
}

interface INewIntegrationModule {
	title?: string
	textSide: "left" | "right"
	description?: string
	cTA1Optional?: URLField
	integrationPartners: {
		referencename: string
		sortids: string
	}
}

export const NewIntegrationModule = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<INewIntegrationModule>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	const q = `
		query partners {
			${fields.integrationPartners.referencename} (filter: "contentID[in]\\"${fields.integrationPartners.sortids}\\"") {
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

	const { query } = await getAgilityGraphQLClient({ referenceNames: [fields.integrationPartners.referencename] })
	const { data } = await query({ query: gqlQuery })

	const partners = data[fields.integrationPartners.referencename] as IIntegration[]
	return (
		<div className="bg-background">
			<Container className="mx-auto max-w-6xl">
				<div
					className={clsx(
						"flex flex-col items-center gap-10",
						fields.textSide === "left" ? "lg:flex-row" : "lg:flex-row-reverse"
					)}
				>
					<div className="flex w-full flex-col gap-5 lg:w-1/3">
						<h2 className="text-balance text-4xl">{fields.title}</h2>
						<div className="prose" dangerouslySetInnerHTML={renderHTML(fields.description)}></div>
						{fields.cTA1Optional && (
							<div>
								<LinkButton href={fields.cTA1Optional.href} className="mt-4" type="secondary" size="md">
									{fields.cTA1Optional.text}
								</LinkButton>
							</div>
						)}
					</div>
					<div className="grid w-full grid-cols-2 gap-4 lg:w-2/3">
						{partners.map((partner) => (
							<Link
								href={`/partners/integrations/${partner.fields.uRL}`}
								key={partner.contentID}
								className="group flex items-center justify-center bg-white p-4"
								title={partner.fields.title}
							>
								<AgilityPic
									image={partner.fields.partnerLogo}
									className="w-44 transition-all duration-200 ease-in-out group-hover:scale-110"
								/>
							</Link>
						))}
					</div>
				</div>
			</Container>
		</div>
	)
}
