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

		//expand out the menu structure with MULTIPLE CALLS so that we can purge the cache for any level :)
		if (header?.fields.menuStructure.referencename) {

			const menuStructureList = await getContentList({
				referenceName: header.fields.menuStructure.referencename,
				languageCode: locale,
				contentLinkDepth: 0
			})

			for (let i = 0; i < menuStructureList.items.length; i++) {
				const menuItem: ContentItem<TopLevelNav> = menuStructureList.items[i]

				let subMenuList: ContentItem<SubLevelNav>[] | undefined = undefined
				let megaMenuList: ContentItem<MegaMenuItem>[] | undefined = undefined

				//grab the mega menu if needed
				if (menuItem.fields.megaContent && menuItem.fields.megaContent.referencename) {
					const res = await getContentList({
						referenceName: menuItem.fields.megaContent.referencename,
						languageCode: locale,
					})

					if (res && res.items && res.items.length > 0) {
						megaMenuList = res.items
					}


				}

				if (menuItem.fields.subNavigation && menuItem.fields.subNavigation.referencename) {

					//expand out the subnav
					const res = await getContentList({
						referenceName: menuItem.fields.subNavigation.referencename,
						languageCode: locale,
						contentLinkDepth: 0,
						take: 100

					})

					if (res && res.items && res.items.length > 0) {
						subMenuList = res.items as ContentItem<SubLevelNav>[]
					}


				}

				links.push({
					menuItem,
					subMenuList,
					megaMenuList

				})

			}
		}


		//get the preheader links
		const preHeaderLinksRef = header.fields.preHeaderLinks
		let preheaderLinks: BasicLink[] = []
		if (preHeaderLinksRef && preHeaderLinksRef.referencename) {
			const preHeaderLinksList = await getContentList({
				referenceName: preHeaderLinksRef.referencename,
				languageCode: locale,
				take: 5,
				contentLinkDepth: 0
			})

			preheaderLinks = preHeaderLinksList.items.map((item: any) => ({
				title: item.fields.title,
				url: item.fields.uRL
			}))
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



