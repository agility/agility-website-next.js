/* eslint-disable @next/next/no-img-element */
import { AgilityPic, ImageField, UnloadedModuleProps, URLField } from "@agility/nextjs"
import { getContentItem } from "lib/cms/getContentItem"
import { getContentList } from "lib/cms/getContentList"
import { ContentItem } from "@agility/content-fetch"
import { Container } from "components/micro/Container"
import { LinkButton } from "components/micro/LinkButton"
import { IconChevronRight } from "@tabler/icons-react"
import clsx from "clsx"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"

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
	darkMode?: string
}

export const TriplePanelModule = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<ITriplePanelModule>({
		contentID: module.contentid,
		languageCode
	})

	const darkMode = fields.darkMode === "true"

	const lst = await getContentList({
		languageCode,
		referenceName: fields.triplePanelItems.referencename
	})

	if (!lst || lst.items.length < 1) return null

	const items = lst.items as ContentItem<PanelContentItem>[]

	return (
		<Container
			id={`${contentID}`}
			data-agility-component={contentID}
			className={clsx(darkMode ? "bg-gray-900 text-white" : "")}
		>
			<div className="mx-auto max-w-6xl">
				<h2 className="text-balance text-center text-5xl">{fields.title}</h2>
				{fields.description && (
					<div
						className="mt-4 text-center text-lg"
						dangerouslySetInnerHTML={renderHTMLCustom(fields.description)}
					></div>
				)}

				<div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
					{items.map((item, index) => (
						<div key={index} className={clsx("mb-4 p-6", darkMode ? "bg-slate-700" : "")}>
							{item.fields.graphic && (
								<div>
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
							<h3 className="mt-5 text-balance text-xl font-semibold">{item.fields.title}</h3>
							{item.fields.description && (
								<div
									className="mt-4"
									dangerouslySetInnerHTML={renderHTMLCustom(item.fields.description)}
								></div>
							)}
						</div>
					))}
				</div>

				{fields.cTAButton && fields.cTAButton.target !== "" && (
					<div className="mt-14 text-center">
						<LinkButton
							href={fields.cTAButton.href}
							className="flex items-center gap-1"
							type={darkMode ? "secondary-inverted" : "alternate"}
							size="md"
						>
							<span>{fields.cTAButton.text}</span>
							<IconChevronRight size={18} stroke={2} />
						</LinkButton>
					</div>
				)}
			</div>
		</Container>
	)
}
