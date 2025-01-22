import { SitemapNode } from "lib/types/SitemapNode";
import agilitySDK from "@agility/content-fetch"
import { indexPage } from "lib/crawl/index-page";

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


	sitemapFlat = await agilityClient.getSitemapFlat({
		channelName: process.env.AGILITY_SITEMAP || "website",
		languageCode
	})

	const keys = Object.keys(sitemapFlat)

	console.log("Reindexing sitemap...", keys.length + " items")



	for (let i = 0; i < keys.length; i++) {
		const path = keys[i]
		const node = sitemapFlat[path]

		if (node.isFolder || node.redirect) continue;
		if (!node.visible.sitemap) {
			continue;
		}

		await indexPage(path)

	}
}