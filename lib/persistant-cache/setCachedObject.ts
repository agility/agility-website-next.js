import { getStore } from "@netlify/blobs";

export const setCachedObject = async (key: string, objectJSON: string): Promise<void> => {

	const isNetlify = (!!process.env.NETLIFY_BLOBS_CONTEXT) || (!!process.env.NETLIFY_PURGE_API_TOKEN)

	console.log("setCachedObject", key, "isNetlify", isNetlify)

	if (isNetlify) {
		//write to netlify blobs
		const cacheStore = getStore("agility-cms-website-cache");
		await cacheStore.set(key, objectJSON, {
			metadata: {
				lastmod: new Date().toISOString()
			}
		});
	} else {
		//TODO: handle non-netlify caching
	}
}