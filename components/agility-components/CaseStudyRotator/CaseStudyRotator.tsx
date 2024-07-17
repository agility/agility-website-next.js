import { Filter } from "@agility/content-fetch/dist/types/Filter"
import { renderHTML, Module, UnloadedModuleProps } from "@agility/nextjs"
import { ContentItem } from "@agility/content-fetch"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import { getContentList } from "lib/cms/getContentList"
import { ICaseStudy } from "lib/types/ICaseStudy"
import { ITestimonial } from "lib/types/ITestimonial"
import { CaseStudyRotatorClient, MinCaseStudy } from "./CaseStudyRotator.client"
import { stripHtml } from "lib/utils/strip-html"

interface ICaseStudyRotator {
	title: string
	cTAbuttonText: string
	caseStudies: {
		referencename: string
		sortids: string
	}
}

const CaseStudyRotator = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<ICaseStudyRotator>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	const f = {
		operator: "in",
		property: "contentID",
		value: `"${fields.caseStudies.sortids}"`
	}

	const lstCaseStudies = await getContentList({
		referenceName: fields.caseStudies.referencename,
		languageCode,
		//@ts-ignore
		filters: [f],
		expandAllContentLinks: true
	})

	if (!lstCaseStudies || lstCaseStudies.length === 0) return null

	const { title, cTAbuttonText, caseStudies } = fields

	const lst: ContentItem<ICaseStudy>[] = lstCaseStudies.items

	console.log("lst", lst[0])

	const minCaseStudies: MinCaseStudy[] = lst
		.filter(
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
		})

	return (
		<Container id={`${contentID}`} data-agility-component={contentID}>
			<div className="max-w-5xl mx-auto text-center ">
				{title && <h2 className="text-4xl text-balance">{title}</h2>}
			</div>
			<CaseStudyRotatorClient
				{...{ contentID, caseStudies: minCaseStudies, cTAbuttonText: fields.cTAbuttonText }}
			/>
		</Container>
	)
}

export default CaseStudyRotator
