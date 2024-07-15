"use client"

import { AgilityPic, ImageField, renderHTML } from "@agility/nextjs"
import { Transition } from "@headlessui/react"
import clsx from "clsx"

import { Fragment, useEffect, useState } from "react"

interface VerticalPanel {
	title: string
	description: string
	graphic: ImageField
}

interface Props {
	contentID: number
	panels: VerticalPanel[]
}

export const VerticalContentPanelClient = ({ contentID, panels }: Props) => {
	const idStr = `module-${contentID}`

	// const activatePanel = (index: number) => {
	// 	document.getElementById(`${idStr}-${index}`)?.click()
	// }

	const [activePanel, setActivePanel] = useState(0)
	const [open, setOpen] = useState(true)

	useEffect(() => {
		console.log("RENDERED")
	}, [])

	return (
		<div className="lg:flex gap-2 items-center">
			<div className="lg:w-1/2 lg:flex lg:flex-col">
				{panels.map((panel, index) => (
					<div key={panel.title} className="md:flex gap-2 lg:block md:even:flex-row-reverse">
						<label
							className={clsx(
								"block relative lg:cursor-pointer group lg:hover:bg-background p-8 transition-colors text-left",
								"lg:has-[:checked]:bg-background lg:focus-within:bg-background",
								"m-auto md:w-1/2 lg:w-auto"
							)}
							//onMouseOver={() => activatePanel(index)}
						>
							<h4
								className={clsx(
									"text-lg lg:group-hover:text-highlight-light font-medium transition-colors"
								)}
							>
								{panel.title}
							</h4>
							<div className="mt-2 prose" dangerouslySetInnerHTML={renderHTML(panel.description)}></div>
							<input
								type="radio"
								name={idStr}
								id={`${idStr}-${index}`}
								className="peer h-0 w-0 overflow-hidden"
								value={index}
								checked={activePanel === index}
								onChange={() => {
									console.log("ACTIVE PANEL", index)
									setOpen(false)

									setTimeout(() => {
										setActivePanel(index)
										setOpen(true)
									}, 300)
								}}
							/>
							<div className="w-0.5 h-0 lg:group-hover:h-full lg:peer-checked:h-full transition-all duration-300 bg-highlight-light absolute top-0 left-0"></div>
						</label>
						<div className="lg:hidden md:w-1/2 ">
							<AgilityPic image={panel.graphic} className="w-full" fallbackWidth={600} />
							<img src="/assets/layout/layer-content-image.png" alt="" className="w-full" />
						</div>
					</div>
				))}
			</div>
			<div className="w-1/2 hidden lg:block">
				<Transition show={open}>
					<div className="transition duration-300 ease-in data-[closed]:opacity-0 relative">
						<img src="/assets/layout/layer-content-image.png" alt="" className="absolute top-10 left-10" />

						<AgilityPic
							image={panels[activePanel].graphic}
							className="w-full relative z-10"
							fallbackWidth={600}
						/>
					</div>
				</Transition>
			</div>
		</div>
	)
}
