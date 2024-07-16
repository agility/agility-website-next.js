import { ImageField } from "@agility/nextjs"

export interface ITestimonial {
	title: string
	textblob?: string
	jobTitle?: string
	excerpt?: string
	companyName?: string
	companyLogo?: ImageField
	headshot?: ImageField
}