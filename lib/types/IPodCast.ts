import { ImageField } from "@agility/nextjs"

export interface IPodCast {
	title: string
	textblob: string
	episodeNumber: number
	metaTitle: string
	uRL: string
	date: string
	guest: string
	excerpt: string
	embed: string
	mainImage: ImageField
	listingImage: ImageField
}