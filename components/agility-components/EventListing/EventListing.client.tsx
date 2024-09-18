"use client"

import React, { useState } from "react"
import Link from "next/link"
import { IPostMin } from "lib/cms-content/getPostListing"
import { AgilityPic } from "@agility/nextjs"
import { GetNextProps } from "./EventListing.server"
import { InfiniteLoadMore } from "components/common/InfiniteLoadMore"
import { ComboboItem, FilterComboBox } from "components/micro/FilterComboBox"
import { useRouter } from "next/navigation"
import { IconChevronRight } from "@tabler/icons-react"
import { IEventMin } from "lib/cms-content/getEventListing"
import { EventCard } from "./EventCard"

interface Props {
	pageSize: number
	events: IEventMin[]

	getNext: ({ skip, take }: GetNextProps) => Promise<IEventMin[]>
}

export const EventListingClient = ({ getNext, events, pageSize }: Props) => {
	const router = useRouter()

	const [hasMore, setHasMore] = useState(events.length >= pageSize)
	const [items, setItems] = useState(events)

	const [isLoading, setIsLoading] = useState(false)

	const fetchMore = async () => {
		try {
			if (isLoading) return
			setIsLoading(true)

			//call the server action declared in the server component to get the next page of posts...
			const morePosts = await getNext({ skip: items.length, take: pageSize })

			setItems((prev) => {
				return [...prev, ...morePosts]
			})
			setHasMore(morePosts.length > 0)
		} catch (error) {
			console.error("error fetching more past events", error)
			setHasMore(false)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div>
			<div>
				{items.map((event) => (
					<EventCard key={event.contentID} event={event} />
				))}
			</div>
			<div className="flex w-full justify-center">
				<InfiniteLoadMore
					{...{
						hasMore,
						isLoading,
						onLoadMore: fetchMore
					}}
				/>
			</div>
		</div>
	)
}
