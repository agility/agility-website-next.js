import { UnloadedModuleProps, URLField, ImageField, AgilityPic } from "@agility/nextjs"
import clsx from "clsx"
import { Container } from "components/micro/Container"
import { LinkButton } from "components/micro/LinkButton"
import { getContentItem } from "lib/cms/getContentItem"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"
import { VimeoVideoPlayer } from "components/common/VimeoVideoPlayer"

interface VimeoVideoData {
	url?: string
	video_id?: number
	title?: string
	description?: string
	thumbnail_url?: string
	thumbnail_url_with_play_button?: string
	thumbnail_width?: number
	thumbnail_height?: number
	width?: number
	height?: number
	duration?: number
	html?: string
	author_name?: string
	author_url?: string
	upload_date?: string
}

interface IRightORLeftContentModule {
	title: string
	description?: string
	cTA1Optional?: URLField
	cTA2Optional?: URLField
	textSide: "left" | "right"
	mediaType: "image" | "video"
	graphic?: ImageField
	video?: string // JSON string from Vimeo field
	darkMode?: string
	breadcrumb?: string
}

const RightORLeftContentModule = async ({ module, languageCode }: UnloadedModuleProps) => {
	const componentItem = await getContentItem<IRightORLeftContentModule>({
		contentID: module.contentid,
		languageCode
	})

	if (!componentItem) return null

	const { fields, contentID } = componentItem

	const { cTA1Optional, cTA2Optional, description, graphic, textSide, title, breadcrumb, video } = fields

	const darkMode = fields.darkMode === "true"

	// Parse Vimeo video data if present
	let vimeoVideoData: VimeoVideoData | null = null
	if (video) {
		try {
			vimeoVideoData = JSON.parse(video) as VimeoVideoData
			console.log(vimeoVideoData)
		} catch (error) {
			console.error("Failed to parse Vimeo video data:", error)
		}
	}

	// Determine which media to show: video takes precedence over image
	const hasVideo = vimeoVideoData && (vimeoVideoData.video_id || vimeoVideoData.url)
	const hasImage = graphic && !hasVideo

	return (
		<Container
			id={`${contentID}`}
			data-agility-component={contentID}
			className={clsx(darkMode ? "bg-gray-900 text-white" : "")}
		>
			<div
				className={clsx(
					"mx-auto flex max-w-7xl flex-col items-center gap-6",
					textSide === "left" ? "md:flex-row-reverse" : "md:flex-row",
					"pb-14"
				)}
			>
				<div className="w-full flex-1">
					{hasVideo && vimeoVideoData && (
						<VimeoVideoPlayer videoData={vimeoVideoData} />
					)}
					{hasImage && graphic && (
						<>
							{graphic.url.endsWith(".svg") ? (
								//don't need to use AgilityPic for SVGs
								// eslint-disable-next-line @next/next/no-img-element
								<img src={graphic.url} alt={graphic.label} className="w-full" />
							) : (
								<AgilityPic
									image={graphic}
									className="w-full"
									fallbackWidth={640}
									sources={[
										//screen at least than 640, it's 1/2 of the screen, so the same size as the prev breakpoint
										{ media: "(min-width: 1200px)", width: 800 }
									]}
								/>
							)}
						</>
					)}
				</div>
				<div className="flex-1">
					{breadcrumb && <div className={clsx("mb-2 text-sm font-semibold", darkMode ? "text-gray-400" : "text-gray-600")}>{breadcrumb}</div>}
					<h2 className="text-balance text-5xl font-medium leading-[1.15]">{title}</h2>
					{description && (
						<div
							className={clsx("prose mt-5 max-w-none", darkMode ? "prose-invert" : "")}
							dangerouslySetInnerHTML={renderHTMLCustom(description)}
						></div>
					)}
					<div className="mt-7 flex gap-2">
						{cTA1Optional && (
							<LinkButton type={darkMode ? "primary" : "primary"} href={cTA1Optional.href} target={cTA1Optional.target} size="md">
								{cTA1Optional.text}
							</LinkButton>
						)}
						{cTA2Optional && cTA2Optional.href !== "" && (
							<LinkButton
								type={darkMode ? "primary" : "primary"}
								href={cTA2Optional.href}
								target={cTA2Optional.target}
								size="md"
							>
								{cTA2Optional.text}
							</LinkButton>
						)}
					</div>
				</div>
			</div>
		</Container>
	)
}

export default RightORLeftContentModule
