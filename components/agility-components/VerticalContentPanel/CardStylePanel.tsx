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
	darkMode: boolean
}

export const CardStylePanel = ({ contentID, panels, textSide, darkMode }: Props) => {
	const idStr = `module-${contentID}`
	const numCards = panels.length

	return (
		<div className="vertical-content-panel-container vertical-content-panel-container--card-style">
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
								"w-full max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-2xl",
								"bg-white dark:bg-gray-800",
								"flex flex-col md:flex-row items-center gap-8 px-4 py-8 md:p-12",
								textSide === "right" ? "md:flex-row" : "md:flex-row-reverse"
							)}
						>
							{/* Image/Graphic - Shows first on mobile */}
							<div className="flex-1 flex items-center justify-center w-full md:w-auto">
								{panel.graphic && (
									<div className="relative flex items-center justify-center max-w-full">
										{/* Background image */}
										<div className="absolute left-0 top-0">
											<img
												src="https://static.agilitycms.com/layout/static/layer-content-image.png?format=auto"
												alt=""
												className="max-h-[250px] md:max-h-[400px] max-w-[250px] md:max-w-[400px]"
											/>
										</div>
										{/* Main graphic overlay */}
										<div className="relative flex items-center justify-center max-h-[200px] max-w-[200px] md:max-h-[350px] md:max-w-[350px]">
											{panel.graphic.url.endsWith(".svg") ? (
												<img
													src={panel.graphic.url}
													alt={panel.title}
													className="max-h-full max-w-full object-contain"
												/>
											) : (
												<AgilityPic
													image={panel.graphic}
													className="max-h-full max-w-full object-contain"
													fallbackWidth={600}
												/>
											)}
										</div>
									</div>
								)}
							</div>

							{/* Text Content */}
							<div className="flex-1 w-full">
								<h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4 text-center md:text-left text-gray-900 dark:text-white">
									{panel.title}
								</h2>
								<div
									className="vertical-content-panel-desc prose-sm md:prose dark:prose-invert"
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
