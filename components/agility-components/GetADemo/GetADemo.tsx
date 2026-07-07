import { ImageField, UnloadedModuleProps } from "@agility/nextjs"
import { getContentItem } from "lib/cms/getContentItem"
import { Container } from "components/micro/Container"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"
import { GetADemoClient } from "./GetADemo.client"
import { VimeoVideoPlayer, VimeoVideoData } from "components/common/VimeoVideoPlayer"
import { getHubSpotFormDefinition } from "lib/hubspot/getHubSpotFormDefinition"

export interface IGetADemo {
	heading?: string
	subHeading?: string
	video?: string
	leftContent?: string
	bulletPoints?: string
	formHeading?: string
	formSubHeading?: string
	hubspotForm?: string
	redirectURL?: string
	formBottomImage?: ImageField
}

export const GetADemo = async ({ module, languageCode }: UnloadedModuleProps) => {
	const contentItem = await getContentItem<IGetADemo>({
		contentID: module.contentid,
		languageCode,
	})

	const { fields, contentID } = contentItem

	if (!fields.hubspotForm) {
		console.warn(`GetADemo module with contentID ${contentID} is missing a HubSpot form`)
		return null
	}

	// Fetch the HubSpot form definition SERVER-SIDE (server -> HubSpot) so the
	// browser never requests forms.hsforms.com — ad blockers / InPrivate can't
	// block it. The client renders natively from this; a null result falls back
	// to the component's hardcoded defaults so the form always renders.
	let hubspotFormDefinition = null
	try {
		const { portalId, formId } = JSON.parse(fields.hubspotForm)
		hubspotFormDefinition = await getHubSpotFormDefinition(portalId, formId)
	} catch (error) {
		console.error("GetADemo: failed to parse hubspotForm field:", error)
	}

	// Parse Vimeo video data if present
	let vimeoVideoData: VimeoVideoData | null = null
	if (fields.video) {
		try {
			vimeoVideoData = JSON.parse(fields.video) as VimeoVideoData
		} catch (error) {
			console.error("Failed to parse Vimeo video data:", error)
		}
	}
	const hasVideo = vimeoVideoData && (vimeoVideoData.video_id || vimeoVideoData.url)

	return (
		<Container id={`${contentID}`} data-agility-component={contentID}>
			<div className="mx-auto max-w-6xl pb-14">
				{/* Heading + Subheading */}
				{fields.heading && (
					<div className="mb-10 text-center">
						<h1 className="text-balance text-5xl font-medium">{fields.heading}</h1>
						{fields.subHeading && (
							<p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">{fields.subHeading}</p>
						)}
					</div>
				)}

				{/* Two-column layout */}
				<div className="flex flex-col gap-10 lg:flex-row">
					{/* Left column: video/content + bullet points */}
					<div className="flex-1 lg:w-1/2">
						{hasVideo && vimeoVideoData && (
							<div className="overflow-hidden rounded-lg">
								<VimeoVideoPlayer videoData={vimeoVideoData} />
							</div>
						)}

						{fields.leftContent && (
							<div
								className="prose max-w-none overflow-hidden rounded-lg [&_iframe]:aspect-video [&_iframe]:w-full [&_iframe]:rounded-lg"
								dangerouslySetInnerHTML={renderHTMLCustom(fields.leftContent)}
							/>
						)}

						{fields.bulletPoints && (
							<div
								className="get-a-demo-bullets mt-6 space-y-4"
								dangerouslySetInnerHTML={renderHTMLCustom(fields.bulletPoints)}
							/>
						)}
					</div>

					{/* Right column: form */}
					<div className="flex-1 lg:w-1/2">
						<div className="rounded-lg bg-white p-8 shadow-lg">
							{fields.formHeading && (
								<h2 className="text-balance text-2xl font-medium">{fields.formHeading}</h2>
							)}
							{fields.formSubHeading && (
								<p className="mt-2 text-sm text-gray-600">{fields.formSubHeading}</p>
							)}
							<div className={fields.formHeading ? "mt-6" : ""}>
								<GetADemoClient
									hubspotForm={fields.hubspotForm}
									redirectURL={fields.redirectURL}
									formDefinition={hubspotFormDefinition}
									contentID={contentID}
									languageCode={languageCode}
								/>
							</div>
							{fields.formBottomImage?.url && (
								<div className="mt-6">
									<img
										src={fields.formBottomImage.url}
										alt={fields.formBottomImage.label || ""}
										className="max-w-full"
										loading="lazy"
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</Container>
	)
}
