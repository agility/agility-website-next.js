"use client"

import React from "react"
import useEmblaCarousel from "embla-carousel-react"
import { AgilityPic, ImageField } from "@agility/nextjs"
import clsx from "clsx"

import "./case-study-rotator.css"
import { LinkButton } from "components/micro/LinkButton"
import { NextButton, PrevButton, usePrevNextButtons } from "./PrevNextButtons"
import { useRouter } from "next/navigation"
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
	const router = useRouter()

	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex: 0 })

	const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi)
	return (
		<section className="case-study-rotator embla mx-auto max-w-screen-xl pt-12">
			<div className="relative">
				<div className="overflow-hidden" ref={emblaRef}>
					<div className="embla__container">
						{caseStudies.map((caseStudy, index) => {
							// let imgUrl = `${caseStudy.image.url}?format=auto`
							// if (caseStudy.image.width > 900) {
							// 	imgUrl += "&w=900"
							// }

							const caseStudyUrl = `/resources/case-studies/${caseStudy.uRL}`

							return (
								<div className={clsx("embla__slide group")} key={caseStudy.contentID}>
									<div className="embla__slide__number relative mx-4 h-[320px] overflow-clip lg:h-[450px] xl:h-[550px]">
										<div
											className="absolute left-0 top-0 h-full w-full bg-cover transition-all group-hover:scale-105"
											// style={{ backgroundImage: `url(${imgUrl})` }}
										>
											<AgilityPic
												image={caseStudy.image}
												alt={caseStudy.image.label || caseStudy.title}
												className="h-full w-full object-cover"
												fallbackWidth={320}
												sources={[
													{ media: "(min-width: 768px)", width: 900 },
													{ media: "(min-width: 640px)", width: 640 }
												]}
											/>
										</div>
										<div
											className={clsx(
												"absolute left-0 top-0 h-full overflow-hidden bg-black/40 font-normal text-white",
												"pointer-events-none w-2/3 md:w-1/2"
											)}
										>
											<div
												className="pointer-events-auto flex cursor-pointer flex-col gap-5 p-4 lg:px-12 lg:pt-12"
												onClick={() => {
													router.push(caseStudyUrl)
												}}
											>
												<h3
													className={clsx(
														"text-lg font-medium md:text-lg lg:text-xl xl:text-2xl"
													)}
												>
													{caseStudy.title}
												</h3>
												<p className={clsx("line-clamp-5 text-sm md:text-base")}>
													{caseStudy.excerpt}
												</p>
												{cTAbuttonText && (
													<div className="mt-4">
														<LinkButton
															type="alternate"
															href={caseStudyUrl}
															size="md"
															className="pointer-events-auto text-primary"
														>
															{cTAbuttonText}
														</LinkButton>
													</div>
												)}
											</div>
										</div>
										<div className="absolute bottom-5 right-5 flex h-16 w-32 items-center justify-center overflow-clip rounded-md bg-white px-3 py-1 shadow-md md:w-32">
											<AgilityPic
												image={caseStudy.customerLogo}
												className="w-14 md:w-40"
												fallbackWidth={160}
											/>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
				<div className="absolute top-0 hidden h-full w-[135px] bg-white/60 lg:block"></div>
				<div className="absolute right-0 top-0 hidden h-full w-[135px] bg-white/60 lg:block"></div>
				<div className="pointer-events-none absolute top-[45%] flex w-full justify-between px-4 lg:px-14">
					<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
					<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
				</div>
			</div>
		</section>
	)
}
