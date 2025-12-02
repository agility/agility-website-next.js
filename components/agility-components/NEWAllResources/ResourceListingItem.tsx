import { AgilityPic } from "@agility/nextjs"
import { IconChevronRight } from "@tabler/icons-react"
import clsx from "clsx"
import { IResourceListingItem } from "lib/cms-content/getResourceListing"
import Link from "next/link"

interface Props {
	item: IResourceListingItem
	index: number
	size: "xs" | "sm" | "md" | "lg" | "2xl"
}

export const ResourceListingItem = ({ item, index, size }: Props) => {
	const cat = item.fields.resourceTypeName.toLowerCase().replaceAll(" ", "-")
	const url = `/resources/${cat}/${item.fields.uRL}`

	return (
		<Link
			className={clsx(
				"group mb-8 flex flex-col md:mb-0",
				"border border-background dark:border-gray-700 bg-white dark:bg-gray-800 transition-all hover:shadow-lg"
			)}
			href={url}
			key={item.contentID}
		>
			<div className="relative h-52 w-full overflow-clip">
				<AgilityPic
					image={item.fields.image}
					className="w-full object-cover object-center transition-transform group-hover:scale-110"
					fallbackWidth={480}
					sources={[
						//screen at least than 1280, it's 1/3 of the screen
						{
							media: "(min-width: 1280px)",
							width: 480
						},

						//screen at least than 640, it's 1/2 of the screen
						{ media: "(min-width: 640px)", width: 640 },
						//screen less than 640, full width of screen
						{ media: "(max-width: 639px)", width: 640 }
					]}
				/>
			</div>

			<div className={clsx("flex flex-1 flex-col p-8", "")}>
				<h2 className="mt-1 text-2xl font-medium dark:text-white dark:group-hover:text-secondary">{item.fields.title}</h2>
				<div className="mt-3 flex-1">
					<p className="line-clamp-3 dark:text-gray-300">{item.fields.excerpt}</p>
				</div>

				<div
					className={clsx(
						"mt-3 flex items-center gap-1",
						"text-highlight-dark transition-colors group-hover:text-highlight-light dark:text-secondary dark:group-hover:text-secondary"
					)}
				>
					Read More
					<IconChevronRight size={18} stroke={2} />
				</div>
			</div>
		</Link>
	)
}
