import Link from "next/link"
import { Search } from "components/search/Search"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"
import type { BasicLink } from "lib/cms-content/getHeaderContent"

interface Props {
	marketingBanner?: string
	hideMarketingBanner?: string
	preheaderLinks: BasicLink[]
}

export const PreHeader = ({ marketingBanner, hideMarketingBanner, preheaderLinks }: Props) => {
	return (
		<div className="bg-highlight text-white py-3 hidden lg:block px-8 2xl:px-0">
			<div className="mx-auto max-w-7xl flex justify-between items-center">
				{hideMarketingBanner !== "true" && marketingBanner && (
					<div className="marketing-banner justify-start items-center flex-shrink line-clamp-1">
						<div
							className="text-sm"
							dangerouslySetInnerHTML={renderHTMLCustom(marketingBanner)}
						/>
					</div>
				)}
				<div className="flex items-center gap-1">
					<Search />
					{preheaderLinks.map((link, index) => (
						<Link
							key={`preheader-link-${index}`}
							href={link.url.href}
							target={link.url.target}
							className="ml-4 text-sm font-medium text-white whitespace-nowrap hover:text-secondary transition-colors"
						>
							{link.title}
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}
