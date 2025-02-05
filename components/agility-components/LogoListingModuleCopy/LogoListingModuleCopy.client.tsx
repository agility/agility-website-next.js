"use client"

import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { LogoItem } from "./LogoListingModuleCopy.server"
import Link from "next/link"

import "./logo-listing-copy.css"

interface Props {
	logos: LogoItem[]
}

export const LogoListingModuleCopyClient = ({ logos }: Props) => {
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
							<div className="embla__slide flex items-center justify-center" key={index}>
								{logo.uRL ? (
									<Link
										href={logo.uRL.href}
										target={logo.uRL.target}
										title={logo.uRL.text || logo.title}
										className="my-3 block"
									>
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img src={src} alt={logo.logo.label || logo.title} className="w-32" loading="lazy" />
									</Link>
								) : (
									<div className="my-3">
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img src={src} alt={logo.title} className="h-16 w-auto" loading="lazy" />
									</div>
								)}
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
