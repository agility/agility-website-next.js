import { renderHTML, Module, UnloadedModuleProps, URLField } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { LinkButton } from "components/micro/LinkButton"
import { getContentItem } from "lib/cms/getContentItem"
import Link from "next/link"

interface ICenteredContentPanel {
	section?: string
	title?: string
	darkMode?: string
	desktopSpace?: string
	mobileSpace?: string
	description?: string
	cTA1?: URLField
	cTA2?: URLField
}

export const CenteredContentPanel = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<ICenteredContentPanel>({
		contentID: module.contentid,
		languageCode
	})

	const { cTA1, cTA2, darkMode, description, title, section } = fields

	return (
		<Container id={`${contentID}`} data-agility-component={contentID}>
			<div className="max-w-5xl mx-auto text-center ">
				{section && <h5 className="text-lg font-medium mb-5 uppercase text-gray-500">{section}</h5>}
				{title && <h1 className="text-5xl text-balance font-medium">{title}</h1>}
				{description && (
					<div className="mt-2 font-medium text-2xl" dangerouslySetInnerHTML={renderHTML(description)} />
				)}
				{(cTA1 || cTA2) && (
					<div className="flex items-center gap-2 justify-center">
						{cTA1 && cTA1.href && (
							<LinkButton type="primary" href={cTA1.href} target={cTA1.target} className="mt-8" size="md">
								{cTA1.text}
							</LinkButton>
						)}

						{cTA2 && cTA2.href && (
							<LinkButton
								type="secondary"
								href={cTA2.href}
								target={cTA2.target}
								className="mt-8"
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
