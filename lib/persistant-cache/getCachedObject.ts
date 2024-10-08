import { DateTime } from 'luxon'
import { getStore } from "@netlify/blobs";

interface CachedResponse<T> {
	isUpToDate: boolean
	item: T
}



export const getCachedObject = async <T>(key: string, isString?: boolean): Promise<CachedResponse<T> | null> => {

	const isNetlify = (!!process.env.NETLIFY_BLOBS_CONTEXT) || (!!process.env.NETLIFY_PURGE_API_TOKEN)

	if (isNetlify) {

		//use netlify blobs for caching
		const cacheStore = getStore("agility-cms-website-cache");
		const options = (!!isString) ? { type: "text" } : { type: "json" }

		//@ts-ignore
		const res = await cacheStore.getWithMetadata(key, options)
		if (!res || !res.data) return null

		const { lastmod } = res.metadata;

		const dtLastmod = DateTime.fromISO(`${lastmod}`)
		const numSeconds = DateTime.now().diff(dtLastmod, "seconds").seconds

		return {
			isUpToDate: numSeconds < 60,
			item: res.data
		}

	} else {
		//TODO: add support for Vercel, Azure, AWS, etc.


	}

	return null

}