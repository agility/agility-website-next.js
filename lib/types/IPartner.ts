import { ImageField } from "@agility/nextjs"

export interface IPartner {
	title: string
	textblob: string
	metaTitle?: string
	partnerLogo: ImageField
	uRL: string
	customTags: any[]
	excerpt: string
	gallery: any
	documentationIntegration: {
		referencename: string
	}
	quote?: string
	metrics: {
		referencename: string
	}
	image: ImageField
	contentPanelCopy: string
	brandFGColor: string
	brandBGColor: string
	imagePosition: "left" | "right"
	productsRenderType: string
	stepsImplementation: {
		referencename: string
	}
	caseStuides: {
		referencename: string
	}



}