import { URLField } from "@agility/nextjs"

export interface ILink {
	title: string
	uRL: URLField
	description?: string
}