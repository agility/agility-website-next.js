import { UnloadedModuleProps, URLField } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import { VideoModuleClient } from "./VideoModule.client"

interface VideoModuleFields {
	videoPath: URLField
}

export const VideoModule = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields } = await getContentItem<VideoModuleFields>({
		contentID: module.contentid,
		languageCode
	})

	const vimeoUrl = fields.videoPath.href

	return (
		<Container className="mx-auto max-w-5xl">
			<VideoModuleClient videoURL={vimeoUrl} muted={false} playing={false} />
		</Container>
	)
}
