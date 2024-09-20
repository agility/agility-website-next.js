import { ImageField, UnloadedModuleProps } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import { getContentList } from "lib/cms/getContentList"
import { ReviewRotatorClient } from "./ReviewRotator.client"

interface IReviewRotator {
	title?: string
	expandReviewText: string
	collapseReviewText: string
	reviews: { referencename: string }
}

export interface IReview {
	title: string
	review: string
	reviewer: string
	reviewDate: string
	starsGraphic?: ImageField
}

export const ReviewRotator = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields } = await getContentItem<IReviewRotator>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	const lstReviews = await getContentList({
		referenceName: fields.reviews.referencename,
		languageCode
	})

	return (
		<Container className="mx-auto max-w-7xl">
			{fields.title && <h2 className="text-center text-4xl font-medium">{fields.title}</h2>}
			<ReviewRotatorClient
				{...{
					reviews: lstReviews.items,
					collapseReviewText: fields.collapseReviewText,
					expandReviewText: fields.expandReviewText
				}}
			/>
		</Container>
	)
}
