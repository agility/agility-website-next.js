import { renderHTML, Module, UnloadedModuleProps, AgilityPic } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { ThreeDashLine } from "components/micro/ThreeDashLine"
import { getContentItem } from "lib/cms/getContentItem"
import { IResource } from "lib/types/IResource"
import { ContentItem } from "@agility/content-fetch"
import { getContentList } from "lib/cms/getContentList"
import Link from "next/link"
import { LinkButton } from "components/micro/LinkButton"
import { IResourceType } from "lib/types/IResourceType"
import { IconChevronRight } from "@tabler/icons-react"

interface IFeaturedResources {
	title?: string
	resources: {
		referencename: string
		sortids: string
	}
}

const FeaturedResources = async ({ module, languageCode }: UnloadedModuleProps) => {
	const {
		fields: { resources, title },
		contentID
	} = await getContentItem<IFeaturedResources>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	const f = {
		operator: "in",
		property: "contentID",
		value: `"${resources.sortids}"`
	}

	//@ts-ignore
	const res = await getContentList({ referenceName: resources.referencename, languageCode, filters: [f] })

	const lstResources: ContentItem<IResource>[] = res.items

	if (!lstResources || lstResources.length === 0) return null

	return (
		<Container id={`${contentID}`} data-agility-component={contentID}>
			<div className="mx-auto max-w-5xl text-center">
				{title && <h2 className="text-balance text-5xl">{title}</h2>}
				<ThreeDashLine />

				<div className="mt-8 flex flex-col justify-center gap-8 md:flex-row">
					{lstResources
						.filter((r) => r.fields.image)
						.map((resource, index) => {
							const res = resource.fields.resourceType as ContentItem<IResourceType>

							const resType = res.fields.title?.toLowerCase().replace(/ /g, "-") || ""
							const resourceUrl = `/resources/${resType}/${resource.fields.uRL}`

							return (
								<Link
									href={resourceUrl}
									key={resource.contentID}
									className="group flex max-w-80 flex-col shadow-md"
								>
									<div className="overflow-clip">
										{resource.fields.image && (
											<AgilityPic
												image={resource.fields.image}
												className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
												fallbackWidth={800}
											/>
										)}
									</div>
									<div className="flex flex-1 flex-col gap-2 p-4 pb-2">
										{resource.fields.title && (
											<h3 className="text-balance text-lg font-bold leading-snug">
												{resource.fields.title}
											</h3>
										)}
										{resource.fields.excerpt && <p>{resource.fields.excerpt}</p>}
									</div>
									<div className="p-4">
										<LinkButton href={resourceUrl} type="secondary" size="md">
											Read More <IconChevronRight />
										</LinkButton>
									</div>
								</Link>
							)
						})}
				</div>
			</div>
		</Container>
	)
}

export default FeaturedResources
