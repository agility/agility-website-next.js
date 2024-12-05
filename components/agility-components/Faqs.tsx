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

	if (!lstFaqs || lstFaqs.items.length < 1) return null

	const faqs = lstFaqs.items as ContentItem<Faq>[]

	return (
		<div className="bg-background/60">
			<Container className="mx-auto max-w-5xl">
				<h2 className="text-balance text-center text-5xl">{fields.title}</h2>
				<dl>
					{faqs.map((faq) => {
						return (
							<div key={faq.contentID} className="border-b border-b-slate-300 pb-8">
								<dt className="mt-10 text-lg font-medium text-highlight-light">
									{faq.fields.question}
								</dt>
								<dd
									className="prose mt-4 max-w-full"
									dangerouslySetInnerHTML={renderHTML(faq.fields.answer)}
								></dd>
							</div>
						)
					})}
				</dl>
			</Container>
		</div>
	)
}
