"use client"

import { useState } from "react"
import dynamic from "next/dynamic"

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false })

interface VimeoVideoProps {
	videoData: {
		url?: string
		video_id?: number
		title?: string
		thumbnail_url?: string
		thumbnail_url_with_play_button?: string
	}
}

export const VimeoVideoPlayer = ({ videoData }: VimeoVideoProps) => {
	const [playing, setPlaying] = useState(false)

	// Use video_id if available, otherwise fall back to url
	const videoUrl = videoData.video_id
		? `https://vimeo.com/${videoData.video_id}`
		: videoData.url

	if (!videoUrl) {
		return null
	}

	// Use thumbnail_url, fallback to true for auto-fetch
	// Note: We don't use thumbnail_url_with_play_button to avoid double play button (ReactPlayer adds its own)
	const thumbnailUrl = videoData.thumbnail_url || true

	return (
		<div className="aspect-video w-full">
			<ReactPlayer
				width="100%"
				height="100%"
				url={videoUrl}
				light={thumbnailUrl}
				playing={playing}
				muted={false}
				controls={true}
				loop={false}
				onClickPreview={() => setPlaying(true)}
				config={{
					vimeo: {
						playerOptions: {
							chromecast: false,
							controls: true,
							fullscreen: true,
							progress_bar: true,
							pip: false,
							volume: true
						}
					}
				}}
			/>
		</div>
	)
}
