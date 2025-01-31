/* eslint-disable @next/next/no-img-element */
import { UnloadedModuleProps, ImageField, AgilityPic } from "@agility/nextjs"
import { IconCheck, IconX } from "@tabler/icons-react"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"

interface ITriplePanelComparisonModule {
	title: string
	description?: string
	panel1Title?: string
	panel1Graphic?: ImageField
	panel1CheckedContent?: string
	panel1UncheckedContent?: string

	panel2Title?: string
	panel2Graphic?: ImageField
	panel2CheckedContent?: string
	panel2UncheckedContent?: string

	panel3Title?: string
	panel3Graphic?: ImageField
	panel3CheckedContent?: string
	panel3UncheckedContent?: string
}

const TriplePanelComparisonModule = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<ITriplePanelComparisonModule>({
		contentID: module.contentid,
		languageCode
	})

	return (
		<Container
			id={`${contentID}`}
			data-agility-component={contentID}
			className="bg-gradient-to-b from-background/60 to-white/0"
		>
			<div className="md:mt-18 mx-auto my-12 max-w-5xl lg:mt-20">
				<h2 className="text-balance text-center text-5xl font-medium">{fields.title}</h2>
				{fields.description && (
					<div
						className="prose mt-5 max-w-none text-balance text-center"
						dangerouslySetInnerHTML={renderHTMLCustom(fields.description)}
					></div>
				)}

				<div className="place-items-centerX mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
					{fields.panel1Graphic && fields.panel1Title && (
						<div className="flex flex-col gap-4">
							{fields.panel1Graphic.url.endsWith(".svg") ? (
								<img src={fields.panel1Graphic.url} alt={fields.panel1Graphic.label} className="w-16" />
							) : (
								<AgilityPic image={fields.panel1Graphic} className="w-16" />
							)}
							<h3 className="text-lg font-medium">{fields.panel1Title}</h3>
							{fields.panel1CheckedContent && (
								<div className="flex items-start gap-3">
									<div>
										<IconCheck stroke={2} className="w-6" />
									</div>
									<p>{fields.panel1CheckedContent}</p>
								</div>
							)}
							{fields.panel1UncheckedContent && (
								<div className="flex items-start gap-3 text-gray-500">
									<div>
										<IconX stroke={2} className="w-6" />
									</div>
									<p>{fields.panel1UncheckedContent}</p>
								</div>
							)}
						</div>
					)}
					{fields.panel2Graphic && fields.panel2Title && (
						<div className="flex flex-col gap-4">
							{fields.panel2Graphic.url.endsWith(".svg") ? (
								<img src={fields.panel2Graphic.url} alt={fields.panel2Graphic.label} className="w-16" />
							) : (
								<AgilityPic image={fields.panel2Graphic} className="w-16" />
							)}
							<h3 className="text-lg font-medium">{fields.panel2Title}</h3>
							{fields.panel2CheckedContent && (
								<div className="flex items-start gap-3">
									<div>
										<IconCheck stroke={2} className="w-6" />
									</div>
									<p>{fields.panel2CheckedContent}</p>
								</div>
							)}
							{fields.panel2UncheckedContent && (
								<div className="flex items-start gap-3 text-gray-500">
									<div>
										<IconX stroke={2} className="w-6" />
									</div>
									<p>{fields.panel2UncheckedContent}</p>
								</div>
							)}
						</div>
					)}
					{fields.panel3Graphic && fields.panel3Title && (
						<div className="flex flex-col gap-4">
							{fields.panel3Graphic.url.endsWith(".svg") ? (
								<img src={fields.panel3Graphic.url} alt={fields.panel3Graphic.label} className="w-16" />
							) : (
								<AgilityPic image={fields.panel3Graphic} className="w-16" />
							)}
							<h3 className="text-lg font-medium">{fields.panel3Title}</h3>
							{fields.panel3CheckedContent && (
								<div className="flex items-start gap-3">
									<div>
										<IconCheck stroke={2} className="w-6" />
									</div>
									<p>{fields.panel3CheckedContent}</p>
								</div>
							)}
							{fields.panel3UncheckedContent && (
								<div className="flex items-start gap-3 text-gray-500">
									<div>
										<IconX stroke={2} className="w-6" />
									</div>
									<p>{fields.panel3UncheckedContent}</p>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</Container>
	)
}

export default TriplePanelComparisonModule
