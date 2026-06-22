import { AgilityPic, ImageField, UnloadedModuleProps, URLField } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { LinkButton } from "components/micro/LinkButton"
import { getContentItem } from "lib/cms/getContentItem"

import { HeroVideo } from "./HeroVideo"
import { HeroAnimation } from "./HeroAnimation"

interface IHero {
	mediaType: string
	image?: ImageField
	videoURL?: string
	animation?: string
	heading: string
	subHeading?: string
	content?: string
	cTA?: URLField
}

export const Hero = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<IHero>({
		contentID: module.contentid,
		languageCode
	})

	return (
		<>
		{fields.mediaType === "image" && fields.image && (
			<link
				rel="preload"
				as="image"
				imageSrcSet={`${fields.image.url}?format=auto&w=400 400w, ${fields.image.url}?format=auto&w=480 480w, ${fields.image.url}?format=auto&w=800 800w, ${fields.image.url}?format=auto&w=960 960w`}
				imageSizes="(min-width: 640px) 480px, 400px"
				fetchPriority="high"
			/>
		)}
		<Container className="text-balance text-center">
			<div className="mx-auto max-w-7xl">
				{fields.mediaType === "video" && fields.videoURL && (
					<div className="mb-10 flex w-full justify-center">
						<HeroVideo videoURL={fields.videoURL} />
					</div>
				)}

				{fields.mediaType === "image" && fields.image && (
					<div className="mb-10 flex w-full justify-center">
						<AgilityPic
							image={fields.image}
							fallbackWidth={400}
							priority
							sources={[
								{ media: "(min-width: 640px) and (min-resolution: 2x)", width: 960 },
								{ media: "(min-width: 640px)", width: 480 },
								{ media: "(min-resolution: 2x)", width: 800 },
							]}
						/>
					</div>
				)}

				{fields.mediaType === "animation" && fields.animation && <HeroAnimation animation={fields.animation} />}

				{fields.heading && <h1 className="text-6xl font-black text-highlight-light">{fields.heading}</h1>}
				{fields.subHeading && <h2 className="mt-2 text-5xl font-bold text-black">{fields.subHeading}</h2>}
				{fields.content && <p className="mt-3">{fields.content}</p>}
				{fields.cTA && (
					<LinkButton
						type="alternate"
						size="md"
						href={fields.cTA.href}
						target={fields.cTA.target}
						className="mt-5"
					>
						{fields.cTA.text}
					</LinkButton>
				)}
			</div>
		</Container>
		</>
	)
}
