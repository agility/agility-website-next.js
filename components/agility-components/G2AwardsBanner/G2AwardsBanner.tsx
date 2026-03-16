import { AgilityPic, ImageField, UnloadedModuleProps } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"

interface IG2AwardsBanner {
	heading: string
	badgesImage: ImageField
}

export const G2AwardsBanner = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<IG2AwardsBanner>({
		contentID: module.contentid,
		languageCode,
	})

	return (
		<Container id={`${contentID}`} data-agility-component={contentID}>
			<div className="mx-auto max-w-5xl pb-14">
				{fields.heading && (
					<h2 className="text-balance text-center text-4xl font-bold text-primary lg:text-5xl">
						{fields.heading}
					</h2>
				)}
				{fields.badgesImage && (
					<div className="mt-10 overflow-hidden rounded-2xl bg-white p-6 shadow-lg lg:p-10">
						<AgilityPic
							image={fields.badgesImage}
							className="w-full"
							fallbackWidth={900}
							sources={[
								{ media: "(min-width: 1200px)", width: 1000 },
								{ media: "(min-width: 768px)", width: 800 },
								{ media: "(min-width: 640px)", width: 600 },
							]}
						/>
					</div>
				)}
			</div>
		</Container>
	)
}
