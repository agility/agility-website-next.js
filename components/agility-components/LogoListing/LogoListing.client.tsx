"use client"

import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { LogoItem } from "./LogoListing.server"
import Link from "next/link"
import { Fragment } from "react"

import "./logo-listing.css"

interface Props {
	logos: LogoItem[]
}

export const LogoListingClient = ({ logos }: Props) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true }, [
		Autoplay({ playOnInit: true, delay: 5000 })
	])

	return (
		<div className="logo-listing embla">
			<div className="embla__viewport" ref={emblaRef}>
				<div className="embla__container">
					{logos.map((logo, index) => {
						let src = `${logo.logo.url}?format=auto&h=128`
						if (logo.logo.url.endsWith(".svg")) src = logo.logo.url

						return (
							<div className="embla__slide flex items-center justify-center dark:h-24 " key={index}>
								<div className="my-3 dark:bg-white dark:w-auto dark:rounded-2xl dark:px-4">
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={src}
										alt={logo.title}
										className="h-16 w-auto"
										loading="lazy"
									/>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)

	// return (
	// 	<>
	// 		{/* @ts-ignore */}
	// 		<Slider {...settings} className="">
	// 			{logos.map((logo, index) => {
	// 				let src = `${logo.logo.url}?format=auto&h=128`
	// 				if (logo.logo.url.endsWith(".svg")) src = logo.logo.url

	// 				return (
	// 					<Fragment key={index}>
	// 						{logo.uRL ? (
	// 							<Link
	// 								href={logo.uRL.href}
	// 								target={logo.uRL.target}
	// 								title={logo.uRL.text || logo.title}
	// 								className="my-3 block px-4"
	// 							>
	// 								{/* eslint-disable-next-line @next/next/no-img-element */}
	// 								<img src={src} alt={logo.logo.label || logo.title} className="h-16 w-auto" />
	// 							</Link>
	// 						) : (
	// 							<div className="my-3 px-4">
	// 								{/* eslint-disable-next-line @next/next/no-img-element */}
	// 								<img src={src} alt={logo.title} className="h-16 w-auto" />
	// 							</div>
	// 						)}
	// 					</Fragment>
	// 				)
	// 			})}
	// 		</Slider>
	// 	</>
	// )
}
