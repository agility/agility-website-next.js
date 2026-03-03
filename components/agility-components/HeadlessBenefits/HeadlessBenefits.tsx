/* eslint-disable @next/next/no-img-element */
import { AgilityPic, ImageField, UnloadedModuleProps, URLField } from "@agility/nextjs"
import { ContentItem } from "@agility/content-fetch"
import { IconCircleCheck } from "@tabler/icons-react"
import { Container } from "components/micro/Container"
import { LinkButton } from "components/micro/LinkButton"
import { getContentItem } from "lib/cms/getContentItem"
import { getContentList } from "lib/cms/getContentList"

interface IHeadlessBenefit {
	text: string
}

interface IHeadlessBenefits {
	heading: string
	benefits: {
		referencename: string
	}
	ctaButton?: URLField
	image: ImageField
}

export const HeadlessBenefits = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<IHeadlessBenefits>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0,
	})

	const lstBenefits = await getContentList({
		referenceName: fields.benefits.referencename,
		languageCode,
		take: 50,
	})

	const benefits = (lstBenefits?.items || []) as ContentItem<IHeadlessBenefit>[]

	return (
		<Container id={`${contentID}`} data-agility-component={contentID}>
			<div className="mx-auto grid max-w-7xl items-center gap-8 pb-14 lg:grid-cols-2 lg:gap-16">
				{/* Left: Illustration */}
				<div className="flex justify-center">
					{fields.image && (
						<>
							{fields.image.url.endsWith(".svg") ? (
								<img src={fields.image.url} alt={fields.image.label} className="w-full max-w-md" />
							) : (
								<AgilityPic
									image={fields.image}
									className="w-full max-w-md"
									fallbackWidth={500}
									sources={[
										{ media: "(min-width: 1200px)", width: 600 },
										{ media: "(min-width: 768px)", width: 500 },
									]}
								/>
							)}
						</>
					)}
				</div>

				{/* Right: Text + Checklist */}
				<div>
					{fields.heading && (
						<h2 className="text-balance text-3xl font-bold text-primary lg:text-4xl">
							{fields.heading}
						</h2>
					)}
					{benefits.length > 0 && (
						<ul className="mt-8 space-y-5">
							{benefits.map((benefit) => (
								<li key={benefit.contentID} className="flex items-start gap-3">
									<div className="mt-0.5 shrink-0">
										<IconCircleCheck size={24} stroke={2} className="text-highlight-light" />
									</div>
									<span className="text-gray-700">{benefit.fields.text}</span>
								</li>
							))}
						</ul>
					)}
					{fields.ctaButton && fields.ctaButton.href && (
						<div className="mt-8">
							<LinkButton
								type="primary"
								size="md"
								href={fields.ctaButton.href}
								target={fields.ctaButton.target}
							>
								{fields.ctaButton.text}
							</LinkButton>
						</div>
					)}
				</div>
			</div>
		</Container>
	)
}
