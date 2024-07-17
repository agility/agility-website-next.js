"use client"
import { AgilityPic, ImageField } from "@agility/nextjs"
import clsx from "clsx"
import { LinkButton } from "components/micro/LinkButton"
import { ICaseStudy } from "lib/types/ICaseStudy"
import Link from "next/link"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import Slider from "react-slick"

import "styles/react-slick.css"
import "./case-study-rotator.css"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"

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
	cTAbuttonText: string
	caseStudies: MinCaseStudy[]
}

export const CaseStudyRotatorClient = async ({ caseStudies, cTAbuttonText }: Props) => {
	const Arrow = (props: any) => {
		const { className, style, onClick } = props
		return (
			<button className={clsx(className, "h-10 w-10 group block !p-0")} style={{ ...style }} onClick={onClick}>
				<IconChevronRight className="h-10 w-10 stroke-primary group-hover:stroke-highlight-light" />
			</button>
		)
	}

	const settings = {
		// dots: false,
		// infinite: true,
		// // autoplay: true,
		// autoplaySpeed: 5000,
		// speed: 350,
		// arrows: true,
		// centerPadding: "0",
		// centerMode: isNotMobile,
		// rows: 1,
		// slidesToShow: 1,
		// slidesToScroll: 1,
		// adaptiveHeight: true,
		// respondTo: "slider",
		// responsive: [
		// 	{
		// 		breakpoint: 767,
		// 		settings: {
		// 			centerMode: isNotMobile,
		// 			speed: 300
		// 		}
		// 	}
		// ]
		className: "",
		adaptiveHeight: true,
		centerMode: true,
		infinite: true,
		centerPadding: "120px",
		slidesToShow: 1,
		speed: 500,
		nextArrow: <Arrow />,
		prevArrow: <Arrow />,
		responsive: [
			{
				breakpoint: 767,
				settings: {
					centerMode: true,
					centerPadding: "0",
					speed: 300
				}
			}
		]
	}

	return (
		<div className={clsx("case-study-slider mt-14")}>
			{/* @ts-ignore */}
			<Slider {...settings} className={""}>
				{caseStudies.map((caseStudy, index) => {
					let imgUrl = `${caseStudy.image.url}?format=auto`
					if (caseStudy.image.width > 900) {
						imgUrl += "&w=900"
					}

					return (
						<div className={clsx(" mx-auto overflow-clip")} key={caseStudy.contentID}>
							<div
								className="relative mx-4 h-[320px] lg:h-[450px] xl:h-[550px] bg-red-200 bg-cover"
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
										<p
											className={clsx(
												"line-clamp-3 hidden md:visible md:text-base lg:line-clamp-5"
											)}
										>
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
								<div
									className={clsx(
										"off-slide pointer-events-none transition-opacity absolute top-0 left-0 overflow-hidden bg-background/80 h-full w-full"
									)}
								></div>
							</div>
						</div>
					)
				})}
			</Slider>
		</div>
	)
}
