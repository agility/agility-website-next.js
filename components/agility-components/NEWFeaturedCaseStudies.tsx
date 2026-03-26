import { AgilityPic, ImageField, UnloadedModuleProps, URLField } from "@agility/nextjs"
import { getAgilityGraphQLClient } from "lib/cms/getAgilityGraphQLClient"
import { getContentItem } from "lib/cms/getContentItem"
import { gql } from "@apollo/client"
import { Container } from "components/micro/Container"
import Link from "next/link"
import { IconChevronRight } from "@tabler/icons-react"
import { LinkButton } from "components/micro/LinkButton"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"

interface IFeaturedCaseStudiesPanel {
	content?: string
	listCaseStudies: {
		referencename: string
		sortids: string
	}
	cTAButton?: URLField
}

interface ICaseStudyMini {
	contentID: number
	fields: {
		title: string
		excerpt: string
		uRL: string
		image?: ImageField
	}
}

export const NEWFeaturedCaseStudies = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields } = await getContentItem<IFeaturedCaseStudiesPanel>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	const refName = fields.listCaseStudies.referencename
	const sortIDs = fields.listCaseStudies.sortids

	const filter = `contentID[in]\"${sortIDs}\"`

	const gqlQuery = gql(`
		query featuredcasestudies($filter: String = "") {
			${refName} (filter: $filter) {
				contentID
				fields {
					title
					excerpt
					uRL
					image {
						height
						width
						url
						label
					}
				}
			}
		}
	`)

	const { query } = await getAgilityGraphQLClient({ referenceNames: [refName], filter })
	const { data } = await query({ query: gqlQuery, variables: { filter } })

	if (!data[refName]) return null

	const caseStudies = data[refName] as ICaseStudyMini[]

	return (
		<Container
			id={`agility-component-${module.contentid}`}
			data-agility-component={module.contentid}

		>
			<div className="mx-auto max-w-7xl">
				<div
					dangerouslySetInnerHTML={renderHTMLCustom(fields.content)}
					className="prose-xl mx-auto max-w-5xl text-center prose-h2:my-4 prose-h2:text-balance prose-p:text-balance prose-p:leading-snug"
				></div>

				<div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
					{caseStudies.map((caseStudy, index) => {
						return (
							<Link
								href={`/resources/case-studies/${caseStudy.fields.uRL}`}
								key={`fcs-${caseStudy.contentID}`}
								className="group flex flex-col gap-3 border border-background transition-all hover:shadow-lg"
							>
								<div className="h-52 w-full overflow-hidden">
									{caseStudy.fields.image && (
										<AgilityPic
											image={caseStudy.fields.image}
											className="w-full object-cover transition-transform duration-200 group-hover:scale-110"
										/>
									)}
								</div>
								<h3 className="px-3 text-xl font-medium">{caseStudy.fields.title}</h3>
								<p className="flex-1 px-3">{caseStudy.fields.excerpt}</p>
								<div>
									<div className="flex items-center gap-1 p-3 font-medium text-highlight-light">
										Read More <IconChevronRight />
									</div>
								</div>
							</Link>
						)
					})}
				</div>
				{fields.cTAButton && (
					<div className="mt-10 text-center">
						<LinkButton href={fields.cTAButton?.href} type="secondary" size="md">
							{fields.cTAButton?.text}
						</LinkButton>
					</div>
				)}
			</div>
		</Container>
	)
}
