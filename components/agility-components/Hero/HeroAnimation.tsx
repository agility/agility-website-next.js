"use client"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

interface Props {
	animation: string
}

// Dynamic-import the lottie player + animation JSON together so neither
// is in the initial chunk. ssr: false because lottie-web touches the DOM.
const HeroLottiePlayer = dynamic(() => import("./HeroLottiePlayer.client"), {
	ssr: false
})

export const HeroAnimation = ({ animation }: Props) => {
	const [theWidth, setTheWidth] = useState(600)
	const [theHeight, setTheHeight] = useState(400)

	useEffect(() => {
		if (typeof window === "undefined") return

		const calcPadding = () => {
			const width = document.body.clientWidth
			if (width < 600) {
				setTheWidth(width)
				setTheHeight(width * (2 / 3))
			} else {
				setTheHeight(400)
				setTheWidth(600)
			}
		}
		calcPadding()
		window.addEventListener("resize", calcPadding)
		return () => {
			window.removeEventListener("resize", calcPadding)
		}
	}, [])

	// Only one animation supported today
	if (animation !== "Agility_banner_home") return null

	return (
		<div>
			<HeroLottiePlayer width={theWidth} height={theHeight} />
		</div>
	)
}
