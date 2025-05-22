import { UnloadedModuleProps, URLField } from "@agility/nextjs"
import clsx from "clsx"
import { Container } from "components/micro/Container"
import { LinkButton } from "components/micro/LinkButton"
import { getContentItem } from "lib/cms/getContentItem"


interface ICalloutPanel {
	callout: {
		contentid: number
	}
	theme: string
}

interface ICalloutItem {
	title: string
	labelInternal: string
	caption: string
	link: URLField
}

export const Callout = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields } = await getContentItem<ICalloutPanel>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	const pnl = await getContentItem<ICalloutItem>({
		contentID: fields.callout.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	const bgColor = () => {
		switch(fields.theme){
			case "secondary": return "bg-secondary";
			case "primary": return "bg-primary";
			case "highlight": return "bg-highlight";
		}
	}

	const calloutTextColor = () => {
		switch(fields.theme){
			case "secondary": return "";
			case "primary": return "text-white";
			case "highlight": return "text-white";
		}
	}

	const { title, caption, link } = pnl.fields

	return (
		<div className={clsx(bgColor())}>
			<Container id={`agility-component-${module.contentid}`} data-agility-component={module.contentid}>
				<div className={clsx("mx-auto my-6 max-w-5xl gap-4 text-center")}>
					<h2 className={clsx("text-balance text-5xl font-medium leading-snug", calloutTextColor())}>{title}</h2>
					{caption && <div className={clsx("mt-5 max-w-none text-balance text-lg", calloutTextColor())}>{caption}</div>}
					<div className="mt-8">
						<LinkButton
							type={fields.theme === "secondary" ? "primary" : "secondary-bg"}
							href={link.href}
							target={link.target}
							size="md"
							className="hover:bg-secondary"
						>
							{link.text}
						</LinkButton>
					</div>
				</div>
			</Container>
		</div>
	)
}
