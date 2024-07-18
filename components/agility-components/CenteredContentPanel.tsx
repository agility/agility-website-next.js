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
			<div className="mx-auto max-w-5xl text-center">
				{section && <h5 className="mb-5 text-lg font-medium uppercase text-gray-500">{section}</h5>}
				{title && <h1 className="text-balance text-5xl font-medium leading-10 sm:leading-tight">{title}</h1>}
				{description && (
					<div className="mt-2 text-2xl font-medium" dangerouslySetInnerHTML={renderHTML(description)} />
				)}
				{(cTA1 || cTA2) && (
					<div className="flex items-center justify-center gap-2">
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
