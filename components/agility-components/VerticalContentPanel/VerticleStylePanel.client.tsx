/* eslint-disable @next/next/no-img-element */
"use client"

import { AgilityPic, ImageField, renderHTML } from "@agility/nextjs"
import { Transition, TransitionChild } from "@headlessui/react"
import clsx from "clsx"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"

import { Fragment, useEffect, useRef, useState } from "react"

interface VerticalPanel {
	title: string
	description: string
	graphic?: ImageField
}

interface Props {
	contentID: number
	textSide: "right" | "left"
	panels: VerticalPanel[]
}

export const VerticleStylePanel = ({ contentID, panels, textSide }: Props) => {
	const idStr = `module-${contentID}`

	const activatePanel = (index: number) => {
		document.getElementById(`${idStr}-${index}`)?.click()
	}

	const [activePanel, setActivePanel] = useState(0)
	const [open, setOpen] = useState(true)
	const panelRefs = useRef<(HTMLDivElement | null)[]>([])
	const containerRef = useRef<HTMLDivElement | null>(null)
	const isHovering = useRef(false)

	// Handle resize to ensure images load properly when switching between screen sizes
	useEffect(() => {
		const handleResize = () => {
			// Force re-render without flickering
			setOpen(true)
		}

		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [])

	// Set up Intersection Observer for scroll-based activation
	useEffect(() => {
		const observers: IntersectionObserver[] = []

		const observerOptions = {
			root: null,
			rootMargin: "-50% 0px -50% 0px",
			threshold: 0
		}

		panelRefs.current.forEach((panelRef, index) => {
			if (panelRef) {
				const observer = new IntersectionObserver((entries) => {
					entries.forEach((entry) => {
						// Only activate on scroll if not hovering
						if (entry.isIntersecting && activePanel !== index && !isHovering.current) {
							setActivePanel(index)
						}
					})
				}, observerOptions)

				observer.observe(panelRef)
				observers.push(observer)
			}
		})

		return () => {
			observers.forEach((observer) => observer.disconnect())
		}
	}, [panels.length, activePanel])

	return (
		<div ref={containerRef} className={clsx("vertical-content-panel-container--vertical-style items-center gap-2 lg:flex", textSide === "right" ? "lg:flex-row-reverse" : "")}>
			<div className="lg:flex lg:w-1/2 lg:flex-col">
				{panels.map((panel, index) => (
					<div
						key={panel.title}
						ref={(el) => {
							panelRefs.current[index] = el
						}}
						className="flex flex-col-reverse gap-2 md:flex-row md:odd:flex-row md:even:flex-row-reverse lg:block"
					>
						<label
							className={clsx(
								"group relative block p-8 pt-4 text-left transition-colors lg:cursor-pointer lg:hover:bg-background",
								"lg:has-[:checked]:bg-background",
								"m-auto md:w-1/2 lg:w-auto"
							)}
							onMouseEnter={() => {
								isHovering.current = true
								activatePanel(index)
							}}
							onMouseLeave={() => {
								isHovering.current = false
							}}
						>
							<div className="invisible">
								<input
									type="radio"
									name={idStr}
									id={`${idStr}-${index}`}
									className="-top-100 -left-100 peer absolute h-0 w-0 overflow-hidden"
									value={index}
									checked={activePanel === index}
									onChange={() => {
										setActivePanel(index)
									}}
								/>
							</div>
							<h4
								className={clsx(
									"text-base font-bold transition-colors lg:group-hover:text-highlight-light lg:peer-checked:text-highlight-light"
								)}
							>
								{panel.title}
							</h4>

							<div className={clsx(
								"absolute left-0 top-0 w-0.5 bg-highlight-light transition-all duration-300",
								activePanel === index ? "h-full" : "h-0 lg:group-hover:h-full"
							)}></div>
							<div className="vertical-content-panel-desc prose mt-2 " dangerouslySetInnerHTML={renderHTMLCustom(panel.description)}></div>
						</label>
						<div className="flex items-center justify-center md:w-1/2 lg:hidden">
							{panel?.graphic &&
								<>
									{panel.graphic.url.endsWith(".svg") ? (
										<img
											src={panel.graphic.url}
											alt=""
											className="max-h-[400px] max-w-[400px]"
										/>
									) : (
										<AgilityPic
											image={panel.graphic}
											className="max-h-[400px] max-w-[400px]"
											fallbackWidth={400}
										/>
									)}
								</>
							}
						</div>
					</div>
				))}
			</div>
			<div className="hidden w-1/2 items-center justify-center overflow-clip lg:flex">
				<div className="relative flex h-[450px] w-[450px] items-center justify-center">
					<div className="absolute left-0 top-0">
						<img
							src="https://static.agilitycms.com/layout/static/layer-content-image.png?format=auto"
							alt=""
						/>
					</div>

					<div className="relative h-96 w-96 flex items-center justify-center">
						{panels.map((panel, index) => (
							panel?.graphic && (
								<div
									key={index}
									className={clsx(
										"absolute inset-0 flex items-center justify-center transition-opacity duration-150 ease-in-out",
										activePanel === index ? "opacity-100 z-10" : "opacity-0 z-[5]"
									)}
								>
									{panel.graphic.url.endsWith(".svg") ? (
										<img
											src={panel.graphic.url}
											alt=""
											className="h-full bg-white object-contain"
										/>
									) : (
										<AgilityPic
											image={panel.graphic}
											className="mx-auto h-full bg-white object-contain"
											fallbackWidth={600}
										/>
									)}
								</div>
							)
						))}
					</div>
				</div>
			</div>
		</div>
	)
}