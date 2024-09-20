import { ContentItem } from "@agility/content-fetch";
import { AgilityPageProps } from "@agility/nextjs";
import { ICaseStudy } from "lib/types/ICaseStudy";
import { IEvent } from "lib/types/IEvent";
import { IPodCast } from "lib/types/IPodCast";
import { IPost } from "lib/types/IPost";
import { IResource } from "lib/types/IResource";
import { DateTime } from "luxon";



/**
 * Get the JSON-LD Rich Snippet for the current page.
 * Using recommendations from nextjs.org here: https://nextjs.org/docs/app/building-your-application/optimizing/metadata#json-ld
 * Google docs on the SEO benefits of this: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
 * Testing Tool: https://search.google.com/test/rich-results
 *
 * @param param0
 * @returns
 */
export const getRichSnippet = ({ sitemapNode, page, languageCode, dynamicPageItem }: AgilityPageProps): string | null => {

	if (!dynamicPageItem) return null

	// *** special case for blog posts ***
	if (dynamicPageItem.properties.definitionName === "BlogPost") {

		const post = dynamicPageItem as ContentItem<IPost>

		//build the meta description
		let category = post.fields.categories?.fields.title || undefined
		let image = post.fields.postImage?.url || undefined
		let author = post.fields.author?.fields.title || "Agility"
		let authorImage = post.fields.author?.fields.image?.url || undefined

		let datePublished = DateTime.fromISO(post.fields.date);
		let dateModified = DateTime.fromISO(`${post.properties.modified}`);

		//build the structural article data...
		//https://developers.google.com/search/docs/appearance/structured-data/article
		let structData: any = {
			"@context": "https://schema.org",
			"@type": "BlogPosting",
			"mainEntityOfPage": {
				"@type": "WebPage",
				"@id": "https://google.com/article"
			},
			"headline": post.fields.title,

			"datePublished": datePublished.toISO(),
			"dateModified": dateModified.toISO()
		}

		if (author) {
			structData.author = [{
				"@type": "Person",
				"name": author,
				url: authorImage
			}]
		}

		if (image) {
			structData.image = [
				image
			]
		}

		return JSON.stringify(structData)

	}

	if (dynamicPageItem.properties.definitionName === "Resource") {

		const resource = dynamicPageItem as ContentItem<IResource>

		//build the structural article data...
		//https://developers.google.com/search/docs/appearance/structured-data/article
		let structData: any = {
			"@context": "https://schema.org",
			"@type": "Article",
			"mainEntityOfPage": {
				"@type": "WebPage",
				"@id": "https://google.com/article"
			},
			"headline": resource.fields.title,

			"datePublished": resource.fields.date,
			"dateModified": resource.properties.modified,

		}

		if (resource.fields.author) {
			structData.author = [{
				"@type": "Person",
				"name": resource.fields.author.fields.title,
				url: resource.fields.author.fields.image?.url
			}]
		}

		if (resource.fields.image) {
			structData.image = [
				resource.fields.image.url
			]
		}

		return JSON.stringify(structData)
	}

	if (dynamicPageItem.properties.definitionName === "CaseStudy") {

		const caseStudy = dynamicPageItem as ContentItem<ICaseStudy>

		let images = [
			caseStudy.fields.image.url,
			caseStudy.fields.customerLogo.url
		]
		if (caseStudy.fields.gallery && caseStudy.fields.gallery.media) {
			images = images.concat(caseStudy.fields.gallery.media.map(m => m.url))
		}

		//build the structural article data...
		//https://developers.google.com/search/docs/appearance/structured-data/article
		let structData: any = {
			"@context": "https://schema.org",
			"@type": "Article",
			"mainEntityOfPage": {
				"@type": "WebPage",
				"@id": "https://google.com/article"
			},
			"headline": caseStudy.fields.title,

			"datePublished": caseStudy.properties.modified,
			"dateModified": caseStudy.properties.modified,
			image: images
		}

		return JSON.stringify(structData)

	}

	if (dynamicPageItem.properties.definitionName === "Event") {

		const event = dynamicPageItem as ContentItem<IEvent>


		let validFrom = new Date();
		let startTime = DateTime.fromISO(event.fields.date);
		let endTime = startTime.plus({ hours: 1 })

		let canonicalUrl = `https:/agilitycm.com/events/${event.fields.uRL}`
		let extLink = event.fields.externalLink || canonicalUrl

		let presenters = event.fields.presenters?.map(p => ({

			"@type": "Person",
			"name": p.fields.title,
			"image": p.fields.image?.url

		}))


		//build the structural event data...
		let structData = {
			"@context": "https://schema.org",
			"@type": "Event",
			"name": event.fields.title,
			"startDate": startTime.toISO(),
			"endDate": endTime.toISO(),
			"eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
			"eventStatus": "https://schema.org/EventScheduled",
			"location": {
				"@type": "VirtualLocation",
				"url": extLink,
			},

			"description": event.fields.description,
			"offers": {
				"@type": "Offer",
				"url": canonicalUrl,
				"price": "0",
				"priceCurrency": "USD",
				"availability": "https://schema.org/InStock",
				"validFrom": validFrom.toISOString(),
			},
			"performer": presenters,
			"organizer": {
				"@type": "Organization",
				"name": "Agility CMS",
				"url": "https://agilitycms.com"
			},
			image: [
				event.fields.mainImage?.url
			]

		}


		return JSON.stringify(structData)

	}


	return null
}