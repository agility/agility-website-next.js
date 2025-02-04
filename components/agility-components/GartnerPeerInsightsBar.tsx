/* eslint-disable @next/next/no-img-element */
import { AgilityPic, ImageField, UnloadedModuleProps, URLField } from "@agility/nextjs"
import { LinkButton } from "components/micro/LinkButton"
import { getContentItem } from "lib/cms/getContentItem"

interface IGartnerPeerInsightsBar {
	title: string

	gartnerLogo: ImageField
	starsGraphic: ImageField
	cTAButton: URLField
}

export const GartnerPeerInsightsBar = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<IGartnerPeerInsightsBar>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	return (
		<div className="relative items-center bg-gradient-to-r from-highlight to-highlight-dark p-8">
			<div className="absolute left-0 h-full overflow-clip">
				<img src="https://static.agilitycms.com/layout/static/bg-top.svg" alt="" loading="lazy" />
			</div>
			<div className="absolute right-0 h-full overflow-clip">
				<img src="https://static.agilitycms.com/layout/static/bg-top.svg" alt="" loading="lazy" />
			</div>
			<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 lg:flex-row">
				<div className="flex flex-1 flex-col items-center gap-5 md:flex-row">
					<div className="h-12 border-r border-r-white/20 pr-5">
						<AgilityPic image={fields.gartnerLogo} className="h-full object-contain" fallbackWidth={400} />
					</div>
					<div className="h-6">
						<AgilityPic image={fields.starsGraphic} className="h-full object-contain" fallbackWidth={300} />
					</div>
					<div>
						<h3 className="text-lg font-medium text-white">{fields.title}</h3>
					</div>
				</div>
				<div>
					<LinkButton type="primary" size="lg" href={fields.cTAButton.href} target={fields.cTAButton.target}>
						{fields.cTAButton.text}
					</LinkButton>
				</div>
			</div>
		</div>
	)
}
