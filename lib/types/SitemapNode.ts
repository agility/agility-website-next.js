/** Agility's redirect payload on a sitemap node: `{ url, target }`, not a bare string. */
export interface SitemapRedirect {
	url: string
	target: string
}

export interface SitemapNode {

	title: string
	name: string
	pageID: number
	contentID?: number
	menuText: number
	visible: { menu: boolean, sitemap: boolean },
	path: string,
	redirect: SitemapRedirect | null,
	isFolder: boolean

}
