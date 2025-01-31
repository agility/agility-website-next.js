import { UnloadedModuleProps, URLField, ImageField, AgilityPic } from "@agility/nextjs"
import clsx from "clsx"
import { Container } from "components/micro/Container"
import { LinkButton } from "components/micro/LinkButton"
import { getContentItem } from "lib/cms/getContentItem"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"

interface IRightORLeftContentModule {
	title: string
	description?: string
	cTA1Optional?: URLField
	cTA2Optional?: URLField
	textSide: "left" | "right"
	graphic?: ImageField
	darkMode?: string
	breadcrumb?: string
}

const RightORLeftContentModule = async ({ module, languageCode }: UnloadedModuleProps) => {
	const componentItem = await getContentItem<IRightORLeftContentModule>({
		contentID: module.contentid,
		languageCode
	})

	if (!componentItem) return null

	const { fields, contentID } = componentItem

	const { cTA1Optional, cTA2Optional, description, graphic, textSide, title, breadcrumb } = fields

	const darkMode = fields.darkMode === "true"

	return (
		<Container
			id={`${contentID}`}
			data-agility-component={contentID}
			className={clsx(darkMode ? "bg-gray-900 text-white" : "")}
		>
			<div
				className={clsx(
					"md:mt-18 mx-auto my-12 flex max-w-5xl flex-col items-center gap-4 lg:mt-20",

					textSide === "left" ? "md:flex-row-reverse" : "md:flex-row"
				)}
			>
				<div className="flex-1">
					{graphic && (
						<>
							{graphic.url.endsWith(".svg") ? (
								//don't need to use AgilityPic for SVGs
								// eslint-disable-next-line @next/next/no-img-element
								<img src={graphic.url} alt={graphic.label} className="w-full" />
							) : (
								<AgilityPic
									image={graphic}
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
					{breadcrumb && <div className="mb-2">{breadcrumb}</div>}
					<h2 className="text-balance text-5xl font-medium leading-snug">{title}</h2>
					{description && (
						<div
							className={clsx("prose mt-5 max-w-none", darkMode ? "prose-invert" : "")}
							dangerouslySetInnerHTML={renderHTMLCustom(description)}
						></div>
					)}
					<div className="mt-7 flex gap-2">
						{cTA1Optional && (
							<LinkButton type="primary" href={cTA1Optional.href} target={cTA1Optional.target} size="md">
								{cTA1Optional.text}
							</LinkButton>
						)}
						{cTA2Optional && (
							<LinkButton
								type="secondary"
								href={cTA2Optional.href}
								target={cTA2Optional.target}
								size="md"
							>
								{cTA2Optional.text}
							</LinkButton>
						)}
					</div>
				</div>
			</div>
		</Container>
	)
}

export default RightORLeftContentModule
