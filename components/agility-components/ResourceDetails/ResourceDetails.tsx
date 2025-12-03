import { AgilityPic, UnloadedModuleProps, URLField } from "@agility/nextjs"
import { ContentItem } from "@agility/content-fetch"
import { Container } from "components/micro/Container"
import { IResource } from "lib/types/IResource"
import { DateTime } from "luxon"
import Link from "next/link"
import { IResourceType } from "lib/types/IResourceType"
import { SharePage } from "components/common/SharePage"
import { getContentItem } from "lib/cms/getContentItem"
import { DownloadForm } from "./DownloadForm.client"
import { LinkButton } from "components/micro/LinkButton"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"

interface IResourceDetails {
	backButton: URLField
	hubspotForm?: string
	redirectURL?: URLField
	submitButtonLabel: "Submit"
}

export const ResourceDetails = async ({ module, languageCode, dynamicPageItem }: UnloadedModuleProps) => {
	if (!dynamicPageItem) return null

	const { fields } = await getContentItem<IResourceDetails>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	const res = dynamicPageItem.fields as IResource

	let dateStr = ""
	if (res.date) {
		const date = new Date(res.date)
		const dt = DateTime.fromJSDate(date)
		dateStr = dt.toFormat("MMM dd, yyyy")
	}

	const resourceType = res.resourceType ? (res.resourceType as ContentItem<IResourceType>) : null
	const resourceTypeName = res.resourceTypeName || ""
	const thisURL = `https://agilitycms.com/resources/${resourceTypeName.toLowerCase().replaceAll(" ", "-")}/${res.uRL}`

	const downloadRedirectUrl = fields.redirectURL
		? fields.redirectURL.href.replace("##URL##", encodeURIComponent(res.uRL))
		: undefined
	return (
		<Container >
			<div className="mx-auto max-w-7xl pb-14">
				<div className="gap-8 lg:flex lg:flex-row">
					<div className="flex-1">
						<time className="text-sm text-gray-500 dark:text-gray-400">{dateStr}</time>
						<h1 className="mt-4 text-balance text-5xl font-medium leading-tight">{res.title}</h1>
						<div className="mt-4">{res.subTitle}</div>

						{res.image && (
							<AgilityPic image={res.image} className="mt-4 w-full" alt={res.title} fallbackWidth={800} />
						)}

						{res.textblob && (
							<div className="prose mt-4 dark:prose-invert" dangerouslySetInnerHTML={renderHTMLCustom(res.textblob)}></div>
						)}
					</div>
					<div className="lg:w-96">
						{resourceType && resourceType.fields.title && (
							<>
								<div className="pt-6 font-bold">Categories</div>
								<div className="flex flex-wrap gap-2 pt-1">
									<Link
										key={resourceType.contentID}
										href={`/resources/category/${encodeURIComponent(resourceType.fields.title.toLowerCase().replaceAll(" ", "-"))}`}
										className="rounded bg-background dark:bg-gray-800 px-2 py-1 hover:text-highlight-light dark:hover:text-secondary"
									>
										{resourceType.fields.title}
									</Link>
								</div>
							</>
						)}

						{res.resourceTopics && res.resourceTopics.length > 0 && (
							<>
								<div className="pt-6 font-bold">Topics</div>
								<div className="flex flex-wrap gap-2 pt-1">
									{res.resourceTopics.map((item) => (
										<Link
											key={item.contentID}
											href={`/resources/topic/${encodeURIComponent(item.fields.title.toLowerCase().replaceAll(" ", "-"))}`}
											className="rounded bg-background dark:bg-gray-800 px-2 py-1 hover:text-highlight-light dark:hover:text-secondary"
										>
											{item.fields.title}
										</Link>
									))}
								</div>
							</>
						)}

						{fields.hubspotForm && res.gated === "true" && (
							<div className="mt-6">
								<DownloadForm hubspotForm={fields.hubspotForm} redirectURL={downloadRedirectUrl} />
							</div>
						)}

						<div className="mt-4">
							<SharePage
								{...{
									title: "Share This",
									url: thisURL,
									className: "flex flex-col items-center lg:items-start"
								}}
							/>
						</div>

						{res.resourceItem && (
							<div className="mt-8">
								<h4 className="text-xl font-medium">{res.resourceHeading || "Recommended For You"}</h4>

								<Link
									href={`/resources/${res.resourceItem.fields.resourceTypeName?.toLowerCase().replaceAll("-", "")}/${res.resourceItem.fields.uRL}`}
									key={`res-${res.resourceItem.contentID}`}
									className="group mt-4 block transition-shadow hover:shadow-md"
								>
									<div className="overflow-clip">
										{res.resourceItem.fields.image && (
											<AgilityPic
												image={res.resourceItem.fields.image}
												className="w-full transition-transform duration-300 group-hover:scale-110"
												fallbackWidth={400}
												alt={res.resourceItem.fields.title}
											/>
										)}
									</div>
									<div className="flex flex-col gap-3 border border-t-0 border-background dark:border-gray-700 p-5">
										<h5 className="text-lg font-medium">{res.resourceItem.fields.title}</h5>
										<div className="flex">
											<div className="rounded bg-background px-2 py-1">
												{res.resourceItem.fields.resourceTypeName}
											</div>
										</div>
										<div className="text-highlight-dark group-hover:text-highlight-light">
											<span>{res.resourceItem.fields.resourceButtonText || "Read More"}</span>
										</div>
									</div>
								</Link>
							</div>
						)}

						{res.rightColumnCTATitle && res.rightCTAButton && (
							<div className="mt-10 flex min-h-60 flex-col items-center justify-center gap-5 bg-highlight-light p-6 py-10">
								<h3 className="text-balance text-center text-2xl font-medium text-white">
									{res.rightColumnCTATitle}
								</h3>
								{res.rightCTAContent && (
									<div
										className="prose darl:prose-invert text-center"
										dangerouslySetInnerHTML={renderHTMLCustom(res.rightCTAContent)}
									></div>
								)}
								<LinkButton
									type="secondary-inverted"
									href={res.rightCTAButton.href}
									target={res.rightCTAButton.target}
								>
									{res.rightCTAButton.text}
								</LinkButton>
							</div>
						)}
					</div>
				</div>
			</div>
		</Container>
	)
}
