import { UnloadedModuleProps, URLField } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import { BestofBothWorlds2ParagraphsClient } from "./BestofBothWorlds2Paragraphs.client"

export interface IBestofBothWorlds2Paragraphs {
	marketerHeading: string
	marketerContent: string
	marketerCTA?: URLField

	developerHeading: string
	developerContent: string
	developerCTA?: URLField
}

export const BestofBothWorlds2Paragraphs = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<IBestofBothWorlds2Paragraphs>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	return (
		<Container
			id={`${contentID}`}
			data-agility-component={contentID}
			className="best-of-both-worlds mx-auto max-w-7xl"
		>
			<BestofBothWorlds2ParagraphsClient {...fields} />
		</Container>
	)
}
