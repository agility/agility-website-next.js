import { SitemapNode } from "lib/types/SitemapNode";
import agilitySDK from "@agility/content-fetch"
import { buildPageRecord, getAlgoliaClient, indexName, PageRecord } from "lib/crawl/index-page";
import { notifyIndexingFailure } from "lib/crawl/notify-slack";

// If a crawl collects fewer records than this, something went wrong (sitemap
// fetch failed, site down, etc.). Abort the atomic replace so we never wipe a
// healthy index down to a near-empty one.
const MIN_RECORDS_TO_REPLACE = 100

export const indexSite = async () => {
	console.log("Initiating Site Reindex...")

	let sitemapFlat: {
		[path: string]: SitemapNode
	} = {}

	const apiKey = process.env.AGILITY_API_FETCH_KEY

	const agilityClient = agilitySDK.getApi({
		guid: process.env.AGILITY_GUID,
		apiKey
	})

	const languageCode = process.env.AGILITY_LOCALES || "en-us"

	//don't cache the sitemap here... we want to get the latest
	agilityClient.config.fetchConfig = {
		cache: "no-store"
	}


	try {
		sitemapFlat = await agilityClient.getSitemapFlat({
			channelName: process.env.AGILITY_SITEMAP || "website",
			languageCode
		})
	} catch (e) {
		await notifyIndexingFailure(
			`Failed to fetch sitemap for reindex: ${e instanceof Error ? e.message : String(e)}. Index left unchanged.`
		)
		return
	}

	const keys = Object.keys(sitemapFlat)

	console.log("Reindexing sitemap...", keys.length + " items")

	// Collect a fresh record for every canonical page, then atomically replace
	// the whole index. This keeps the index in sync: pages that were deleted or
	// now redirect (e.g. legacy /resources/posts/* -> /blog/*) simply aren't
	// collected, so they drop out of the index instead of lingering.
	const records: PageRecord[] = []

	for (let i = 0; i < keys.length; i++) {
		const path = keys[i]
		const node = sitemapFlat[path]

		if (node.isFolder || node.redirect) continue;
		if (!node.visible.sitemap) {
			continue;
		}

		const record = await buildPageRecord(path)
		if (record) records.push(record)
	}

	if (records.length < MIN_RECORDS_TO_REPLACE) {
		await notifyIndexingFailure(
			`Aborting full reindex of "${indexName}": only ${records.length} records collected ` +
			`(expected at least ${MIN_RECORDS_TO_REPLACE}) from ${keys.length} sitemap entries. ` +
			`Leaving the existing index unchanged.`
		)
		return
	}

	console.log(`Replacing "${indexName}" with ${records.length} records...`)
	const client = getAlgoliaClient()
	try {
		await client.replaceAllObjects({
			indexName,
			objects: records as unknown as Record<string, unknown>[],
			batchSize: 1000
		})

		// Recency tiebreaker: among equally-relevant results, rank newer content
		// higher (uses the numeric `date` on each record). Applied as a partial
		// settings update so searchableAttributes etc. are left untouched.
		await client.setSettings({
			indexName,
			indexSettings: { customRanking: ["desc(date)"] }
		})
	} catch (e) {
		await notifyIndexingFailure(
			`replaceAllObjects failed for "${indexName}" with ${records.length} records: ${e instanceof Error ? e.message : String(e)}`
		)
		return
	}
	console.log("Reindex complete.")
}
