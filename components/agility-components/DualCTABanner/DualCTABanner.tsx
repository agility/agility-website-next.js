import { UnloadedModuleProps, URLField } from "@agility/nextjs"
import Link from "next/link"
import { Container } from "components/micro/Container"
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
			<div className="mx-auto max-w-5xl pb-14">
				<div className="relative overflow-hidden rounded-3xl bg-gray-50 p-12 text-center md:p-20">
					{/* Decorative background shapes */}
					<div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gray-100/40 via-transparent to-purple-100/40" />
					<div className="pointer-events-none absolute -bottom-44 -left-36 h-[430px] w-[430px] rounded-full bg-gray-200/50" />
					<div className="pointer-events-none absolute -right-36 -top-44 h-[430px] w-[430px] rounded-full bg-purple-100/50" />
					{fields.heading && (
						<h2 className="relative text-balance text-4xl font-extrabold text-primary md:text-5xl">
							{fields.heading}
						</h2>
					)}
					{fields.description && (
						<p className="relative mx-auto mt-4 max-w-2xl text-balance text-lg text-gray-600">
							{fields.description}
						</p>
					)}
					{(fields.primaryCTA || fields.secondaryCTA) && (
						<div className="relative mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
							{fields.primaryCTA && fields.primaryCTA.href && (
								<Link
									href={fields.primaryCTA.href}
									target={fields.primaryCTA.target}
									className="inline-flex h-12 items-center justify-center rounded-full bg-secondary px-8 text-lg font-medium text-gray-900 transition-all duration-200 hover:scale-105 hover:bg-secondary/90"
								>
									{fields.primaryCTA.text}
								</Link>
							)}
							{fields.secondaryCTA && fields.secondaryCTA.href && (
								<Link
									href={fields.secondaryCTA.href}
									target={fields.secondaryCTA.target}
									className="inline-flex h-12 items-center justify-center rounded-full border border-gray-800 bg-white px-8 text-lg font-medium text-gray-900 transition-all duration-200 hover:scale-105 hover:bg-gray-50"
								>
									{fields.secondaryCTA.text}
								</Link>
							)}
						</div>
					)}
				</div>
			</div>
		</Container>
	)
}
