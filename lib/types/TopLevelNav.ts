import { URLField } from "@agility/nextjs"

export interface TopLevelNav {
	title: string
	uRL: URLField
	subNavigation: {
		referencename: string,
		fulllist: boolean
	}
	megaTitle: string
	megaContent: {
		referencename: string,
		fulllist: boolean
	}
	linkorSpotlight: string
}