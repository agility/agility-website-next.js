import { UnloadedModuleProps } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"

import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"
import Script from "next/script"

interface ICalendlyScheduler {
	iFrameURL: string
	leftPanelContent: string
}

export const CalendlyScheduler = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<ICalendlyScheduler>({
		contentID: module.contentid,
		languageCode
	})

	return (
		<div
			id="scheduler-page"
			//className="bg-background/40"
			style={{
				// backgroundImage: "url(/images/icon-agility.svg)",
				// backgroundRepeat: "no-repeat",
				// backgroundPosition: "left bottom"
			}}
		>
			<Container className="mx-auto flex max-w-7xl">
				<div className="flex w-full flex-col gap-5 lg:flex-row">
					<div className="lg:w-2/5">
						<div
							className="prose lg:prose-lg"
							dangerouslySetInnerHTML={renderHTMLCustom(fields.leftPanelContent)}
						></div>
					</div>
					<div className="lg:w-3/5">
						<div className="calendly-inline-widget px-3 -mt-10" data-url={fields.iFrameURL} style={{ minWidth: "320px", height: "1100px" }}></div>
					</div>
				</div>
			</Container>
			<Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" async />
		</div>
	)
}
