/* eslint-disable @next/next/no-img-element */
"use client"

import { AgilityPic, ImageField, renderHTML } from "@agility/nextjs"
import { Transition, TransitionChild } from "@headlessui/react"
import clsx from "clsx"

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
		<div className={clsx("lg:flex gap-2 items-center", textSide === "right" ? "lg:flex-row-reverse" : "")}>
			<div className="lg:w-1/2 lg:flex lg:flex-col">
				{panels.map((panel, index) => (
					<div
						key={panel.title}
						className="flex flex-col-reverse md:flex-row gap-2 lg:block md:odd:flex-row md:even:flex-row-reverse "
					>
						<label
							className={clsx(
								"block relative lg:cursor-pointer group lg:hover:bg-background p-8 pt-4 transition-colors text-left",
								"lg:has-[:checked]:bg-background ",
								"m-auto md:w-1/2 lg:w-auto"
							)}
							onMouseOver={() => activatePanel(index)}
						>
							<input
								type="radio"
								name={idStr}
								id={`${idStr}-${index}`}
								className="peer h-0 w-0 overflow-hidden"
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
							<h4
								className={clsx(
									"text-lg lg:group-hover:text-highlight-light font-medium transition-colors lg:peer-checked:text-highlight-light"
								)}
							>
								{panel.title}
							</h4>

							<div className="w-0.5 h-0 lg:group-hover:h-full lg:peer-checked:h-full transition-all duration-300 bg-highlight-light absolute top-0 left-0"></div>
							<div className="mt-2 prose" dangerouslySetInnerHTML={renderHTML(panel.description)}></div>
						</label>
						<div className="lg:hidden md:w-1/2 ">
							{panels[activePanel].graphic.url.endsWith(".svg") ? (
								<img src={panels[activePanel].graphic.url} alt="" className="w-full" />
							) : (
								<AgilityPic image={panel.graphic} className="w-full" fallbackWidth={600} />
							)}
						</div>
					</div>
				))}
			</div>
			<div className="w-1/2 hidden lg:block">
				<Transition show={open} as={"div"} className={"relative"}>
					<TransitionChild>
						<div
							className={clsx(
								"absolute top-0 left-0",
								"transition-all duration-300 data-[closed]:duration-0 ease-in",
								"data-[closed]:opacity-0 data-[closed]:h-0 h-auto",
								"data-[closed]:mt-10 mt-0"
							)}
						>
							<img src="/assets/layout/layer-content-image.png" alt="" />
						</div>
					</TransitionChild>

					<TransitionChild>
						<div
							className={clsx(
								"transition-all duration-300 data-[closed]:duration-0 ease-in",
								"data-[closed]:opacity-0 data-[closed]:h-0 h-auto",
								"data-[closed]:mt-10 mt-0"
							)}
						>
							{panels[activePanel].graphic.url.endsWith(".svg") ? (
								<img src={panels[activePanel].graphic.url} alt="" className="w-full relative" />
							) : (
								<AgilityPic
									image={panels[activePanel].graphic}
									className="w-full relative z-10"
									fallbackWidth={600}
								/>
							)}
						</div>
					</TransitionChild>
				</Transition>
			</div>
		</div>
	)
}
