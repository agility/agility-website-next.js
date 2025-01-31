import { AgilityPic, UnloadedModuleProps } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { getContentList } from "lib/cms/getContentList"
import { IResource } from "lib/types/IResource"
import { ContentItem } from "@agility/content-fetch"
import Link from "next/link"
import { LinkButton } from "components/micro/LinkButton"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"

export const NEWeBookThankYou = async ({ languageCode, globalData }: UnloadedModuleProps) => {
	const resourceSlug = globalData?.searchParams?.get("resource")

	let selectedResource: ContentItem<IResource> | null = null
	if (resourceSlug) {
		const lst = await getContentList({
			referenceName: "resources",
			languageCode,
			filterString: `fields.uRL[eq]"${resourceSlug}"`,
			take: 1
		})
		if (lst && lst.items.length > 0) {
			selectedResource = lst.items[0] as ContentItem<IResource>
		}
	}

	if (!selectedResource) {
		//if we don't have a selected resource, show a generic thank you message
		return <Container className="mx-auto mt-40 max-w-7xl text-xl font-medium">Thanks!</Container>
	}

	const downloadUrl = selectedResource.fields.uRLGatedContent || "#"

	const topReads = selectedResource.fields.topReads || []
	if (topReads.length < 3) {
		//grab the most resources ebooks to make sure we have 3 in the list
		const lst = await getContentList({
			referenceName: "resources",
			languageCode,
			filterString: `fields.resourceTypeID[eq]"401"`,
			sort: "contentID",
			direction: "desc",
			take: 10
		})

		if (lst && lst.items.length > 0) {
			for (let i = 0; i < lst.items.length; i++) {
				if (
					topReads.length < 3 &&
					lst.items[i].fields.bookCover &&
					lst.items[i].contentID !== selectedResource.contentID &&
					topReads.findIndex((x) => x.contentID === lst.items[i].contentID) === -1
				) {
					topReads.push(lst.items[i])
				}
			}
		}
	}

	const topResources = selectedResource.fields.topWebinars || []
	if (topResources.length < 3) {
		//grab the most recent resources to make sure we have 3 in the list
		const lst = await getContentList({
			referenceName: "resources",
			languageCode,
			take: 10,
			sort: "contentID",
			direction: "desc"
		})

		if (lst && lst.items.length > 0) {
			for (let i = 0; i < lst.items.length; i++) {
				if (
					topResources.length < 3 &&
					lst.items[i].fields.image &&
					lst.items[i].contentID !== selectedResource.contentID &&
					topResources.findIndex((x) => x.contentID === lst.items[i].contentID) === -1
				) {
					topResources.push(lst.items[i])
				}
			}
		}
	}

	return (
		<Container className="mx-auto max-w-7xl">
			<div className="gap-5 lg:flex">
				<div className="flex-1">
					<div
						className="prose prose-lg"
						dangerouslySetInnerHTML={renderHTMLCustom(selectedResource?.fields.thankYouContent)}
					></div>

					<div className="mt-5">
						<LinkButton type="alternate" size="md" href={downloadUrl} target="_blank">
							{selectedResource?.fields.resourceButtonText || "Download Now"}
						</LinkButton>
					</div>
				</div>
				<div className="lg:w-2/5">
					<Link href={downloadUrl} target="_blank">
						{selectedResource.fields.bookCover ? (
							<AgilityPic
								image={selectedResource?.fields.bookCover}
								className="w-96"
								fallbackWidth={480}
							/>
						) : selectedResource?.fields.image ? (
							<AgilityPic image={selectedResource?.fields.image} className="w-full" fallbackWidth={480} />
						) : null}
					</Link>
				</div>
			</div>

			{topResources.length > 0 && (
				<div className="mt-14">
					<h2 className="text-center text-3xl font-medium">Top Resources For You</h2>

					<div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{topResources.map((res) => (
							<div key={`topres-${res.contentID}`}>
								<Link
									className="group flex h-full flex-col transition-shadow hover:shadow-md"
									href={`/resources/${res.fields.resourceTypeName?.toLowerCase().replaceAll("-", "")}/${res.fields.uRL}`}
								>
									{res.fields.image && (
										<div className="h-52 overflow-clip">
											<AgilityPic
												image={res.fields.image}
												className="w-full object-cover transition-transform duration-300 group-hover:scale-110"
												fallbackWidth={480}
											/>
										</div>
									)}
									<div className="flex h-full flex-1 flex-col gap-3 border border-t-0 border-background p-5">
										<h3 className="text-2xl font-medium">{res.fields.title}</h3>
										<div>{res.fields.excerpt}</div>
									</div>
								</Link>
							</div>
						))}
					</div>
				</div>
			)}

			{topReads.length > 0 && (
				<div className="mt-14">
					<h2 className="text-center text-3xl font-medium">Top Reads For You</h2>

					<div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{topReads.map((res) => (
							<div key={`topres-${res.contentID}`}>
								<Link
									className="group flex h-full justify-center"
									href={`/resources/${res.fields.resourceTypeName?.toLowerCase().replaceAll("-", "")}/${res.fields.uRL}`}
								>
									{res.fields.bookCover && (
										<div className="">
											<AgilityPic
												image={res.fields.bookCover}
												className="grouphover:shadow-md h-96 w-full rounded-md object-contain transition-all duration-300 group-hover:scale-110"
												fallbackWidth={480}
											/>
										</div>
									)}
								</Link>
							</div>
						))}
					</div>
				</div>
			)}
		</Container>
	)
}
