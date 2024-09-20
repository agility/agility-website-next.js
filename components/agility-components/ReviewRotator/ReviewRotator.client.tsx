import { ContentItem } from "@agility/content-fetch"
import { IReview } from "./ReviewRotator"
import { ReviewItem } from "./ReviewItem"

interface Props {
	expandReviewText: string
	collapseReviewText: string
	reviews: ContentItem<IReview>[]
}

export const ReviewRotatorClient = ({ collapseReviewText, expandReviewText, reviews }: Props) => {
	return (
		<div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
			{reviews.map((review, index) => (
				<ReviewItem key={index} {...{ review, collapseReviewText, expandReviewText }} />
			))}
		</div>
	)
}
