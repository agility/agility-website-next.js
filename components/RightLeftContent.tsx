import { AgilityPic, ImageField, UnloadedModuleProps } from "@agility/nextjs"
import { getContentItem } from "lib/cms/getContentItem"
import { Container } from "./micro/Container"
import clsx from "clsx"
import { IconCheckbox } from "@tabler/icons-react"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"

interface IRightLeftContent {
	imagePlacement: "right" | "left"
	image: ImageField
	heading?: string
	description?: string
	bullet1Title?: string
	bullet1?: string
	bullet2Title?: string
	bullet2?: string
	bullet3Title?: string
	bullet3?: string
	bullet4Title?: string
	bullet4?: string
}

export const RightLeftContent = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<IRightLeftContent>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	const {
		image,
		imagePlacement,
		bullet1,
		bullet1Title,
		bullet2,
		bullet2Title,
		bullet3,
		bullet3Title,
		bullet4,
		bullet4Title,
		description,
		heading
	} = fields

	return (
		<Container id={`${contentID}`} data-agility-component={contentID}>
			<div
				className={clsx(
					"md:mt-18 mx-auto my-12 flex max-w-5xl flex-col items-start gap-4 lg:mt-20",

					imagePlacement === "right" ? "md:flex-row-reverse" : "md:flex-row"
				)}
			>
				<div className="flex-1">
					{image && (
						<>
							{image.url.endsWith(".svg") ? (
								//don't need to use AgilityPic for SVGs
								// eslint-disable-next-line @next/next/no-img-element
								<img src={image.url} alt={image.label} className="w-full" loading="lazy" />
							) : (
								<AgilityPic
									image={image}
									className="w-full"
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
					{heading && <h2 className="text-balance text-5xl font-medium leading-snug">{heading}</h2>}
					{description && (
						<div
							className={clsx("prose mt-5 max-w-none")}
							dangerouslySetInnerHTML={renderHTMLCustom(description)}
						></div>
					)}

					{bullet1 && bullet1Title && (
						<div className="mt-4 flex gap-6">
							<div>
								<IconCheckbox size={32} stroke={2} className="text-secondary" />
							</div>
							<div>
								<h3 className="text-balance text-lg font-medium">{bullet1Title}</h3>
								<div
									className={clsx("prose mt-2 max-w-none")}
									dangerouslySetInnerHTML={renderHTMLCustom(bullet1)}
								></div>
							</div>
						</div>
					)}

					{bullet2 && bullet2Title && (
						<div className="mt-4 flex gap-6">
							<div>
								<IconCheckbox size={32} stroke={2} className="text-secondary" />
							</div>
							<div>
								<h3 className="text-balance text-lg font-medium">{bullet2Title}</h3>
								<div
									className={clsx("prose mt-2 max-w-none")}
									dangerouslySetInnerHTML={renderHTMLCustom(bullet2)}
								></div>
							</div>
						</div>
					)}

					{bullet3 && bullet3Title && (
						<div className="mt-4 flex gap-6">
							<div>
								<IconCheckbox size={32} stroke={2} className="text-secondary" />
							</div>
							<div>
								<h3 className="text-balance text-lg font-medium">{bullet3Title}</h3>
								<div
									className={clsx("prose mt-2 max-w-none")}
									dangerouslySetInnerHTML={renderHTMLCustom(bullet3)}
								></div>
							</div>
						</div>
					)}

					{bullet4 && bullet4Title && (
						<div className="mt-4 flex gap-6">
							<div>
								<IconCheckbox size={32} stroke={2} className="text-secondary" />
							</div>
							<div>
								<h3 className="text-balance text-lg font-medium">{bullet4Title}</h3>
								<div
									className={clsx("prose mt-2 max-w-none")}
									dangerouslySetInnerHTML={renderHTMLCustom(bullet4)}
								></div>
							</div>
						</div>
					)}
				</div>
			</div>
		</Container>
	)
}
