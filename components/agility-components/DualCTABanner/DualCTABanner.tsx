import { UnloadedModuleProps, URLField } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { LinkButton } from "components/micro/LinkButton"
import { getContentItem } from "lib/cms/getContentItem"

interface IDualCTABanner {
	heading: string
	description?: string
	primaryCTA?: URLField
	secondaryCTA?: URLField
}

export const DualCTABanner = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<IDualCTABanner>({
		contentID: module.contentid,
		languageCode,
	})

	return (
		<Container id={`${contentID}`} data-agility-component={contentID}>
			<div className="mx-auto max-w-5xl">
				<div className="rounded-3xl border border-gray-200 bg-gray-50 p-12 text-center md:p-20">
					{fields.heading && (
						<h2 className="text-balance text-4xl font-bold text-primary md:text-5xl">
							{fields.heading}
						</h2>
					)}
					{fields.description && (
						<p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-gray-600">
							{fields.description}
						</p>
					)}
					{(fields.primaryCTA || fields.secondaryCTA) && (
						<div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
							{fields.primaryCTA && fields.primaryCTA.href && (
								<LinkButton
									type="primary"
									size="lg"
									href={fields.primaryCTA.href}
									target={fields.primaryCTA.target}
									className="rounded-full"
								>
									{fields.primaryCTA.text}
								</LinkButton>
							)}
							{fields.secondaryCTA && fields.secondaryCTA.href && (
								<LinkButton
									type="secondary"
									size="lg"
									href={fields.secondaryCTA.href}
									target={fields.secondaryCTA.target}
									className="rounded-full"
								>
									{fields.secondaryCTA.text}
								</LinkButton>
							)}
						</div>
					)}
				</div>
			</div>
		</Container>
	)
}
