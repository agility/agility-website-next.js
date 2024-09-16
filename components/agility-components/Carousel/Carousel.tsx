import { ImageField, UnloadedModuleProps } from "@agility/nextjs"
import { ContentItem } from "@agility/content-fetch"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import { getContentList } from "lib/cms/getContentList"
import { CarouselClient } from "./Carousel.client"

export interface ICarouselItem {
	title: string
	image: ImageField
	uRL?: string
}

interface ICarousel {
	images: {
		referencename: string
	}
}

export const Carousel = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<ICarousel>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	const lst = await getContentList({
		referenceName: fields.images.referencename,
		languageCode,
		take: 50
	})

	if (!lst || !lst.items || lst.items.length === 0) return null

	const items: ContentItem<ICarouselItem>[] = lst.items

	return (
		<Container id={`${contentID}`} data-agility-component={contentID}>
			<CarouselClient {...{ items: items }} />
		</Container>
	)
}
