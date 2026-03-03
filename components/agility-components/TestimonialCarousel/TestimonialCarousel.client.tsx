"use client"

import React, { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { EmblaCarouselType } from "embla-carousel"
import { IconChevronLeft, IconChevronRight, IconArrowRight } from "@tabler/icons-react"
import clsx from "clsx"
import Link from "next/link"
import "./testimonial-carousel.css"

export interface TestimonialItem {
	contentID: number
	quote: string
	personName: string
	personRole: string
	company: string
	companyLink?: { href: string; target: string; text: string }
}

interface Props {
	items: TestimonialItem[]
	ctaButton?: { href: string; target: string; text: string }
}

const getInitials = (name: string) => {
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2)
}

const padIndex = (i: number) => String(i + 1).padStart(2, "0")

export const TestimonialCarouselClient = ({ items, ctaButton }: Props) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex: 0 })
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

	const onSelect = useCallback((api: EmblaCarouselType) => {
		setSelectedIndex(api.selectedScrollSnap())
	}, [])

	useEffect(() => {
		if (!emblaApi) return
		setScrollSnaps(emblaApi.scrollSnapList())
		onSelect(emblaApi)
		emblaApi.on("reInit", onSelect).on("select", onSelect)
	}, [emblaApi, onSelect])

	const scrollTo = useCallback(
		(index: number) => {
			emblaApi?.scrollTo(index)
		},
		[emblaApi]
	)

	const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
	const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

	if (items.length === 0) return null

	return (
		<div className="mt-10">
			{/* Carousel */}
			<div className="testimonial-carousel embla relative">
				<div className="overflow-hidden" ref={emblaRef}>
					<div className="embla__container">
						{items.map((item, index) => (
							<div className="embla__slide" key={`${item.contentID}-${index}`}>
								<div className="mx-2 flex h-full flex-col justify-between rounded-2xl bg-white/10 p-8 backdrop-blur-sm lg:mx-4 lg:p-10">
									<blockquote className="text-xl font-medium leading-relaxed lg:text-2xl">
										&ldquo;{item.quote}&rdquo;
									</blockquote>
									<div className="mt-6 flex items-center justify-between">
										<div className="flex items-center gap-4">
											<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-primary">
												{getInitials(item.personName)}
											</div>
											<div>
												<div className="font-bold">{item.personName}</div>
												<div className="text-sm text-white/70">
													{item.personRole} &bull; {item.company}
												</div>
											</div>
										</div>
										<div className="text-sm font-medium text-white/50">
											{padIndex(index)} / {padIndex(items.length - 1)}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Navigation Arrows */}
				<button
					onClick={scrollPrev}
					className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-white/10 p-2 transition-all hover:bg-white/20"
					type="button"
					aria-label="Previous testimonial"
				>
					<IconChevronLeft className="h-5 w-5" />
				</button>
				<button
					onClick={scrollNext}
					className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-white/10 p-2 transition-all hover:bg-white/20"
					type="button"
					aria-label="Next testimonial"
				>
					<IconChevronRight className="h-5 w-5" />
				</button>
			</div>

			{/* Dots */}
			<div className="mt-6 flex items-center justify-center gap-2">
				{scrollSnaps.slice(0, items.length).map((_, index) => (
					<button
						key={index}
						type="button"
						onClick={() => scrollTo(index)}
						className={clsx(
							"h-2.5 rounded-full transition-all",
							selectedIndex % items.length === index ? "w-8 bg-white" : "w-2.5 bg-white/30"
						)}
						aria-label={`Go to testimonial ${index + 1}`}
					/>
				))}
			</div>

			{/* Bottom: Brand chips + CTA */}
			<div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-white/20 pt-8 lg:flex-row">
				<div className="flex flex-wrap items-center gap-3">
					{items.map((item, index) => (
						<button
							key={item.contentID}
							type="button"
							onClick={() => scrollTo(index)}
							className={clsx(
								"rounded-full px-4 py-1.5 text-sm font-medium transition-all",
								selectedIndex % items.length === index
									? "bg-white text-highlight"
									: "bg-white/10 text-white hover:bg-white/20"
							)}
						>
							{item.company}
						</button>
					))}
				</div>
				{ctaButton && ctaButton.href && (
					<Link
						href={ctaButton.href}
						target={ctaButton.target}
						className="group flex items-center gap-2 font-medium text-secondary transition-all hover:text-white"
					>
						{ctaButton.text}
						<IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
					</Link>
				)}
			</div>
		</div>
	)
}
