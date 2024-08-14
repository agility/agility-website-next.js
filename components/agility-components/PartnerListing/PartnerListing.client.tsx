"use client"
import { AgilityPic } from "@agility/nextjs"
import { IconChevronRight } from "@tabler/icons-react"
import LoadingWidget from "components/common/LoadingWidget"
import { Container } from "components/micro/Container"
import { ComboboItem, FilterComboBox } from "components/micro/FilterComboBox"
import { IPartnerListingItem } from "lib/cms-content/getPartnerListing"
import { first } from "lodash"
import Link from "next/link"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { PartnerListingItem } from "./PartnerListingItem"

interface Props {
	partnerType: "implementation" | "integration"
	tagList: ComboboItem[]
	tagQStr: string
	firstPage: IPartnerListingItem[]
	getNextItems: ({ skip }: { skip: number }) => Promise<IPartnerListingItem[]>
}
export const PartnerListingClient = ({ partnerType, tagList, tagQStr, firstPage, getNextItems }: Props) => {
	const router = useRouter()
	const pathName = usePathname()
	const currentTag = tagList.find((c) => c.text.toLowerCase().replaceAll(" ", "-") === tagQStr)

	const changeOptions = (tag: string) => {
		//set the industry and challenge params
		const params = new URLSearchParams()

		if (tag) params.append("region", encodeURIComponent(tag.toLowerCase().replaceAll(" ", "-")))

		let newUrl = `${pathName}${params.size > 0 ? "?" + params.toString() : ""}`

		router.push(newUrl, { scroll: false })
	}

	const [hasMore, setHasMore] = useState(true)
	const [items, setItems] = useState(firstPage)

	const fetchMore = async () => {
		try {
			//call the server action declared in the server component to get the next page of items...
			const moreItems = await getNextItems({ skip: items.length })

			setItems((prev) => {
				return [...prev, ...moreItems]
			})

			setHasMore(moreItems.length > 0)
		} catch (error) {
			console.error("error fetching more case studies", error)
			setHasMore(false)
		}
	}

	useEffect(() => {
		//if the tag changes, reset the items
		setItems(firstPage)
		setHasMore(true)
	}, [firstPage, currentTag])

	return (
		<Container>
			<div className="gap-3 md:flex">
				<FilterComboBox
					{...{
						label: "All Partners",
						items: tagList,
						selectedItem: currentTag,
						onChange: (item) => {
							changeOptions(item?.value ? item.text : "")
						}
					}}
				/>
			</div>

			<div className="relative mb-12 mt-8">
				<div className="max-w-screen-7xl mx-auto">
					{items.length === 0 && <div className="text-center text-lg">No partners found.</div>}
					{items.length > 0 && (
						<InfiniteScroll
							dataLength={items.length}
							next={fetchMore}
							hasMore={hasMore} // Replace with a condition based on your data source
							loader={<LoadingWidget message="Loading..." />}
							endMessage={<div></div>}
							className="grid sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 2xl:grid-cols-4"
						>
							{items.map((item, index) => (
								<PartnerListingItem key={item.contentID} item={item} partnerType={partnerType} />
							))}
						</InfiniteScroll>
					)}
				</div>
			</div>
		</Container>
	)
}
