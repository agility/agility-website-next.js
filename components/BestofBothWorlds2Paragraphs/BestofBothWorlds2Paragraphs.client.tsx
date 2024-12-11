/* eslint-disable @next/next/no-img-element */

import { LinkButton } from "components/micro/LinkButton"
import { IBestofBothWorlds2Paragraphs } from "./BestofBothWorlds2Paragraphs"

export const BestofBothWorlds2ParagraphsClient = async (fields: IBestofBothWorlds2Paragraphs) => {
	const { developerContent, developerHeading, marketerContent, marketerHeading, developerCTA, marketerCTA } = fields

	return (
		<>
			<div className="flex w-full flex-col gap-10 lg:flex-row">
				<div className="lg:w-1/2">
					<img
						className="mx-auto max-w-[500px]"
						src="https://static.agilitycms.com/layout/static/image-author-2.png?format=auto"
						alt="Marketer"
					/>

					<h2 className="mb-4 text-balance text-center text-3xl font-bold text-highlight-light">
						{marketerHeading}
					</h2>
					<div className="prose mx-auto" dangerouslySetInnerHTML={{ __html: marketerContent }} />
					{marketerCTA && marketerCTA.href && marketerCTA.text && (
						<LinkButton type="alternate" href={marketerCTA.href} target={marketerCTA.target} size="md">
							{marketerCTA.text}
						</LinkButton>
					)}
				</div>
				<div className="lg:w-1/2">
					<img
						className="mx-auto max-w-[500px]"
						src="https://static.agilitycms.com/layout/static/image-dev-2.png?format=auto"
						alt="Developer"
					/>
					<h2 className="mb-4 text-balance text-center text-3xl font-bold text-highlight-light">
						{developerHeading}
					</h2>
					<div className="prose mx-auto" dangerouslySetInnerHTML={{ __html: developerContent }} />
					{developerCTA && developerCTA.href && developerCTA.text && (
						<LinkButton type="alternate" href={developerCTA.href} target={developerCTA.target} size="md">
							{developerCTA.text}
						</LinkButton>
					)}
				</div>
			</div>
		</>
	)
}
