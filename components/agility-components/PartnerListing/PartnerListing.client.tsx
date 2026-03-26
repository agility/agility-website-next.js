"use client"
import { Container } from "components/micro/Container"
import { ComboboItem, FilterComboBox } from "components/micro/FilterComboBox"
import { IPartnerListingItem } from "lib/cms-content/getPartnerListing"
import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { PartnerListingItem } from "./PartnerListingItem"
import { InfiniteLoadMore } from "components/common/InfiniteLoadMore"

interface Props {
	pageSize: number
	partnerType: "implementation" | "integration"
	tagList: ComboboItem[]
	tagQStr: string
	firstPage: IPartnerListingItem[]
	getNextItems: ({ skip }: { skip: number }) => Promise<IPartnerListingItem[]>
}
export const PartnerListingClient = ({ partnerType, tagList, tagQStr, firstPage, getNextItems, pageSize }: Props) => {
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

	const [hasMore, setHasMore] = useState(firstPage.length >= pageSize)
	const [items, setItems] = useState(firstPage)
	const [isLoading, setIsLoading] = useState(false)

	const fetchMore = async () => {
		try {
			setIsLoading(true)
			//call the server action declared in the server component to get the next page of items...
			const moreItems = await getNextItems({ skip: items.length })

			setItems((prev) => {
				return [...prev, ...moreItems]
			})

			setHasMore(moreItems.length > 0)
		} catch (error) {
			console.error("error fetching more case studies", error)
			setHasMore(false)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		//if the tag changes, reset the items
		setItems(firstPage)
		setHasMore(true)
	}, [firstPage, currentTag])

	return (
		<Container>
			<div className="mx-auto max-w-7xl">
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
							<>
								<div className="grid sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 2xl:grid-cols-4">
									{items.map((item, index) => (
										<PartnerListingItem key={item.contentID} item={item} partnerType={partnerType} />
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
							</>
						)}
					</div>
				</div>
			</div>
		</Container>
	)
}
