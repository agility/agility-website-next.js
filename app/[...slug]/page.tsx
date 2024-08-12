import { getPageTemplate } from "components/agility-layouts"
import { PageProps, getAgilityPage } from "lib/cms/getAgilityPage"
import { getAgilityContext } from "lib/cms/useAgilityContext"

import { Metadata, ResolvingMetadata } from "next"

import { resolveAgilityMetaData } from "lib/cms-content/resolveAgilityMetaData"
import NotFound from "./not-found"
import InlineError from "components/common/InlineError"
import { cacheConfig } from "lib/cms/cacheConfig"
import { checkRedirect } from "lib/cms-content/checkRedirect"
import { redirect, permanentRedirect } from "next/navigation"
import { NextRequest } from "next/server"
import { DateTime } from "luxon"
import { getSitemapFlat } from "lib/cms/getSitemapFlat"
import { getAgilitySDK_NonReact } from "lib/cms/getAgilitySDK"

export const revalidate = cacheConfig.pathRevalidateDuration
// export const runtime = "nodejs"
// export const dynamic = "force-static"

/**
 * Generate metadata for this page
 */
export async function generateMetadata(
	{ params, searchParams }: PageProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	// read route params
	const { locale, sitemap, isDevelopmentMode, isPreview } = getAgilityContext()

	const agilityData = await getAgilityPage({ params })

	if (!agilityData.page) return {}
	return await resolveAgilityMetaData({ agilityData, locale, sitemap, isDevelopmentMode, isPreview, parent })
}

/**
 * Generate the list of pages that we want to generate a build time
 * @returns
 */
//TODO: determine if we even need this...
// export async function generateStaticParams() {
// 	const agilitySDK = getAgilitySDK_NonReact()

// 	//const channelName: process.env.AGILITY_SITEMAP || "website",
// 	const languageCode = process.env.AGILITY_LOCALES || "en-ca"

// 	agilitySDK.config.fetchConfig = {
// 		next: {
// 			tags: [`agility-sitemap-flat-${languageCode}`],
// 			revalidate: cacheConfig.cacheDuration
// 		}
// 	}

// 	const sitemap = await agilitySDK.getSitemapFlat({
// 		channelName: process.env.AGILITY_SITEMAP || "website",
// 		languageCode
// 	})

// 	const paths = Object.keys(sitemap).map((path, index) => {
// 		const thePath = index === 0 ? "/" : path

// 		return {
// 			params: {
// 				slug: thePath.split("/").filter((x) => x)
// 			}
// 		}
// 	})

// 	return paths
// }

export default async function Page({ params, searchParams }: PageProps) {
	const agilityData = await getAgilityPage({ params })

	//add the search params to the global data
	if (!agilityData.globalData) agilityData.globalData = {}
	agilityData.globalData.searchParams = searchParams

	//if the page is not found...
	if (!agilityData.page) return NotFound()

	const AgilityPageTemplate = getPageTemplate(agilityData.pageTemplateName || "")

	const dtStr = DateTime.now().toISO()

	return (
		<div
			data-agility-page={agilityData.page?.pageID}
			data-agility-dynamic-content={agilityData.sitemapNode.contentID}
		>
			{AgilityPageTemplate && <AgilityPageTemplate {...agilityData} />}
			{!AgilityPageTemplate && (
				// if we don't have a template for this page, show an error
				<InlineError message={`No template found for page template name: ${agilityData.pageTemplateName}`} />
			)}
		</div>
	)
}
