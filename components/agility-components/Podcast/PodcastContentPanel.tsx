import { AgilityPic, ImageField, UnloadedModuleProps, URLField } from "@agility/nextjs"
import clsx from "clsx"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"

interface IPodcastContentPanel {
	title: string
	textblob: string
	primaryButton?: URLField
	image?: ImageField
	imagePosition: "left" | "right"
	podcastEmbedCode?: string
}

export const PodcastContentPanel = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<IPodcastContentPanel>({
		contentID: module.contentid,
		languageCode
	})

	return (
        <Container data-agility-component={contentID}>
            <div className="mx-auto max-w-7xl">
				<div
					className={clsx(
						"flex flex-col items-center gap-8 lg:flex-row lg:items-start",
						fields.imagePosition === "right" ? "lg:flex-row-reverse" : ""
					)}
				>
					<div>
						{fields.image && <AgilityPic
                            image={fields.image}
                            fallbackWidth={640}
                            className=""
                            data-agility-field="image" />}
						{fields.podcastEmbedCode && (
							<div
                                dangerouslySetInnerHTML={{ __html: fields.podcastEmbedCode }}
                                data-agility-field="podcastEmbedCode"></div>
						)}
					</div>
					<div>
						<h1 className="text-balance text-4xl font-medium" data-agility-field="title">{fields.title}</h1>
						<div
                            className="prose mt-5"
                            dangerouslySetInnerHTML={renderHTMLCustom(fields.textblob)}
                            data-agility-field="textblob"
                            data-agility-html />
					</div>
				</div>
			</div>
        </Container>
    );
}
