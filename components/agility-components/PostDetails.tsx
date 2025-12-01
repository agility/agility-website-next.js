import React from "react"
import { UnloadedModuleProps } from "@agility/nextjs"

import { DateTime } from "luxon"
import { Container } from "components/micro/Container"
import { IPost } from "lib/types/IPost"
import { SharePage } from "components/common/SharePage"
import Link from "next/link"
import { IconChevronRight } from "@tabler/icons-react"
import { gql } from "@apollo/client"
import { ContentItem } from "@agility/content-fetch"
import { getAgilityGraphQLClient } from "lib/cms/getAgilityGraphQLClient"
import { LinkButton } from "components/micro/LinkButton"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"
import { AgilityPic } from "components/common/AgilityPic"

const PostDetails = async ({ dynamicPageItem }: UnloadedModuleProps) => {
	if (!dynamicPageItem) {
		return <div>Post not found</div>
	}

	// post fields
	const post = dynamicPageItem.fields as IPost

	//if we don't have related posts, grab some with the same category
	if ((!post.resourcesList || post.resourcesList.length === 0) && (post.blogTags ?? []).length > 0) {
		const tag = (post.blogTags ?? [])[0]
		const tagID = tag.contentID

		const filter = `contentID[ne]${dynamicPageItem.contentID} and (fields.blogTagsIDs[like]\"${tagID}\" or fields.blogTagsIDs[like]\",${tagID}\" or fields.blogTagsIDs[like]\"${tagID},\" or fields.blogTagsIDs[like]\",${tagID},\")`

		const gqlQuery = gql(`
		query postsquery($filter: String = "") {
			blogposts(filter: $filter, take: 3, sort: "fields.date" direction: "desc") {
				contentID
				fields {
					title
					uRL
					categoriesTitle
					postImage {
						url
						label
						fileSize
						height
						width
					}
					blogTagsIDs
				}
			}
		}

	`)
		try {
			const { query } = await getAgilityGraphQLClient({ referenceNames: ["blogposts"], filter })
			const { data } = await query({ query: gqlQuery, variables: { filter } })

			if (!data["blogposts"]) return null

			post.resourcesList = data["blogposts"] as ContentItem<IPost>[]
		} catch (error) {
			console.error(
				"Failed to get related posts on post id",
				dynamicPageItem.contentID,
				"filter:",
				filter,
				"Error:",
				error
			)
		}
	}

	// category
	const category = post.categories?.fields.title || "Uncategorized"

	// format date
	const dateStr = DateTime.fromJSDate(new Date(post.date)).toFormat("LLL. dd, yyyy")

	return (
		<Container >
			<article className="mx-auto max-w-7xl">
				<time className="text-slate-600 dark:text-gray-400">{dateStr}</time>
				<h1 className="mt-5 text-balance text-4xl font-medium">{post.title}</h1>
				<h2 className="mt-5 text-balance text-lg font-medium">{post.subTitle}</h2>

				{post.author && (
					<div className="mt-3 flex items-center gap-2">
						{post.author.fields.image && (
							<AgilityPic
								image={post.author.fields.image}
								alt={post.author.fields.title}
								className="h-12 w-12 rounded-full"
								fallbackWidth={100}
							/>
						)}
						<div className="text-balance font-medium">{post.author.fields.title}</div>
					</div>
				)}

				<div className="mt-5 lg:flex lg:flex-row lg:gap-20 xl:gap-32">
					<div className="flex-1">
						{post.postImage && (
							<AgilityPic
								image={post.postImage}
								alt={post.title}
								fallbackWidth={400}
								priority
								className="w-full"
								sources={[
									//screen at least than 640, it's 1/2 of the screen, so the same size as the prev breakpoint
									{ media: "(min-width: 1200px) and (min-resolution: 2x)", width: 1600 },
									{ media: "(min-width: 1200px)", width: 800 },
									{ media: "(min-width: 1024px) and (min-resolution: 2x)", width: 1200 },
									{ media: "(min-width: 1024px)", width: 600 },
									{ media: "(min-width: 768px) and (min-resolution: 2x)", width: 1200 },
									{ media: "(min-width: 768px)", width: 600 },
									{ media: "(min-width: 640px) and (min-resolution: 2x)", width: 880 },
									{ media: "(min-width: 640px)", width: 480 },
									{ media: "(min-width: 320px) and (min-resolution: 2x)", width: 640 },
								]}
							/>
						)}

						<div
							className="prose mt-5 max-w-full"
							dangerouslySetInnerHTML={renderHTMLCustom(post.textblob)}
						></div>

						{post.author && (
							<div className="mt-5 flex items-start gap-5">
								{post.author.fields.image && (
									<AgilityPic
										image={post.author.fields.image}
										alt={post.author.fields.title}
										className="mt-10 w-40 rounded-full"
										fallbackWidth={160}
									/>
								)}
								<div>
									<h5 className="uppercase text-slate-600">About the Author</h5>
									<div className="mt-3 text-balance font-medium">{post.author.fields.title}</div>
									<div
										className="prose"
										dangerouslySetInnerHTML={renderHTMLCustom(post.author.fields.textblob)}
									></div>
								</div>
							</div>
						)}
					</div>
					<div className="lg:w-2/5 xl:w-1/3">
						{post.blogTags && (
							<div className="hidden lg:block">
								<div className="pt-6 font-bold">Industries</div>
								<div className="flex flex-wrap gap-2 pt-1">
									{post.blogTags.map((item) => (
										<Link
											key={item.contentID}
											href={`/blog/tag/${encodeURIComponent(item.fields.title.toLowerCase().replaceAll(" ", "-"))}`}
											className="rounded bg-background px-2 py-1 hover:text-highlight-light"
										>
											{item.fields.title}
										</Link>
									))}
								</div>
							</div>
						)}

						<SharePage
							{...{
								title: "Share Post",
								url: `https://agilitycms.com/blog/${post.uRL}`,
								className: "flex flex-col lg:items-start items-center w gap-2"
							}}
						/>

						<div className="mt-10 lg:mt-60">
							<h3 className="text-center text-xl font-medium lg:text-left">
								{post.titleRelatedResources}
							</h3>
							{post.resourcesList?.map((resource, index) => (
								<Link
									key={`related-resource-${resource.contentID}`}
									href={`/blog/${resource.fields.uRL}`}
									className="group mt-8 block transition-shadow hover:shadow-lg"
								>
									{resource.fields.postImage && (
										<div className="overflow-clip">
											<AgilityPic
												image={resource.fields.postImage}
												alt={resource.fields.title}
												fallbackWidth={400}
												className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
											/>
										</div>
									)}
									<div className="space-y-3 border border-t-0 border-background p-6">
										<h3 className="text-xl font-medium">{resource.fields.title}</h3>
										<div>
											<span className="rounded-md bg-background px-2 py-1">
												{resource.fields.categoriesTitle}
											</span>
										</div>
										<div>
											<div className="flex items-center gap-1 font-medium text-highlight-light">
												Learn More
												<IconChevronRight size={18} />
											</div>
										</div>
									</div>
								</Link>
							))}

							{post.titleRightCTA && post.buttonRightCTA && (
								<div className="mt-8 flex min-h-60 flex-col items-center justify-center gap-5 bg-highlight-light p-6 py-10">
									<h3 className="text-balance text-center text-2xl font-medium text-white">
										{post.titleRightCTA}
									</h3>
									{post.contentRightCTA && (
										<p className="text-center text-white">{post.contentRightCTA}</p>
									)}
									<LinkButton
										type="secondary-inverted"
										href={post.buttonRightCTA.href}
										target={post.buttonRightCTA.target}
									>
										{post.buttonRightCTA.text}
									</LinkButton>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* <div className="lg:hidden">
					<SharePage
						{...{
							title: "Share Post",
							url: `https://agilitycms.com/blog/${post.uRL}`,
							className: "flex flex-col items-center gap-2"
						}}
					/>
				</div> */}
			</article>
		</Container>
	)
}

export default PostDetails
