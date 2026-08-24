import { SitemapNode } from "lib/types/SitemapNode"

/**
 * Should this sitemap node be advertised to search engines?
 *
 * Folders and redirects aren't real, indexable destinations, and a page the
 * editor unchecked from the sitemap in Agility is deliberately being kept out
 * of search. The same rule has to hold everywhere we hand a URL to a search
 * engine — sitemap.xml, the Algolia index, and IndexNow pings — otherwise the
 * channels contradict each other (an incremental publish adding a page that the
 * next full reindex removes, or IndexNow asking Bing to crawl a URL that isn't
 * in our own sitemap).
 */
export const isSearchVisible = (node: SitemapNode | undefined | null): boolean => {
	if (!node) return false
	if (node.isFolder || node.redirect) return false
	if (!node.visible?.sitemap) return false
	return true
}
