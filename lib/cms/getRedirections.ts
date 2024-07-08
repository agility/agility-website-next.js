import getAgilitySDK from "lib/cms/getAgilitySDK"
import { cacheConfig } from "lib/cms/cacheConfig"


import fs from 'fs';
import path from 'path';
import { DateTime } from "luxon";



export interface Redirection {
	id: number
	originUrl: string
	destinationUrl: string
	statusCode: number
}

interface Redirections {
	lastAccessDate: string
	isUpToDate: boolean
	items: Redirection[]
}

interface RedirectionsMap {
	lastAccessDate: string
	isUpToDate: boolean
	items: { [key: string]: Redirection }
}

/**
 * Get the list of redirections, from cache if possible.
 * @param params
 * @returns
 */
export const getRedirections = async (): Promise<RedirectionsMap> => {


	const agilitySDK = getAgilitySDK()

	//don't cache the redirections with nextjs cache - we are gonna do that manually...
	agilitySDK.config.fetchConfig = {
		next: {
			revalidate: 0,
		},
	}

	try {

		const cacheDir = path.join(process.cwd(), '.next', 'cache', 'agility');
		const cacheFilePath = path.join(cacheDir, `redirections.json`);

		// Ensure the cache directory exists
		if (!fs.existsSync(cacheDir)) {
			fs.mkdirSync(cacheDir, { recursive: true });
		}

		let redirections: RedirectionsMap | null = null
		let lastAccessDate: Date | null | undefined = undefined




		//check that the cache file exists
		if (fs.existsSync(cacheFilePath)) {
			const fileStats = await fs.promises.stat(cacheFilePath)
			const lastModTime = fileStats.mtime
			const redirectionStr = await fs.promises.readFile(cacheFilePath, 'utf-8')
			if (redirectionStr) {
				try {
					redirections = JSON.parse(redirectionStr) as RedirectionsMap
					lastAccessDate = new Date(redirections.lastAccessDate)

					//check if the last mod date is less then 60 seconds ago, if so, return the cached data
					const dtLastMode = DateTime.fromJSDate(lastModTime)

					const numSeconds = DateTime.now().diff(dtLastMode, "seconds").seconds

					//if we wrote this file less than 60 seconds ago, return the cached data
					if (numSeconds < cacheConfig.cacheDuration) {
						return redirections
					}

				} catch (error) {
					console.error('Failed to parse cached redirections:', error);
				}
			}
		}

		const redirectionsFromServer = await agilitySDK.getUrlRedirections({ lastAccessDate });

		if (!redirectionsFromServer.isUpToDate) {

			// Convert the server redirections to a dictionary
			const redirectionsMap: RedirectionsMap = {
				lastAccessDate: redirectionsFromServer.lastAccessDate,
				isUpToDate: redirectionsFromServer.isUpToDate,
				items: {}
			}

			// Convert the server redirections list to a dictionary for fast lookups
			redirectionsFromServer.items.forEach((redirection: Redirection) => {

				//massage the origin key in case the user has a leading ~/ or leading https:// absolute path
				let key = redirection.originUrl.toLowerCase()
				if (key.startsWith("~/")) key = key.substring(1)

				if (key.includes("://")) {
					const hostIndex = key.indexOf("/", key.indexOf("://") + 3)
					key = key.substring(hostIndex)
				}

				//massage the destination key in case the user has a leading ~/
				if (redirection.destinationUrl.startsWith("~/")) {
					redirection.destinationUrl = redirection.destinationUrl.substring(1)
				}

				redirectionsMap.items[key] = redirection
			});

			// Write the server redirections to the cache file
			await fs.promises.writeFile(cacheFilePath, JSON.stringify(redirectionsMap), 'utf-8');
		} else {

			// Re-write the cached redirections to the cache file
			await fs.promises.writeFile(cacheFilePath, JSON.stringify(redirections), 'utf-8');
		}

		if (!redirections) {
			return {
				lastAccessDate: DateTime.now().toISO(),
				isUpToDate: false,
				items: {}
			}
		}

		return redirections;
	} catch (error) {
		console.error('Failed to fetch or cache redirections:', error);
		throw error; // Rethrow or handle as needed
	}

}