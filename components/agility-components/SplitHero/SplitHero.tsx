import { AgilityPic, ImageField, UnloadedModuleProps, URLField } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { LinkButton } from "components/micro/LinkButton"
import { getContentItem } from "lib/cms/getContentItem"
import { CyclingHeading } from "./SplitHero.client"

interface ISplitHero {
	highlightedHeading?: string
	highlightedHeading2?: string
	highlightedHeading3?: string
	highlightedHeading4?: string
	heading: string
	description?: string
	primaryCTA?: URLField
	secondaryCTA?: URLField
	image: ImageField
}

export const SplitHero = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<ISplitHero>({
		contentID: module.contentid,
		languageCode,
	})

	// Build cycling words from up to 4 highlighted heading fields
	const cyclingWords = [
		fields.highlightedHeading,
		fields.highlightedHeading2,
		fields.highlightedHeading3,
		fields.highlightedHeading4,
	].filter((w): w is string => !!w && w.trim().length > 0)

	return (
		<Container id={`${contentID}`} data-agility-component={contentID} className="relative overflow-hidden">
			{/* Subtle purple gradient wash */}
			<div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-purple-50/50" />
			<div className="relative mx-auto flex max-w-7xl flex-col items-center gap-16 pb-14 lg:flex-row">
				{/* Left: Text Content */}
				<div className="space-y-8 lg:w-1/2">
					{cyclingWords.length > 0 && fields.heading ? (
						<CyclingHeading words={cyclingWords} heading={fields.heading} />
					) : (
						fields.heading && (
							<h1 className="text-balance text-5xl font-extrabold leading-tight tracking-tight text-primary lg:text-7xl">
								{fields.heading}
							</h1>
						)
					)}
					{fields.description && (
						<p className="text-lg text-gray-600 lg:text-xl">{fields.description}</p>
					)}
					{(fields.primaryCTA || fields.secondaryCTA) && (
						<div className="flex flex-col gap-4 sm:flex-row">
							{fields.primaryCTA && fields.primaryCTA.href && (
								<LinkButton
									type="primary"
									size="lg"
									href={fields.primaryCTA.href}
									target={fields.primaryCTA.target}
									className="rounded-full shadow-xl"
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

				{/* Right: Image */}
				{fields.image && (
					<div className="lg:w-1/2">
						<AgilityPic
							image={fields.image}
							className="w-full"
							fallbackWidth={600}
							priority
							sources={[
								{ media: "(min-width: 1200px)", width: 700 },
								{ media: "(min-width: 768px)", width: 600 },
								{ media: "(min-width: 640px)", width: 500 },
							]}
						/>
					</div>
				)}
			</div>
		</Container>
	)
}
