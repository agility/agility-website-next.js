/* eslint-disable @next/next/no-img-element */
"use client"

import { AgilityPic, ImageField } from "@agility/nextjs"
import clsx from "clsx"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"
import styles from "./VerticalContentPanel.module.css"

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

export const CardStylePanel = ({ contentID, panels, textSide }: Props) => {
	const idStr = `module-${contentID}`
	const numCards = panels.length

	return (
		<div className="vertical-content-panel-container">
			<ul
				className={clsx(styles['vertical-cards-list'], "list-none p-0 m-0")}
				style={{ "--numcards": numCards } as React.CSSProperties}
			>
				{panels.map((panel, index) => (
					<li
						key={`${idStr}-${index}`}
						className={clsx(styles['vertical-card'], "sticky top-0 min-h-[60vh] flex items-center py-8 px-4 md:px-0")}
						style={{
							"--index": index + 1
						} as React.CSSProperties}
					>
						<div
							className={clsx(
								styles['vertical-card__content'],
								"w-full max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-white",
								"flex flex-col md:flex-row items-center gap-8 px-4 py-8 md:p-12",
								textSide === "right" ? "md:flex-row" : "md:flex-row-reverse"
							)}
						>
							{/* Image/Graphic - Shows first on mobile */}
							<div className="flex-1 flex items-center justify-center w-full md:w-auto">
								{panel.graphic && (
									<>
										{panel.graphic.url.endsWith(".svg") ? (
											<img
												src={panel.graphic.url}
												alt={panel.title}
												className="max-h-[250px] md:max-h-[400px] max-w-[80%] md:max-w-full object-contain"
											/>
										) : (
											<AgilityPic
												image={panel.graphic}
												className="max-h-[250px] md:max-h-[400px] max-w-[80%] md:max-w-full object-contain"
												fallbackWidth={600}
											/>
										)}
									</>
								)}
							</div>

							{/* Text Content */}
							<div className="flex-1 w-full">
								<h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4 text-center md:text-left">
									{panel.title}
								</h2>
								<div
									className="vertical-content-panel-desc prose-sm md:prose "
									dangerouslySetInnerHTML={renderHTMLCustom(panel.description)}
								/>
							</div>
						</div>
					</li>
				))}
			</ul>

			{/* Minimal spacer to ensure last card has some scroll room */}
			<div className="h-[52px]" />
		</div>
	)
}
