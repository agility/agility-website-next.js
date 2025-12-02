import { UnloadedModuleProps, ImageField, ContentItem, renderHTML } from "@agility/nextjs"

import { Container } from "components/micro/Container"

import { getContentItem } from "lib/cms/getContentItem"
import { getContentList } from "lib/cms/getContentList"
import { CardStylePanel } from "./CardStylePanel"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"
import { VerticleStylePanel } from "./VerticleStylePanel.client"

interface VerticalPanel {
	title: string
	description: string
	graphic: ImageField
}

interface IVerticalContentPanel {
	title?: string
	description?: string
	textSide: "right" | "left"
	cardStyle: "true" | "false"
	darkMode: "true" | "false"
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

	const panels = resPanels.items as ContentItem<VerticalPanel>[]

	return (
		<div id={`${contentID}`} data-agility-component={contentID} className="px-1 sm:px-8 pt-14">
			<div className="mx-auto max-w-5xl text-center">
				{title && <h1 className="text-balance text-4xl dark:text-white">{title}</h1>}
				{description && (
					<div
						className="vertical-content-panel-desc mt-3 text-xl dark:text-gray-300 dark:prose-invert"
						dangerouslySetInnerHTML={renderHTMLCustom(description)}
					/>
				)}
			</div>

			<div className="mx-auto mt-14 max-w-7xl">
				{fields.cardStyle === "true" ? (
					<CardStylePanel
						contentID={contentID}
						textSide={textSide}
						darkMode={fields.darkMode === "true"}
						panels={panels.map((p) => p.fields)}
					/>
				) : (
					<VerticleStylePanel
						contentID={contentID}
						textSide={textSide}

						panels={panels.map((p) => p.fields)}
					/>
				)}
			</div>
		</div>
	)
}
