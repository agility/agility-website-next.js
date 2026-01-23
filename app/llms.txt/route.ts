import { getContentList } from "lib/cms/getContentList"
import { NextResponse } from "next/server"

export async function GET() {
	const contentList = await getContentList({
		referenceName: "LLMSText",
		languageCode: "en-ca",
		take: 1
	})

	if (!contentList || contentList.items.length === 0) {
		return new NextResponse("Content not found", { status: 404 })
	}

	const textBlob = contentList.items[0].fields.textblob || ""

	return new NextResponse(textBlob, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8"
		}
	})
}
