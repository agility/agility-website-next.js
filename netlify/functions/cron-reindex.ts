import type { Config } from "@netlify/functions";

// Disabled 2026-11-03: agilitycms.com moved to the agility-website-2026 project,
// which now owns the Algolia index. This old project must not reindex it.
// The schedule is removed so Netlify no longer runs this function.
export default async () => {
	return new Response("cron-reindex disabled", { status: 200 })
}

export const config: Config = {}
