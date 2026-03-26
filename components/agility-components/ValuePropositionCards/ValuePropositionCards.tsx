import { UnloadedModuleProps, URLField } from "@agility/nextjs"
import { ContentItem } from "@agility/content-fetch"
import {
	IconStack2,
	IconCode,
	IconShieldCheck,
	IconWorld,
	IconRocket,
	IconUsers,
	IconBolt,
	IconPuzzle,
} from "@tabler/icons-react"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import { getContentList } from "lib/cms/getContentList"
import Link from "next/link"

const iconMap: Record<string, React.ComponentType<any>> = {
	"stack-2": IconStack2,
	code: IconCode,
	"shield-check": IconShieldCheck,
	world: IconWorld,
	rocket: IconRocket,
	users: IconUsers,
	bolt: IconBolt,
	puzzle: IconPuzzle,
}

interface IValuePropositionCard {
	iconName?: string
	title: string
	description: string
	link?: URLField
}

interface IValuePropositionCards {
	heading: string
	description?: string
	cards: {
		referencename: string
	}
}

export const ValuePropositionCards = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<IValuePropositionCards>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0,
	})

	const lstCards = await getContentList({
		referenceName: fields.cards.referencename,
		languageCode,
		take: 50,
	})

	if (!lstCards || !lstCards.items || lstCards.items.length === 0) return null

	const cards = lstCards.items as ContentItem<IValuePropositionCard>[]

	return (
		<Container id={`${contentID}`} data-agility-component={contentID}>
			<div className="mx-auto max-w-7xl pb-14">
				<div className="mx-auto max-w-3xl text-center">
					{fields.heading && (
						<h2 className="text-balance text-4xl font-bold text-primary lg:text-5xl">
							{fields.heading}
						</h2>
					)}
					{fields.description && (
						<p className="mt-4 text-balance text-lg text-gray-600">{fields.description}</p>
					)}
				</div>
				<div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
					{cards.map((item) => {
						const { iconName, title, description, link } = item.fields
						const IconComponent = iconName ? iconMap[iconName] : null

						const cardContent = (
							<div className="group flex h-full flex-col gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-8 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-lg">
								{IconComponent ? (
									<div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-sm transition-all group-hover:shadow-md">
										<IconComponent size={28} stroke={1.5} className="text-highlight-light" />
									</div>
								) : (
									<div className="h-14 w-14" />
								)}
								<h3 className="text-xl font-bold text-primary">{title}</h3>
								<p className="text-gray-600">{description}</p>
							</div>
						)

						if (link && link.href) {
							return (
								<Link key={item.contentID} href={link.href} target={link.target}>
									{cardContent}
								</Link>
							)
						}

						return <div key={item.contentID}>{cardContent}</div>
					})}
				</div>
			</div>
		</Container>
	)
}
