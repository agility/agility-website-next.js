import { ImageField, URLField } from "@agility/nextjs"
import { ContentItem } from "@agility/content-fetch"

export interface IFramework {
	title: string
	logo: ImageField
}

export interface IStarterTemplate {
	name: string
	metaTitle: string
	slug: string
	showOnWebsite: string
	showInContentManager: string
	documentationLink: URLField
	previewURL: string
	image: ImageField
	frameworks: ContentItem<IFramework>[],
	githubLink: string
	environmentVariables: string
	templateID: string,
	qATemplateID: string,

	description: string
	details: string
	startfreeproject: URLField
}