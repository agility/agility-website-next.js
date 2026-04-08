"use client"

import { Fragment } from "react"
import { Container } from "components/micro/Container"
import { ComboboItem, FilterComboBox } from "components/micro/FilterComboBox"
import { ICaseStudyListingItem } from "lib/cms-content/getCaseStudyListing"
import { ICaseStudyCTA } from "lib/cms-content/getCaseStudyCTAs"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useLayoutEffect, useState } from "react"
import { CaseStudyItem } from "./CaseStudyItem"
import { CaseStudyCTAItem } from "./CaseStudyCTAItem"
import { InfiniteLoadMore } from "components/common/InfiniteLoadMore"

/**
 * When an industry is selected, show matching CTA at position 2.
 * When no industry is selected, scatter all CTAs every 6 items starting at position 2.
 */
function getCTAForIndex(
	index: number,
	cta: ICaseStudyCTA | null,
	allCTAs: ICaseStudyCTA[],
	hasIndustryFilter: boolean
): ICaseStudyCTA | null {
	if (cta) return index === 2 ? cta : null

	if (hasIndustryFilter || allCTAs.length === 0) return null

	const spacing = 6
	const offset = 2
	if (index >= offset && (index - offset) % spacing === 0) {
		const ctaIdx = Math.floor((index - offset) / spacing)
		return ctaIdx < allCTAs.length ? allCTAs[ctaIdx] : null
	}
	return null
}

interface Props {
	caseCount: number
	industryQStr: string | null
	challengeQStr: string | null
	industries: ComboboItem[]
	challenges: ComboboItem[]
	caseStudies: ICaseStudyListingItem[]
	cta: ICaseStudyCTA | null
	allCTAs: ICaseStudyCTA[]
	getNextItems: ({ skip, take }: { skip: number; take: number }) => Promise<ICaseStudyListingItem[]>
}

export const CaseStudyListingClient = ({
	caseCount,
	industries,
	challenges,
	industryQStr,
	challengeQStr,
	caseStudies,
	cta,
	allCTAs,
	getNextItems
}: Props) => {
	const router = useRouter()
	const pathName = usePathname()

	const currentIndustry = industries.find((i) => i.text.toLowerCase().replaceAll(" ", "-") === industryQStr)
	const currentChallenge = challenges.find((c) => c.text.toLowerCase().replaceAll(" ", "-") === challengeQStr)

	const changeOptions = (challenge: string, industry: string) => {
		//set the industry and challenge params
		const params = new URLSearchParams()
		if (industry) params.append("industry", encodeURIComponent(industry.toLowerCase().replaceAll(" ", "-")))
		if (challenge) params.append("challenge", encodeURIComponent(challenge.toLowerCase().replaceAll(" ", "-")))

		let newUrl = `${pathName}${params.size > 0 ? "?" + params.toString() : ""}`

		router.push(newUrl, { scroll: false })
	}

	const [hasMore, setHasMore] = useState(caseStudies.length >= caseCount)
	const [items, setItems] = useState(caseStudies)
	const [isLoading, setIsLoading] = useState(false)

	const fetchMore = async () => {
		try {
			setIsLoading(true)
			//call the server action declared in the server component to get the next page of items...
			const moreItems = await getNextItems({ skip: items.length, take: caseCount })

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

	const [size, setSize] = useState<"xs" | "sm" | "md" | "lg" | "2xl">("md")

	useEffect(() => {
		//if the industry or challenge changes, reset the items
		setItems(caseStudies)
		setHasMore(true)
	}, [caseStudies, currentChallenge, currentIndustry])

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
		<Container className="">
			<div className="mx-auto max-w-7xl">
				<div className=" gap-3 md:flex">
					<FilterComboBox
						{...{
							label: "All Industries",
							items: industries,
							selectedItem: currentIndustry,
							onChange: (item) => {
								changeOptions(challengeQStr || "", item?.value ? item.text : "")
							}
						}}
					/>

					<FilterComboBox
						{...{
							label: "All Challenges",
							items: challenges,
							selectedItem: currentChallenge,
							onChange: (item) => {
								changeOptions(item?.value ? item.text : "", industryQStr || "")
							}
						}}
					/>
				</div>

				<div className="relative mb-12 mt-8">
					<div className="max-w-screen-7xl mx-auto">
						{items.length === 0 && <div className="text-center text-lg">No case studies found.</div>}
						{items.length > 0 && (
							<div className="grid sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 2xl:grid-cols-4">
								{items.map((item, index) => {
									const ctaForIndex = getCTAForIndex(index, cta, allCTAs, !!industryQStr)

									return (
										<Fragment key={item.contentID}>
											{ctaForIndex && (
												<CaseStudyCTAItem key={ctaForIndex.contentID} item={ctaForIndex} />
											)}
											<CaseStudyItem item={item} index={index} size={size} priority={index < 4} />
										</Fragment>
									)
								})}
							</div>
						)}

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
				</div>
			</div>
		</Container>
	)
}
