import { AgilityPic, ImageField, UnloadedModuleProps, URLField } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { ThreeDashLine } from "components/micro/ThreeDashLine"
import { getContentItem } from "lib/cms/getContentItem"
import { getContentList } from "lib/cms/getContentList"
import { ContentItem } from "@agility/content-fetch"
import Link from "next/link"

interface ICTABlocks {
	heading?: string
	subHeading?: string
	cTABlocks: { referencename: string }
}

interface Block {
	title: "Facebook"
	subtitle: "Talk in realtime"
	image: ImageField
	link: URLField
}

export const CTABlocks = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields } = await getContentItem<ICTABlocks>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	const lstBlocks = await getContentList({
		languageCode,
		referenceName: fields.cTABlocks.referencename
	})

	if (!lstBlocks || lstBlocks.items.length === 0) return null

	const blocks = lstBlocks.items as ContentItem<Block>[]

	return (
        <Container
			id={`agility-component-${module.contentid}`}
			data-agility-component={module.contentid}

		>
            <div className="mx-auto max-w-7xl">
				<h2 className="text-center text-5xl font-medium" data-agility-field="heading">{fields.heading}</h2>
				<ThreeDashLine />
				<h3
                    className="mt-5 text-center text-xl font-medium"
                    data-agility-field="subHeading">{fields.subHeading}</h3>

				<div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
					{blocks.map((block, index) => (
						<Link
                            href={block.fields.link.href}
                            target={block.fields.link.target}
                            key={block.contentID}
                            className="rounded-lg border border-background/50 bg-white p-5 shadow-md transition-shadow hover:shadow-lg"
                            data-agility-field="link"
                            data-agility-nested-listitem={block.contentID}>
							{block.fields.image && (
								<AgilityPic
                                    image={block.fields.image}
                                    className="h-40 w-full rounded-lg object-contain"
                                    data-agility-field="image" />
							)}
							<h4
                                className="mt-5 text-balance text-center text-xl font-medium"
                                data-agility-field="title">{block.fields.title}</h4>
							<p className="mt-3 text-balance text-center" data-agility-field="subtitle">{block.fields.subtitle}</p>
						</Link>
					))}
				</div>
			</div>
        </Container>
    );
}
