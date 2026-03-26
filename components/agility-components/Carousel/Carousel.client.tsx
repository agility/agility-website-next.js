/* eslint-disable @next/next/no-img-element */
"use client"

import React from "react"
import useEmblaCarousel from "embla-carousel-react"

import { AgilityPic, ImageField } from "@agility/nextjs"
import { ContentItem } from "@agility/content-fetch"
import clsx from "clsx"

import "./carousel-rotator.css"
import { LinkButton } from "components/micro/LinkButton"
import { NextButton, PrevButton, usePrevNextButtons } from "../Testimonials/PrevNextButtons"
import { useRouter } from "next/navigation"

import { ICarouselItem } from "./Carousel"
import Link from "next/link"

interface Props {
	items: ContentItem<ICarouselItem>[]
}

export const CarouselClient = ({ items }: Props) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex: 0 })

	const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi)

	const router = useRouter()

	if (items.length < 2) return null
	if (items.length === 2) {
		//if we only have 2 items, double them up so we can loop
		items = [...items, ...items]
	}

	return (
		<section className="carousel-rotator embla mx-auto max-w-7xl pt-12">
			<div className="relative">
				<div className="overflow-hidden" ref={emblaRef}>
					<div className="embla__container">
						{items.map((item, index) => {
							return (
								<div className={clsx("embla__slide group")} key={item.contentID}>
									{item.fields.link ? (
										<Link
											href={item.fields.link.href}
											target={item.fields.link.target}
											className="embla__slide__number flex items-center"
										>
											<AgilityPic
												image={item.fields.image}
												fallbackWidth={800}
												className="h-full w-[800px] object-contain"
												sources={[
													{ media: "(min-width: 1200px) and (min-resolution: 2x)", width: 1600 },
													{ media: "(min-width: 1200px)", width: 800 },
													{ media: "(min-width: 1024px) and (min-resolution: 2x)", width: 1600 },
													{ media: "(min-width: 1024px)", width: 800 },
													{ media: "(min-width: 768px) and (min-resolution: 2x)", width: 1200 },
													{ media: "(min-width: 768px)", width: 600 },
													{ media: "(min-width: 640px) and (min-resolution: 2x)", width: 880 },
													{ media: "(min-width: 640px)", width: 480 },
													{ media: "(min-width: 320px) and (min-resolution: 2x)", width: 640 }
												]}
											/>
										</Link>
									) : (
										<div className="embla__slide__number relative mx-4 flex items-center">
											<AgilityPic
												image={item.fields.image}
												fallbackWidth={800}
												className="h-full w-[800px] object-contain"
												sources={[
													{ media: "(min-width: 1200px) and (min-resolution: 2x)", width: 1600 },
													{ media: "(min-width: 1200px)", width: 800 },
													{ media: "(min-width: 1024px) and (min-resolution: 2x)", width: 1600 },
													{ media: "(min-width: 1024px)", width: 800 },
													{ media: "(min-width: 768px) and (min-resolution: 2x)", width: 1200 },
													{ media: "(min-width: 768px)", width: 600 },
													{ media: "(min-width: 640px) and (min-resolution: 2x)", width: 880 },
													{ media: "(min-width: 640px)", width: 480 },
													{ media: "(min-width: 320px) and (min-resolution: 2x)", width: 640 }
												]}
											/>
										</div>
									)}
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
