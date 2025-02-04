import { getDynamicPageURL } from "@agility/nextjs/node";
import { NextRequest } from "next/server";
import { draftMode } from "next/headers"

export async function GET(req: NextRequest) {

	const searchParams = req.nextUrl.searchParams
	const contentIDStr = searchParams.get("ContentID") as string

	const contentID = parseInt(contentIDStr)

	const preview = (await draftMode()).isEnabled

	if (!isNaN(contentID) && contentID > 0) {
		//*** this is a dynamic page request ***
		//get the slug for this page based on the sitemap and redirect there
		const redirectUrl = await getDynamicPageURL({ contentID, preview, slug: "" })
		if (redirectUrl) {
			return new Response(`Redirecting to Dynamic Page Item`, {
				status: 307,
				headers: {
					"Location": redirectUrl,
				}
			});
		}
	}

	//if we get here, it's a 404
	return new Response(`Not Found`, {
		status: 404
	})

}