"use client"

import Lottie from "lottie-react"
import animationData from "public/js/lottie/Agility_banner_home/Agility_banner_home.json"

interface Props {
	width: number
	height: number
}

// This file is intentionally loaded via `next/dynamic` so the lottie-react
// runtime and the animation JSON are split into their own chunk and never
// ship in the initial bundle.
export default function HeroLottiePlayer({ width, height }: Props) {
	return (
		<Lottie
			animationData={animationData}
			loop={false}
			autoplay={true}
			rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
			style={{ width, height }}
		/>
	)
}
