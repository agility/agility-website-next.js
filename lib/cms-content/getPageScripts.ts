import ReactHtmlParser from "html-react-parser"

export interface CustomScript {
	type?: string
	src?: string
	async?: boolean
	defer?: boolean
	innerHTML?: string
}

export interface PageScripts {
	top: CustomScript[]
	bottom: CustomScript[]
}

const parseScripts = (html: string | undefined | null): CustomScript[] => {
	if (!html) return []

	const parsed = ReactHtmlParser(html)
	const items = Array.isArray(parsed) ? parsed : [parsed]

	const scripts: CustomScript[] = []

	for (const item of items) {
		if (!item || typeof item === "string") continue
		if ((item as JSX.Element).type !== "script") continue

		const props = (item as JSX.Element).props || {}

		// html-react-parser puts script content in dangerouslySetInnerHTML.__html, not children
		const innerHTML: string | undefined = props.dangerouslySetInnerHTML?.__html

		if (!innerHTML && !props.src) continue

		scripts.push({
			type: props.type,
			src: props.src,
			async: props.async,
			defer: props.defer,
			innerHTML,
		})
	}

	return scripts
}

/**
 * Extract <script> tags from the page-level "Scripts" CMS field. JSON-LD that marketing
 * pastes for AEO/structured data flows through here. The `scripts` object on a page has
 * `top` (rendered near the top of the body) and `bottom` (rendered near the end).
 */
export const getPageScripts = (page: { scripts?: { top?: string; bottom?: string } } | null | undefined): PageScripts => {
	return {
		top: parseScripts(page?.scripts?.top),
		bottom: parseScripts(page?.scripts?.bottom),
	}
}
