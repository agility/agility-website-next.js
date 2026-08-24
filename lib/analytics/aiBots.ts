// Classification of AI-vendor user agents.
//
// There are three populations of "AI traffic" and they need different treatment:
//
//   1. referred humans  — a person clicked a link in an AI answer. Sends a
//      Referer of chatgpt.com / claude.ai etc, runs JS, and therefore shows up
//      in GA4. NOT handled here.
//   2. training crawlers — bulk corpus collection for model training. No JS, so
//      invisible to GA4. `category: 'training'`.
//   3. live retrieval   — the assistant fetches the page during a conversation,
//      or indexes it for AI search. Also invisible to GA4. `category: 'retrieval'`.
//
// Category 3 is the leading indicator for AI visibility: retrieval happens
// whether or not anyone clicks through, so it distinguishes "we are not being
// cited" from "we are cited and answered in place".
//
// Caveat: user agents are self-reported and trivially spoofed. These counts mean
// "requests claiming to be X" — useful for cooperative AI vendors, useless
// against anyone who does not want to be identified.

export type AIBotCategory = 'training' | 'retrieval'

export interface AIBotMatch {
	/** Canonical vendor token, e.g. "GPTBot" */
	bot: string
	category: AIBotCategory
	/** Vendor family, for grouping across a vendor's several agents */
	vendor: string
}

interface Rule {
	/** Lowercased substring to look for in the user agent */
	token: string
	bot: string
	category: AIBotCategory
	vendor: string
}

// Order matters: first match wins, so the more specific token must come first
// where one token is a substring of another (e.g. Applebot-Extended before any
// bare Applebot rule). Retrieval agents are listed first because they are the
// more specific strings.
const RULES: Rule[] = [
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

	// ---- training / bulk corpus ----
	{ token: 'gptbot', bot: 'GPTBot', category: 'training', vendor: 'OpenAI' },
	{ token: 'claudebot', bot: 'ClaudeBot', category: 'training', vendor: 'Anthropic' },
	{ token: 'ccbot', bot: 'CCBot', category: 'training', vendor: 'Common Crawl' },
	{ token: 'bytespider', bot: 'Bytespider', category: 'training', vendor: 'ByteDance' },
	{ token: 'meta-externalagent', bot: 'meta-externalagent', category: 'training', vendor: 'Meta' },
	{ token: 'applebot-extended', bot: 'Applebot-Extended', category: 'training', vendor: 'Apple' },
	{ token: 'amazonbot', bot: 'Amazonbot', category: 'training', vendor: 'Amazon' },
	{ token: 'ai2bot', bot: 'AI2Bot', category: 'training', vendor: 'AI2' },
	{ token: 'diffbot', bot: 'Diffbot', category: 'training', vendor: 'Diffbot' },
	{ token: 'omgili', bot: 'omgili', category: 'training', vendor: 'Webz.io' },
	{ token: 'timpibot', bot: 'Timpibot', category: 'training', vendor: 'Timpi' },
]

// Deliberately absent:
//
//   Google-Extended — a robots.txt token, not a user agent. Gemini training
//     crawls arrive as ordinary Googlebot and cannot be distinguished from
//     search crawling at the UA level. Controllable via robots.txt, not measurable.
//   Applebot, Bingbot — dual-purpose (search + assistant). Counting them here
//     would inflate "AI" with ordinary search crawling.

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
