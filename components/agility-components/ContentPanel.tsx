import { AgilityPic, ImageField, renderHTML, UnloadedModuleProps } from "@agility/nextjs"
import clsx from "clsx"
import { Container } from "components/micro/Container"
import { gql } from "gql/__generated__"
import { getContentItem } from "lib/cms/getContentItem"
import { text } from "stream/consumers"

interface IContentPanel {
	panel: {
		contentid: number
	}
}

interface IPanelItem {
	title: string
	textblob: string
	labelInternal: string
	image: ImageField
	imagePosition: "right" | "left"
	imageisTransparent: boolean
	imageHasShadow: boolean
	enableBackgroundImage: boolean
}

export const ContentPanel = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields } = await getContentItem<IContentPanel>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	const pnl = await getContentItem<IPanelItem>({
		contentID: fields.panel.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	const { title, textblob, image, imagePosition, imageHasShadow } = pnl.fields

	return (
		<Container id={`agility-component-${module.contentid}`} data-agility-component={module.contentid}>
			<div
				className={clsx(
					"mx-auto my-6 flex max-w-5xl flex-col items-center gap-4",

					imagePosition === "right" ? "md:flex-row-reverse" : "md:flex-row"
				)}
			>
				<div className="flex-1">
					{image && (
						<>
							{image.url.endsWith(".svg") ? (
								//don't need to use AgilityPic for SVGs
								// eslint-disable-next-line @next/next/no-img-element
								<img
									src={image.url}
									alt={image.label}
									className={clsx("w-full", imageHasShadow ? "shadow-xl" : "")}
								/>
							) : (
								<AgilityPic
									image={image}
									className={clsx("w-full", imageHasShadow ? "shadow-xl" : "")}
									fallbackWidth={640}
									sources={[
										//screen at least than 640, it's 1/2 of the screen, so the same size as the prev breakpoint
										{ media: "(min-width: 1200px)", width: 800 }
									]}
								/>
							)}
						</>
					)}
				</div>
				<div className="flex-1">
					<h2 className="text-balance text-5xl font-medium leading-snug">{title}</h2>
					{textblob && (
						<div
							className={clsx("prose mt-5 max-w-none")}
							dangerouslySetInnerHTML={renderHTML(textblob)}
						></div>
					)}
				</div>
			</div>
		</Container>
	)
}
