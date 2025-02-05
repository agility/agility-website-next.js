import "server-only";
import { getAgilityPageProps } from "@agility/nextjs/node";
import { getAgilityContext } from "./getAgilityContext";

export interface PageProps {
	params: { slug: string[] }
	searchParams?: { [key: string]: string | string[] | undefined }
}


/**
 * Get an page/layout with caching information added.
 * @param param0
 * @returns
 */
export const getAgilityPage = async ({ params }: PageProps) => {

	const { isPreview: preview, locale } = await getAgilityContext()

	if (!params.slug) params.slug = [""]

	let globalData: any = {}

	//check if the path has a special first segment of ~~~ which means it's a got the query strings in there
	const lastSegment = params.slug.slice(-1)

	if (lastSegment[0].startsWith("~~~")) {
		const queryStr = decodeURIComponent(lastSegment[0].substring(3))

		//put the search params into the global data object so all the components can access it
		globalData.searchParams = new URLSearchParams(queryStr)

		//reset the slug to NOT have the special segment
		params.slug = params.slug.slice(0, -1)
	}

	let page = await getAgilityPageProps({
		params, preview, locale, apiOptions: {
			contentLinkDepth: 0
		}
	})


	if (page) {
		//merge the global data into the page
		if (page.globalData) {
			//if we have existing global data, merge the global data into the agilityData
			page.globalData = { ...page.globalData, ...globalData }
		} else {
			//otherwise just set the global data
			page.globalData = globalData
		}
	}

	return page

}

