import { ContentItem, ImageField } from "@agility/nextjs"
import { IAuthor } from "./IAuthor"
import { IResourceType } from "./IResourceType"
import { IResourceTopic } from "./IResourceTopic"

export interface IResource {
	title?: string,
	textblob?: string,
	metaTitle?: string,
	uRL?: string,
	subTitle?: string,
	gated?: 'true' | 'false',
	formTitle?: string
	author?: ContentItem<IAuthor>,
	date?: string,
	resourceType?: ContentItem<IResourceType>,
	resourceTopic?: ContentItem<IResourceTopic>,
	image?: ImageField,
	excerpt?: string
	resourceHeading?: string
	resourceButtonText?: string
	thankYouContent?: string
}