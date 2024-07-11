import { ScalableBloomFilter } from "bloom-filters"
import { PageProps } from "lib/cms/getAgilityPage"
import { getRedirections, Redirection } from "lib/cms/getRedirections"
import { getCachedObject } from "lib/persistant-cache/getCachedObject"

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

	const start = performance.now();
	//get the bloom filter first
	const filterStr = await getCachedObject<string>('redirections-bloom-filter', true)

	const end = performance.now();

	const timeToGetBloomFilter = end - start
	if (timeToGetBloomFilter > 100) {
		console.warn("WARNING: Time to get Redirect Bloom Filter is too long:", timeToGetBloomFilter, "ms")
	}

	if (!filterStr || !filterStr.item) {
		return null
	}

	//parse the bloom filter and check if the path resolves in it
	const filter = JSON.parse(filterStr.item)
	const bloomFilter = ScalableBloomFilter.fromJSON(filter)

	//check if the path is in the bloom filter
	if (!bloomFilter.has(path.toLowerCase())) return null

	//get the redirections
	const redirections = await getRedirections({})
	if (!redirections) return null


	const redirection = redirections.items[path.toLowerCase()]

	return redirection || null

}