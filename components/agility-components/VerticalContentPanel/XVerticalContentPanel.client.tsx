/* eslint-disable @next/next/no-img-element */
"use client"

import { AgilityPic, ImageField, renderHTML } from "@agility/nextjs"
import { Transition, TransitionChild } from "@headlessui/react"
import clsx from "clsx"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"

import { Fragment, useEffect, useState } from "react"

interface VerticalPanel {
	title: string
	description: string
	graphic: ImageField
}

interface Props {
	contentID: number
	textSide: "right" | "left"
	panels: VerticalPanel[]
}

export const VerticalContentPanelClient = ({ contentID, panels, textSide }: Props) => {
	const idStr = `module-${contentID}`

	const activatePanel = (index: number) => {
		document.getElementById(`${idStr}-${index}`)?.click()
	}

	const [activePanel, setActivePanel] = useState(0)
	const [open, setOpen] = useState(true)

	return (
		<div className={clsx("items-center gap-2 lg:flex", textSide === "right" ? "lg:flex-row-reverse" : "")}>
			<div className="lg:flex lg:w-1/2 lg:flex-col">
				{panels.map((panel, index) => (
					<div
						key={panel.title}
						className="flex flex-col-reverse gap-2 md:flex-row md:odd:flex-row md:even:flex-row-reverse lg:block"
					>
						<label
							className={clsx(
								"group relative block p-8 pt-4 text-left transition-colors lg:cursor-pointer lg:hover:bg-background",
								"lg:has-[:checked]:bg-background",
								"m-auto md:w-1/2 lg:w-auto"
							)}
							onMouseOver={() => activatePanel(index)}
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
										setOpen(false)

										setTimeout(() => {
											setActivePanel(index)
											setOpen(true)
										}, 300)
									}}
								/>
							</div>
							<h4
								className={clsx(
									"text-lg font-medium transition-colors lg:group-hover:text-highlight-light lg:peer-checked:text-highlight-light"
								)}
							>
								{panel.title}
							</h4>

							<div className="absolute left-0 top-0 h-0 w-0.5 bg-highlight-light transition-all duration-300 lg:group-hover:h-full lg:peer-checked:h-full"></div>
							<div className="prose mt-2" dangerouslySetInnerHTML={renderHTMLCustom(panel.description)}></div>
						</label>
						<div className="flex items-center justify-center md:w-1/2 lg:hidden">
							{panels[activePanel].graphic.url.endsWith(".svg") ? (
								<img
									src={panels[activePanel].graphic.url}
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
						</div>
					</div>
				))}
			</div>
			<div className="hidden w-1/2 items-center justify-center overflow-clip lg:flex">
				<Transition
					show={open}
					as={"div"}
					className={"relative flex h-[450px] w-[450px] items-center justify-center"}
				>
					<TransitionChild>
						<div
							className={clsx(
								"absolute left-0 top-0",
								"transition-all duration-300 ease-in data-[closed]:duration-0",
								"h-auto data-[closed]:h-0 data-[closed]:opacity-0",
								"mt-0 data-[closed]:mt-10"
							)}
						>
							<img
								src="https://static.agilitycms.com/layout/static/layer-content-image.png?format=auto"
								alt=""
							/>
						</div>
					</TransitionChild>

					<TransitionChild>
						<div
							className={clsx(
								"transition-all duration-300 ease-in data-[closed]:duration-0",
								"h-auto data-[closed]:h-0 data-[closed]:opacity-0",
								"mt-0 h-full data-[closed]:mt-10",
								"flex items-center justify-center"
							)}
						>
							<div className="relative h-96 w-96">
								{panels[activePanel].graphic.url.endsWith(".svg") ? (
									<img
										src={panels[activePanel].graphic.url}
										alt=""
										className="relative z-10 h-full bg-white object-contain"
									/>
								) : (
									<AgilityPic
										image={panels[activePanel].graphic}
										className="relative z-10 mx-auto h-full bg-white object-contain"
										fallbackWidth={600}
									/>
								)}
							</div>
						</div>
					</TransitionChild>
				</Transition>
			</div>
		</div>
	)
}
