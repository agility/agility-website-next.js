import { AgilityPic, UnloadedModuleProps, URLField } from "@agility/nextjs"
import { ContentItem } from "@agility/content-fetch"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import { getContentList } from "lib/cms/getContentList"
import { IPost } from "lib/types/IPost"
import Link from "next/link"
import { LinkButton } from "components/micro/LinkButton"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"

interface ILatestPosts {
	title: string
	postCount: number
	posts: { referencename: string }
	categoryIDs: string

	categories: {
		referencename: string
		sortids: string
	}
	readMoreLabel: string
	primaryButton: URLField
}
export const LatestPosts = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields } = await getContentItem<ILatestPosts>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	//ignore the cateories here and just get the latest posts (default sort is newest first)
	const lstPosts = await getContentList({
		referenceName: fields.posts.referencename,
		languageCode,
		take: fields.postCount
	})

	if (!lstPosts || lstPosts.items.length < 3) return null

	const posts = lstPosts.items as ContentItem<IPost>[]

	return (
		<Container className="mx-auto max-w-7xl">
			<h2 className="text-balance text-center text-4xl font-medium">{fields.title}</h2>
			<div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{posts.map((post, index) => (
					<Link
						key={post.contentID}
						className="group flex flex-col transition-shadow hover:shadow-lg"
						href={`/blog/${post.fields.uRL}`}
					>
						{post.fields.postImage && (
							<div className="h-48 w-full overflow-clip">
								<AgilityPic
									image={post.fields.postImage}
									fallbackWidth={400}
									className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
								/>
							</div>
						)}
						<div className="flex flex-1 flex-col gap-3 border border-t-0 border-background p-5">
							<h3 className="text-balance text-xl font-semibold">{post.fields.title}</h3>
							<div className="flex-1">
								<div
									className="prose prose-slate line-clamp-3 prose-p:leading-snug"
									dangerouslySetInnerHTML={renderHTMLCustom(post.fields.excerpt)}
								></div>
							</div>
							<div className="flex justify-center">
								<div className="border-2 border-highlight-light px-4 py-2 font-medium text-highlight-light">
									{fields.readMoreLabel}
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>
			<div className="mt-10 flex justify-center">
				<LinkButton type="secondary" size="md" {...fields.primaryButton}>
					{fields.primaryButton.text}
				</LinkButton>
			</div>
		</Container>
	)
}
