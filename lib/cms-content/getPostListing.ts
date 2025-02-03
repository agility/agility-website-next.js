import { DateTime } from "luxon"

import { ContentList, ContentItem } from "@agility/content-fetch"
import { ImageField } from "@agility/nextjs"
import { getContentList } from "lib/cms/getContentList"
import { getSitemapFlat } from "lib/cms/getSitemapFlat"
import { IPost } from "lib/types/IPost"
import { stripHtml } from "lib/utils/strip-html"

interface ITagLink {
	tag: string
	url: string
}

export interface IPostMin {

	contentID: number
	title: string
	date: string
	url: string
	tags: ITagLink[]
	image?: ImageField
	excerpt: string
}

interface LoadPostsProp {
	sitemap: string
	locale: string
	skip: number
	take: number
	tagID?: number
}

/**
 * Get a list of posts and resolve the URLs for each post from the sitemap.
 * @param param0
 * @returns
 */
export const getPostListing = async ({ sitemap, locale, skip, take, tagID }: LoadPostsProp) => {


	try {

		const filterString = !tagID ? undefined : `fields.blogTagsIDs[like]"${tagID}" or fields.blogTagsIDs[like]",${tagID}" or fields.blogTagsIDs[like]"${tagID}," or fields.blogTagsIDs[like]",${tagID},"`

		// get posts...
		let rawPosts: ContentList = await getContentList({
			referenceName: "blogposts",
			languageCode: locale,
			contentLinkDepth: 1,
			filterString,
			take,
			skip
		})


		const lstRawPosts = rawPosts.items as ContentItem<IPost>[]


		const posts: IPostMin[] = lstRawPosts.map((post) => {
			//category
			const category = post.fields.categories?.fields.title || "Uncategorized"

			// date
			const date = DateTime.fromJSDate(new Date(post.fields.date)).toFormat("LLL. dd, yyyy")

			let excerpt = post.fields.excerpt || ""
			if (excerpt) {
				excerpt = stripHtml(excerpt, 200);
			}

			// url
			const url = `/blog/${post.fields.uRL}`
			let tags: ITagLink[] = post.fields.blogTags?.map((tag) => ({
				tag: tag.fields.title,
				url: `/blog?tag=${tag.fields.title}`
			})) || []

			// post image src
			//let imageSrc = post.fields.image.url

			// post image alt
			//let imageAlt = post.fields.image?.label || null

			const p: IPostMin = {
				contentID: post.contentID,
				title: post.fields.title,
				date,
				url,
				tags,
				image: post.fields.postImage,
				excerpt

			}
			return p
		})

		return {
			posts,
		}
	} catch (error) {
		throw new Error(`Error loading data for PostListing: ${error}`)
	}
}

const resolvePostUrls = function (sitemap: any, posts: any) {
	let dynamicUrls: any = {};
	posts.forEach((post: any) => {
		Object.keys(sitemap).forEach((path) => {
			if (sitemap[path].contentID === post.contentID) {
				dynamicUrls[post.contentID] = path;
			}
		});
	});
	return dynamicUrls;
};