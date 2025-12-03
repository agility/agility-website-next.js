import { AgilityPic, UnloadedModuleProps } from "@agility/nextjs"
import { ContentItem } from "@agility/content-fetch"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import { getContentList } from "lib/cms/getContentList"
import { IPodCast } from "lib/types/IPodCast"
import Link from "next/link"

interface IPodcastListing { }
export const PodcastListing = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<IPodcastListing>({
		contentID: module.contentid,
		languageCode
	})

	const lstPods = await getContentList({
		referenceName: "podcast",
		languageCode,
		take: 100
	})

	if (!lstPods || !lstPods.items || lstPods.items.length === 0) {
		return null
	}

	const pods = lstPods.items as ContentItem<IPodCast>[]

	return (
		<Container >
			<div className="mx-auto max-w-7xl">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{pods.map((pod) => {
						return (
							<Link
								key={pod.contentID}
								href={`/resources/agileliving/${pod.fields.uRL}`}
								className="group flex flex-col transition-shadow duration-200 hover:shadow-lg"
							>
								<div className="h-52 overflow-clip">
									{(pod.fields.listingImage || pod.fields.mainImage) && (
										<AgilityPic
											image={pod.fields.listingImage || pod.fields.mainImage}
											fallbackWidth={400}
											className="w-full object-contain transition-transform duration-300 group-hover:scale-110"
										/>
									)}
								</div>
								<div className="flex-1 border border-t-0 border-background p-5">
									<p className="text-sm text-slate-500">EPISODE #{pod.fields.episodeNumber}</p>
									<h3 className="mt-3 text-lg font-medium">{pod.fields.title}</h3>
								</div>
							</Link>
						)
					})}
				</div>
			</div>
		</Container>
	)
}
