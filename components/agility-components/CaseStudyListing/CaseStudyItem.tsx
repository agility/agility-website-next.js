import { AgilityPic } from "@agility/nextjs"
import { IconChevronRight } from "@tabler/icons-react"
import clsx from "clsx"
import { ICaseStudyListingItem } from "lib/cms-content/getCaseStudyListing"
import Link from "next/link"

interface Props {
	item: ICaseStudyListingItem
	index: number
	size: "xs" | "sm" | "md" | "lg" | "2xl"
}

export const CaseStudyItem = ({ item, index, size }: Props) => {
	const url = `/resources/case-studies/${item.fields.uRL}`
	const isPurpleBackground = item.fields.isPurpleBackground
	const isLong =
		size === "md" ? index % 5 == 2 : size === "lg" ? index % 5 === 3 : size === "2xl" ? index % 5 === 4 : false

	if (isLong) {
		return (
			<Link
				className={clsx(
					"group mb-8 flex flex-col md:mb-0",
					"transition-all hover:shadow-lg",
					isLong ? "col-span-2" : "col-span-1",
					isPurpleBackground ? "bg-highlight-light text-white" : ""
				)}
				href={url}
				key={item.contentID}
			>
				<div className="relative max-h-[600px] min-h-[520px] w-full overflow-clip">
					<AgilityPic
						image={item.fields.image}
						className="w-full object-cover object-center transition-transform group-hover:scale-110"
						fallbackWidth={820}
						sources={[
							//screen at least than 1280, it's 1/3 of the screen
							{
								media: "(min-width: 1280px)",
								width: 820
							},

							//screen at least than 640, it's 1/2 of the screen
							{ media: "(min-width: 640px)", width: 640 },
							//screen less than 640, full width of screen
							{ media: "(max-width: 639px)", width: 640 }
						]}
					/>
					<div
						className={clsx(
							"absolute left-0 top-0 h-full w-1/2 text-white",
							isPurpleBackground ? "bg-highlight-dark/40" : "bg-black/50"
						)}
					>
						<div className={clsx("flex h-full flex-1 flex-col gap-8 p-8")}>
							<div className="max-h-20 max-w-full">
								{item.fields.customerWhiteLogo && (
									<AgilityPic image={item.fields.customerWhiteLogo} className="object-contain" />
								)}
							</div>
							<h2 className="text-2xl font-medium">{item.fields.title}</h2>
							<div className="flex-1">
								<p className="line-clamp-6">{item.fields.excerpt}</p>
							</div>

							<div className={clsx("flex items-center gap-1 text-secondary")}>
								Read More
								<IconChevronRight size={18} stroke={2} />
							</div>
						</div>
					</div>
				</div>
			</Link>
		)
	}

	//regular size...
	return (
		<Link
			className={clsx(
				"group mb-8 flex flex-col md:mb-0",
				"transition-all hover:shadow-lg",
				isLong ? "col-span-2" : "col-span-1",
				isPurpleBackground ? "bg-highlight-light text-white" : ""
			)}
			href={url}
			key={item.contentID}
		>
			{isPurpleBackground ? (
				<div className="p-8">
					<div className="h-20 w-3/5">
						{item.fields.customerWhiteLogo && (
							<AgilityPic
								image={item.fields.customerWhiteLogo}
								fallbackWidth={240}
								className="h-full w-full object-contain"
							/>
						)}
					</div>
				</div>
			) : (
				<div className="relative h-64 w-full overflow-clip">
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
					<div className="absolute bottom-4 left-4 h-20 w-3/5">
						{item.fields.customerWhiteLogo && (
							<AgilityPic
								image={item.fields.customerWhiteLogo}
								fallbackWidth={240}
								className="h-full w-full object-contain"
							/>
						)}
					</div>
				</div>
			)}
			<div className={clsx("flex flex-1 flex-col p-8", isPurpleBackground ? "" : "border-2 border-t-0")}>
				<h2 className="mt-1 text-2xl font-medium">{item.fields.title}</h2>
				<div className="mt-3 flex-1">
					<p className="line-clamp-3">{item.fields.excerpt}</p>
				</div>

				<div
					className={clsx(
						"mt-3 flex items-center gap-1",
						isPurpleBackground
							? ""
							: "text-highlight-dark transition-colors group-hover:text-highlight-light"
					)}
				>
					Read More
					<IconChevronRight size={18} stroke={2} />
				</div>
			</div>
		</Link>
	)
}
