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
		<div className="px-8 lg:px-0">
			<div className="flex flex-col lg:flex-row">
				<div className="lg:w-3/5">
					<div className="flex flex-col items-center text-center md:pl-16 md:pr-16 lg:items-start lg:pl-20 lg:text-left">
						<div className="w-80">
							<AgilityPic
								image={caseStudy.customerLogo}
								fallbackWidth={800}
								className="h-full object-contain"
							/>
						</div>
						<h1 className="mt-8 text-5xl font-medium leading-tight lg:mt-12">{caseStudy.title}</h1>
						<p className="mt-8 text-lg">{caseStudy.excerpt}</p>
					</div>
					{metrics && metrics.length > 0 && (
						<div className="mt-16 flex h-36 items-center justify-center gap-8 bg-highlight-light text-white md:gap-14">
							{metrics.map((metric, index) => (
								<div key={metric.contentID}>
									<h3 className="text-2xl font-medium md:text-4xl">{metric.fields.value}</h3>
									<p className="md:text-lg">{metric.fields.key}</p>
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
