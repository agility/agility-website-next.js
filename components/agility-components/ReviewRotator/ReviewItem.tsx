"use client"

import { AgilityPic, renderHTML } from "@agility/nextjs"
import { IReview } from "./ReviewRotator"
import { ContentItem } from "@agility/content-fetch"
import { useState } from "react"
import clsx from "clsx"
import { DateTime } from "luxon"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"

export const ReviewItem = ({
	review,
	expandReviewText,
	collapseReviewText
}: {
	review: ContentItem<IReview>
	expandReviewText: string
	collapseReviewText: string
}) => {
	const [isExpanded, setIsExpanded] = useState(false)

	const d = new Date(review.fields.reviewDate)
	const dtStr = DateTime.fromJSDate(d).toFormat("LLL dd, yyyy")

	return (
		<div className="flex flex-col gap-2 rounded-md border border-background dark:border-gray-700 dark:bg-gray-800 p-5">
			<div>
				<h3 className="text-left font-medium text-slate-600 dark:text-gray-300">{review.fields.reviewer}</h3>
				<p className="text-left text-sm text-slate-500 dark:text-gray-400">{dtStr}</p>
			</div>
			<div className="h-5">
				{review.fields.starsGraphic && (
					<AgilityPic
						image={review.fields.starsGraphic}
						fallbackWidth={200}
						className="h-full object-contain"
					/>
				)}
			</div>
			<h4 className="text-left font-medium italic dark:text-white">{review.fields.title}</h4>
			<div
				className={clsx("prose dark:prose-invert", isExpanded ? "" : "line-clamp-4")}
				dangerouslySetInnerHTML={renderHTMLCustom(review.fields.review)}
			></div>
			<div>
				<button
					type="button"
					className="text-highlight-light dark:text-secondary"
					onClick={(e) => {
						e.stopPropagation()
						setIsExpanded(!isExpanded)
					}}
				>
					{isExpanded ? collapseReviewText : expandReviewText}
				</button>
			</div>
		</div>
	)
}
