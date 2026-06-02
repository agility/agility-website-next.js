interface EmbedOptions {
	autoplay?: boolean
	muted?: boolean
	controls?: boolean
}

/**
 * Convert a public vimeo.com URL into a player.vimeo.com embed URL.
 * Returns null if the URL doesn't look like a Vimeo video URL.
 *
 * Handles:
 *   https://vimeo.com/123456
 *   https://vimeo.com/123456/abc123     (private link with hash)
 *   https://vimeo.com/channels/foo/123456
 *   https://player.vimeo.com/video/123456
 */
export function getVimeoEmbedUrl(url: string, opts: EmbedOptions = {}): string | null {
	const match = url.match(/vimeo\.com\/(?:channels\/[^\/]+\/|video\/)?(\d+)(?:\/(\w+))?/)
	if (!match) return null

	const videoId = match[1]
	const hash = match[2]

	const params = new URLSearchParams()
	if (hash) params.set("h", hash)
	if (opts.autoplay) params.set("autoplay", "1")
	if (opts.muted) params.set("muted", "1")
	if (opts.controls === false) params.set("controls", "0")

	const qs = params.toString()
	return `https://player.vimeo.com/video/${videoId}${qs ? `?${qs}` : ""}`
}
