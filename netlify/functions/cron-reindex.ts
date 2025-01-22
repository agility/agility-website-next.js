
import { SitemapNode } from "lib/types/SitemapNode";
import type { Context, Config } from "@netlify/functions";
import agilitySDK from "@agility/content-fetch"
import { algoliasearch } from 'algoliasearch';
import * as cheerio from 'cheerio';
import { index } from "cheerio/dist/commonjs/api/traversing";
import { indexPage } from "lib/crawl/index-page";


export default async () => {

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

		await indexPage(path)

	}

}

export const config: Config = {
	// Moving to Netlify functions loses routing setup from Next.js API Route and we need to define it
	// If you are using Next Runtime V5 you can define it via function's config.path.
	// If you are using Next Runtime V4 you would need to add rewrite in netlify.toml or invoke
	// the function with `/.netlify/functions/<name-of-background-function>` url.

	//run this daily
	schedule: "0 8 * * *"
};