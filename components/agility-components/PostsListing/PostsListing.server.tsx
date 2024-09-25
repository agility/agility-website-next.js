import React from "react"
import Link from "next/link"

import { IPostMin, getPostListing } from "lib/cms-content/getPostListing"
import { useAgilityContext } from "lib/cms/useAgilityContext"
import PostListingClient from "./PostsListing.client"
import { getContentItem } from "lib/cms/getContentItem"
import { UnloadedModuleProps } from "@agility/nextjs"
import { DateTime } from "luxon"
import { getAgilityGraphQLClient } from "lib/cms/getAgilityGraphQLClient"
import { gql } from "@apollo/client"
import { Container } from "components/micro/Container"

interface IPostListing {
	title: string
	subtitle: string
	preHeader: string
}

export interface GetNextPostsProps {
	skip: number
	take: number
}

const PostListing = async ({ dynamicPageItem }: UnloadedModuleProps) => {
	const { sitemap, locale } = useAgilityContext()

	const selectedTag: string = dynamicPageItem?.fields?.title || ""

	const pageSize = 15
	// get posts for the initial page load
	const { posts } = await getPostListing({
		sitemap,
		locale,
		take: pageSize,
		skip: 0,
		tagID: dynamicPageItem?.contentID
	})

	//get the list of tags
	const gqlQuery = gql(`
		query supporting {
			newblogcategories {
				contentID
				fields {
					title
				}
			}
		}
	`)

	const { query } = await getAgilityGraphQLClient({ referenceNames: ["newblogcategories"] })
	const { data } = await query({ query: gqlQuery })
	const tags = data.newblogcategories?.map((tag: any) => ({
		text: tag.fields.title,
		value: `/resources/posts/tag/${tag.fields.title.toLowerCase().replaceAll(" ", "-")}`
	}))

	// get next posts for infinite scroll
	const getNextPosts = async ({ skip, take }: GetNextPostsProps) => {
		"use server"

		const postsRes = await getPostListing({
			sitemap: sitemap,
			locale,
			skip,
			take,
			tagID: dynamicPageItem?.contentID
		})

		if (postsRes.posts.length > 0) {
			return postsRes.posts
		}
		return []
	}

	// if there are no posts, display message on frontend
	if (!posts || posts.length <= 0) {
		return (
			<Container className="mx-auto mt-44 flex max-w-7xl flex-col items-center justify-center px-6">
				<h1 className="text-center text-3xl font-bold">No posts available.</h1>
				<div className="my-10">
					<Link
						href={"/"}
						className="bg-primary-600 hover:bg-primary-500 focus:border-primary-700 focus:shadow-outline-primary my-3 rounded-md border border-transparent px-4 py-3 text-base font-medium leading-6 text-white transition duration-300 focus:outline-none"
					>
						Return Home
					</Link>
				</div>
			</Container>
		)
	}

	return <PostListingClient {...{ posts, sitemap, locale, getNextPosts, pageSize, tags, selectedTag }} />
}

export default PostListing
