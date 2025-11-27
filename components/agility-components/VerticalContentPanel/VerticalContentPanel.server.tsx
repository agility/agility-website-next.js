import { UnloadedModuleProps, ImageField, ContentItem, renderHTML } from "@agility/nextjs"

import { Container } from "components/micro/Container"

import { getContentItem } from "lib/cms/getContentItem"
import { getContentList } from "lib/cms/getContentList"
import { VerticalContentPanelClient } from "./VerticalContentPanel.client"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"

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

	const panels = resPanels.items as ContentItem<VerticalPanel>[]

	return (
		<Container id={`${contentID}`} data-agility-component={contentID}>
			<div className="mx-auto max-w-5xl text-center">
				{title && <h1 className="text-balance text-4xl">{title}</h1>}
				{description && (
					<div
						className="vertical-content-panel-desc mt-3 text-xl"
						dangerouslySetInnerHTML={renderHTMLCustom(description)}
					/>
				)}
			</div>

			<div className="mx-auto mt-14 max-w-7xl">
				<VerticalContentPanelClient
					contentID={contentID}
					textSide={textSide}
					panels={panels.map((p) => p.fields)}
				/>
			</div>
		</Container>
	)
}
