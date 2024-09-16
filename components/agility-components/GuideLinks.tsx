/* eslint-disable @next/next/no-img-element */
import { ImageField, UnloadedModuleProps, URLField } from "@agility/nextjs"
import { getContentItem } from "lib/cms/getContentItem"
import { ContentItem } from "@agility/content-fetch"
import { getContentList } from "lib/cms/getContentList"
import { LinkButton } from "components/micro/LinkButton"
import { IconChevronRight, IconSettings } from "@tabler/icons-react"
import Link from "next/link"
import { GuideWithLinks } from "components/common/GuideWithLinks"

interface Link {
	title?: string
	description?: string
	uRL: URLField
}

interface IGuideLinks {
	heading?: string
	guideIcon?: ImageField
	description?: string
	mainCTA?: URLField
	links: {
		referencename: string
	}
}

export const GuideLinks = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<IGuideLinks>({
		contentID: module.contentid,
		languageCode
	})

	const lst = await getContentList({
		languageCode,
		referenceName: fields.links.referencename
	})

	if (!lst || lst.items.length < 1) return null

	let imgURL =
		fields.guideIcon && fields.guideIcon.url.length > 0 ? fields.guideIcon.url : "/images/icon-userguide.svg"
	if (!imgURL.endsWith(".svg")) {
		imgURL += "?format=auto"
	}

	const items = lst.items as ContentItem<Link>[]

	return (
		<GuideWithLinks
			{...{
				mainInfo: fields,
				items: items.map((item) => ({
					title: item.fields.title,
					description: item.fields.description,
					uRL: item.fields.uRL
				}))
			}}
		/>
	)
}
