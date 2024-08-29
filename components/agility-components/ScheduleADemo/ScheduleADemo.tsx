import { renderHTML, UnloadedModuleProps } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import Script from "next/script"
import { ScheduleADemoClient } from "./ScheduleADemo.client"

interface IScheduleADemo {
	schedulerIFrameURL: string
	leftPanelContent: string
}

export const ScheduleADemo = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<IScheduleADemo>({
		contentID: module.contentid,
		languageCode
	})

	return (
		<div
			id="scheduler-page"
			className="bg-background/40"
			style={{
				backgroundImage: "url(/images/icon-agility.svg)",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "left bottom"
			}}
		>
			<Container className="mx-auto my-12 flex max-w-7xl">
				<div className="my-8 flex w-full flex-col gap-5 lg:flex-row">
					<div className="lg:w-2/5">
						<div
							className="prose lg:prose-lg"
							dangerouslySetInnerHTML={renderHTML(fields.leftPanelContent)}
						></div>
					</div>
					<div className="lg:w-3/5">
						<ScheduleADemoClient schedulerIFrameURL={fields.schedulerIFrameURL} />
					</div>
				</div>
			</Container>
		</div>
	)
}
