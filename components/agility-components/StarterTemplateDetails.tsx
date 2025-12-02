/* eslint-disable @next/next/no-img-element */
import { AgilityPic, UnloadedModuleProps } from "@agility/nextjs"
import clsx from "clsx"
import { Container } from "components/micro/Container"
import { LinkButton } from "components/micro/LinkButton"
import { IStarterTemplate } from "lib/types/IStarterTemplate"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"

export const StarterTemplateDetails = async ({ module, languageCode, dynamicPageItem }: UnloadedModuleProps) => {
	if (!dynamicPageItem) return null

	const { fields } = dynamicPageItem
	const starter = fields as IStarterTemplate

	const framework = starter.frameworks && starter.frameworks.length > 0 ? starter.frameworks[0] : null
	const frameWorkSvgUrl = framework && framework.fields.logo.url.endsWith(".svg") ? framework.fields.logo.url : null

	return (
		<Container>
			<div className="mx-auto max-w-7xl pb-14">
				<div className="gap-5 lg:flex lg:flex-row">
					<div className="flex-1">
						<h1 className="text-balance text-5xl font-medium dark:text-white">{starter.name}</h1>
						<div className="prose mt-5 dark:prose-invert" dangerouslySetInnerHTML={renderHTMLCustom(starter.details)}></div>
						<div className="mt-10">
							<AgilityPic
								image={starter.image}
								className="w-full"
								fallbackWidth={480}
								sources={[
									//screen at least than 640, it's 1/2 of the screen, so the same size as the prev breakpoint
									{ media: "(min-width: 768px)", width: 1200 }
								]}
							/>
						</div>
					</div>
					<div className="mx-auto mt-5 w-full lg:mt-0 lg:w-80">
						{framework && (
							<div className="x-2 relative mx-auto w-64 rounded border border-background/60 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow">
								{frameWorkSvgUrl ? (
									<img src={frameWorkSvgUrl} alt={framework.fields.logo.label} className="w-full" />
								) : (
									<AgilityPic image={framework.fields.logo} fallbackWidth={400} className="w-full" />
								)}
							</div>
						)}
						<div
							className={clsx(
								"space-y-5 border-b-2 border-b-highlight-light dark:border-b-secondary bg-background dark:bg-gray-800 p-8",
								framework ? "-mt-20 pt-36" : ""
							)}
						>
							<div className="font-bold dark:text-white">{starter.name}</div>
							<div className="text-slate-500 dark:text-gray-300">{starter.description}</div>
							<div>
								<LinkButton type="primary" size="md" href={starter.startfreeproject.href} target="_blank">
									{starter.startfreeproject.text}
								</LinkButton>
							</div>
						</div>

						<div className="p-6">
							{starter.previewURL && (
								<>
									<div className="mt-5 font-bold dark:text-white">Live Preview</div>
									<div>
										<a
											href={starter.previewURL}
											target="_blank"
											className="text-highlight-light dark:text-secondary"
											rel="noreferrer"
										>
											{starter.previewURL}
										</a>
									</div>
								</>
							)}

							{starter.githubLink && (
								<>
									<div className="mt-5 font-bold dark:text-white">Github Repo</div>
									<div>
										<a
											href={starter.githubLink}
											target="_blank"
											className="text-highlight-light dark:text-secondary"
											rel="noreferrer"
										>
											{starter.githubLink}
										</a>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</Container>
	)
}
