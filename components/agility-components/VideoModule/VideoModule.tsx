import { UnloadedModuleProps, URLField } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import dynamic from "next/dynamic"

// Dynamically imported to split react-player (~130 KiB) out of the shared bundle
const VideoModuleClient = dynamic(() => import("./VideoModule.client").then(m => ({ default: m.VideoModuleClient })))

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
