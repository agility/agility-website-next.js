"use client"

import React from "react"
import useEmblaCarousel from "embla-carousel-react"

import { AgilityPic, ImageField } from "@agility/nextjs"
import { ContentItem } from "@agility/content-fetch"
import clsx from "clsx"

import "./testimonial-rotator.css"
import { LinkButton } from "components/micro/LinkButton"
import { NextButton, PrevButton, usePrevNextButtons } from "./PrevNextButtons"
import { useRouter } from "next/navigation"
import { ITestimonial } from "lib/types/ITestimonial"
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
	items: ContentItem<ITestimonial>[]
}

export const TestimonialsClient = ({ items }: Props) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex: 0 })

	const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi)

	const router = useRouter()

	if (items.length < 2) return null
	if (items.length === 2) {
		//if we only have 2 items, double them up so we can loop
		items = [...items, ...items]
	}

	return (
		<section className="case-study-rotator embla mx-auto max-w-7xl pt-12">
			<div className="relative">
				<div className="overflow-hidden" ref={emblaRef}>
					<div className="embla__container">
						{items.map((item, index) => {
							return (
								<div className={clsx("embla__slide group")} key={item.contentID}>
									<div className="embla__slide__number relative mx-4 h-[320px] overflow-clip">
										<div className="flex h-full flex-col gap-4 border border-background dark:border-gray-700 dark:bg-gray-800 p-8">
											<div className="flex-1 text-base font-medium dark:text-gray-300">{item.fields.excerpt}</div>

											<div className="flex w-full items-center justify-between gap-2">
												{item.fields.headshot && (
													<div className="pr-2">
														<AgilityPic
															image={item.fields.headshot}
															fallbackWidth={128}
															className="h-16 w-16 rounded-full"
														/>
													</div>
												)}

												<div className="flex-1">
													<div className="text-lg font-bold dark:text-white">{item.fields.title}</div>
													<div className="dark:text-gray-300">{item.fields.jobTitle}</div>
													<div className="dark:text-gray-300">{item.fields.companyName}</div>
												</div>
												<div>
													{item.fields.companyLogo && (
														<AgilityPic
															image={item.fields.companyLogo}
															className="max-h-[60px] max-w-full"
															fallbackWidth={200}
														/>
													)}
												</div>
											</div>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
				<div className="absolute top-0 hidden h-full w-[135px] bg-white/60 dark:bg-gray-900/60 lg:block"></div>
				<div className="absolute right-0 top-0 hidden h-full w-[135px] bg-white/60 dark:bg-gray-900/60 lg:block"></div>
				<div className="pointer-events-none absolute top-[45%] flex w-full justify-between px-4 lg:px-14">
					<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
					<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
				</div>
			</div>
		</section>
	)
}
