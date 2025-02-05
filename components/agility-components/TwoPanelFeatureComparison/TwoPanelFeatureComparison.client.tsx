/* eslint-disable @next/next/no-img-element */
"use client"

import { useEffect, useId, useLayoutEffect, useState } from "react"
import { IPanelItem } from "./TwoPanelFeatureComparison.server"
import clsx from "clsx"
import { Container } from "components/micro/Container"
import { ContentItem } from "@agility/content-fetch"
import { AgilityPic, renderHTML } from "@agility/nextjs"
import { IconCheckbox } from "@tabler/icons-react"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"

interface Props {
	group1Title?: string
	group2Title?: string
	group1Panels: ContentItem<IPanelItem>[]
	group2Panels: ContentItem<IPanelItem>[]
}

export const TwoPanelFeatureComparisonClient = ({ group1Title, group2Title, group1Panels, group2Panels }: Props) => {
	const [selectedGroup, setSelectedGroup] = useState<number>(0)

	const idStr1 = useId()
	const idStr2 = useId()

	useLayoutEffect(() => {
		const elem1 = document.getElementById(idStr1)
		const elem2 = document.getElementById(idStr2)
		if (!elem1 || !elem2) return

		let options = {
			root: null,
			rootMargin: "0px",
			threshold: 0
		}

		const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
			//check if the first element is visible (intersecting)
			if (entries.length === 0) return
			const entry = entries[0]

			if (entry.isIntersecting) {
				setSelectedGroup(0)
			} else {
				setSelectedGroup(1)
			}
		}

		let observer = new IntersectionObserver(callback, options)
		observer.observe(elem1)

		return () => {
			observer.disconnect()
		}
	}, [idStr1, idStr2])

	return (
		<>
			<div className="sticky top-6 z-10 hidden pt-14 md:block">
				<div className="flex justify-center border-b border-b-gray-500">
					<button
						className={clsx(
							"flex-1 p-3 pr-12 text-right font-bold transition-colors",
							selectedGroup === 0
								? "bg-background text-highlight-light"
								: "bg-gray-800 text-gray-600 hover:bg-background hover:text-highlight-light"
						)}
						onClick={() => {
							setSelectedGroup(0)
							document.getElementById(idStr1)?.scrollIntoView({ behavior: "smooth" })
						}}
					>
						{group1Title}
					</button>
					<button
						className={clsx(
							"flex-1 p-3 pl-12 text-left font-bold transition-colors",
							selectedGroup === 1
								? "bg-black text-secondary"
								: "bg-gray-300 text-gray-400 hover:bg-black hover:text-secondary"
						)}
						onClick={() => {
							setSelectedGroup(1)
							document.getElementById(idStr2)?.scrollIntoView({ behavior: "smooth" })
						}}
					>
						{group2Title}
					</button>
				</div>
			</div>
			<div
				className={clsx(
					"border-b border-b-gray-400 bg-background p-4 text-center font-bold text-highlight-light md:hidden"
				)}
				onClick={() => {
					setSelectedGroup(0)
					document.getElementById(idStr1)?.scrollIntoView({ behavior: "smooth" })
				}}
			>
				{group1Title}
			</div>
			<div id={idStr1} className="bg-background">
				<Container className="mx-auto max-w-5xl">
					{/* output group 1 */}
					{group1Panels?.map((panel, index) => {
						let img2 = "/images/features-marketing-1-trig.svg"

						if (index === 1) {
							img2 = "/images/features-marketing-2-trig.svg"
						} else if (index === 2) {
							img2 = "/images/features-marketing-3-trig.svg"
						}

						return (
							<div
								key={panel.contentID}
								className={clsx(
									"gap-4 pt-20 md:flex",
									panel.fields.graphicLocation !== "right" ? "flex-row-reverse" : ""
								)}
							>
								<div className="relative flex-1">
									<div className="relative left-0 top-0 z-[2] flex justify-center md:flex-none">
										{panel.fields.graphic && (
											<AgilityPic image={panel.fields.graphic} className="max-w-full" />
										)}
									</div>
									<img src={img2} alt="" className="absolute left-0 top-0 -mb-[100%] max-w-full" loading="lazy" />
								</div>
								<div className="flex-1">
									<h3 className="text-4xl">{panel.fields.title}</h3>
									<div
										className="prose prose-lg mt-4"
										dangerouslySetInnerHTML={renderHTMLCustom(panel.fields.description)}
									></div>
									<div className="mt-4 flex flex-col gap-2">
										{panel.fields.checkedItems?.map((item, index) => (
											<div
												key={item.contentID}
												className="flex items-center gap-2 bg-white px-3 py-2"
											>
												{/* <div className="h-6 w-6 rounded-full bg-highlight-light"></div> */}
												<IconCheckbox size={20} stroke={2} className="text-highlight" />
												<div>
													<h4 className="">{item.fields.title}</h4>
													<p>{item.fields.textblob}</p>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						)
					})}
				</Container>
			</div>
			{/* so the intersection observer will work */}

			<div className="">
				<div className="h-14 bg-background"></div>
				<div
					className={clsx(
						"border-b border-b-slate-600 bg-black p-4 text-center font-bold text-secondary md:hidden"
					)}
				>
					{group2Title}
				</div>
				<div id={idStr2} className="bg-black">
					<Container className="mx-auto max-w-5xl">
						{/* output group 2 */}
						{group2Panels?.map((panel, index) => {
							let img2 = "/images/features-marketing-1-trig.svg"

							if (index === 1) {
								img2 = "/images/features-marketing-2-trig.svg"
							} else if (index === 2) {
								img2 = "/images/features-marketing-3-trig.svg"
							}

							return (
								<div
									key={panel.contentID}
									className={clsx(
										"gap-4 pt-20 md:flex",
										panel.fields.graphicLocation !== "right" ? "flex-row-reverse" : ""
									)}
								>
									<div className="relative flex-1">
										<div className="relative left-0 top-0 z-[2] flex justify-center md:flex-none">
											{panel.fields.graphic && (
												<AgilityPic image={panel.fields.graphic} className="max-w-full" />
											)}
										</div>
										<img src={img2} alt="" className="absolute bottom-0 right-0 max-w-full" loading="lazy" />
									</div>
									<div className="flex-1">
										<h3 className="text-4xl text-white">{panel.fields.title}</h3>
										<div
											className="prose prose-lg prose-invert mt-4"
											dangerouslySetInnerHTML={renderHTMLCustom(panel.fields.description)}
										></div>
										<div className="mt-4 flex flex-col gap-2">
											{panel.fields.checkedItems?.map((item, index) => (
												<div
													key={item.contentID}
													className="flex items-center gap-2 bg-slate-700 px-3 py-2 text-white"
												>
													{/* <div className="h-6 w-6 rounded-full bg-highlight-light"></div> */}
													<IconCheckbox size={20} stroke={2} className="text-secondary" />
													<div>
														<h4 className="">{item.fields.title}</h4>
														<p>{item.fields.textblob}</p>
													</div>
												</div>
											))}
										</div>
									</div>
								</div>
							)
						})}
					</Container>
				</div>
			</div>
		</>
	)
}
