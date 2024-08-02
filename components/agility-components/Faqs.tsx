import { ImageField, renderHTML, UnloadedModuleProps } from "@agility/nextjs"
import { getContentItem } from "lib/cms/getContentItem"
import { getContentList } from "lib/cms/getContentList"
import { ContentItem } from "@agility/content-fetch"
import { Container } from "components/micro/Container"

interface Faq {
	question: string
	answer: string
}

interface IFaqs {
	title?: string

	faqs: {
		referencename: string
	}
}

export const Faqs = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<IFaqs>({
		contentID: module.contentid,
		languageCode
	})

	const lstFaqs = await getContentList({
		languageCode,
		referenceName: fields.faqs.referencename
	})

	if (!lstFaqs) return null

	const faqs = lstFaqs.items as ContentItem<Faq>[]

	console.log("fields", fields)
	console.log("faqs", faqs)

	return (
		<Container className="mx-auto max-w-5xl">
			<h2 className="text-balance text-center text-5xl">{fields.title}</h2>
			<dl>
				{faqs.map((faq) => {
					return (
						<>
							<dt className="mt-10 text-lg font-medium text-highlight-light">{faq.fields.question}</dt>
							<dd className="prose" dangerouslySetInnerHTML={renderHTML(faq.fields.answer)}></dd>
						</>
					)
				})}
			</dl>
		</Container>
	)
}
