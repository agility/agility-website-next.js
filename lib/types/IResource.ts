import { ContentItem, ImageField, URLField } from "@agility/nextjs"
import { IAuthor } from "./IAuthor"
import { IResourceType } from "./IResourceType"
import { IResourceTopic } from "./IResourceTopic"
import { IEmptyContentItem } from "./IEmptyContentItem"
import { IEvent } from "./IEvent"



export interface IResource {
	title: string,
	textblob?: string,
	metaTitle?: string,
	uRL: string,
	subTitle?: string,
	gated?: 'true' | 'false',
	formTitle?: string
	author?: ContentItem<IAuthor>,
	date?: string,
	resourceTypeName?: string,
	resourceType?: ContentItem<IResourceType> | IEmptyContentItem,
	resourceTopics?: ContentItem<IResourceTopic>[],
	topWebinars?: ContentItem<IResource>[],
	topReads?: ContentItem<IResource>[],
	image?: ImageField,
	bookCover?: ImageField,
	excerpt?: string
	resourceItem?: ContentItem<IResource>,
	resourceHeading?: string
	resourceButtonText?: string
	thankYouContent?: string
	rightColumnCTATitle?: string
	rightCTAContent?: string
	rightCTAButton?: URLField
	uRLGatedContent?: string
}