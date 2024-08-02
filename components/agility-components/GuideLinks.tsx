/* eslint-disable @next/next/no-img-element */
import { ImageField, UnloadedModuleProps, URLField } from "@agility/nextjs"
import { getContentItem } from "lib/cms/getContentItem"
import { ContentItem } from "@agility/content-fetch"
import { getContentList } from "lib/cms/getContentList"
import { LinkButton } from "components/micro/LinkButton"
import { IconChevronRight, IconSettings } from "@tabler/icons-react"
import Link from "next/link"

interface Link {
	title?: string
	description?: string
	uRL: URLField
}

interface IGuideLinks {
	heading?: string
	guideIcon?: ImageField
	description?: string
	mainCTA?: URLField
	links: {
		referencename: string
	}
}

export const GuideLinks = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<IGuideLinks>({
		contentID: module.contentid,
		languageCode
	})

	const lst = await getContentList({
		languageCode,
		referenceName: fields.links.referencename
	})

	if (!lst || lst.items.length < 1) return null

	let imgURL =
		fields.guideIcon && fields.guideIcon.url.length > 0 ? fields.guideIcon.url : "/images/icon-userguide.svg"
	if (!imgURL.endsWith(".svg")) {
		imgURL += "?format=auto"
	}

	const bgImg = "https://static.agilitycms.com/layout/img/bg/computer.png?format=auto"

	const items = lst.items as ContentItem<Link>[]

	return (
		<div className="relative mt-14 overflow-clip bg-highlight-dark px-10 py-36 text-white">
			<img src={bgImg} alt="" className="absolute -right-1/4 -top-1/2" />
			<div className="absolute -bottom-20 -left-20 opacity-10">
				<div className="relative h-72 w-72">
					<IconSettings size={90} className="absolute right-2 top-0" />
					<IconSettings size={260} className="absolute bottom-0 left-0" />
				</div>
			</div>
			<div className="relative mx-auto flex max-w-5xl flex-col gap-5 lg:flex-row">
				<div className="flex flex-col gap-5 lg:w-1/2 xl:w-2/5">
					<img src={imgURL} alt="icon" className="w-12" />

					<h2 className="text-balance text-4xl">{fields.heading}</h2>
					<div className="">{fields.description}</div>

					{fields.mainCTA && (
						<div>
							<LinkButton
								href={fields.mainCTA.href}
								type="secondary-inverted"
								target={fields.mainCTA.target}
								size="md"
							>
								{fields.mainCTA.text}
							</LinkButton>
						</div>
					)}
				</div>
				<div className="lg:w-1/2 xl:w-3/5">
					<div className="flex flex-col gap-4 bg-black/20 p-5">
						{items.map((item) => (
							<Link
								href={item.fields.uRL.href}
								target={item.fields.uRL.target}
								key={item.contentID}
								className="flex items-center gap-4 bg-highlight bg-opacity-0 p-4 transition-all hover:bg-opacity-100"
							>
								<div className="flex-1">
									<h3 className="text-lg">{item.fields.title}</h3>
									<div>{item.fields.description}</div>
								</div>
								<IconChevronRight size={24} className="text-secondary" />
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
