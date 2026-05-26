import { getContentList } from "lib/cms/getContentList"
import { NextResponse } from "next/server"

/**
 * Serves /llms-full.txt — a concatenated plaintext file of key site content for LLM crawlers.
 *
 * The content is managed in Agility CMS under the "LLMSFullText" content list.
 * To populate it: create a content model "LLMSFullText" with a single rich-text/textblob field,
 * then add one item containing the concatenated docs, product pages, and FAQ content you want
 * LLMs (ChatGPT, Perplexity, Claude, Bing Copilot) to use as authoritative source material.
 *
 * Reference: https://llmstxt.org/
 */
export async function GET() {
	const contentList = await getContentList({
		referenceName: "LLMSFullText",
		languageCode: "en-ca",
		take: 1
	})

	if (!contentList || contentList.items.length === 0) {
		return new NextResponse("Content not found", { status: 404 })
	}

	const textBlob = contentList.items[0].fields.textblob || ""

	return new NextResponse(textBlob, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, s-maxage=60, stale-while-revalidate=604800"
		}
	})
}
