import { renderHTML, Module, UnloadedModuleProps, URLField } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { LinkButton } from "components/micro/LinkButton"
import { getContentItem } from "lib/cms/getContentItem"

interface ICenteredCTAPanel {
	title?: string
	description?: string
	cTA1?: URLField
	cTA2?: URLField
}

const CenteredCTAPanel = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<ICenteredCTAPanel>({
		contentID: module.contentid,
		languageCode
	})

	const { cTA1, cTA2, description, title } = fields

	return (
		<Container
			id={`${contentID}`}
			data-agility-component={contentID}
			className="relative bg-highlight !pb-0 text-white"
		>
			<div className="absolute -top-7 h-12 w-12 rotate-45 bg-white" style={{ left: "calc(50% - 24px)" }}></div>
			<div className="md:pt-18 mx-auto max-w-5xl py-12 text-center lg:pt-20">
				{title && <h2 className="text-balance text-5xl">{title}</h2>}
				{description && (
					<div className="mt-2 text-balance text-xl" dangerouslySetInnerHTML={renderHTML(description)} />
				)}
				{(cTA1 || cTA2) && (
					<div className="flex items-center justify-center gap-2">
						{cTA1 && cTA1.href && (
							<LinkButton
								type="secondary"
								href={cTA1.href}
								target={cTA1.target}
								className="mt-8"
								size="lg"
							>
								{cTA1.text}
							</LinkButton>
						)}

						{cTA2 && cTA2.href && (
							<LinkButton
								type="secondary-inverted"
								href={cTA2.href}
								target={cTA2.target}
								className="mt-8"
								size="lg"
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

export default CenteredCTAPanel
