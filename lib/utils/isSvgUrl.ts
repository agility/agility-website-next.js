/**
 * Returns true when the URL points to an SVG asset.
 * Strips the query string so cache-busted URLs (e.g. `foo.svg?v=1`) still match.
 */
export const isSvgUrl = (url: string | null | undefined): boolean => {
	if (!url) return false
	return url.split("?")[0].toLowerCase().endsWith(".svg")
}
