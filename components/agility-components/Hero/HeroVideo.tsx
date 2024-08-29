"use client"

import dynamic from "next/dynamic"
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false })

interface Props {
	videoURL: string
}
export const HeroVideo = ({ videoURL }: Props) => {
	return (
		<ReactPlayer
			url={videoURL}
			playing={true}
			muted={true}
			controls={true}
			loop={false}
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
	)
}
