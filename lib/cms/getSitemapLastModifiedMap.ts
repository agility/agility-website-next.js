import "server-only"

import { getSitemapFlat } from "lib/cms/getSitemapFlat"
import { getContentItem } from "lib/cms/getContentItem"
import { getContentList } from "lib/cms/getContentList"
import { getPage } from "lib/cms/getPage"
import { SitemapNode } from "lib/types/SitemapNode"
import { ContentItem } from "@agility/content-fetch"
import { ContentZone } from "@agility/content-fetch/dist/types/ContentZone"

/** Maximum items the Agility content-fetch API will return in a single list request. */
const CONTENT_LIST_PAGE_SIZE = 250

/** How many page (zone) lookups to run at once when computing static-page dates. */
const STATIC_PAGE_CONCURRENCY = 10

export interface SitemapLastModifiedParams {
	channelName: string
	languageCode: string
}

/**
 * A map of sitemap path -> the ISO date string that should be used as
 * `<lastmod>` for that URL.
 */
export type SitemapLastModifiedMap = Record<string, string>

/**
 * Parse an Agility "modified" value into a millisecond timestamp.
 *
 * Agility returns ISO strings with no timezone offset (e.g. "2026-07-08T23:06:56.673").
 * JS would interpret those as *local* time, which varies by server. We treat them
 * as UTC so the result is deterministic regardless of where this runs.
 */
const toMillis = (modified?: string | Date | null): number => {
	if (!modified) return 0
	if (modified instanceof Date) {
		const t = modified.getTime()
		return isNaN(t) ? 0 : t
	}
	const hasTimezone = /([zZ])|([+-]\d{2}:?\d{2})$/.test(modified)
	const t = new Date(hasTimezone ? modified : `${modified}Z`).getTime()
	return isNaN(t) ? 0 : t
}

/**
 * Retry a fetch that may transiently fail (the Agility fetch API occasionally
 * returns a 408). The content-fetch SDK logs the error and resolves to
 * `undefined` rather than throwing, so we retry on a null/undefined result as
 * well as on a thrown error. Returns undefined if every attempt fails.
 */
const withRetry = async <T>(fn: () => Promise<T>, attempts = 3): Promise<T | undefined> => {
	for (let attempt = 0; attempt < attempts; attempt++) {
		try {
			const result = await fn()
			if (result !== undefined && result !== null) return result
		} catch {
			/* transient — fall through and retry */
		}
	}
	return undefined
}

/** Run an async mapper over items with a bounded number of concurrent workers. */
const mapWithConcurrency = async <T>(
	items: T[],
	limit: number,
	worker: (item: T) => Promise<void>
): Promise<void> => {
	let cursor = 0
	const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
		while (cursor < items.length) {
			const index = cursor++
			await worker(items[index])
		}
	})
	await Promise.all(runners)
}

/**
 * Build a map of sitemap path -> lastmod date for every sitemap-visible URL.
 *
 * - Dynamic pages (sitemap node has a `contentID`) use the modified date of the
 *   backing content item — i.e. the date the actual content changed. To avoid a
 *   per-URL API call (there can be thousands), dynamic nodes are grouped by their
 *   dynamic page template (`pageID`) and each template's content list is fetched
 *   in bulk — a handful of calls instead of one-per-URL.
 * - Static pages use the most recent of (the page object itself, and every module
 *   /content item on the page), so publishing new content into a page updates its date.
 *
 * Every underlying fetch is individually cached + publish-invalidated via the
 * existing Agility cache tags, so this is cheap in steady state; a cold rebuild
 * touches roughly (#dynamic templates * 2) + (#static pages) requests.
 */
