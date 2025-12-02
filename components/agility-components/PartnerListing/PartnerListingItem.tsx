import { AgilityPic } from "@agility/nextjs"
import { IconChevronRight } from "@tabler/icons-react"
import { IPartnerListingItem } from "lib/cms-content/getPartnerListing"
import { IPartner } from "lib/types/IPartner"
import Link from "next/link"

interface Props {
	item: IPartnerListingItem
	partnerType: string
}

export const PartnerListingItem = ({ item, partnerType }: Props) => {
	return (
		<Link
			key={item.contentID}
			href={`/partners/${partnerType}/${item.fields.uRL}`}
			className="group flex flex-1 flex-col border border-background dark:border-gray-700 transition-all hover:shadow-lg dark:bg-gray-800"
		>
			<div className="flex h-40 w-full items-center justify-center overflow-clip dark:bg-white">
				<AgilityPic
					image={item.fields.partnerLogo}
					className="w-64 object-contain transition-all duration-300 group-hover:scale-110"
				/>
			</div>
			<div className="flex flex-1 flex-col gap-3 p-4">
				<h3 className="text-2xl font-medium dark:text-white">{item.fields.title}</h3>
				<div className="line-clamp-3 h-full flex-1 dark:text-gray-300">{item.fields.excerpt}</div>
				<div className="flex items-center gap-1 font-medium text-highlight-light dark:text-secondary">
					Read More <IconChevronRight />
				</div>
			</div>
		</Link>
	)
}
