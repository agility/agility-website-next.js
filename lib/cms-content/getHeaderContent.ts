import { ImageField, URLField } from "@agility/nextjs"
import { getContentList } from "lib/cms/getContentList"
import { ContentItem } from "@agility/content-fetch"
import { Header } from "lib/types/Header"
import { TopLevelNav } from "lib/types/TopLevelNav"
import { SubLevelNav } from "lib/types/SubLevelNav"
import { MegaMenuItem } from "lib/types/MegaMenuItem"




interface Props {
	locale: string
	sitemap: string
}

export interface MenuLink {
	menuItem: ContentItem<TopLevelNav>,
	subMenuList?: ContentItem<SubLevelNav>[]
	megaMenuList?: ContentItem<MegaMenuItem>[]
}

export interface BasicLink {
	title: string
	url: URLField
}

export interface HeaderContent {
	header: ContentItem<Header>
	links: MenuLink[]
	preheaderLinks: BasicLink[]
}

/**
 * Get the site header content from the main `siteheader` content item,
 * as well as the nested sitemap for our navigation links.
 *
 * Most solutions use nested linked content lists for navigation, but for simplicity, we are using the sitemap here.
 *
 *
 * @param {Props} { locale, sitemap }
 * @return {*}
 */
export const getHeaderContent = async ({ locale, sitemap }: Props): Promise<HeaderContent> => {


	// set up content item
	let header: ContentItem<Header> | null = null

	// set up links
	let links = []

	try {
		// try to fetch our site header
		let headerList = await getContentList({
			referenceName: "globalheader",
			languageCode: locale,
			take: 1,
			contentLinkDepth: 0
		})

		// if we have a header, set as content item
		if (headerList && headerList.items && headerList.items.length > 0) {
			header = headerList.items[0]
		}

		if (!header) throw Error("No header found.")

		// Phase 2: fetch menu structure and preheader links in parallel (both depend on header)
		//expand out the menu structure with MULTIPLE CALLS so that we can purge the cache for any level :)
		const [menuStructureList, preHeaderLinksList] = await Promise.all([
			header.fields.menuStructure?.referencename
				? getContentList({ referenceName: header.fields.menuStructure.referencename, languageCode: locale, contentLinkDepth: 0 })
				: Promise.resolve(null),
			header.fields.preHeaderLinks?.referencename
				? getContentList({ referenceName: header.fields.preHeaderLinks.referencename, languageCode: locale, take: 5, contentLinkDepth: 0 })
				: Promise.resolve(null),
		])

		const preheaderLinks: BasicLink[] = preHeaderLinksList?.items.map((item: any) => ({
			title: item.fields.title,
			url: item.fields.uRL
		})) || []

		// Phase 3: fetch all mega menus and sub-navs in parallel across all menu items
		if (menuStructureList) {
			links = await Promise.all(
				menuStructureList.items.map(async (menuItem: ContentItem<TopLevelNav>) => {
					const [megaMenuRes, subNavRes] = await Promise.all([
						menuItem.fields.megaContent?.referencename
							? getContentList({ referenceName: menuItem.fields.megaContent.referencename, languageCode: locale })
							: Promise.resolve(null),
						menuItem.fields.subNavigation?.referencename
							? getContentList({ referenceName: menuItem.fields.subNavigation.referencename, languageCode: locale, contentLinkDepth: 0, take: 100 })
							: Promise.resolve(null),
					])

					return {
						menuItem,
						megaMenuList: megaMenuRes?.items?.length ? megaMenuRes.items as ContentItem<MegaMenuItem>[] : undefined,
						subMenuList: subNavRes?.items?.length ? subNavRes.items as ContentItem<SubLevelNav>[] : undefined,
					}
				})
			)
		}

		return {
			header,
			links,
			preheaderLinks
		}

	} catch (error) {
		if (console) console.error("Could not load site header item.", error)
		throw new Error("Could not load site header.")
	}



}



