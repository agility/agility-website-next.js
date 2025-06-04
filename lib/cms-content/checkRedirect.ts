import { ScalableBloomFilter } from "bloom-filters"
import { PageProps } from "lib/cms/getAgilityPage"
import { getRedirections, Redirection, RedirectionsMap } from "lib/cms/getRedirections"
import { getCachedObject } from "lib/persistant-cache/getCachedObject"

import filteredRedirects from "data/redirections-bloom-filter.json"
import allRedirects from "data/redirections.json"

const bloomFilter = ScalableBloomFilter.fromJSON(filteredRedirects as any)

/**
 * Check if a path should be redirected.
 * Uses a bloom filter to quickly check if the path is in the list of redirections before actually getting the full list of redirects.
 * Inspired by this: https://nextjs.org/docs/app/building-your-application/routing/redirecting#managing-redirects-at-scale-advanced
 * @param param0
 * @returns
 */
export const checkRedirect = async ({ path }: { path: string }): Promise<Redirection | null> => {

	//if the path is the root, obviously don't redirect
	if (path === "/") return null


	//parse the bloom filter and check if the path resolves in it



	//check if the path is in the bloom filter
	if (!bloomFilter.has(path.toLowerCase())) return null

	//get the redirections
	const redirections = allRedirects as RedirectionsMap
	if (!redirections) return null


	const redirection = redirections.items[path.toLowerCase()]

	return redirection || null

}