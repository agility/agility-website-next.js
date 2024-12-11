/* eslint-disable @next/next/no-img-element */
import { UnloadedModuleProps, ImageField, ContentItem, renderHTML, AgilityPic } from "@agility/nextjs"

import { Container } from "components/micro/Container"

import { getContentItem } from "lib/cms/getContentItem"
import { getContentList } from "lib/cms/getContentList"
import { VerticalContentPanelClient } from "./XVerticalContentPanel.client"
import clsx from "clsx"

interface VerticalPanel {
	title: string
	description: string
	graphic: ImageField
}

interface IVerticalContentPanel {
	title?: string
	description?: string
	textSide: "right" | "left"
	verticalContentPanels: {
		referencename: string
		fulllist: boolean
	}
}

export const VerticalContentPanelServer = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<IVerticalContentPanel>({
		contentID: module.contentid,
		languageCode
	})

	const { description, title, verticalContentPanels, textSide } = fields

	const resPanels = await getContentList({ referenceName: verticalContentPanels.referencename, languageCode })

	const lstPanels = resPanels.items as ContentItem<VerticalPanel>[]
	const panels = lstPanels.map((p) => p.fields)

	return (
		<Container id={`${contentID}`} data-agility-component={contentID}>
			<div className="mx-auto max-w-5xl text-center">
				{title && <h1 className="text-balance text-4xl">{title}</h1>}
				{description && (
					<div
						className="vertical-content-panel-desc mt-3 text-xl"
						dangerouslySetInnerHTML={renderHTML(description)}
					/>
				)}
			</div>

			<div className="mx-auto mt-14 max-w-6xl">
				<div className={clsx("space-y-12")}>
					{panels.map((panel, index) => (
						<div
							key={panel.title}
							className={clsx(
								"flex flex-col-reverse gap-6 md:flex-row md:px-12 lg:gap-12",
								textSide === "left"
									? "md:odd:flex-row md:even:flex-row-reverse"
									: "md:odd:flex-row-reverse md:even:flex-row"
							)}
						>
							<div className={clsx("group relative block text-left", "m-auto md:w-2/3")}>
								<h4 className={clsx("text-2xl font-medium")}>{panel.title}</h4>

								<div
									className="prose mt-4 max-w-full"
									dangerouslySetInnerHTML={renderHTML(panel.description)}
								></div>
							</div>
							<div className="flex items-center justify-center md:w-1/3">
								{panel.graphic.url.endsWith(".svg") ? (
									<img
										src={panel.graphic.url}
										alt={panel.graphic.label}
										className="max-h-[300px] w-full max-w-[300px]"
									/>
								) : (
									<AgilityPic
										image={panel.graphic}
										className="max-h-[300px] w-full max-w-[300px]"
										fallbackWidth={300}
									/>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</Container>
	)
}
