import { UnloadedModuleProps } from "@agility/nextjs"
import { getContentItem } from "lib/cms/getContentItem"
import { getContentList } from "lib/cms/getContentList"
import { ContentItem } from "@agility/content-fetch"
import { Container } from "components/micro/Container"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react"
import clsx from "clsx"

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
		<div className="bg-background/60 dark:bg-gray-900 pb-14">
			<Container className="mx-auto max-w-5xl">
				<h2 className="text-balance text-center text-5xl dark:text-white">{fields.title}</h2>
				<dl className="mt-8">
					{faqs.map((faq) => {
						return (
							<>
								<Disclosure as="div" key={faq.contentID} className="group">
									<DisclosureButton className={clsx("w-full text-left flex gap-2 items-center hover:text-highlight-light dark:hover:text-secondary transition-colors")}>
										<div className="">
											<IconChevronRight
												stroke={2.5}
												className="h-5 w-5 text-gray-700 dark:text-gray-300 transition-transform duration-300 ease-in-out group-data-[open]:rotate-90"
											/>
										</div>
										<dt className="text-lg font-medium dark:text-white">
											{faq.fields.question}
										</dt>
									</DisclosureButton>
									<div className="overflow-hidden pt-4">
										<DisclosurePanel
											transition
											className="origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
										>
											<dd
												className="prose dark:prose-invert max-w-full pb-6 ml-9"
												dangerouslySetInnerHTML={renderHTMLCustom(faq.fields.answer)}
											></dd>
										</DisclosurePanel>
									</div>
								</Disclosure>
							</>
						)
					})}
				</dl>
			</Container>
		</div>
	)
}
