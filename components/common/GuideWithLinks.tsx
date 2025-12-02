/* eslint-disable @next/next/no-img-element */
import { ImageField, UnloadedModuleProps, URLField } from "@agility/nextjs"
import { getContentItem } from "lib/cms/getContentItem"
import { ContentItem } from "@agility/content-fetch"
import { getContentList } from "lib/cms/getContentList"
import { LinkButton } from "components/micro/LinkButton"
import { IconChevronRight, IconSettings } from "@tabler/icons-react"
import Link from "next/link"

export interface GuideLink {
	title?: string
	description?: string
	uRL?: URLField
}

export interface MainInfo {
	heading?: string
	guideIcon?: ImageField
	description?: string
	mainCTA?: URLField
}

interface Props {
	mainInfo: MainInfo
	items: GuideLink[]
}

export const GuideWithLinks = async ({ mainInfo, items }: Props) => {
	if (items.length < 1) return null

	let imgURL =
		mainInfo.guideIcon && mainInfo.guideIcon.url.length > 0 ? mainInfo.guideIcon.url : "/images/icon-userguide.svg"
	if (!imgURL.endsWith(".svg")) {
		imgURL += "?format=auto"
	}

	const bgImg = "https://static.agilitycms.com/layout/img/bg/computer.png?format=auto"

	return (
		<div className="mt-14 relative overflow-clip bg-highlight-dark px-10 py-36 text-white dark:bg-gray-900">
			<img src={bgImg} alt="" className="absolute -right-1/4 -top-1/2" />
			<div className="absolute -bottom-20 -left-20 opacity-10">
				<div className="relative h-72 w-72">
					<IconSettings size={90} className="absolute right-2 top-0" />
					<IconSettings size={260} className="absolute bottom-0 left-0" />
				</div>
			</div>
			<div className="relative mx-auto flex max-w-5xl flex-col gap-5 lg:flex-row lg:items-center">
				<div className="flex flex-col gap-5 lg:w-1/2 xl:w-2/5">
					<img src={imgURL} alt="icon" className="w-12" />

					<h2 className="text-balance text-4xl">{mainInfo.heading}</h2>
					<div className="">{mainInfo.description}</div>

					{mainInfo.mainCTA && (
						<div>
							<LinkButton
								href={mainInfo.mainCTA.href}
								type="secondary-inverted"
								target={mainInfo.mainCTA.target}
								size="md"
							>
								{mainInfo.mainCTA.text}
							</LinkButton>
						</div>
					)}
				</div>
				<div className="lg:w-1/2 xl:w-3/5">
					<div className="flex flex-col gap-4 bg-black/20 p-5 dark:bg-gray-800/50">
						{items.map((item, index) => (
							<>
								{item.uRL ? (
									<Link
										href={item.uRL.href}
										target={item.uRL.target}
										key={index}
										className="flex items-center gap-4 bg-highlight bg-opacity-0 p-4 transition-all hover:bg-opacity-100 dark:hover:bg-gray-700/50"
									>
										<div className="flex-1">
											<h3 className="text-lg">{item.title}</h3>
											<div>{item.description}</div>
										</div>
										<IconChevronRight size={24} className="text-secondary" />
									</Link>
								) : (
									<div
										key={index}
										className="flex items-center gap-4 bg-highlight bg-opacity-0 p-4 transition-all hover:bg-opacity-100 dark:hover:bg-gray-700/50"
									>
										<div className="flex-1">
											<h3 className="text-lg">{item.title}</h3>
											<div>{item.description}</div>
										</div>
										<IconChevronRight size={24} className="text-secondary" />
									</div>
								)}
							</>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
