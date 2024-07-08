import { getStore } from "@netlify/blobs";

import fs from 'fs';
import path from 'path';


export const setCachedObject = async (key: string, object: any): Promise<void> => {
	const isNetlify = (!!process.env.NETLIFY_BLOBS_CONTEXT)

	if (!isNetlify) {
		//use local file cache unless we are on netlify
		const cacheDir = path.join(process.cwd(), '.next', 'cache', 'agility');
		const cacheFilePath = path.join(cacheDir, `${key}.json`);

		// Ensure the cache directory exists
		if (!fs.existsSync(cacheDir)) {
			fs.mkdirSync(cacheDir, { recursive: true });
		}

		await fs.promises.writeFile(cacheFilePath, JSON.stringify(object), 'utf-8');

	} else {
		//write to netlify blobs
		const cacheStore = getStore("agility-cms-website-cache");
		await cacheStore.set(key, JSON.stringify(object), {
			metadata: {
				lastmod: new Date().toISOString()
			}
		});
	}
}