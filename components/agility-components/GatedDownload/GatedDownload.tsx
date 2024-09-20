import { renderHTML, UnloadedModuleProps, URLField } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import { GatedDownloadClient } from "./GatedDownload.client"

interface IGatedDownload {
	hubspotForm?: string
	redirectURL: URLField
	leftColumnTitle?: string
	leftColumnBody?: string
}

export const GatedDownload = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields } = await getContentItem<IGatedDownload>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	return (
		<Container className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row">
			<div className="lg:w-1/2">
				<h2 className="text-balance text-4xl font-medium">{fields.leftColumnTitle}</h2>
				<div className="prose mt-10" dangerouslySetInnerHTML={renderHTML(fields.leftColumnBody)}></div>
			</div>
			<div className="lg:w-1/2">
				<div className="border-t-4 border-t-highlight-light p-6 shadow-lg">
					<GatedDownloadClient redirectURL={fields.redirectURL.href} hubspotForm={fields.hubspotForm} />
				</div>
			</div>
		</Container>
	)
}
