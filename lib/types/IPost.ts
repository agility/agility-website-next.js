import { ImageField, ContentItem, URLField } from "@agility/nextjs"
import { IResource } from "./IResource"

export interface IPost {
	title: string
	metaTitle?: string
	subTitle?: string
	excerpt?: string
	uRL: string
	date: string
	textblob: string
	postImage?: ImageField
	displayImageinPost?: string
	categories: ContentItem<IPostCategory>
	categoriesTitle?: string
	cTATitle?: string
	titleRightCTA?: string
	contentRightCTA?: string
	buttonRightCTA?: URLField

	titleRelatedResources?: string
	resourcesList?: ContentItem<IPost>[]
	author?: ContentItem<IPostAuthor>
	blogTags?: ContentItem<IPostCategory>[]


}

export interface IPostCategory {
	title: string
}

export interface IPostAuthor {
	title: string
	textBlob?: string
	image?: ImageField
}