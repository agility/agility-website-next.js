import { ImageField, URLField } from "@agility/nextjs"
import { ContentItem } from "@agility/content-fetch"
import exp from "constants"

export interface ICaseStudy {
	title: string
	textblob?: string
	clientNames?: string
	metaTitle?: string
	excerpt?: string
	uRL?: string
	customerLogo: ImageField
	customerWhiteLogo?: ImageField
	image: ImageField
	cTA?: any
	caseStudyIndustries?: ContentItem<IIndustry>[]
	caseStudyChallenges?: ContentItem<IChallenge>[]
	contentPanelCopy?: string
	topContent?: string
	gallery: {
		galleryID: number,
		name: string,
		description: string | null,
		media: any[],
		count: number
	},
	bottomContent?: string
	quote?: string
	metrics?: {
		referencename: string
	}
	brandFGColor?: string
	brandBGColor?: string
	imagePosition?: string
	productsRenderType?: string
	rotatorTitle?: string
	rotatorCTAbuttonText?: string
	rotatorCaseStudies?: ContentItem<ICaseStudy>[]
	relatedResources?: ContentItem<any>[]



}

export interface IIndustry {
	title: string
}

export interface IChallenge {
	title: string
}

export interface IMetric {
	key: string
	value: string
}