import { ImageField, UnloadedModuleProps } from "@agility/nextjs"
import { getContentItem } from "lib/cms/getContentItem"
import { getContentList } from "lib/cms/getContentList"
import { TwoPanelFeatureComparisonClient } from "./TwoPanelFeatureComparison.client"
import { ContentItem } from "@agility/content-fetch"

export interface ITwoPanelFeatureComparison {
	group1Title?: string
	group2Title?: string

	group1Panels: {
		referencename: string
		fulllist: boolean
	}

	group2Panels: {
		referencename: string
		fulllist: boolean
	}
}

export interface IPanelItem {
	title: string
	description: string
	graphic: ImageField
	graphicLocation: "left" | "right"
	checkedItems: ContentItem<CheckedItem>[]
}

interface CheckedItem {
	title: string
	textblob?: string | null
}

export const TwoPanelFeatureComparison = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<ITwoPanelFeatureComparison>({
		contentID: module.contentid,
		languageCode
	})

	//get the data for the group panels
	const group1Panels = await getContentList({
		referenceName: fields.group1Panels.referencename,
		languageCode
	})

	const group2Panels = await getContentList({
		referenceName: fields.group2Panels.referencename,
		languageCode
	})

	return (
		<TwoPanelFeatureComparisonClient
			{...{
				group1Title: fields.group1Title,
				group2Title: fields.group2Title,
				group1Panels: group1Panels.items,
				group2Panels: group2Panels.items
			}}
		/>
	)
}
