/* eslint-disable @next/next/no-img-element */
"use client"
import { ICaseStudy } from "lib/types/ICaseStudy"
import useEmblaCarousel from "embla-carousel-react"
import { DotButton, useDotButton } from "./CarouselDotButton"
import { PrevButton, NextButton, usePrevNextButtons } from "./CarouselArrowButtons"

import "./cs-detail-rotator.css"
import { IconPoint, IconPointFilled } from "@tabler/icons-react"

interface Props {
	galleryItems: any[]
}

export const CaseStudyDetailRotator = ({ galleryItems }: Props) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

	const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi)

	return (
		<section className="cs-detail-rotator relative mt-10">
			<div className="embla bg-background dark:bg-gray-900 py-10">
				<div className="embla__viewport" ref={emblaRef}>
					<div className="embla__container">
						{galleryItems.map((item, index) => (
							<div className="embla__slide" key={index}>
								<div className="mx-auto h-96 w-4/5 rounded-lg bg-gray-50 dark:bg-gray-800 p-4">
									<img
										src={`${item.url}?format=auto`}
										alt={item.fileName}
										className="mx-auto h-full w-full object-contain"
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="absolute left-0 top-[40%] md:left-5">
				<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
			</div>
			<div className="absolute right-0 top-[40%] md:right-5">
				<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
			</div>

			<div className="mt-3 flex justify-center">
				{scrollSnaps.map((_, index) => (
					<DotButton key={index} onClick={() => onDotButtonClick(index)} className="p-2">
						{index === selectedIndex ? (
							<IconPointFilled className="text-highlight-light dark:text-secondary" />
						) : (
							<IconPoint className="text-highlight-light dark:text-secondary" stroke={1} />
						)}
					</DotButton>
				))}
			</div>
		</section>
	)
}
