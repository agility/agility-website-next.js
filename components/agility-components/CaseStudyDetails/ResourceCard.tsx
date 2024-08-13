import React from "react"
import { IResource } from "lib/types/IResource"
import Link from "next/link"
import { getContentItem } from "lib/cms/getContentItem"
import { IResourceType } from "lib/types/IResourceType"
import { IEmptyContentItem } from "lib/types/IEmptyContentItem"
import { ContentItem } from "@agility/content-fetch"
import { AgilityPic } from "@agility/nextjs"
import { IconChevronRight } from "@tabler/icons-react"
interface Props {
	resource: IResource
	languageCode: string
	ctaLabel: string
}

export const ResourceCard = async ({ resource, languageCode, ctaLabel }: Props) => {
	let resourceType: ContentItem<IResourceType> | null = null

	if (resource.resourceType) {
		const resourceTypePre = resource.resourceType as IEmptyContentItem

		resourceType = await getContentItem<IResourceType>({
			contentID: resourceTypePre.contentid || 0,
			languageCode
		})
	}

	const resourceTypeTitle = (resourceType?.fields.title || "all").toLowerCase().replace(/ /g, "-")

	const url = `/resources/${resourceTypeTitle}/${resource.uRL}`
	return (
		<Link
			href={url}
			className="group flex max-w-80 flex-col border border-background text-left transition-shadow hover:shadow-lg"
		>
			<div className="h-44 overflow-clip">
				{resource.image ? (
					<AgilityPic
						image={resource.image}
						className="h-full w-full object-cover transition-all duration-300 group-hover:scale-110"
					/>
				) : null}
			</div>

			<div className="p-4">
				<h3 className="text-xl font-medium">{resource.title}</h3>
				<div className="mt-3 flex gap-1 font-medium text-highlight-light">
					{ctaLabel} <IconChevronRight />
				</div>
			</div>
		</Link>
	)
}
