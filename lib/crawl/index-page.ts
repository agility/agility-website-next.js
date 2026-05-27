import { algoliasearch } from 'algoliasearch';
import * as cheerio from 'cheerio';

export const indexName = "agility-website"

// Read env vars at call time (not module-load time): the crawl entrypoint loads
// .env.local via dotenv AFTER importing this module.
export const getAlgoliaClient = () =>
	algoliasearch(process.env.ALGOLIA_APP_ID || "", process.env.ALGOLIA_ADMIN_API_KEY || "")

// Friendly labels for known Agility resource types (the URL segment after
// /resources/). Unknown types fall back to a humanized version of the slug.
const RESOURCE_TYPE_LABELS: Record<string, string> = {
	"events": "Event",
	"webinars": "Webinar",
	"webinar": "Webinar",
	"case-studies": "Case Study",
	"guide": "Guide",
	"whitepaper": "Whitepaper",
	"ebooks": "Ebook",
	"ebook": "Ebook",
	"cms-comparison": "Comparison",
	"agility-sneak-peek": "Sneak Peek",
}

const humanize = (slug: string) =>
	slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())

/**
 * Infer a content-type label from the page URL. JSON-LD only distinguishes blog
 * vs event, so the URL (which encodes the Agility resource type) is the reliable
 * signal. Returns undefined for generic site pages (product/solutions/about/…),
 * which keep the default label.
 */
export const inferContentType = (url: string): string | undefined => {
	let path = url
	try { path = new URL(url).pathname } catch { /* already a path */ }

	const seg = path.split("/").filter(Boolean)
	if (seg.length === 0) return undefined

	if (seg[0] === "blog") return "Blog Post"
	if (seg[0] === "glossary") return "Glossary"
	if (seg[0] === "starters") return "Starter"
	if (seg[0].startsWith("agility-cms-vs-") || seg[0] === "headless-cms-comparison") return "Comparison"

	// Resource items live at /resources/<type>/<slug>; label them by <type>.
	// (Length 2 is a listing page, e.g. /resources/case-studies — leave generic.)
	if (seg[0] === "resources" && seg.length >= 3) {
		return RESOURCE_TYPE_LABELS[seg[1]] || humanize(seg[1])
	}

	return undefined
}

export interface PageRecord {
	objectID: string
	title: string
	description?: string
	jsonld?: any
	ogImage?: string
	html: string
	images: { src?: string; alt?: string }[]
	url: string
	/**
	 * Unix timestamp (seconds) used for the recency tiebreaker in Algolia's custom
	 * ranking (desc(date)). Dated pages use their real publish date; undated pages
	 * (product/docs/landing) fall back to crawl time so they stay "fresh" and
	 * aren't pushed below old posts. Always present — do NOT display this directly.
	 */
	date: number
	/**
	 * Real publish date (Unix seconds), set only when the page actually has one.
	 * Undefined for undated pages. Use this for display in search results.
	 */
	publishedDate?: number
	/**
	 * Content-type label inferred from the URL (e.g. "Blog Post", "Ebook",
	 * "Guide", "Event"). Undefined for generic site pages.
	 */
	contentType?: string
}

/**
 * Fetch a single page and build its Algolia search record.
 * Returns null when the page should NOT be indexed:
 *  - the URL redirects (e.g. legacy /resources/posts/* -> /blog/*); indexing it
 *    would create a duplicate record pointing at a non-canonical URL while
 *    serving the canonical page's content
 *  - the fetch failed
 */
export const buildPageRecord = async (path: string): Promise<PageRecord | null> => {
	const url = `https://agilitycms.com${path}`

	// A thrown/hung fetch must not abort the whole crawl: skip this page instead.
	// Mass failures are caught downstream by the minimum-record floor in indexSite.
	let pageRes: Response
	try {
		pageRes = await fetch(url, { signal: AbortSignal.timeout(30000) })
	} catch (e) {
		console.error("Error fetching page (skipped): ", path, e instanceof Error ? e.message : String(e))
		return null
	}

	if (pageRes.redirected) {
		console.log("Skipping redirected (non-canonical) page: ", path, "->", pageRes.url)
		return null
	}

	if (!pageRes.ok) {
		console.error("Error fetching page: ", path, pageRes.status, pageRes.statusText)
		return null
	}

	const pageHTML = await pageRes.text()
	const objectID = path.replace(/\//g, "-")
	const $ = cheerio.load(pageHTML);

	let jsonld: any = undefined

	try {
		const jsonldNode = $('script[type="application/ld+json"]').html()
		if (jsonldNode) {
			jsonld = JSON.parse(jsonldNode);
		}
	} catch (err) { }

	$('script').remove();
	$("header").remove();
	$("footer").remove();

	let title = $('meta[property="og:title"]').attr('content') || "";
	let ogImage = $('meta[property="og:image"]').attr('content') || undefined;
	title = title.replace("| Agility CMS", "");
	title = title.replace("- Agility CMS", "");

	const description = $('meta[name=description]').attr('content');

	// Publish date for the recency tiebreaker (Unix seconds). Prefer the article
	// meta tag, then JSON-LD datePublished. Undated pages fall back to crawl time
	// so they stay "fresh" rather than sinking below old posts.
	const jsonldNodes: any[] = Array.isArray(jsonld) ? jsonld : (Array.isArray(jsonld?.["@graph"]) ? jsonld["@graph"] : [jsonld])
	const publishedRaw =
		$('meta[property="article:published_time"]').attr('content') ||
		jsonld?.datePublished ||
		jsonldNodes.find((n) => n?.datePublished)?.datePublished
	const parsedDate = publishedRaw ? Date.parse(publishedRaw) : NaN
	const publishedDate = Number.isNaN(parsedDate) ? undefined : Math.floor(parsedDate / 1000)
	const date = publishedDate ?? Math.floor(Date.now() / 1000)

	let mainHtml = $('main').html() || "";
	mainHtml = mainHtml
		.replaceAll(/<(.|\n)*?>/g, '\n') //replace tags and add a new line
		.replaceAll("&nbsp;", " ") //find non-breaking spaces
		.replace(/\s\s+/g, ' ').trim(); //remove extra spaces

	//also grab all the images
	const images = $('img').map((i, el) => {
		return {
			src: $(el).attr('src'),
			alt: $(el).attr('alt')
		}
	})

	if (!description) {
		console.error("No description found for page: ", path)
	}

	return {
		objectID,
		title,
		description,
		jsonld,
		ogImage,
		html: mainHtml,
		images: images.toArray(),
		url,
		date,
		publishedDate,
		contentType: inferContentType(url)
	}
}

/**
 * Index a single page (incremental update). Used by the Agility publish webhook.
 * A full-site crawl uses an atomic replace instead (see indexSite).
 */
export const indexPage = async (path: string) => {
	console.log("Indexing Path: ", path)

	const record = await buildPageRecord(path)
	if (!record) return

	try {
		await getAlgoliaClient().addOrUpdateObject({
			indexName,
			objectID: record.objectID,
			body: record as unknown as Record<string, unknown>
		});
	} catch (e) {
		console.error("Error indexing page: ", path, e)
	}
}
