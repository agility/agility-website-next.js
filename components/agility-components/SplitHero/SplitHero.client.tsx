"use client"

import { useCallback, useEffect, useState } from "react"

interface Props {
	words: string[]
	heading: string
}

export const CyclingHeading = ({ words, heading }: Props) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [phase, setPhase] = useState<"visible" | "exit" | "enter">("visible")

	const cycle = useCallback(() => {
		// Phase 1: slide current word up and out
		setPhase("exit")
		setTimeout(() => {
			setCurrentIndex((prev) => (prev + 1) % words.length)
			setPhase("enter")
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					setPhase("visible")
				})
			})
		}, 250)
	}, [words.length])

	useEffect(() => {
		if (words.length <= 1) return
		const interval = setInterval(cycle, 3000)
		return () => clearInterval(interval)
	}, [cycle, words.length])

	const getTransformStyle = (): React.CSSProperties => {
		switch (phase) {
			case "exit":
				return {
					opacity: 0,
					transform: "translateY(-50%)",
					transition: "opacity 0.25s ease-out, transform 0.25s ease-out",
				}
			case "enter":
				return {
					opacity: 0,
					transform: "translateY(50%)",
					transition: "none",
				}
			case "visible":
			default:
				return {
					opacity: 1,
					transform: "translateY(0)",
					transition: "opacity 0.25s ease-out, transform 0.25s ease-out",
				}
		}
	}

	return (
		<h1 className="flex min-h-[3.6em] flex-col justify-start text-5xl font-extrabold leading-tight tracking-tight sm:min-h-[3em] lg:min-h-[3.6em] lg:text-7xl">
			<div className="relative inline-block h-[1.2em] w-full overflow-hidden text-highlight-light">
				<span
					className="absolute left-0 top-0 block w-full"
					style={getTransformStyle()}
				>
					{words[currentIndex]}
				</span>
			</div>
			<span className="text-primary">{heading}</span>
		</h1>
	)
}
