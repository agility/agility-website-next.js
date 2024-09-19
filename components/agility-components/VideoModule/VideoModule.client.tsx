"use client"

import ReactPlayer from "react-player"

interface Props {
	videoURL: string
	playing: boolean
	muted: boolean
}
export const VideoModuleClient = ({ videoURL, muted, playing }: Props) => {
	return (
		<div className="aspect-video">
			<ReactPlayer
				width={"100%"}
				height={"100%"}
				url={videoURL}
				playing={playing}
				muted={muted}
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
		</div>
	)
}
