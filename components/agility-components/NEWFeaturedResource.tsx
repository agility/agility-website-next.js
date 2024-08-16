import { AgilityPic, UnloadedModuleProps, URLField } from "@agility/nextjs"
import { gql } from "@apollo/client"
import { Container } from "components/micro/Container"

import { getAgilityGraphQLClient } from "lib/cms/getAgilityGraphQLClient"
import { getContentItem } from "lib/cms/getContentItem"
import { IResource } from "lib/types/IResource"
import { IResourceType } from "lib/types/IResourceType"
import { ContentItem } from "@agility/content-fetch"
import { LinkButton } from "components/micro/LinkButton"
import Link from "next/link"

interface INEWFeaturedResource {
	content: string
	featuredResource?: {
		contentid: number
	}
	cTAButton?: URLField
}

export const NEWFeaturedResource = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<INEWFeaturedResource>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	if (!fields.featuredResource) return null

	const res = await getContentItem<IResource>({
		contentID: fields.featuredResource.contentid,
		languageCode,
		contentLinkDepth: 1
	})

	console.log("res", res)

	const resType = res.fields.resourceType as ContentItem<IResourceType>

	const url = `/resources/${resType.fields.title?.toLowerCase().replace(/ /g, "-")}/${res.fields.uRL}`

	return (
		<div className="bg-gradient-to-b from-background/40 to-white">
			<Container className="mx-auto flex max-w-5xl flex-col gap-8 lg:flex-row">
				<Link className="flex-1" href={url}>
					{res.fields.image && (
						<AgilityPic image={res.fields.image} className="w-full shadow-lg" fallbackWidth={640} />
					)}
				</Link>
				<div className="flex-1">
					<div className="font-medium uppercase text-slate-500">{resType.fields.title}</div>
					<h2 className="my-4 text-4xl font-medium">{res.fields.title}</h2>
					<p>{res.fields.excerpt}</p>
					<div className="my-4">
						<LinkButton type="secondary" href={url}>
							Download
						</LinkButton>
					</div>
				</div>
			</Container>
		</div>
	)
}
