"use client"

import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { LogoItem } from "./PartnerLogoListing.server"
import Link from "next/link"
import { Fragment } from "react"

import "./PartnerLogoListing.css"
import { IPartner } from "lib/types/IPartner"

interface Props {
	logos: IPartner[]
}

export const PartnerLogoListingClient = ({ logos }: Props) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true }, [
		Autoplay({ playOnInit: true, delay: 5000 })
	])

	const filteredLogos = logos.filter((logo) => logo.partnerLogo)

	if (!filteredLogos || filteredLogos.length === 0) return null

	return (
		<div className="logo-listing embla">
			<div className="embla__viewport" ref={emblaRef}>
				<div className="embla__container">
					{filteredLogos.map((logo, index) => {
						let src = `${logo.partnerLogo?.url}?format=auto&h=128`
						if (logo.partnerLogo?.url.endsWith(".svg")) src = logo.partnerLogo.url

						return (
							<div className="embla__slide flex items-center justify-center" key={index}>
								<div className="my-3">
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img src={src} alt={logo.title} className="h-16 w-auto" height="64" />
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
