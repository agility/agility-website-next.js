import { getSitemapLastModifiedMap } from "lib/cms/getSitemapLastModifiedMap"
import { getSiteUrl } from "lib/utils/getSiteUrl"
import { cacheConfig } from "lib/cms/cacheConfig"
import { MetadataRoute } from "next"

/**
 * Regenerate the sitemap at most once per `pathRevalidateDuration` (24h by default).
 * The lastmod dates underneath ride the per-page / per-content Agility cache tags,
 * so a page or content publish still refreshes the relevant dates on the next build.
 */
export const revalidate = cacheConfig.pathRevalidateDuration

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const channelName = process.env.AGILITY_SITEMAP || "website"
	const languageCode = process.env.AGILITY_LOCALES || "en-ca"

	//path -> accurate lastmod date for every sitemap-visible URL
	const lastModifiedMap = await getSitemapLastModifiedMap({ channelName, languageCode })

	const baseUrl = getSiteUrl()

	// Emit only <loc> + <lastmod>. Google ignores <changefreq> and <priority>
	// entirely, and blanket values for them only contradict our accurate lastmod.
	// When we couldn't determine a reliable date, omit <lastmod> for that URL —
	// no date is better than a wrong one.
	return Object.entries(lastModifiedMap).map(([path, lastModified]) => {
		//the home page lives at "/home" in the sitemap but is served at the root
		const isHome = path === "/home"
		const url = isHome ? `${baseUrl}/` : `${baseUrl}${path}`
		return lastModified ? { url, lastModified: new Date(lastModified) } : { url }
	})
}
