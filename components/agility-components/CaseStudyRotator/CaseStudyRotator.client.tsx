"use client"

import React from "react"
import useEmblaCarousel from "embla-carousel-react"
import { AgilityPic, ImageField } from "@agility/nextjs"
import clsx from "clsx"
import { IconChevronRight } from "@tabler/icons-react"
import { useEffect, useId, useLayoutEffect } from "react"

import "./case-study-rotator.css"
import { LinkButton } from "components/micro/LinkButton"
import { NextButton, PrevButton, usePrevNextButtons } from "./PrevNextButtons"
import { EmblaCarouselType } from "embla-carousel"

export interface MinCaseStudy {
	contentID: number
	title: string
	clientNames: string
	excerpt: string
	uRL: string
	customerLogo: ImageField
	image: ImageField
}

interface Props {
	contentID: number
	cTAbuttonText: string
	caseStudies: MinCaseStudy[]
}

export const CaseStudyRotatorClient = ({ caseStudies, cTAbuttonText, contentID }: Props) => {
	const idStr = `rotate-${contentID}`

	const slides = [1, 2, 3, 4, 5]
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex: 0 })

	const [selectedIndex, setSelectedIndex] = React.useState(0)

	useEffect(() => {
		if (!emblaApi) return
		const onSelect = (embla: EmblaCarouselType) => {
			const index = embla.selectedScrollSnap()
			setSelectedIndex(index)
		}
		emblaApi.on("select", onSelect)

		return () => {
			emblaApi.off("select", onSelect)
		}
	}, [emblaApi])

	const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi)
	return (
		<section className="max-w-screen-xl mx-auto embla  pt-12">
			<div className="relative">
				<div className="overflow-hidden" ref={emblaRef}>
					<div className="embla__container">
						{caseStudies.map((caseStudy, index) => {
							let imgUrl = `${caseStudy.image.url}?format=auto`
							if (caseStudy.image.width > 900) {
								imgUrl += "&w=900"
							}

							return (
								<div className={clsx("embla__slide")} key={caseStudy.contentID}>
									<div
										className="embla__slide__number relative mx-4 h-[320px] lg:h-[450px] xl:h-[550px] bg-red-200 bg-cover"
										style={{ backgroundImage: `url(${imgUrl})` }}
									>
										<div
											className={clsx(
												"absolute top-0 left-0 overflow-hidden bg-black/40 h-full text-white  font-normal",
												"w-2/3 md:w-1/2 "
											)}
										>
											<div className="flex flex-col gap-5 p-4 lg:py-16 lg:px-12">
												<h3 className={clsx("text-base md:text-lg lg:text-2xl font-medium")}>
													{caseStudy.title}
												</h3>
												<p className={clsx("text-sm md:text-base line-clamp-5")}>
													{caseStudy.excerpt}
												</p>
												{cTAbuttonText && (
													<div className="mt-4">
														<LinkButton
															type="alternate"
															href={`/resources/case-studies/${caseStudy.uRL}`}
															size="md"
															className="text-primary"
														>
															{cTAbuttonText}
														</LinkButton>
													</div>
												)}
											</div>
										</div>
										<div className="absolute right-5 bottom-5 bg-white rounded-md shadow-md bg-opacity-50 px-2 py-1">
											<AgilityPic image={caseStudy.customerLogo} className="w-14 md:w-40" />
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
				<div className="hidden lg:block absolute w-[135px] top-0 h-full pointer-events-none bg-white/60"></div>
				<div className="hidden lg:block absolute w-[135px] top-0 right-0 h-full pointer-events-none bg-white/60"></div>
				<div className="absolute w-full flex justify-between top-[45%] px-4 lg:px-14 pointer-events-none ">
					<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
					<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
				</div>
			</div>
		</section>
	)

	// const Arrow = (props: any) => {
	// 	const { className, style, onClick } = props
	// 	return (
	// 		<button className={clsx(className, "h-10 w-10 group block !p-0")} style={{ ...style }} onClick={onClick}>
	// 			<IconChevronRight className="h-10 w-10 stroke-primary group-hover:stroke-highlight-light" />
	// 		</button>
	// 	)
	// }

	// return (
	// 	<div className={clsx("case-study-slider mt-14")}>
	// 		<div id={idStr} className="embla" ref={emblaRef}>
	// 			{caseStudies.map((caseStudy, index) => {
	// 				let imgUrl = `${caseStudy.image.url}?format=auto`
	// 				if (caseStudy.image.width > 900) {
	// 					imgUrl += "&w=900"
	// 				}

	// 				return (
	// 					<div className={clsx(" mx-auto overflow-clip")} key={caseStudy.contentID}>
	// 						<div
	// 							className="relative mx-4 h-[320px] lg:h-[450px] xl:h-[550px] bg-red-200 bg-cover"
	// 							style={{ backgroundImage: `url(${imgUrl})` }}
	// 						>
	// 							<div
	// 								className={clsx(
	// 									"absolute top-0 left-0 overflow-hidden bg-black/40 h-full text-white  font-normal",
	// 									"w-2/3 md:w-1/2 "
	// 								)}
	// 							>
	// 								<div className="flex flex-col gap-5 p-4 lg:py-16 lg:px-12">
	// 									<h3 className={clsx("text-base md:text-lg lg:text-2xl font-medium")}>
	// 										{caseStudy.title}
	// 									</h3>
	// 									<p
	// 										className={clsx(
	// 											"line-clamp-3 hidden md:visible md:text-base lg:line-clamp-5"
	// 										)}
	// 									>
	// 										{caseStudy.excerpt}
	// 									</p>
	// 									{cTAbuttonText && (
	// 										<div className="mt-4">
	// 											<LinkButton
	// 												type="alternate"
	// 												href={`/resources/case-studies/${caseStudy.uRL}`}
	// 												size="md"
	// 												className="text-primary"
	// 											>
	// 												{cTAbuttonText}
	// 											</LinkButton>
	// 										</div>
	// 									)}
	// 								</div>
	// 							</div>
	// 							<div className="absolute right-5 bottom-5 bg-white rounded-md shadow-md bg-opacity-50 px-2 py-1">
	// 								<AgilityPic image={caseStudy.customerLogo} className="w-14 md:w-40" />
	// 							</div>
	// 							{/* <div
	// 								className={clsx(
	// 									"off-slide pointer-events-none transition-opacity absolute top-0 left-0 overflow-hidden bg-background/80 h-full w-full"
	// 								)}
	// 							></div> */}
	// 						</div>
	// 					</div>
	// 				)
	// 			})}
	// 		</div>

	// 		{/* <div>

	// 				{caseStudies.map((caseStudy, index) => (
	// 					<div
	// 						className="item-logo-feature d-inline-flex align-items-center justify-content-center"
	// 						key={"logo-" + caseStudy.contentID}
	// 					>
	// 						<img
	// 							src={caseStudy.customerLogo.url + "?w=200&format=auto"}
	// 							width="77"
	// 							height="72"
	// 							alt={caseStudy.customerLogo.label}
	// 						></img>
	// 					</div>
	// 				))}

	// 		</div> */}
	// 	</div>
	// )
}
