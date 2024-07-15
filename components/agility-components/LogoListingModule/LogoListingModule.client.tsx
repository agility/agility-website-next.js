"use client"
import Slider from "react-slick"

import { LogoItem } from "./LogoListingModule.server"

import "styles/react-slick.css"
import Link from "next/link"
import { Fragment } from "react"

interface Props {
	logos: LogoItem[]
}

const settings = {
	dots: true,
	infinite: true,
	speed: 500,
	arrows: false,
	rows: 1,
	slidesToShow: 6,
	slidesToScroll: 6,
	adaptiveHeight: false,
	respondTo: "slider",
	responsive: [
		{
			breakpoint: 1199,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 5
			}
		},
		{
			breakpoint: 991,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2
			}
		}
	]
}

export const LogoListingModuleClient = ({ logos }: Props) => {
	return (
		<>
			{/* @ts-ignore */}
			<Slider {...settings} className="">
				{logos.map((logo, index) => {
					let src = `${logo.logo.url}?format=auto&h=128`
					if (logo.logo.url.endsWith(".svg")) src = logo.logo.url

					return (
						<Fragment key={index}>
							{logo.uRL ? (
								<Link
									href={logo.uRL.href}
									target={logo.uRL.target}
									title={logo.uRL.text || logo.title}
									className="block px-4 my-3"
								>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img src={src} alt={logo.logo.label || logo.title} className="h-16 w-auto" />
								</Link>
							) : (
								<div className="px-4 my-3">
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img src={src} alt={logo.title} className="h-16 w-auto" />
								</div>
							)}
						</Fragment>
					)
				})}
			</Slider>
		</>
	)
}
