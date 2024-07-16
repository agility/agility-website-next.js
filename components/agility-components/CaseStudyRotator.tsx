import { Filter } from "@agility/content-fetch/dist/types/Filter"
import { renderHTML, Module, UnloadedModuleProps } from "@agility/nextjs"
import { ContentItem } from "@agility/content-fetch"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import { getContentList } from "lib/cms/getContentList"
import { ICaseStudy } from "lib/types/ICaseStudy"
import { ITestimonial } from "lib/types/ITestimonial"

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
		filters: [f]
	})

	if (!lstCaseStudies || lstCaseStudies.length === 0) return null

	const { title, cTAbuttonText, caseStudies } = fields

	const lst: ContentItem<ICaseStudy>[] = lstCaseStudies.items

	console.log("CASE STUDY ROTATOR", fields)
	console.log("CASE STUDY ROTATOR", lst[0])

	return (
		<Container id={`${contentID}`} data-agility-component={contentID}>
			<div className="max-w-5xl mx-auto my-12 md:mt-18 lg:mt-20">CASE</div>
		</Container>
	)
}

export default CaseStudyRotator
