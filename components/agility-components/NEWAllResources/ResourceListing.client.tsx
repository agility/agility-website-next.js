"use client"

import { AgilityPic } from "@agility/nextjs"
import clsx from "clsx"
import LoadingWidget from "components/common/LoadingWidget"
import { Container } from "components/micro/Container"
import { ComboboItem, FilterComboBox } from "components/micro/FilterComboBox"
import { ICaseStudyListingItem } from "lib/cms-content/getCaseStudyListing"
import Link from "next/link"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useEffect, useLayoutEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { ResourceListingItem } from "./ResourceListingItem"
import { IResourceListingItem } from "lib/cms-content/getResourceListing"

interface Props {
	pageSize: number
	topicQStr: string | null
	categoryQStr: string | null
	topics: ComboboItem[]
	categories: ComboboItem[]
	resources: IResourceListingItem[]
	getNextItems: ({ skip, take }: { skip: number; take: number }) => Promise<IResourceListingItem[]>
}

export const ResourceListingClient = ({
	pageSize,
	topics,
	categories,
	topicQStr,
	categoryQStr,
	resources,
	getNextItems
}: Props) => {
	const router = useRouter()
	const pathName = usePathname()

	const currentIndustry = topics.find((i) => i.text.toLowerCase().replaceAll(" ", "-") === topicQStr)
	const currentChallenge = categories.find((c) => c.text.toLowerCase().replaceAll(" ", "-") === categoryQStr)

	const changeOptions = (category: string, topic: string) => {
		//set the industry and challenge params
		const params = new URLSearchParams()
		if (category) params.append("category", encodeURIComponent(category.toLowerCase().replaceAll(" ", "-")))
		if (topic) params.append("topic", encodeURIComponent(topic.toLowerCase().replaceAll(" ", "-")))

		let newUrl = `${pathName}${params.size > 0 ? "?" + params.toString() : ""}`

		router.push(newUrl, { scroll: false })
	}

	const [hasMore, setHasMore] = useState(resources.length >= pageSize)
	const [items, setItems] = useState(resources)

	const fetchMore = async () => {
		try {
			//call the server action declared in the server component to get the next page of items...
			const moreItems = await getNextItems({ skip: items.length, take: pageSize })

			setItems((prev) => {
				return [...prev, ...moreItems]
			})

			setHasMore(moreItems.length > 0)
		} catch (error) {
			console.error("error fetching more resources", error)
			setHasMore(false)
		}
	}

	const [size, setSize] = useState<"xs" | "sm" | "md" | "lg" | "2xl">("md")

	useEffect(() => {
		//if the industry or challenge changes, reset the items
		setItems(resources)
		setHasMore(true)
	}, [resources, currentChallenge, currentIndustry])

	useLayoutEffect(() => {
		const onResize = () => {
			const w = document.body.clientWidth
			if (w < 640) {
				setSize("xs")
			} else if (w < 768) {
				setSize("sm")
			} else if (w < 1024) {
				setSize("md")
			} else if (w < 1536) {
				setSize("lg")
			} else {
				setSize("2xl")
			}
		}
		onResize()
		window.addEventListener("resize", onResize)

		return () => {
			window.removeEventListener("resize", onResize)
		}
	}, [])

	return (
		<div className="mt-6">
			<div className="gap-3 md:flex">
				<FilterComboBox
					{...{
						label: "All topics",
						items: topics,
						selectedItem: currentIndustry,
						onChange: (item) => {
							changeOptions(categoryQStr || "", item?.value ? item.text : "")
						}
					}}
				/>

				<FilterComboBox
					{...{
						label: "All categories",
						items: categories,
						selectedItem: currentChallenge,
						onChange: (item) => {
							changeOptions(item?.value ? item.text : "", topicQStr || "")
						}
					}}
				/>
			</div>

			<div className="relative mb-12 mt-8">
				<div className="max-w-screen-7xl mx-auto">
					{items.length === 0 && <div className="text-center text-lg">No resources found.</div>}
					{items.length > 0 && (
						<InfiniteScroll
							dataLength={items.length}
							next={fetchMore}
							hasMore={hasMore} // Replace with a condition based on your data source
							loader={<LoadingWidget message="Loading..." />}
							endMessage={<div></div>}
							className="grid sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 2xl:grid-cols-4"
						>
							{items.map((item, index) => {
								return (
									<ResourceListingItem key={item.contentID} item={item} index={index} size={size} />
								)
							})}
						</InfiniteScroll>
					)}
				</div>
			</div>
		</div>
	)
}
