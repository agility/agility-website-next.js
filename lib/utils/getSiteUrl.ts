/**
 * The public base URL of the site, without a trailing slash.
 *
 * Resolution order:
 *  1. NEXT_PUBLIC_SITE_URL / SITE_URL  — explicit override (always wins)
 *  2. VERCEL_URL on a non-production deploy — the current preview/branch host
 *  3. https://agilitycms.com — the canonical production domain
 *
 * Production always resolves to the canonical domain because middleware 301s
 * every other host to agilitycms.com; emitting a Vercel host there would just
 * produce URLs that redirect. Preview/branch deploys emit their own host so
 * their sitemap is self-consistent.
 */
export const getSiteUrl = (): string => {
	const explicit = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL
	if (explicit) return explicit.replace(/\/+$/, "")

	if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production" && process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`
	}

	return "https://agilitycms.com"
}
