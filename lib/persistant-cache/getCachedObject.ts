import fs from 'fs'
import { DateTime } from 'luxon'
import path from 'path'
import { getStore } from "@netlify/blobs";

interface CachedResponse<T> {
	isUpToDate: boolean
	item: T
}

export const getCachedObject = async <T>(key: string): Promise<CachedResponse<T> | null> => {

	const isNetlify = process.env.NETLIFY === 'true' || process.env.NETLIFY_DEV === 'true' || (!!process.env.NETLIFY_FUNCTIONS_TOKEN)
	console.log("isNetlify", isNetlify)
	if (!isNetlify) {

		console.log("env", process.env)

		//use local file cache unless we are on netlify
		const cacheDir = path.join(process.cwd(), '.next', 'cache', 'agility');
		const cacheFilePath = path.join(cacheDir, `${key}.json`);

		// Ensure the cache directory exists
		if (!fs.existsSync(cacheDir)) {
			fs.mkdirSync(cacheDir, { recursive: true });
		}

		//check that the cache file exists
		if (fs.existsSync(cacheFilePath)) {
			const fileStats = await fs.promises.stat(cacheFilePath)
			const lastModTime = fileStats.mtime
			const itemStr = await fs.promises.readFile(cacheFilePath, 'utf-8')
			if (itemStr) {
				try {
					const item = JSON.parse(itemStr) as T

					//check if the last mod date is less then 60 seconds ago, if so, return the cached data
					const dtLastMod = DateTime.fromJSDate(lastModTime)

					const numSeconds = DateTime.now().diff(dtLastMod, "seconds").seconds

					//if we wrote this file less than 60 seconds ago, consider it "up to date"
					return {
						isUpToDate: numSeconds < 60,
						item
					}

				} catch (error) {
					console.error('Failed to parse cached items:', error);
				}
			}
		}

	} else {
		//use netlify blobs for caching
		const cacheStore = getStore("agility-cms-website-cache");
		const res = await cacheStore.getWithMetadata(key, { type: "json" })
		if (!res || !res.data) return null

		const { lastmod } = res.metadata;

		const dtLastmod = DateTime.fromISO(`${lastmod}`)
		const numSeconds = DateTime.now().diff(dtLastmod, "seconds").seconds
		console.log("get obj from cache", key, numSeconds)
		return {
			isUpToDate: numSeconds < 60,
			item: res.data
		}

	}

	return null

}