export const getSitemapLastModifiedMap = async ({
	channelName,
	languageCode,
}: SitemapLastModifiedParams): Promise<SitemapLastModifiedMap> => {

	const sitemap = (await withRetry(() => getSitemapFlat({ channelName, languageCode }))) as
		| Record<string, SitemapNode>
		| undefined

	// Without a sitemap there are no URLs to emit; return empty rather than throw
	// so a transient API failure can never fail the build.
	if (!sitemap) return {}

	// Only real, sitemap-visible URLs (skip folders, redirects and hidden pages).
	const entries = Object.entries(sitemap).filter(([, node]) => {
		if (!node) return false
		if (node.isFolder || node.redirect) return false
		if (!node.visible?.sitemap) return false
		return true
	})

	const dynamicEntries = entries.filter(([, node]) => typeof node.contentID === "number")
	const staticEntries = entries.filter(([, node]) => typeof node.contentID !== "number")

	const result: SitemapLastModifiedMap = {}

	// --- Dynamic pages -------------------------------------------------------
	// Group by the dynamic page template so we can bulk-load each list once.
	const dynamicByTemplate = new Map<number, SitemapNode[]>()
	for (const [, node] of dynamicEntries) {
		const group = dynamicByTemplate.get(node.pageID) ?? []
		group.push(node)
		dynamicByTemplate.set(node.pageID, group)
	}

	// contentID -> modified (millis) across every dynamic template.
	const contentModified = new Map<number, number>()

	await Promise.all(
		Array.from(dynamicByTemplate.values()).map(async (nodes) => {
			// A failure here must never reject the whole build — any dates we can't
			// resolve in bulk fall through to the per-item pass below.
			try {
				// Learn the content list's reference name from one representative item.
				const sample = await withRetry(() =>
					getContentItem<Record<string, unknown>>({
						contentID: nodes[0].contentID as number,
						languageCode,
					})
				)
				const referenceName = sample?.properties?.referenceName
				if (sample?.properties?.modified) {
					contentModified.set(sample.contentID, toMillis(sample.properties.modified))
				}

				if (!referenceName) return

				// Page through the whole list, recording every item's modified date.
				// No sort — we read every item into a map keyed by contentID, so order
				// is irrelevant and sorting only adds load (and timeout risk) server-side.
				let skip = 0
				let total = Number.POSITIVE_INFINITY
				while (skip < total) {
					const list = await withRetry(() =>
						getContentList({
							referenceName,
							languageCode,
							take: CONTENT_LIST_PAGE_SIZE,
							skip,
						})
					)

					// Give up this template's remaining pages on a persistent failure;
					// the per-item fallback pass fills any gaps.
					if (!list?.items) break

					total = list.totalCount ?? list.items.length
					for (const item of list.items) {
						contentModified.set(item.contentID, toMillis(item.properties?.modified))
					}
					if (list.items.length === 0) break
					skip += CONTENT_LIST_PAGE_SIZE
				}
			} catch {
				/* fall back to per-item fetches below */
			}
		})
	)

	// Assign dynamic dates; fetch individually for any contentID the bulk pass missed.
	const missingDynamic: Array<[string, SitemapNode]> = []
	for (const [path, node] of dynamicEntries) {
		const millis = contentModified.get(node.contentID as number)
		if (millis) {
			result[path] = new Date(millis).toISOString()
		} else {
			missingDynamic.push([path, node])
		}
	}

	await mapWithConcurrency(missingDynamic, STATIC_PAGE_CONCURRENCY, async ([path, node]) => {
		const item = await withRetry(() =>
			getContentItem<Record<string, unknown>>({
				contentID: node.contentID as number,
				languageCode,
			})
		)
		result[path] = new Date(toMillis(item?.properties?.modified) || Date.now()).toISOString()
	})

	// --- Static pages --------------------------------------------------------
	await mapWithConcurrency(staticEntries, STATIC_PAGE_CONCURRENCY, async ([path, node]) => {
		let latest = 0
		// contentLinkDepth:1 expands each module's content item one level so we can
		// read its properties.modified. At depth 0 the modules are unexpanded
		// references with no date, which would collapse to just the page date.
		const page = await withRetry(() =>
			getPage({ pageID: node.pageID, languageCode, contentLinkDepth: 1 })
		)
		latest = toMillis(page?.properties?.modified)

		const zones = (page?.zones ?? {}) as Record<string, ContentZone[]>
		for (const zone of Object.values(zones)) {
			for (const moduleRef of zone ?? []) {
				// Top-level module content items carry their own modified date.
				const item = moduleRef?.item as ContentItem | undefined
				const millis = toMillis(item?.properties?.modified)
				if (millis > latest) latest = millis
			}
		}
		result[path] = new Date(latest || Date.now()).toISOString()
	})

	return result
}
