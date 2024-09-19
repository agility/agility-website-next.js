import { AgilityPic, renderHTML, UnloadedModuleProps } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { IPodCast } from "lib/types/IPodCast"
import { DateTime } from "luxon"

export const PodcastDetail = async ({ module, languageCode, dynamicPageItem }: UnloadedModuleProps) => {
	if (!dynamicPageItem) return null

	const podcast = dynamicPageItem.fields as IPodCast

	const date = new Date(podcast.date)
	const dt = DateTime.fromJSDate(date)
	const dateStr = dt.toFormat("MMMM dd, yyyy")

	return (
		<Container className="mx-auto max-w-7xl">
			<h1 className="text-balance text-4xl font-medium leading-tight">{podcast.title}</h1>
			<div className="mt-5 flex items-center gap-2">
				<div className="font-medium">EPISODE #{podcast.episodeNumber}</div>
				<time className="text-slate-500" dateTime={podcast.date}>
					{dateStr}
				</time>
			</div>

			<div>
				<AgilityPic
					image={podcast.mainImage}
					className="mt-5"
					fallbackWidth={400}
					sources={[
						{ media: "(min-width: 1200px)", width: 1200 },
						{ media: "(min-width: 768px)", width: 800 }
					]}
				/>
			</div>

			<div className="mt-5" dangerouslySetInnerHTML={renderHTML(podcast.embed)}></div>

			<div className="prose mx-auto mt-5" dangerouslySetInnerHTML={renderHTML(podcast.textblob)}></div>
		</Container>
	)
}
