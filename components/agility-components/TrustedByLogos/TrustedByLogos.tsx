/* eslint-disable @next/next/no-img-element */
import { ImageField, UnloadedModuleProps, URLField } from "@agility/nextjs"
import { ContentItem } from "@agility/content-fetch"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import { getContentList } from "lib/cms/getContentList"
import Link from "next/link"

interface ITrustedByLogo {
	logo: ImageField
	name: string
	link?: URLField
}

interface ITrustedByLogos {
	heading: string
	logos: {
		referencename: string
	}
}

export const TrustedByLogos = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<ITrustedByLogos>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0,
	})

	const lstLogos = await getContentList({
		referenceName: fields.logos.referencename,
		languageCode,
		take: 50,
	})

	if (!lstLogos || !lstLogos.items || lstLogos.items.length === 0) return null

	const logos = lstLogos.items as ContentItem<ITrustedByLogo>[]

	return (
		<Container id={`${contentID}`} data-agility-component={contentID}>
			<div className="mx-auto max-w-7xl">
				{fields.heading && (
					<p className="text-center text-sm font-semibold uppercase tracking-widest text-gray-500">
						{fields.heading}
					</p>
				)}
				<div className="mt-8 flex flex-wrap items-center justify-center gap-10 lg:gap-16">
					{logos.map((item) => {
						const { logo, name, link } = item.fields
						if (!logo?.url) return <div key={item.contentID} />

						let src = logo.url.endsWith(".svg") ? logo.url : `${logo.url}?format=auto&w=200`

						const imgEl = (
							<img
								src={src}
								alt={name || logo.label || ""}
								className="h-10 w-auto opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0 lg:h-12"
								loading="lazy"
							/>
						)

						if (link && link.href) {
							return (
								<Link key={item.contentID} href={link.href} target={link.target} title={link.text || name}>
									{imgEl}
								</Link>
							)
						}

						return <div key={item.contentID}>{imgEl}</div>
					})}
				</div>
			</div>
		</Container>
	)
}
