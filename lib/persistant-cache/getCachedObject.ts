import fs from 'fs'
import { DateTime } from 'luxon'
import path from 'path'
import { getStore } from "@netlify/blobs";


interface CachedResponse<T> {
	isUpToDate: boolean
	item: T
}

export const getCachedObject = async <T>(key: string, isString?: boolean): Promise<CachedResponse<T> | null> => {

	const isNetlify = (!!process.env.NETLIFY_BLOBS_CONTEXT)
	console.log("isNetlify", isNetlify)

	if (isNetlify) {

		//use netlify blobs for caching
		const cacheStore = getStore("agility-cms-website-cache");
		const options = (!!isString) ? { type: "text" } : { type: "json" }

		console.log("key", key)
		console.log("isString", isString)
		console.log("options", options)

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
		//TODO: handle non-netlify caching
	}

	return null

}