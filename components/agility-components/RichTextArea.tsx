import { UnloadedModuleProps } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"

interface RichText {
	textblob: string
}

const RichTextArea = async ({ module, languageCode }: UnloadedModuleProps) => {
	const {
		fields: { textblob },
		contentID
	} = await getContentItem<RichText>({
		contentID: module.contentid,
		languageCode
	})

	if (!textblob) return null

	return (
		<Container id={`${contentID}`} data-agility-component={contentID}>
			<div className="md:mt-18 mx-auto my-12 max-w-5xl lg:mt-20">
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
