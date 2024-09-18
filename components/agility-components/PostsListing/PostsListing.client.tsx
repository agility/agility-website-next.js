"use client"

import React, { use, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { IPostMin } from "lib/cms-content/getPostListing"
import InfiniteScroll from "react-infinite-scroll-component"
import { AgilityPic } from "@agility/nextjs"
import { GetNextPostsProps } from "./PostsListing.server"
import { LinkButton } from "components/micro/LinkButton"
import { InfiniteLoadMore } from "components/common/InfiniteLoadMore"

interface Props {
	pageSize: number
	posts: IPostMin[]
	locale: string
	sitemap: string
	getNextPosts: ({ skip, take }: GetNextPostsProps) => Promise<IPostMin[]>
}

const PostListingClient = ({ posts, locale, sitemap, getNextPosts, pageSize }: Props) => {
	const [hasMore, setHasMore] = useState(posts.length >= pageSize)
	const [items, setItems] = useState(posts)
	const [isLoading, setIsLoading] = useState(false)

	console.log("hasMore?", hasMore)

	const fetchPosts = async () => {
		try {
			if (isLoading) return
			setIsLoading(true)
			console.log("fetchPosts pre...")
			//call the server action declared in the server component to get the next page of posts...
			const morePosts = await getNextPosts({ skip: items.length, take: pageSize })
			console.log("fetchPosts post...", morePosts.length)
			setItems((prev) => {
				return [...prev, ...morePosts]
			})
			setHasMore(morePosts.length > 0)
		} catch (error) {
			console.error("error fetching more posts", error)
			setHasMore(false)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="relative">
			<div className="mx-auto max-w-screen-xl">
				<div className="">
					<div className="grid sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
						{items.map((post) => (
							<Link href={post.url} key={post.contentID}>
								<div className="group mb-8 flex-col md:mb-0">
									<div className="relative h-64 w-full overflow-clip">
										{post.image ? (
											<AgilityPic
												image={post.image}
												className="w-full rounded-t-lg object-cover object-center"
												fallbackWidth={800}
												sources={[
													//screen at least than 1280, it's 1/3 of the screen
													{
														media: "(min-width: 1280px)",
														width: 480
													},

													//screen at least than 640, it's 1/2 of the screen
													{ media: "(min-width: 640px)", width: 640 },
													//screen less than 640, full width of screen
													{ media: "(max-width: 639px)", width: 640 }
												]}
											/>
										) : (
											// eslint-disable-next-line @next/next/no-img-element
											<img
												src="/images/blog-icon-default.png"
												alt=""
												className="w-full rounded-t-lg object-cover object-center"
											/>
										)}
									</div>
									<div className="rounded-b-lg border-2 border-t-0 bg-gray-100 p-8">
										<div className="text-primary-500 text-xs font-bold uppercase leading-loose tracking-widest">
											{post.category}
										</div>
										<div className="border-primary-500 w-8 border-b-2"></div>
										<div className="mt-4 text-xs font-semibold uppercase italic text-gray-600">
											{post.date}
										</div>
										<h2 className="text-secondary-500 group-hover:text-primary-500 mt-1 text-2xl font-black transition duration-300">
											{post.title}
										</h2>
									</div>
								</div>
							</Link>
						))}
					</div>
					<div className="flex w-full justify-center">
						<InfiniteLoadMore
							{...{
								hasMore,
								isLoading,
								onLoadMore: fetchPosts
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PostListingClient
