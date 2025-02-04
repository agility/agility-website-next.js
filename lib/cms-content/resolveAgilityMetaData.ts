import { AgilityPageProps, ImageField } from "@agility/nextjs"
import { ContentItem } from "@agility/content-fetch"
import { Metadata, ResolvingMetadata } from "next"
import { getHeaderContent } from "./getHeaderContent"
import getAgilitySDK from "../cms/getAgilitySDK"
import ReactHtmlParser from "html-react-parser"
import { getContentItem } from "lib/cms/getContentItem"
import { IPost } from "lib/types/IPost"
import { IResource } from "lib/types/IResource"
import { stripHtml } from "lib/utils/strip-html"
import { ICaseStudy } from "lib/types/ICaseStudy"
import { IEvent } from "lib/types/IEvent"
import { createSharingImage } from "./createSharingImage"
import { JSX } from "react"

interface Props {
	agilityData: AgilityPageProps
	locale: string
	sitemap: string
	isPreview: boolean
	isDevelopmentMode: boolean
	parent: ResolvingMetadata
}

export const resolveAgilityMetaData = async ({ agilityData, locale, sitemap, isDevelopmentMode, isPreview, parent }: Props): Promise<Metadata> => {

	const header = await getHeaderContent({ locale, sitemap })
	const ogImages = (await parent).openGraph?.images || []
	let metaTitle: string | undefined = undefined
	let metaDescription: string | undefined = undefined
	//#region *** resolve open graph stuff from dynamic pages/layouts ***
	if (agilityData.dynamicPageItem) {

		//get the content item for this dynamic layout/page
		try {
			const contentItem = agilityData.dynamicPageItem as ContentItem<any>
			metaDescription = contentItem.fields["metaDescription"] as string | undefined
			if (!metaDescription) metaDescription = contentItem.seo?.metaDescription as string | undefined

			metaTitle = contentItem.fields["metaTitle"] as string | undefined

			if (contentItem.properties.definitionName === "BlogPost") {
				/* *** Posts MetaData *** */
				const post = contentItem.fields as IPost

				if (!metaDescription) {

					metaDescription = stripHtml(post.excerpt || post.textblob, 240)

				}

				if (post.postImage) {
					ogImages.push({
						url: `${post.postImage.url}?format=auto&w=1200`,
						alt: post.postImage.label
					})
				}
			} else if (contentItem.properties.definitionName === "Resource") {
				/** RESOURCE META DATA */
				const resource = contentItem.fields as IResource

				if (!metaDescription) {
					metaDescription = stripHtml(resource.excerpt || resource.textblob, 240)
				}

				if (resource.image) {
					ogImages.push({
						url: `${resource.image.url}?format=auto&w=1200`,
						alt: resource.image.label
					})
				}
			} else if (contentItem.properties.definitionName === "CaseStudy") {
				/** RESOURCE META DATA */
				const caseStudy = contentItem.fields as ICaseStudy

				if (!metaDescription) {
					metaDescription = stripHtml(caseStudy.excerpt || caseStudy.textblob, 240)
				}

				if (caseStudy.image) {
					ogImages.push({
						url: `${caseStudy.image.url}?format=auto&w=1200`,
						alt: caseStudy.image.label
					})
				}
			} else if (contentItem.properties.definitionName === "Event") {
				/** Event META DATA */
				const event = contentItem.fields as IEvent

				if (!metaDescription) {
					metaDescription = stripHtml(event.description || event.textblob, 240)
				}

				if (event.mainImage) {
					ogImages.push({
						url: `${event.mainImage.url}?format=auto&w=1200`,
						alt: event.mainImage.label
					})
				}
			} else if (contentItem.properties.definitionName === "BlogTag") {
				/** BlogTags META DATA */

				if (!metaDescription) {
					const title = contentItem.fields.title as string || ""
					if (title) {
						metaDescription = "Blog posts tagged with " + title
					}
				}
			}

		} catch (error) {
			console.warn("Could not resolve open graph meta data from dynamic page/layout contentID:", agilityData.sitemapNode.contentID, error)
		}
	}
	//#endregion

	//#region *** resolve the "additional" meta tags ***
	let metaHTML = agilityData.page?.seo?.metaHTML

	let otherMetaData: { [name: string]: string } = {}


	if (metaHTML) {
		const additionalHeaderMarkup = ReactHtmlParser(metaHTML)

		const handleMetaTag = (item: JSX.Element) => {
			if (!item.type) return
			//check if this is a meta tag and add it to the otherMetaData if so
			if (item.type === "meta") {
				const metaTag = item.props as React.MetaHTMLAttributes<HTMLMetaElement>
				if (metaTag && metaTag.property && metaTag.content) {

					//special case for og:image
					if (metaTag.property === "og:image") {
						ogImages.push({
							url: metaTag.content
						})
					} else {
						otherMetaData[metaTag.property] = metaTag.content
					}

					return
				}

				if (metaTag && metaTag.name && metaTag.content) {

					otherMetaData[metaTag.name] = metaTag.content

					return
				}



			}
			//TODO: check these:
			//console.warn("Could not output tag in Additional Header Markup", item)
		}

		if (typeof additionalHeaderMarkup === "string") {
			console.warn("Could not parse additional meta tags from Agility CMS")
		} else if (Array.isArray(additionalHeaderMarkup)) {
			//array of meta tags
			additionalHeaderMarkup.forEach((item) => handleMetaTag(item));
		} else {
			//single meta tag
			handleMetaTag(additionalHeaderMarkup)
		}
	}
	//#endregion


	let title = metaTitle || agilityData.sitemapNode?.title || ""
	if (!title.includes("Agility")) title = `${title} | Agility CMS`

	if (ogImages.length === 0) {

		//generate a default OG Image if we don't have one yet...
		const ogImage = createSharingImage({
			cloudName: "agility-cms",
			text: title
		})

		ogImages.push({
			url: ogImage
		})

	}

	const metaData: Metadata = {
		metadataBase: new URL('https://agilitycms.com'),
		title,
		description: metaDescription || agilityData.page?.seo?.metaDescription,
		keywords: agilityData.page?.seo?.metaKeywords,
		openGraph: {
			images: ogImages,
		},

		generator: `Agility CMS`,
		other: otherMetaData

	}

	return metaData



}