export const cacheConfig = {
	/**
	 * The default cache duration in seconds for the Agility CMS content via the fetch API.
	 * Default is 3600s (1 hour) if the env var is not set.
	 */
	cacheDuration: process.env.AGILITY_FETCH_CACHE_DURATION ? parseInt(process.env.AGILITY_FETCH_CACHE_DURATION) : 3600,

	/**
	 * The duration in seconds before a path will be revalidated via ISR.
	 * Default is 86400s (24 hours) if the env var is not set.
	 */
	pathRevalidateDuration: process.env.AGILITY_PATH_REVALIDATE_DURATION ? parseInt(process.env.AGILITY_PATH_REVALIDATE_DURATION) : 86400,
};