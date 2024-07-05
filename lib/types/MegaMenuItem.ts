import { ImageField, URLField } from "@agility/nextjs"

export interface MegaMenuItem {
	title?: string
	description?: string
	imageorIcon?: ImageField
	uRL?: URLField

}