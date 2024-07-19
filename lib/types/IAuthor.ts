import { ImageField } from "@agility/nextjs"

export interface IAuthor {
	title: string
	jobTitle?: string
	image?: ImageField
	textBlob?: string
}