import { UnloadedModuleProps, URLField } from "@agility/nextjs"
import { IconChevronRight } from "@tabler/icons-react"
import clsx from "clsx"
import { Container } from "components/micro/Container"
import { LinkButton } from "components/micro/LinkButton"
import { ThreeDashLine } from "components/micro/ThreeDashLine"
import { getContentItem } from "lib/cms/getContentItem"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"

interface ICenteredCTAPanel {
	title?: string
	description?: string
	cTA1?: URLField
	cTA2?: URLField
	darkMode?: string
}

const CenteredCTAPanel = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<ICenteredCTAPanel>({
		contentID: module.contentid,
		languageCode
	})

	const { cTA1, cTA2, description, title } = fields
	const darkMode = fields.darkMode === "true"

	return (
		<Container
			id={`${contentID}`}
			data-agility-component={contentID}
			className={clsx("relative overflow-clip pb-14 text-white", darkMode ? "bg-black dark:bg-gray-900" : "bg-highlight mt-14")}
		>
			<div
				className={clsx("absolute -top-7 h-12 w-12 rotate-45", darkMode ? "bg-secondary" : "bg-white")}
				style={{ left: "calc(50% - 24px)" }}
			></div>
			<div className="mx-auto max-w-5xl pt-8 text-center">
				{title && <h2 className="text-balance text-5xl">{title}</h2>}
				<ThreeDashLine />
				{description && (
					<div className="mt-2 text-balance text-xl dark:prose-invert" dangerouslySetInnerHTML={renderHTMLCustom(description)} />
				)}
				{(cTA1 || cTA2) && (
					<div className="mt-8 flex items-center justify-center gap-2">
						{cTA1 && cTA1.href && (
							<>
								<LinkButton
									type={darkMode ? "alternate" : "alternate"}
									href={cTA1.href}
									target={cTA1.target}
									//className={clsx("", darkMode ? "text-black" : "!bg-white")}
									size="lg"
								>
									{cTA1.text} <IconChevronRight />
								</LinkButton>
							</>
						)}

						{cTA2 && cTA2.href && (
							<LinkButton
								type={darkMode ? "secondary-inverted" : "secondary"}
								href={cTA2.href}
								target={cTA2.target}
								className={clsx(darkMode ? "!bg-black/0" : "!bg-white")}
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
