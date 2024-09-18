/* eslint-disable @next/next/no-img-element */
import { AgilityImage, AgilityPic, UnloadedModuleProps } from "@agility/nextjs"
import { getContentItem } from "lib/cms/getContentItem"
import { getContentList } from "lib/cms/getContentList"
import { IStarterTemplate } from "lib/types/IStarterTemplate"
import { ContentItem } from "@agility/content-fetch"
import { Container } from "components/micro/Container"
import Link from "next/link"
import { IconChevronRight } from "@tabler/icons-react"

interface IStarterTemplateListing {
	title: string
	section?: string
	description?: string
	viewDetailsLabel?: string
	templates: {
		referencename: string
	}
}

export const StarterTemplateListing = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<IStarterTemplateListing>({
		contentID: module.contentid,
		languageCode
	})

	const lstTemplates = await getContentList({
		referenceName: fields.templates.referencename,
		languageCode,
		take: 50,
		filters: [
			{
				operator: "eq",
				property: "fields.showOnWebsite",
				value: "true"
			}
		]
	})

	if (!lstTemplates || lstTemplates.items.length === 0) return null

	const templates = lstTemplates.items as ContentItem<IStarterTemplate>[]

	return (
		<Container className="mx-auto max-w-7xl">
			<div className="text-center uppercase text-slate-500">{fields.section}</div>

			<h1 className="mt-10 text-balance text-center text-4xl font-medium">{fields.title}</h1>
			<p className="mt-5 text-center">{fields.description}</p>

			<div className="mt-10 grid space-y-3 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
				{templates.map((template) => (
					<Link
						key={template.contentID}
						href={`/starters/${template.fields.slug}`}
						className="group flex flex-col shadow-md transition-shadow duration-200 hover:shadow-lg"
					>
						<div className="relative h-64 overflow-clip">
							<AgilityPic
								image={template.fields.image}
								fallbackWidth={400}
								className="w-full object-cover transition-transform duration-300 group-hover:scale-110"
							/>
							<div className="absolute inset-0 flex items-center justify-center bg-highlight-light/60 opacity-0 transition-opacity group-hover:opacity-100">
								<div className="flex items-center gap-2 bg-white p-3 px-4 font-medium text-highlight-light">
									{fields.viewDetailsLabel}
									<IconChevronRight size={20} />
								</div>
							</div>
						</div>
						<div className="flex flex-1 flex-col gap-3 p-5">
							<h4 className="text-lg font-medium text-highlight-light">{template.fields.name}</h4>
							<p className="flex-1 text-slate-500">{template.fields.description}</p>
							<div className="flex items-center gap-3 border-t border-t-background pt-5">
								{template.fields.frameworks.map((framework) => {
									let imgUrl = `${framework.fields.logo.url}?format=auto&h=50`
									if (framework.fields.logo.url.endsWith(".svg")) {
										imgUrl = framework.fields.logo.url
									}
									return (
										<img
											key={framework.contentID}
											src={imgUrl}
											alt={framework.fields.logo.label}
											className="h-8"
										/>
									)
								})}
							</div>
						</div>
					</Link>
				))}
			</div>
		</Container>
	)
}
