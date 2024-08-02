/* eslint-disable @next/next/no-img-element */
import { AgilityPic, ImageField, renderHTML, UnloadedModuleProps, URLField } from "@agility/nextjs"
import { getContentItem } from "lib/cms/getContentItem"
import { getContentList } from "lib/cms/getContentList"
import { ContentItem } from "@agility/content-fetch"
import { Container } from "components/micro/Container"
import { LinkButton } from "components/micro/LinkButton"
import { IconChevronRight } from "@tabler/icons-react"

interface PanelContentItem {
	title: string
	description?: string
	graphic?: ImageField
}

interface ITriplePanelModule {
	title?: string
	description?: string
	cTAButton?: URLField
	triplePanelItems: {
		referencename: string
	}
}

export const TriplePanelModule = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<ITriplePanelModule>({
		contentID: module.contentid,
		languageCode
	})

	const lst = await getContentList({
		languageCode,
		referenceName: fields.triplePanelItems.referencename
	})

	if (!lst || lst.items.length < 1) return null

	const items = lst.items as ContentItem<PanelContentItem>[]

	return (
		<Container className="mx-auto max-w-7xl">
			<h2 className="text-balance text-center text-5xl">{fields.title}</h2>
			{fields.description && (
				<div
					className="mt-4 text-center text-lg"
					dangerouslySetInnerHTML={renderHTML(fields.description)}
				></div>
			)}

			<div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{items.map((item, index) => (
					<div key={index} className="">
						{item.fields.graphic && (
							<div className="mb-4">
								{item.fields.graphic.url.endsWith(".svg") ? (
									<img
										src={item.fields.graphic.url}
										alt={item.fields.graphic.label}
										className="w-16"
									/>
								) : (
									<AgilityPic image={item.fields.graphic} className="w-16" fallbackWidth={63} />
								)}
							</div>
						)}
						<h3 className="text-balance text-xl font-semibold">{item.fields.title}</h3>
						{item.fields.description && (
							<div className="mt-4" dangerouslySetInnerHTML={renderHTML(item.fields.description)}></div>
						)}
					</div>
				))}
			</div>

			{fields.cTAButton && (
				<div className="mt-14 text-center">
					<LinkButton
						href={fields.cTAButton.href}
						className="flex items-center gap-1"
						type="alternate"
						size="md"
					>
						<span>{fields.cTAButton.text}</span>
						<IconChevronRight size={18} stroke={2} />
					</LinkButton>
				</div>
			)}
		</Container>
	)
}
