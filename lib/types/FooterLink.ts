import { URLField } from "@agility/nextjs"

export interface FooterLink {
	title: string
	description?: string
	uRL?: URLField
	/** Boolean fields come down as strings from Agility CMS */
	header?: string
}
