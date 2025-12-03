import { AgilityPic, ImageField, UnloadedModuleProps, URLField } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { LinkButton } from "components/micro/LinkButton"
import { getContentItem } from "lib/cms/getContentItem"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"

interface ICenteredContentPanel {
	section?: string
	title?: string
	darkMode?: string
	desktopSpace?: string
	mobileSpace?: string
	description?: string
	cTA1?: URLField
	cTA2?: URLField
	featuredImage?: ImageField
}

export const CenteredContentPanel = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<ICenteredContentPanel>({
		contentID: module.contentid,
		languageCode
	})

	const { cTA1, cTA2, darkMode, description, title, section, featuredImage } = fields

	return (
		<Container id={`${contentID}`} data-agility-component={contentID}>
			{featuredImage && (
				<div className="mb-14 flex w-full justify-center">
					<AgilityPic
						image={featuredImage}
						data-agility-field="splashImage"
						fallbackWidth={400}
						priority
						className="w-full max-w-2xl"
						sources={[
							{ media: "(min-width: 1200px) and (min-resolution: 2x)", width: 1600 },
							{ media: "(min-width: 1200px)", width: 800 },
							{ media: "(min-width: 1024px) and (min-resolution: 2x)", width: 1200 },
							{ media: "(min-width: 1024px)", width: 600 },
							{ media: "(min-width: 768px) and (min-resolution: 2x)", width: 1200 },
							{ media: "(min-width: 768px)", width: 600 },
							{ media: "(min-width: 640px) and (min-resolution: 2x)", width: 880 },
							{ media: "(min-width: 640px)", width: 480 },
							{ media: "(min-width: 320px) and (min-resolution: 2x)", width: 640 }
						]}
					/>
				</div>
			)}
			<div className="mx-auto max-w-5xl text-center">
				{section && (
					<h5 data-agility-field="section" className="mb-5 text-lg font-medium uppercase text-gray-500 dark:text-gray-400">
						{section}
					</h5>
				)}
				{title && (
					<h1
						data-agility-field="title"
						className="text-balance text-5xl font-medium leading-10 sm:leading-tight"
					>
						{title}
					</h1>
				)}
				{description && (
					<div
						className="mt-2 text-balance text-2xl font-medium"
						dangerouslySetInnerHTML={renderHTMLCustom(description)}
						data-agility-field="description"
						data-agility-html
					/>
				)}
				{(cTA1 || cTA2) && (
					<div className="flex items-center justify-center gap-2">
						{cTA1 && cTA1.href && (
							<>
								<LinkButton
									data-agility-field="cTA1"
									type="primary"
									href={cTA1.href}
									target={cTA1.target}
									className="mt-8"
									size="md"
								>
									{cTA1.text}
								</LinkButton>


							</>
						)}

						{cTA2 && cTA2.href && (
							<LinkButton
								data-agility-field="cTA2"
								type="secondary"
								href={cTA2.href}
								target={cTA2.target}
								className="mt-8 dark:!bg-secondary dark:!text-gray-900 dark:hover:!bg-secondary dark:ring-secondary"
								size="md"
							>
								{cTA2.text}
							</LinkButton>
						)}
					</div>
				)}
			</div>
		</Container>
	)
}
