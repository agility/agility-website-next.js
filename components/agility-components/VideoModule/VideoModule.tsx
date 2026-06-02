import { UnloadedModuleProps, URLField } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import { getVimeoEmbedUrl } from "lib/utils/vimeoEmbed"

interface VideoModuleFields {
	videoPath: URLField
}

export const VideoModule = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields } = await getContentItem<VideoModuleFields>({
		contentID: module.contentid,
		languageCode
	})

	const embedUrl = getVimeoEmbedUrl(fields.videoPath.href)
	if (!embedUrl) return null

	return (
		<Container className="mx-auto max-w-5xl">
			<div className="aspect-video">
				<iframe
					src={embedUrl}
					width="100%"
					height="100%"
					className="h-full w-full"
					frameBorder={0}
					allow="autoplay; fullscreen; picture-in-picture"
					allowFullScreen
					title="Video"
				/>
			</div>
		</Container>
	)
}
