import { AgilityPic, ImageField, UnloadedModuleProps } from "@agility/nextjs"
import { gql } from "@apollo/client"
import { Container } from "components/micro/Container"
import { getAgilityGraphQLClient } from "lib/cms/getAgilityGraphQLClient"
import { getContentItem } from "lib/cms/getContentItem"
import { sortByIDs } from "lib/utils/sortByIDs"
import Link from "next/link"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"

interface INewPostsFeatured {
	title: string
	readMoreLabel: string
	posts: {
		referencename: string
		sortids: string
	}
}

interface MiniPost {
	contentID: number
	fields: {
		title: string
		uRL: string
		excerpt?: string
		postImage: ImageField
	}
}

export const NewPostsFeatured = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<INewPostsFeatured>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	const refName = fields.posts.referencename
	const sortIDs = fields.posts.sortids

	const filter = `contentID[in]\"${sortIDs}\"`

	const gqlQuery = gql(`
		query features($filter: String = "") {
			blogposts(filter: $filter) {
				contentID
				fields {
					title
					uRL
					excerpt
					postImage {
						label
						url
						height
						width
						target
						fileSize
					}
				}
			}
		}
	`)

	const { query } = await getAgilityGraphQLClient({ referenceNames: [refName], filter })
	const { data } = await query({ query: gqlQuery, variables: { filter } })

	if (!data[refName]) return null

	const postsPre = data[refName] as MiniPost[]
	const posts = sortByIDs(postsPre, sortIDs)

	return (
		<Container id={`${contentID}`} data-agility-component={contentID} className="mx-auto max-w-7xl">
			<div className="flex w-full flex-col items-center justify-center gap-10 md:flex-row md:flex-wrap md:items-start lg:flex-nowrap">
				{posts.map((post, index) => (
					<Link
						href={`/blog/${post.fields.uRL}`}
						key={index}
						className="group flex min-w-80 max-w-96 flex-col bg-highlight-light text-white"
					>
						<div className="h-56 overflow-clip">
							<AgilityPic
								image={post.fields.postImage}
								className="w-full object-contain object-center transition-transform duration-300 group-hover:scale-110"
							/>
						</div>
						<div className="flex h-80 flex-col gap-4 p-4">
							<h3 className="text-balance text-xl font-bold">{post.fields.title}</h3>
							{post.fields.excerpt && (
								<div
									className="prose prose-invert line-clamp-4 flex-1"
									dangerouslySetInnerHTML={renderHTMLCustom(post.fields.excerpt)}
								></div>
							)}

							<div className="border-2 border-white p-3 px-4 text-center font-medium text-white">
								{fields.readMoreLabel || "Read More"}
							</div>
						</div>
					</Link>
				))}
			</div>
		</Container>
	)
}
