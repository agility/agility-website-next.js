import { ContentItem, ImageField } from "@agility/nextjs"
import { IAuthor } from "./IAuthor"
import { IResourceType } from "./IResourceType"
import { IResourceTopic } from "./IResourceTopic"
import { IEmptyContentItem } from "./IEmptyContentItem"



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
	resourceType?: ContentItem<IResourceType> | IEmptyContentItem,
	resourceTopic?: ContentItem<IResourceTopic>,
	image?: ImageField,
	excerpt?: string
	resourceHeading?: string
	resourceButtonText?: string
	thankYouContent?: string
}