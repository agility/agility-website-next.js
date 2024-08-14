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
			className="group flex flex-1 flex-col border border-background transition-all hover:shadow-lg"
		>
			<div className="flex h-40 w-full items-center justify-center overflow-clip">
				<AgilityPic
					image={item.fields.partnerLogo}
					className="w-64 object-contain transition-all duration-300 group-hover:scale-110"
				/>
			</div>
			<div className="flex flex-1 flex-col gap-3 p-4">
				<h3 className="text-2xl font-medium">{item.fields.title}</h3>
				<div className="line-clamp-3 h-full flex-1">{item.fields.excerpt}</div>
				<div className="flex items-center gap-1 font-medium text-highlight-light">
					Read More <IconChevronRight />
				</div>
			</div>
		</Link>
	)
}
