// Classification of AI-vendor user agents.
//
// There are four populations of "AI traffic" and they need different treatment:
//
//   1. referred humans  — a person clicked a link in an AI answer. Sends a
//      Referer of chatgpt.com / claude.ai etc, runs JS, and therefore shows up
//      in GA4. NOT handled here.
//   2. training crawlers — bulk corpus collection for model training. No JS, so
//      invisible to GA4. `category: 'training'`.
//   3. live retrieval   — the assistant fetches the page during a conversation,
//      or indexes it for AI search. Also invisible to GA4. `category: 'retrieval'`.
//   4. scraping services — general-purpose commercial crawlers (Firecrawl,
//      Diffbot). Whoever pointed them at us may or may not be an assistant, so
//      they are neither evidence of citation nor of training. `category:
//      'scraper'`, kept separate so they cannot inflate category 3.
//
// Category 3 is the leading indicator for AI visibility: retrieval happens
// whether or not anyone clicks through, so it distinguishes "we are not being
// cited" from "we are cited and answered in place". Do not fold category 4 into
// it — "someone ran a scraper at us" is a different fact.
//
// Caveat: user agents are self-reported and trivially spoofed. These counts mean
// "requests claiming to be X" — useful for cooperative AI vendors, useless
// against anyone who does not want to be identified.

export type AIBotCategory = 'training' | 'retrieval' | 'scraper'

export interface AIBotMatch {
	/** Canonical vendor token, e.g. "GPTBot" */
	bot: string
	category: AIBotCategory
	/** Vendor family, for grouping across a vendor's several agents */
	vendor: string
}

export interface Rule {
	/** Lowercased substring to look for in the user agent */
	token: string
	bot: string
	category: AIBotCategory
	vendor: string
}

// First match wins. No token below is currently a substring of another, so the
// ordering is presentational — grouped by category to keep the file readable.
//
// That invariant is worth preserving, because the day it breaks the shadowed
// rule fails silently rather than erroring: a UA matching both tokens is simply
// filed under whichever appears first. `aiBots.test.ts` asserts it on every run,
// so adding an overlapping token (a future `Applebot-Extended` alongside a bare
// `Applebot`, say) fails the test rather than quietly mis-categorising traffic.
export const RULES: Rule[] = [
	// ---- live retrieval / AI-search indexing ----
	{ token: 'chatgpt-user', bot: 'ChatGPT-User', category: 'retrieval', vendor: 'OpenAI' },
	{ token: 'oai-searchbot', bot: 'OAI-SearchBot', category: 'retrieval', vendor: 'OpenAI' },
	{ token: 'claude-searchbot', bot: 'Claude-SearchBot', category: 'retrieval', vendor: 'Anthropic' },
	{ token: 'claude-user', bot: 'Claude-User', category: 'retrieval', vendor: 'Anthropic' },
	{ token: 'perplexity-user', bot: 'Perplexity-User', category: 'retrieval', vendor: 'Perplexity' },
	{ token: 'perplexitybot', bot: 'PerplexityBot', category: 'retrieval', vendor: 'Perplexity' },
	{ token: 'duckassistbot', bot: 'DuckAssistBot', category: 'retrieval', vendor: 'DuckDuckGo' },
	{ token: 'mistralai-user', bot: 'MistralAI-User', category: 'retrieval', vendor: 'Mistral' },
	{ token: 'google-cloudvertexbot', bot: 'Google-CloudVertexBot', category: 'retrieval', vendor: 'Google' },
	{ token: 'meta-externalfetcher', bot: 'Meta-ExternalFetcher', category: 'retrieval', vendor: 'Meta' },
	{ token: 'youbot', bot: 'YouBot', category: 'retrieval', vendor: 'You.com' },
	{ token: 'cohere-ai', bot: 'cohere-ai', category: 'retrieval', vendor: 'Cohere' },

	// ---- training / bulk corpus ----
	{ token: 'gptbot', bot: 'GPTBot', category: 'training', vendor: 'OpenAI' },
	{ token: 'claudebot', bot: 'ClaudeBot', category: 'training', vendor: 'Anthropic' },
	{ token: 'ccbot', bot: 'CCBot', category: 'training', vendor: 'Common Crawl' },
	{ token: 'bytespider', bot: 'Bytespider', category: 'training', vendor: 'ByteDance' },
	{ token: 'meta-externalagent', bot: 'meta-externalagent', category: 'training', vendor: 'Meta' },
	{ token: 'cohere-training-data-crawler', bot: 'cohere-training-data-crawler', category: 'training', vendor: 'Cohere' },
	{ token: 'amazonbot', bot: 'Amazonbot', category: 'training', vendor: 'Amazon' },
	{ token: 'grokbot', bot: 'GrokBot', category: 'training', vendor: 'xAI' },
	{ token: 'ai2bot', bot: 'AI2Bot', category: 'training', vendor: 'AI2' },
	{ token: 'omgili', bot: 'omgili', category: 'training', vendor: 'Webz.io' },
	{ token: 'timpibot', bot: 'Timpibot', category: 'training', vendor: 'Timpi' },

	// ---- commercial scraping services ----
	// Not assistants. Someone paid these to fetch us, and we cannot tell who or
	// why from the UA. Counting them as retrieval would read as "an assistant
	// cited us" when the real event is "a customer of Firecrawl crawled us".
	{ token: 'firecrawl', bot: 'Firecrawl', category: 'scraper', vendor: 'Firecrawl' },
	{ token: 'diffbot', bot: 'Diffbot', category: 'scraper', vendor: 'Diffbot' },
]

// Deliberately absent — all for the same reason, that they cannot be measured
// from a user agent even though they are real:
//
//   Google-Extended    a robots.txt token, NOT a user agent. Gemini training
//                      crawls arrive as ordinary Googlebot and are
//                      indistinguishable from search crawling at the UA layer.
//                      Controllable via robots.txt; not measurable.
//   Applebot-Extended  same shape: Apple always sends `Applebot/x.y`, and
//                      -Extended exists only as a robots.txt opt-out token. A
//                      UA rule for it would be dead code.
//   Applebot, Bingbot  dual-purpose (search + assistant). Counting them here
//                      would inflate "AI" with ordinary search crawling.
//
// This list is not stable — vendors add agents often. Re-check against
// https://darkvisitors.com or each vendor's published crawler docs when the
// retrieval numbers look flat, because a missing agent reads as "not cited"
// rather than as a gap in instrumentation.

/**
 * Identify an AI-vendor bot from a user agent string.
 * Returns null for everything else, including referred humans.
 */
export function classifyAIBot(userAgent: string | null | undefined): AIBotMatch | null {
	if (!userAgent) return null
	const ua = userAgent.toLowerCase()
	for (const rule of RULES) {
		if (ua.includes(rule.token)) {
			return { bot: rule.bot, category: rule.category, vendor: rule.vendor }
		}
	}
	return null
}
