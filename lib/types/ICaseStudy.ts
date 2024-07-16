import { ImageField } from "@agility/nextjs"

export interface ICaseStudy {
	title: string
	textblob?: string
	clientNames?: string
	metaTitle?: string
	excerpt?: string
	uRL?: string
	customerLogo?: ImageField
	customerWhiteLogo?: ImageField
}