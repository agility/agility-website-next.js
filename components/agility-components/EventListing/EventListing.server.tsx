import React from "react"

import { useAgilityContext } from "lib/cms/useAgilityContext"
import { EventListingClient } from "./EventListing.client"
import { getContentItem } from "lib/cms/getContentItem"
import { renderHTML, UnloadedModuleProps } from "@agility/nextjs"
import { getEventListing } from "lib/cms-content/getEventListing"
import { Container } from "components/micro/Container"
import { ThreeDashLine } from "components/micro/ThreeDashLine"

interface IEventListing {
	title?: string
	subTitle?: string
	anchorName: string
	showPastEventsOnly: string

	viewDetailsLabel: string
	backLabel: string
	registerLabel: string
}

export interface GetNextProps {
	skip: number
	take: number
}

export const EventListing = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { sitemap, locale } = useAgilityContext()

	const pageSize = 15

	const { fields, contentID } = await getContentItem<IEventListing>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	const upcoming = fields.showPastEventsOnly === "false"

	// assume only 1 page of upcoming events
	const events = await getEventListing({
		locale,
		take: pageSize,
		skip: 0,
		upcoming
	})

	// get next posts for infinite scroll
	const getNext = async ({ skip, take }: GetNextProps) => {
		"use server"

		const nextPastEvents = await getEventListing({
			locale,
			skip,
			take,
			upcoming: !fields.showPastEventsOnly
		})

		return nextPastEvents
	}

	if (events.length === 0) return

	return (
		<Container className="mx-auto max-w-7xl">
			<h2 className="text-center text-5xl font-medium">{fields.title}</h2>
			<ThreeDashLine />
			<div className="prose prose-lg mx-auto mt-5" dangerouslySetInnerHTML={renderHTML(fields.subTitle)}></div>
			<EventListingClient {...{ events, locale, getNext, pageSize }} />
		</Container>
	)
}
