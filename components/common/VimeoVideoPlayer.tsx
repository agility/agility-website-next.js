"use client"

import { useState } from "react"
import { getVimeoEmbedUrl } from "lib/utils/vimeoEmbed"

export interface VimeoVideoData {
	url?: string
	video_id?: number
	title?: string
	thumbnail_url?: string
	thumbnail_url_with_play_button?: string
}

interface VimeoVideoProps {
	videoData: VimeoVideoData
}

export const VimeoVideoPlayer = ({ videoData }: VimeoVideoProps) => {
	const [playing, setPlaying] = useState(false)

	const videoUrl = videoData.video_id
		? `https://vimeo.com/${videoData.video_id}`
		: videoData.url

	if (!videoUrl) {
		return null
	}

	const embedUrl = getVimeoEmbedUrl(videoUrl, { autoplay: true })
	if (!embedUrl) return null

	if (!playing) {
		return (
			<button
				type="button"
				onClick={() => setPlaying(true)}
				className="group relative aspect-video w-full overflow-hidden"
				aria-label={videoData.title ? `Play video: ${videoData.title}` : "Play video"}
			>
				{videoData.thumbnail_url ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={videoData.thumbnail_url}
						alt={videoData.title || ""}
						className="h-full w-full object-cover"
						loading="lazy"
					/>
				) : (
					<div className="h-full w-full bg-zinc-900" />
				)}
				<div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
					<svg
						className="h-16 w-16 text-white drop-shadow-lg"
						viewBox="0 0 24 24"
						fill="currentColor"
						aria-hidden="true"
					>
						<path d="M8 5v14l11-7z" />
					</svg>
				</div>
			</button>
		)
	}

	return (
		<div className="aspect-video w-full">
			<iframe
				src={embedUrl}
				width="100%"
				height="100%"
				className="h-full w-full"
				frameBorder={0}
				allow="autoplay; fullscreen; picture-in-picture"
				allowFullScreen
				title={videoData.title || "Video"}
			/>
		</div>
	)
}
