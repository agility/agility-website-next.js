import { renderHTML, Module, UnloadedModuleProps, URLField, ImageField, AgilityPic } from "@agility/nextjs"
import clsx from "clsx"
import { Container } from "components/micro/Container"
import { LinkButton } from "components/micro/LinkButton"
import { getContentItem } from "lib/cms/getContentItem"
import { describe } from "node:test"

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
			className={clsx(darkMode ? "bg-gray-900 text-white" : "")}
		>
			<div className="mx-auto max-w-5xl">
				{title && <h2 className="text-balance text-center text-4xl leading-10 sm:leading-tight">{title}</h2>}
				{subTitle && <h4 className="mb-10 mt-4 text-balance text-center">{subTitle}</h4>}

				<div
					className={clsx(
						"flex flex-col items-center px-6 py-5",
						darkMode ? "from-slate-800 to-white/0" : "from-background to-white/0",
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
									className={clsx(
										"rounded-full px-4 py-1 text-sm font-medium uppercase",
										darkMode ? "bg-secondary text-black" : "bg-highlight-light text-white"
									)}
								>
									{step}
								</span>
							</div>
						)}
						{heading && <h3 className="mt-5 text-2xl font-medium">{heading}</h3>}

						{description && <div dangerouslySetInnerHTML={renderHTML(description)} />}
					</div>
				</div>
			</div>
		</Container>
	)
}

export default RightOrLeftSteps
