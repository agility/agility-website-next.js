import { UnloadedModuleProps, ImageField, AgilityPic } from "@agility/nextjs"
import clsx from "clsx"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"

interface IRightOrLeftSteps {
	title?: string
	subTitle?: string

	step: string
	heading: string
	description: string

	placeholderImage: "true" | "false"
	textSide: "left" | "right"
	image: ImageField
	darkMode?: string
}

const RightOrLeftSteps = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<IRightOrLeftSteps>({
		contentID: module.contentid,
		languageCode
	})

	const { description, heading, image, placeholderImage, step, subTitle, textSide, title } = fields

	const darkMode = fields.darkMode === "true"

	return (
		<Container
			id={`${contentID}`}
			data-agility-component={contentID}
			className="dark:bg-gray-900 dark:text-white"
		>
			<div className="mx-auto max-w-5xl pb-14">
				{title && <h2 className="text-balance text-center text-4xl leading-10 sm:leading-tight dark:text-white">{title}</h2>}
				{subTitle && <h4 className="mb-10 mt-4 text-balance text-center dark:text-gray-300">{subTitle}</h4>}

				<div
					className={clsx(
						"flex flex-col items-center px-6 py-5",
						"from-background to-white/0 dark:from-gray-800 dark:to-gray-900/0",
						textSide === "right" ? "bg-gradient-to-l md:flex-row" : "bg-gradient-to-r md:flex-row-reverse"
					)}
				>
					<div className="flex flex-1 items-center justify-center">
						{image.url.endsWith(".svg") ? (
							//don't need to use AgilityPic for SVGs
							// eslint-disable-next-line @next/next/no-img-element
							<img src={image.url} alt={image.label} className="w-full" />
						) : (
							<AgilityPic
								image={image}
								className="w-full"
								fallbackWidth={400}
								sources={[{ media: "(min-width: 1200px)", width: 600 }]}
							/>
						)}
					</div>

					<div className="flex flex-1 flex-col justify-center gap-4 p-4">
						{step && (
							<div>
								<span
									className="rounded-full px-4 py-1 text-sm font-medium uppercase bg-highlight-light text-white dark:bg-secondary dark:text-gray-900"
								>
									{step}
								</span>
							</div>
						)}
						{heading && <h3 className="mt-5 text-2xl font-medium dark:text-white">{heading}</h3>}

						{description && <div className="prose dark:prose-invert" dangerouslySetInnerHTML={renderHTMLCustom(description)} />}
					</div>
				</div>
			</div>
		</Container>
	)
}

export default RightOrLeftSteps
