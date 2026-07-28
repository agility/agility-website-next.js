import getAgilitySDK from "lib/cms/getAgilitySDK"
import { cacheConfig } from "lib/cms/cacheConfig"
import { PageRequestParams } from "@agility/content-fetch/dist/methods/getPage"

/**
 * Get a page (including its content zones/modules) with caching information added.
 *
 * The cache tag matches the one the /api/revalidate webhook busts on a page
 * publish (`agility-page-${pageID}-${locale}`), so a published page change
 * propagates to anything built on top of this (e.g. the sitemap lastmod).
 * @param params
 * @returns
 */
export const getPage = async (params: PageRequestParams) => {

	const agilitySDK = getAgilitySDK()

	agilitySDK.config.fetchConfig = {
		next: {
			tags: [`agility-page-${params.pageID}-${params.languageCode || params.locale}`],
			revalidate: cacheConfig.cacheDuration,
		},
	}

	return await agilitySDK.getPage(params)
}
