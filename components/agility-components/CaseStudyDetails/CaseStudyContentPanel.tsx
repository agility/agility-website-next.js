import { AgilityPic, UnloadedModuleProps } from "@agility/nextjs"
import { ContentItem } from "@agility/content-fetch"
import { getContentList } from "lib/cms/getContentList"
import { ICaseStudy } from "lib/types/ICaseStudy"
import { IKeyValuePair } from "lib/types/IKeyValuePair"
import clsx from "clsx"

export const CaseStudyContentPanel = async ({ languageCode, dynamicPageItem, module }: UnloadedModuleProps) => {
	if (!dynamicPageItem) return null

	const caseStudy = dynamicPageItem?.fields as ICaseStudy

	let metrics: ContentItem<IKeyValuePair>[] = []

	// get module fields
	if (caseStudy.metrics) {
		const lstMetrics = await getContentList({
			referenceName: caseStudy.metrics.referencename,
			languageCode
		})

		metrics = lstMetrics.items as ContentItem<IKeyValuePair>[]
	}

	return (
		<div className="">
			<div className="relative flex flex-col lg:flex-row">
				<div className="flex flex-col lg:w-3/5">
					<div className="flex flex-1 justify-end">
						<div
							className={clsx(
								"flex w-full flex-col items-center justify-center text-center pr-8 ml-8",
								"lg:max-w-[calc(80rem*.625)] lg:items-start lg:text-left"
							)}
						>
							<div className="w-80">
								<AgilityPic
									image={caseStudy.customerLogo}
									fallbackWidth={800}
									className="h-full object-contain"
								/>
							</div>
							<h1 className="mt-8 text-balance text-3xl font-medium leading-tight lg:mt-12 lg:text-5xl">
								{caseStudy.title}
							</h1>
							<p className="mt-8 text-lg">{caseStudy.excerpt}</p>
						</div>
					</div>
					{metrics && metrics.length > 0 && (
						<div className="mt-8 flex flex-col justify-center gap-8 bg-highlight-light p-4 pb-12 text-white md:gap-14 md:pb-4 lg:mt-16 lg:h-36 lg:flex-row lg:items-center">
							{metrics.map((metric, index) => (
								<div key={metric.contentID} className="">
									<h3 className="text-lg font-medium md:text-4xl lg:text-2xl">
										{metric.fields.value}
									</h3>
									<p className="">{metric.fields.key}</p>
								</div>
							))}
						</div>
					)}
				</div>
				<div className={clsx("mx-8 lg:mx-0 lg:w-2/5", metrics.length > 0 ? "-mt-5 lg:mt-0" : "mt-8 lg:mt-0")}>
					<AgilityPic
						image={caseStudy.image}
						fallbackWidth={640}
						className="h-full w-full object-cover object-center"
					/>
				</div>
			</div>
		</div>
	)
}
