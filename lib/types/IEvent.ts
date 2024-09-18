import { ContentItem } from "@agility/content-fetch"
import { ImageField, URLField } from "@agility/nextjs"

export interface IEventType {
	title: string
}

export interface IEventOrganizer {
	title: string
	textblob?: string | null
	image?: ImageField
}

export interface IEvent {
	title: string
	textblob: string
	metaTitle?: string
	uRL: string
	eventType: ContentItem<IEventType>
	organizer: ContentItem<IEventOrganizer>

	address: string
	date: string
	externalLink?: URLField
	description: string
	mainImage?: ImageField
	noLinkText?: string
}