import { renderHTML, Module, UnloadedModuleProps } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"

interface RichText {
	textblob: string
}

const SubscribedThankYou = async ({ module, languageCode, globalData }: UnloadedModuleProps) => {
	//only show this component if the user has just subscribed
	const searchParams: URLSearchParams | undefined = globalData?.searchParams
	if (searchParams?.get("subscribed") !== "true") return null

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
					className="prose prose-sm my-6 max-w-full sm:prose lg:prose-lg xl:prose-xl"
					dangerouslySetInnerHTML={renderHTML(textblob)}
				></div>
			</div>
		</Container>
	)
}

export default SubscribedThankYou
