import { ContentItem } from "@agility/content-fetch";
import { AgilityPageProps } from "@agility/nextjs";
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

	console.log("dynamicPageItem", dynamicPageItem.properties)

	// *** special case for blog posts ***
	if (dynamicPageItem.properties.definitionName === "BlogPost") {

		const post = dynamicPageItem as ContentItem<IPost>
		console.log("DOING POST")
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
			"@type": "NewsArticle",
			"mainEntityOfPage": {
				"@type": "WebPage",
				"@id": "https://google.com/article"
			},
			"headline": post.fields.title,

			"datePublished": datePublished.toISO(),
			"dateModified": dateModified.toISO(),

			"publisher": {
				"@type": "Organization",
				"name": "Agility CMS",
				"logo": {
					"@type": "ImageObject",
					"url": "https://static.agilitycms.com/brand/logo_combined_yellow_gray.png"
				}
			}
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
		console.log("structData", JSON.stringify(structData))
		return JSON.stringify(structData)

	}
	/*
		if (dynamicPageItem.properties.definitionName === "Resource") {

			const resource = dynamicPageItem as ContentItem<IResource>

			let category = resource.fields.resourceTypeName
			let image = resource.fields.image?.url || null;


			if (dynamicPageItem.customFields.image) {
				if (dynamicPageItem.customFields.image.url.indexOf("http://") !== -1) {
					dynamicPageItem.customFields.image.url = dynamicPageItem.customFields.image.url.replace("http://", "https://");
				}
				image = dynamicPageItem.customFields.image;

			}

			seo.metaDescription = metaDescription;
			seo.twitterCard = "summary_large_image";
			seo.ogType = "article";
			seo.category = category;
			seo.canonicalUrl = canonicalUrl;
			seo.image = image;


		}

		if (dynamicPageItem.properties.definitionName === "CaseStudy") {

			//build the meta description
			metaDescription = null;
			if (dynamicPageItem.seo && dynamicPageItem.seo.metaDescription) metaDescription = dynamicPageItem.seo.metaDescription;
			if (metaDescription === null) {
				metaDescription = dynamicPageItem.customFields.excerpt;
				if (metaDescription && metaDescription.length > 240) metaDescription = metaDescription.substring(0, 240) + "...";
			}

			let canonicalUrl = `https://agilitycms.com${location.pathname}`;

			let category = "Case Study";
			let image = null;

			if (dynamicPageItem.customFields.image) {
				if (dynamicPageItem.customFields.image.url.indexOf("http://") !== -1) {
					dynamicPageItem.customFields.image.url = dynamicPageItem.customFields.image.url.replace("http://", "https://");
				}
				image = dynamicPageItem.customFields.image;

			}

			seo.metaDescription = metaDescription;
			seo.twitterCard = "summary_large_image";
			seo.ogType = "article";
			seo.category = category;
			seo.canonicalUrl = canonicalUrl;
			seo.image = image;

		}

		if (dynamicPageItem.properties.definitionName === "Event") {

			//build the meta description
			metaDescription = null;
			if (dynamicPageItem.seo && dynamicPageItem.seo.metaDescription) metaDescription = dynamicPageItem.seo.metaDescription;
			if (metaDescription === null) {
				metaDescription = dynamicPageItem.customFields.description;
				if (metaDescription && metaDescription.length > 240) metaDescription = metaDescription.substring(0, 240) + "...";
			}

			let canonicalUrl = `https://agilitycms.com${location.pathname}`;

			let category = null;
			let image = null;

			if (dynamicPageItem.customFields.eventType && dynamicPageItem.customFields.eventType.customFields) {
				category = dynamicPageItem.customFields.eventType.customFields.title;
			}

			if (dynamicPageItem.customFields.mainImage) {
				image = dynamicPageItem.customFields.mainImage;
			}


			let validFrom = new Date();
			let startTime = DateTime.fromISO(dynamicPageItem.customFields.date);
			let endTime = DateTime.fromISO(startTime).plus({ hours: 1 })

			let extLink = canonicalUrl;
			if (dynamicPageItem.customFields.externalLink) extLink = dynamicPageItem.customFields.externalLink.href;

			let presenters = [];
			if (dynamicPageItem.customFields.presenters) {
				presenters = dynamicPageItem.customFields.presenters.map(p => {
					let img = null;
					if (p.customFields.image) {
						img = p.customFields.image.url + "?w=400"
					}

					return {
						"@type": "Person",
						"name": p.customFields.title,
						"image": img
					}
				})
			}

			//build the structural event data...
			let structData = {
				"@context": "https://schema.org",
				"@type": "Event",
				"name": dynamicPageItem.customFields.title,
				"startDate": startTime.toISO(),
				"endDate": endTime.toISO(),
				"eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
				"eventStatus": "https://schema.org/EventScheduled",
				"location": {
					"@type": "VirtualLocation",
					"url": extLink,
				},

				"description": dynamicPageItem.customFields.description,
				"offers": {
					"@type": "Offer",
					"url": canonicalUrl,
					"price": "0",
					"priceCurrency": "USD",
					"availability": "https://schema.org/InStock",
					"validFrom": validFrom.toISOString(true),
				},
				"performer": presenters,
				"organizer": {
					"@type": "Organization",
					"name": "Agility CMS",
					"url": "https://agilitycms.com"
				}
			}

			if (image) {
				structData.image = [
					image.url,
				]
			}

			seo.structData = JSON.stringify(structData);
			seo.metaDescription = metaDescription;
			seo.twitterCard = "summary_large_image";
			seo.ogType = "article";
			seo.category = category;
			seo.canonicalUrl = canonicalUrl;
			seo.image = image;

		}

		if (dynamicPageItem.properties.definitionName === "Podcast") {

			//build the meta description
			metaDescription = null;
			if (dynamicPageItem.seo && dynamicPageItem.seo.metaDescription) metaDescription = dynamicPageItem.seo.metaDescription;
			if (metaDescription === null) {
				metaDescription = dynamicPageItem.customFields.excerpt;
				if (metaDescription) {
					metaDescription = metaDescription.replace(/<[^>]+>/ig, " ");
					metaDescription = he.decode(metaDescription).trim();
				}
			}

			let canonicalUrl = `https://agilitycms.com${location.pathname}`;

			let category = "Agile Living";
			let image = null;

			if (dynamicPageItem.customFields.eventType && dynamicPageItem.customFields.eventType.customFields) {
				category = dynamicPageItem.customFields.eventType.customFields.title;
			}

			if (dynamicPageItem.customFields.mainImage) {
				image = dynamicPageItem.customFields.mainImage;
			}

			seo.metaDescription = metaDescription;
			seo.twitterCard = "summary_large_image";
			seo.ogType = "article";
			seo.category = category;
			seo.canonicalUrl = canonicalUrl;
			seo.image = image;

		}



	}

	return seo


		}
		*/
	return null
}