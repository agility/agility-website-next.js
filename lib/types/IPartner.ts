import { ImageField, URLField } from "@agility/nextjs"

export interface IPartner {
	title: string

	textblob: string
	companyDescription?: string
	website?: string | URLField
	metaTitle?: string
	partnerLogo?: ImageField
	logo?: ImageField
	uRL: string
	customTags?: any[]
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
	integrationType?: any[]
	overviewHeading?: string
	overviewContent?: string
	overviewItems?: {
		referencename: string
	}
	benefitsHeading?: string
	screenshots?: {
		galleryID: 52,
		media: any[]
		count: number
	}
	setupHeading?: string
	descriptionStepImplementation?: string
	stepIcon?: ImageField
	steps?: {
		referencename: string
	}
	documentationLinks?: {
		referencename: string
	}
	cTA?: URLField

}