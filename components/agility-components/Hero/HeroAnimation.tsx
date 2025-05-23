"use client"
import React, { useEffect, useState } from "react"
import agilityBanner from "public/js/lottie/Agility_banner_home/Agility_banner_home.json"

interface Props {
	animation: string
}

export const HeroAnimation = ({ animation }: Props) => {
	let animationData = null
	if (animation === "Agility_banner_home") animationData = agilityBanner

	const defaultOptions = {
		loop: false,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice"
		}
	}

	const [theWidth, setTheWidth] = useState(600)
	const [theHeight, setTheHeight] = useState(400)

	const [LottieComp, setLottieComp] = useState<any>(null)

	useEffect(() => {
		import("react-lottie").then((mod) => {
			setLottieComp(() => mod.default)
		})
	}, [])


	useEffect(() => {
		if (typeof window === "undefined") return

		const calcPadding = () => {
			const width = document.body.clientWidth
			if (width < 600) {
				setTheWidth(width)
				setTheHeight(width * 0.6666666666666666)
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

	if (!animationData) return null

	return (
		<div>
			{LottieComp && <LottieComp options={defaultOptions} height={theHeight} width={theWidth} />}
		</div>
	)
}
