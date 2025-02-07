import React from "react"
import { AgilityPic, ImageField, UnloadedModuleProps } from "@agility/nextjs"

import { getContentItem } from "lib/cms/getContentItem"

interface ISplashImageProps {
	splashImage: ImageField
}

export const SplashImage = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<ISplashImageProps>({
		contentID: module.contentid,
		languageCode
	})

	return (
		<div data-agility-component={contentID} className="mx-auto max-w-7xl">
			{fields.splashImage && (
				<div className="flex w-full justify-center">
					<AgilityPic
						image={fields.splashImage}
						data-agility-field="splashImage"
						fallbackWidth={400}
						priority
						className="w-full"
						sources={[
							//screen at least than 640, it's 1/2 of the screen, so the same size as the prev breakpoint
							{ media: "(min-width: 1200px) and (min-resolution: 2x)", width: 1600 },
							{ media: "(min-width: 1200px)", width: 800 },
							{ media: "(min-width: 1024px) and (min-resolution: 2x)", width: 1200 },
							{ media: "(min-width: 1024px)", width: 600 },
							{ media: "(min-width: 768px) and (min-resolution: 2x)", width: 1200 },
							{ media: "(min-width: 768px)", width: 600 },
							{ media: "(min-width: 640px) and (min-resolution: 2x)", width: 880 },
							{ media: "(min-width: 640px)", width: 480 },
							{ media: "(min-width: 320px) and (min-resolution: 2x)", width: 640 }
						]}
					/>
				</div>
			)}
		</div>
	)
}
