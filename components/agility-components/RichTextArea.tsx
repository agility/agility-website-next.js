import clsx from "clsx"
import { UnloadedModuleProps } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"

interface RichText {
	textblob: string
	lessVerticalWhitespace: boolean
}

const RichTextArea = async ({ module, languageCode }: UnloadedModuleProps) => {
	const {
		fields: { textblob, lessVerticalWhitespace },
		contentID
	} = await getContentItem<RichText>({
		contentID: module.contentid,
		languageCode
	})

	if (!textblob) return null

	return (
		<Container id={`${contentID}`} data-agility-component={contentID}>
			<div
				className={clsx(
					"mx-auto max-w-5xl pb-12",
					lessVerticalWhitespace ? "" : ""
				)}
			>
				<div
					data-agility-field="textblob"
					data-agility-html
					className="prose prose-sm my-6 !max-w-none sm:prose lg:prose-lg xl:prose-xl"
					dangerouslySetInnerHTML={renderHTMLCustom(textblob)}
				></div>
			</div>
		</Container>
	)
}

export default RichTextArea
