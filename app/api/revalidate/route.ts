
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

interface IRevalidateRequest {
	state: string,
	instanceGuid: string
	languageCode?: string
	referenceName?: string
	contentID?: number
	contentVersionID?: number
	pageID?: number
	pageVersionID?: number
	changeDateUTC?: string
}

export async function POST(req: NextRequest, res: NextResponse) {

	//parse the body
	const data = await req.json() as IRevalidateRequest


	//only process publish events
	if (data.state === "Published") {

		//revalidate the correct tags based on what changed
		if (data.referenceName) {
			//content item change
			const itemTag = `agility-content-${data.referenceName}-${data.languageCode}`
			const listTag = `agility-content-${data.contentID}-${data.languageCode}`
			revalidateTag(itemTag)
			revalidateTag(listTag)
			console.info("Revalidating content tags:", itemTag, listTag)
		} else if (data.pageID !== undefined && data.pageID > 0) {
			//page change
			const pageTag = `agility-page-${data.pageID}-${data.languageCode}`
			revalidateTag(pageTag)


			//also revalidate the sitemaps
			const sitemapTagFlat = `agility-sitemap-flat-${data.languageCode}`
			const sitemapTagNested = `agility-sitemap-nested-${data.languageCode}`
			revalidateTag(sitemapTagFlat)
			revalidateTag(sitemapTagNested)

			console.info("Revalidating page and sitemap tags:", pageTag, sitemapTagFlat, sitemapTagNested)
		}
	} else if (data.contentID === undefined && data.pageID === undefined) {
		//if no content or page id is provided, it's for a URL redirection
		//trigger the rebuild hook for netlify's rebuild...
		const hookUrl = process.env.BUILD_HOOK_URL
		if (hookUrl) {
			await fetch(hookUrl, {
				method: 'POST'
			})
		}
	}

	return new Response(`OK`, {
		status: 200
	})


}