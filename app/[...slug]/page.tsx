import { getPageTemplate } from "components/agility-layouts"
import { PageProps, getAgilityPage } from "lib/cms/getAgilityPage"
import { getAgilityContext } from "lib/cms/useAgilityContext"

import { Metadata, ResolvingMetadata } from "next"

import { resolveAgilityMetaData } from "lib/cms-content/resolveAgilityMetaData"
import { notFound } from "next/navigation"
import InlineError from "components/common/InlineError"
import { cacheConfig } from "lib/cms/cacheConfig"
import { DateTime } from "luxon"

import agilitySDK from "@agility/content-fetch"
import { SitemapNode } from "lib/types/SitemapNode"
import { getRichSnippet } from "lib/cms-content/getRichSnippet"

export const revalidate = cacheConfig.pathRevalidateDuration
export const dynamicParams = true

interface NestedSitemapNode {
	title: string
	name: string
	pageID: number
	menuText: string
	visible: {
		menu: boolean
		sitemap: boolean
	}
	path: string
	redirect: string | null
	isFolder: boolean
	contentID?: number
	children?: NestedSitemapNode[]
}

/**
 * Generate the list of pages that we want to generate a build time
 * @returns
 */
export async function generateStaticParams() {


	console.log("*** generateStaticParams ***")
	const isDevelopmentMode = process.env.NODE_ENV === "development"
	const isPreview = isDevelopmentMode

	if (isDevelopmentMode) {
		console.log("Dev Mode: Skipping static generation")
		return []
	}

	const apiKey = isPreview ? process.env.AGILITY_API_PREVIEW_KEY : process.env.AGILITY_API_FETCH_KEY

	const agilityClient = agilitySDK.getApi({
		guid: process.env.AGILITY_GUID,
		apiKey,
		isPreview
	})

	const languageCode = process.env.AGILITY_LOCALES || "en-us"

	//don't cache the sitemap here... we want to get the latest
	agilityClient.config.fetchConfig = {
		cache: "no-store"
	}

	//get the flat sitemap and generate the paths
	// *** NOTE: YOU CAN CUSTOMIZE THIS TO GENERATE ONLY THE PAGES YOU WANT ***
	const sitemap: { [path: string]: SitemapNode } = await agilityClient.getSitemapFlat({
		channelName: process.env.AGILITY_SITEMAP || "website",
		languageCode
	})

	const paths = Object.values(sitemap)
		.filter((node, index) => {
			//skip folders, redirects, and the home page
			if (node.redirect !== null || node.isFolder === true || index === 0) return false
			return true
		})
		.map((node) => {
			return {
				slug: node.path.split("/").slice(1)
			}
		})

	console.log("Pre-rendering", paths.length, "static paths.")

	return paths
}

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

export default async function Page({ params }: PageProps) {
	const agilityData = await getAgilityPage({ params })

	//if the page is not found...
	if (!agilityData.page) {
		notFound()
	}

	const AgilityPageTemplate = getPageTemplate(agilityData.pageTemplateName || "")

	const renderTimeStr = DateTime.now().toISO()
	const jsonLD = getRichSnippet(agilityData)

	return (
		<div
			data-agility-page={agilityData.page?.pageID}
			data-agility-dynamic-content={agilityData.sitemapNode.contentID}
		>
			{jsonLD && (
				//include the rich snipped if we have one
				<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLD }} />
			)}
			{AgilityPageTemplate && <AgilityPageTemplate {...agilityData} />}
			{!AgilityPageTemplate && (
				// if we don't have a template for this page, show an error
				<InlineError message={`No template found for page template name: ${agilityData.pageTemplateName}`} />
			)}
			<div className="hidden">Rendered on: {renderTimeStr}</div>
		</div>
	)
}
