// Run with: npm run test:aibots
//
// RULES is an ordered first-match-wins list that is expected to be edited every
// time a vendor ships a new agent. Both failure modes are silent — a reordered
// rule mis-categorises traffic, a shadowed token never fires at all — so the
// list is pinned here against real user agent strings.

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { classifyAIBot, RULES } from './aiBots'

//Real UA strings as published by each vendor. The collision-prone families are
//deliberately over-represented: OpenAI ships three agents whose names share a
//prefix, Anthropic three more, and getting either family wrong silently moves
//traffic between the training and retrieval buckets.
const CASES: Array<[string, string, string]> = [
	// --- OpenAI: GPTBot vs ChatGPT-User vs OAI-SearchBot ---
	[
		'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.2; +https://openai.com/gptbot',
		'GPTBot',
		'training',
	],
	[
		'Mozilla/5.0 (compatible; ChatGPT-User/1.0; +https://openai.com/bot)',
		'ChatGPT-User',
		'retrieval',
	],
	[
		'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot',
		'OAI-SearchBot',
		'retrieval',
	],

	// --- Anthropic: ClaudeBot vs Claude-User vs Claude-SearchBot ---
	[
		'Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)',
		'ClaudeBot',
		'training',
	],
	[
		'Mozilla/5.0 (compatible; Claude-User/1.0; +Claude-User@anthropic.com)',
		'Claude-User',
		'retrieval',
	],
	[
		'Mozilla/5.0 (compatible; Claude-SearchBot/1.0; +Claude-SearchBot@anthropic.com)',
		'Claude-SearchBot',
		'retrieval',
	],

	// --- Perplexity: bot vs user ---
	[
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119 Safari/537.36; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot',
		'PerplexityBot',
		'retrieval',
	],
	[
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119 Safari/537.36; compatible; Perplexity-User/1.0; +https://perplexity.ai/perplexity-user',
		'Perplexity-User',
		'retrieval',
	],

	// --- Meta: agent (training) vs fetcher (retrieval) ---
	[
		'meta-externalagent/1.1 (+https://developers.facebook.com/docs/sharing/webmasters/crawler)',
		'meta-externalagent',
		'training',
	],
	[
		'meta-externalfetcher/1.1 (+https://developers.facebook.com/docs/sharing/webmasters/crawler)',
		'Meta-ExternalFetcher',
		'retrieval',
	],

	// --- Cohere: training crawler vs assistant fetch ---
	[
		'cohere-training-data-crawler/1.0 (+https://cohere.com/training-data-crawler)',
		'cohere-training-data-crawler',
		'training',
	],
	['cohere-ai/1.0', 'cohere-ai', 'retrieval'],

	// --- remaining training crawlers ---
	['CCBot/2.0 (https://commoncrawl.org/faq/)', 'CCBot', 'training'],
	[
		'Mozilla/5.0 (compatible; Bytespider; spider-feedback@bytedance.com)',
		'Bytespider',
		'training',
	],
	['Mozilla/5.0 (compatible; Amazonbot/0.1; +https://developer.amazon.com/support/amazonbot)', 'Amazonbot', 'training'],

	// --- scrapers: must NOT land in retrieval ---
	['Mozilla/5.0 (compatible; Firecrawl/1.0; +https://firecrawl.dev)', 'Firecrawl', 'scraper'],
	['Mozilla/5.0 (compatible; Diffbot/0.1; +http://www.diffbot.com)', 'Diffbot', 'scraper'],
]

test('classifies real AI bot user agents', () => {
	for (const [ua, bot, category] of CASES) {
		const got = classifyAIBot(ua)
		assert.ok(got, `expected a match for ${bot}\n  UA: ${ua}`)
		assert.equal(got.bot, bot, `wrong bot for UA: ${ua}`)
		assert.equal(got.category, category, `wrong category for ${bot}`)
	}
})

test('returns null for humans, search crawlers and empty input', () => {
	const notAI = [
		//an ordinary browser
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
		//search crawlers are deliberately excluded — counting them would inflate
		//"AI" with ordinary search indexing
		'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
		'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15 (Applebot/0.1; +http://www.apple.com/go/applebot)',
	]
	for (const ua of notAI) {
		assert.equal(classifyAIBot(ua), null, `should not match: ${ua}`)
	}

	assert.equal(classifyAIBot(''), null)
	assert.equal(classifyAIBot(null), null)
	assert.equal(classifyAIBot(undefined), null)
})

test('matching is case-insensitive', () => {
	assert.equal(classifyAIBot('GPTBOT/1.2')?.bot, 'GPTBot')
	assert.equal(classifyAIBot('gptbot/1.2')?.bot, 'GPTBot')
})

test('no rule token shadows another', () => {
	//First match wins, so a token that contains another token makes the later
	//rule unreachable — and it fails silently. If this ever legitimately needs to
	//happen, the containing (more specific) token must be ordered FIRST, and this
	//assertion updated to check that ordering rather than to forbid the overlap.
	for (const a of RULES) {
		for (const b of RULES) {
			if (a === b) continue
			assert.ok(
				!a.token.includes(b.token),
				`"${a.token}" contains "${b.token}" — one of these rules can never match. ` +
					`Order the more specific token first and update this test.`
			)
		}
	}
})

test('rule tokens are lowercase, since the UA is lowercased before matching', () => {
	for (const rule of RULES) {
		assert.equal(rule.token, rule.token.toLowerCase(), `token not lowercase: ${rule.token}`)
	}
})
