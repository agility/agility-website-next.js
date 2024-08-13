import { renderHTML, UnloadedModuleProps } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { ICaseStudy } from "lib/types/ICaseStudy"
import Link from "next/link"
import { IconBrandFacebook, IconBrandLinkedin, IconBrandX, IconQuote } from "@tabler/icons-react"
import { CaseStudyDetailRotator } from "./CaseStudyDetailRotator"
import { ResourceCard } from "./ResourceCard"
import { stripHtml } from "lib/utils/strip-html"
import { CaseStudyRotatorClient, MinCaseStudy } from "../CaseStudyRotator/CaseStudyRotator.client"
import { getContentItem } from "lib/cms/getContentItem"

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
			<Container className="mx-auto max-w-7xl">
				<div className="lg:flex lg:flex-row-reverse">
					<div className="bg-background/60 p-6 lg:w-1/3 lg:bg-white lg:p-0">
						{caseStudy.website && (
							<>
								<div className="font-bold">Website</div>
								<div className="pt-1">
									<a
										href={caseStudy.website?.href}
										target="_blank"
										rel="noreferrer"
										className="text-highlight-light underline"
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
											className="rounded bg-background px-2 py-1 hover:text-highlight-light"
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
											className="rounded bg-background px-2 py-1 hover:text-highlight-light"
										>
											{item.fields.title}
										</Link>
									))}
								</div>
							</>
						)}

						<div className="hidden lg:block">
							<div className="pt-6 font-bold">Share Case Study</div>
							<div className="flex flex-wrap gap-2 pt-1">
								<a
									href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://agilitycms.com/resources/case-studies/${caseStudy.uRL}`)}`}
									target="_blank"
									rel="noreferrer"
									className="group rounded-full bg-background p-1.5 text-highlight-light transition-colors hover:bg-highlight-light hover:text-white"
									title="Share on LinkedIn"
								>
									<IconBrandLinkedin className="transition-colors group-hover:text-white" />
								</a>
								<a
									href={`https://x.com/intent/post/?url=${encodeURIComponent(`https://agilitycms.com/resources/case-studies/${caseStudy.uRL}`)}`}
									target="_blank"
									rel="noreferrer"
									className="group rounded-full bg-background p-1.5 text-highlight-light transition-colors hover:bg-highlight-light hover:text-white"
									title="Share on X"
								>
									<IconBrandX className="transition-colors group-hover:text-white" />
								</a>

								<a
									href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://agilitycms.com/resources/case-studies/${caseStudy.uRL}`)}`}
									target="_blank"
									rel="noreferrer"
									className="group rounded-full bg-background p-1.5 text-highlight-light transition-colors hover:bg-highlight-light hover:text-white"
									title="Share on Facebook"
								>
									<IconBrandFacebook className="transition-colors group-hover:text-white" />
								</a>

								<div className="mt-6 rounded-md border border-highlight-light p-3">
									<div>
										<IconQuote className="text-highlight-light" size={72} />
									</div>
									<div
										className="prose prose-lg"
										dangerouslySetInnerHTML={renderHTML(caseStudy.quote)}
									></div>
								</div>
							</div>
						</div>
					</div>
					<div className="mt-8 lg:mt-0 lg:w-2/3">
						{/* top content */}
						<div className="prose" dangerouslySetInnerHTML={renderHTML(caseStudy.topContent)}></div>
					</div>
				</div>

				{/* Rotator */}
				{caseStudy.gallery && caseStudy.gallery.media && caseStudy.gallery.media.length > 0 && (
					<CaseStudyDetailRotator galleryItems={caseStudy.gallery.media} />
				)}

				{/* Bottom Content */}
				<div className="mt-10 lg:w-2/3">
					<div className="prose" dangerouslySetInnerHTML={renderHTML(caseStudy.bottomContent)}></div>
				</div>
			</Container>

			<Container id={`${contentID}`} data-agility-component={contentID}>
				<div className="mx-auto max-w-5xl text-center">
					<h2 className="text-center text-3xl font-medium">{fields.relatedCaseStudiesHeading}</h2>
				</div>
				<CaseStudyRotatorClient
					{...{ caseStudies: minCaseStudies, cTAbuttonText: fields.relatedCaseStudiesCTALabel }}
				/>
			</Container>

			{/* Related Case Studies */}

			<Container className="mx-auto max-w-7xl">
				{/* related resources */}
				<div className="mt-10">
					<h2 className="text-center text-3xl font-medium">{fields.relatedResourcesHeading}</h2>
					<div className="mt-6 flex w-full justify-center gap-6">
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

				{/* Only shows in single column mode...  */}
				<div className="lg:hidden">
					<div className="mt-6 rounded-md border border-highlight-light p-3 sm:mx-10">
						<div>
							<IconQuote className="text-highlight-light" size={72} />
						</div>
						<div className="prose prose-lg" dangerouslySetInnerHTML={renderHTML(caseStudy.quote)}></div>
					</div>

					<div className="text-center">
						<div className="pt-8 font-bold uppercase text-gray-500">Share Case Study</div>
						<div className="flex flex-wrap justify-center gap-2 pt-4">
							<a
								href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://agilitycms.com/resources/case-studies/${caseStudy.uRL}`)}`}
								target="_blank"
								rel="noreferrer"
								className="group rounded-full bg-background p-1.5 text-highlight-light transition-colors hover:bg-highlight-light hover:text-white"
								title="Share on LinkedIn"
							>
								<IconBrandLinkedin className="transition-colors group-hover:text-white" />
							</a>
							<a
								href={`https://x.com/intent/post/?url=${encodeURIComponent(`https://agilitycms.com/resources/case-studies/${caseStudy.uRL}`)}`}
								target="_blank"
								rel="noreferrer"
								className="group rounded-full bg-background p-1.5 text-highlight-light transition-colors hover:bg-highlight-light hover:text-white"
								title="Share on X"
							>
								<IconBrandX className="transition-colors group-hover:text-white" />
							</a>

							<a
								href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://agilitycms.com/resources/case-studies/${caseStudy.uRL}`)}`}
								target="_blank"
								rel="noreferrer"
								className="group rounded-full bg-background p-1.5 text-highlight-light transition-colors hover:bg-highlight-light hover:text-white"
								title="Share on Facebook"
							>
								<IconBrandFacebook className="transition-colors group-hover:text-white" />
							</a>
						</div>
					</div>
				</div>
			</Container>
		</>
	)
}
