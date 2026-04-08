import { AgilityPic } from "@agility/nextjs"
import { ICaseStudyCTA } from "lib/cms-content/getCaseStudyCTAs"
import Link from "next/link"

interface Props {
	item: ICaseStudyCTA
}

export const CaseStudyCTAItem = ({ item }: Props) => {
	const { heading1, heading2, backgroundImage, cTALink } = item.fields

	return (
		<Link
			className="group col-span-1 mb-8 flex flex-col border-2 transition-all hover:shadow-lg md:mb-0"
			href={cTALink.href}
		>
			<div className="relative flex h-full min-h-[400px] w-full flex-col items-center justify-center overflow-clip">
				{backgroundImage?.url ? (
					<>
						<AgilityPic
							image={backgroundImage}
							className="absolute inset-0 h-full w-full object-cover object-center transition-transform group-hover:scale-110"
							fallbackWidth={480}
							sources={[
								{ media: "(min-width: 1280px)", width: 480 },
								{ media: "(min-width: 640px)", width: 640 },
								{ media: "(max-width: 639px)", width: 640 }
							]}
						/>
						<div className="absolute inset-0 bg-gray-900/40" />
					</>
				) : (
					<div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-600 to-yellow-600" />
				)}

				<div className="relative z-10 flex flex-col items-center p-8 text-center">
					<h2 className="text-3xl font-bold leading-snug text-white">{heading1}</h2>
					<p className="text-3xl font-bold leading-snug text-amber-400">{heading2}</p>

					<span className="mt-4 inline-block rounded-full bg-amber-400 px-8 py-3 text-lg font-semibold text-gray-900 transition-transform group-hover:scale-105">
						{cTALink.text}
					</span>
				</div>
			</div>
		</Link>
	)
}
