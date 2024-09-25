"use client"

import React, { useState } from "react"
import Link from "next/link"
import { IPostMin } from "lib/cms-content/getPostListing"
import { AgilityPic } from "@agility/nextjs"
import { GetNextPostsProps } from "./PostsListing.server"
import { InfiniteLoadMore } from "components/common/InfiniteLoadMore"
import { ComboboItem, FilterComboBox } from "components/micro/FilterComboBox"
import { useRouter } from "next/navigation"
import { IconChevronRight } from "@tabler/icons-react"
import { Container } from "components/micro/Container"

interface Props {
	pageSize: number
	posts: IPostMin[]
	selectedTag: string
	tags: ComboboItem[]
	getNextPosts: ({ skip, take }: GetNextPostsProps) => Promise<IPostMin[]>
}

const PostListingClient = ({ posts, getNextPosts, pageSize, selectedTag, tags }: Props) => {
	const router = useRouter()

	const [hasMore, setHasMore] = useState(posts.length >= pageSize)
	const [items, setItems] = useState(posts)

	const [isLoading, setIsLoading] = useState(false)

	const currentTag = tags.find((i) => i.text === selectedTag)

	const fetchPosts = async () => {
		try {
			if (isLoading) return
			setIsLoading(true)

			//call the server action declared in the server component to get the next page of posts...
			const morePosts = await getNextPosts({ skip: items.length, take: pageSize })

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
		<Container className="mx-auto max-w-7xl">
			<div className="flex">
				<FilterComboBox
					{...{
						label: "Blog Category",
						items: tags,
						selectedItem: currentTag,
						onChange: (item) => {
							if (item?.value) {
								router.push(item.value, { scroll: false })
							} else {
								router.push("/resources/posts", { scroll: false })
							}
						}
					}}
				/>
			</div>
			<div className="mt-8">
				<div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{items.map((post) => (
						<Link
							href={post.url}
							key={post.contentID}
							className="group relative flex h-full min-h-0 flex-col transition-shadow hover:shadow-lg"
						>
							<div className="relative h-64 w-full overflow-clip">
								{post.image ? (
									<AgilityPic
										image={post.image}
										className="h-64 w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
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
										className="w-full object-cover object-center"
									/>
								)}
							</div>
							<div className="min-h-0 flex-1">
								<div className="min-h-[350px]X flex h-full flex-col gap-3 border border-t-0 border-background p-6">
									<h2 className="text-secondary-500 group-hover:text-primary-500 text-2xl font-medium transition duration-300">
										{post.title}
									</h2>
									<div className="mt-4 text-xs font-semibold uppercase italic text-gray-600">
										{post.date}
									</div>
									<div className="flex gap-2">
										{post.tags.map((tag) => (
											<div
												className="rounded bg-background p-1 px-2 text-xs hover:text-highlight-light"
												key={tag.url}
												onClick={(e) => {
													e.preventDefault()
													const tagUrl = `/resources/posts/tag/${tag.tag.toLowerCase().replaceAll(" ", "-")}`
													router.push(tagUrl)
												}}
											>
												{tag.tag}
											</div>
										))}
									</div>
									<div className="flex-1 text-slate-500">
										<div className="line-clamp-3">{post.excerpt}</div>
									</div>
									<div className="">
										<div className="flex items-center gap-1 font-semibold text-highlight-dark transition-colors group-hover:text-highlight-light">
											Read More
											<IconChevronRight size={20} />
										</div>
									</div>
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
		</Container>
	)
}

export default PostListingClient
