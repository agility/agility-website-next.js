import { UnloadedModuleProps } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { ICaseStudy } from "lib/types/ICaseStudy"
import Link from "next/link"
import { IconQuote } from "@tabler/icons-react"
import { CaseStudyDetailRotator } from "./CaseStudyDetailRotator"
import { ResourceCard } from "./ResourceCard"
import { stripHtml } from "lib/utils/strip-html"
import { CaseStudyRotatorClient, MinCaseStudy } from "../CaseStudyRotator/CaseStudyRotator.client"
import { getContentItem } from "lib/cms/getContentItem"
import { SharePage } from "components/common/SharePage"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"

interface ICaseStudyDetails {
	relatedCaseStudiesHeading: string
	relatedCaseStudiesCTALabel: string
	relatedResourcesHeading: string
	relatedResourcesCTALabel: string
}

export const CaseStudyDetails = async ({ dynamicPageItem, languageCode, module }: UnloadedModuleProps) => {
	if (!dynamicPageItem) return null

	const { fields, contentID } = await getContentItem<ICaseStudyDetails>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	const caseStudy = dynamicPageItem?.fields as ICaseStudy

	const minCaseStudies: MinCaseStudy[] =
		caseStudy.rotatorCaseStudies
			?.filter(
				(l) =>
					l.fields.title &&
					l.fields.clientNames &&
					l.fields.excerpt &&
					l.fields.customerLogo &&
					l.fields.uRL &&
					l.fields.image
			)
			.map((l) => {
				return {
					contentID: l.contentID,
					title: l.fields.title,
					clientNames: l.fields.clientNames || "",
					excerpt: stripHtml(l.fields.excerpt, 200) || "",
					customerLogo: l.fields.customerLogo,
					uRL: l.fields.uRL || "",
					image: l.fields.image
				}
			}) || []

	return (
		<>
			<Container >
				<div className="mx-auto max-w-7xl">
					<div className="lg:flex lg:flex-row-reverse">
						<div className="bg-background/60 dark:bg-gray-900 p-6 lg:w-1/3 lg:bg-white dark:lg:bg-gray-900 lg:p-0">
							{caseStudy.website && (
								<>
									<div className="font-bold">Website</div>
									<div className="pt-1">
										<a
											href={caseStudy.website?.href}
											target="_blank"
											rel="noreferrer"
											className="text-highlight-light underline dark:text-secondary"
										>
											{caseStudy.website?.text}
										</a>
									</div>
								</>
							)}

							{caseStudy.caseStudyIndustries && (
								<>
									<div className="pt-6 font-bold">Industries</div>
									<div className="flex flex-wrap gap-2 pt-1">
										{caseStudy.caseStudyIndustries.map((industry) => (
											<Link
												key={industry.contentID}
												href={`../case-studies?industry=${encodeURIComponent(industry.fields.title.toLowerCase().replaceAll(" ", "-"))}`}
												className="rounded bg-background dark:bg-gray-800 px-2 py-1 hover:text-highlight-light"
											>
												{industry.fields.title}
											</Link>
										))}
									</div>
								</>
							)}

							{caseStudy.caseStudyChallenges && (
								<>
									<div className="pt-6 font-bold">Industries</div>
									<div className="flex flex-wrap gap-2 pt-1">
										{caseStudy.caseStudyChallenges.map((item) => (
											<Link
												key={item.contentID}
												href={`../case-studies?challenge=${encodeURIComponent(item.fields.title.toLowerCase().replaceAll(" ", "-"))}`}
												className="rounded bg-background dark:bg-gray-800 px-2 py-1 hover:text-highlight-light"
											>
												{item.fields.title}
											</Link>
										))}
									</div>
								</>
							)}

							<div className="hidden lg:block">
								<SharePage
									{...{
										title: "Share Case Study",
										url: `https://agilitycms.com/resources/case-studies/${caseStudy.uRL}`,
										className: "hidden lg:block"
									}}
								/>
								{caseStudy.quote && (
									<div className="mt-6 rounded-md border border-highlight-light p-3">
										<div>
											<IconQuote className="text-highlight-light" size={72} />
										</div>
										<div
											className="prose prose-lg dark:prose-invert"
											dangerouslySetInnerHTML={renderHTMLCustom(caseStudy.quote)}
										></div>
									</div>
								)}
							</div>
						</div>
						<div className="mt-8 lg:mt-0 lg:w-2/3">
							{/* top content */}
							<div className="prose dark:prose-invert" dangerouslySetInnerHTML={renderHTMLCustom(caseStudy.topContent)}></div>
						</div>
					</div>

					{/* Rotator */}
					{caseStudy.gallery && caseStudy.gallery.media && caseStudy.gallery.media.length > 0 && (
						<CaseStudyDetailRotator galleryItems={caseStudy.gallery.media} />
					)}

					{/* Bottom Content */}
					<div className="mt-10 lg:w-2/3">
						<div className="prose dark:prose-invert" dangerouslySetInnerHTML={renderHTMLCustom(caseStudy.bottomContent)}></div>
					</div>
				</div>
			</Container>

			{/* Related Case Studies */}
			{minCaseStudies.length > 0 && (
				<Container id={`${contentID}`} data-agility-component={contentID}>
					<div className="mx-auto max-w-5xl text-center">
						<h2 className="text-center text-3xl font-medium">{fields.relatedCaseStudiesHeading}</h2>
					</div>
					<CaseStudyRotatorClient
						{...{ caseStudies: minCaseStudies, cTAbuttonText: fields.relatedCaseStudiesCTALabel }}
					/>
				</Container>
			)}

			<Container >
				<div className="mx-auto max-w-7xl">
					{/* related resources */}
					{caseStudy.relatedResources && caseStudy.relatedResources.length > 0 && (
						<div className="mt-10">
							<h2 className="text-center text-3xl font-medium">{fields.relatedResourcesHeading}</h2>
							<div className="mt-6 flex w-full flex-col justify-center gap-6 lg:flex-row">
								{caseStudy.relatedResources?.map((item) => (
									<ResourceCard
										key={item.contentID}
										languageCode={languageCode}
										resource={item.fields}
										ctaLabel={fields.relatedResourcesCTALabel}
									/>
								))}
							</div>
						</div>
					)}

					{/* Only shows in single column mode...  */}
					<div className="lg:hidden">
						{caseStudy.quote && (
							<div className="mt-6 rounded-md border border-highlight-light p-3 sm:mx-10">
								<div>
									<IconQuote className="text-highlight-light" size={72} />
								</div>
								<div
									className="prose- prose prose-lg"
									dangerouslySetInnerHTML={renderHTMLCustom(caseStudy.quote)}
								></div>
							</div>
						)}

						<SharePage
							{...{
								title: "Share Case Study",
								url: `https://agilitycms.com/resources/case-studies/${caseStudy.uRL}`,
								className: "flex flex-col items-center gap-2"
							}}
						/>
					</div>
				</div>
			</Container>
		</>
	)
}
