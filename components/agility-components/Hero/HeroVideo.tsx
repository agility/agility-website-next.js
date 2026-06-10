import { getVimeoEmbedUrl } from "lib/utils/vimeoEmbed"

interface Props {
	videoURL: string
}
export const HeroVideo = ({ videoURL }: Props) => {
	const embedUrl = getVimeoEmbedUrl(videoURL, { autoplay: true, muted: true })
	if (!embedUrl) return null

	return (
		<iframe
			src={embedUrl}
			className="h-full w-full"
			frameBorder={0}
			allow="autoplay; fullscreen; picture-in-picture"
			allowFullScreen
			title="Hero video"
		/>
	)
}
