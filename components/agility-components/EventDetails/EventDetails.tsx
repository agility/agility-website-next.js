import { AgilityPic, UnloadedModuleProps } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { ContentItem } from "@agility/content-fetch"
import { IEvent } from "lib/types/IEvent"
import { ThreeDashLine } from "components/micro/ThreeDashLine"
import { DateTime } from "luxon"
import { IconCalendarCheck, IconClock, IconPresentation } from "@tabler/icons-react"
import { LinkButton } from "components/micro/LinkButton"
import Link from "next/link"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"


export const EventDetails = async ({ module, languageCode, dynamicPageItem }: UnloadedModuleProps) => {
	if (!dynamicPageItem) return null
	const { fields } = dynamicPageItem as ContentItem<IEvent>
	const event = fields
	const date = new Date(event.date)

	const dt = DateTime.fromJSDate(date, { zone: "est" })
	const dateStr = dt.toFormat("LLL dd, yyyy")
	const timeStr = dt.toFormat("t")

	return (
		<Container
			id={`agility-component-${module.contentid}`}
			data-agility-component={module.contentid}
			className="mx-auto max-w-7xl"
		>
			<h1 className="text-balance text-center text-5xl font-medium">{event.title}</h1>
			<ThreeDashLine />
			<time dateTime={dt.toISO()} className="mt-8 flex justify-center gap-3">
				<div className="flex items-center gap-1">
					<IconPresentation size={24} className="text-slate-500" />
					<div className="font-medium">{event.eventType.fields.title}</div>
				</div>
				<div className="flex items-center gap-1">
					<IconCalendarCheck size={24} className="text-slate-500" />
					<div className="font-medium">{dateStr}</div>
				</div>
				<div className="flex items-center gap-1">
					<IconClock size={24} className="text-slate-500" />
					<div className="font-medium">{timeStr}</div>
				</div>
			</time>

			{event.mainImage && (
				<>
					<div className="mx-auto mb-8 mt-8 max-w-4xl">
						{event.externalLink ? (
							<Link href={event.externalLink?.href} target={event.externalLink.target}>
								<AgilityPic
									image={event.mainImage}
									fallbackWidth={480}
									className="w-full"
									sources={[
										//screen at least than 640, it's 1/2 of the screen, so the same size as the prev breakpoint
										{ media: "(min-width: 768px)", width: 1200 }
									]}
								/>
							</Link>
						) : (
							<AgilityPic
								image={event.mainImage}
								fallbackWidth={480}
								className="w-full"
								sources={[
									//screen at least than 640, it's 1/2 of the screen, so the same size as the prev breakpoint
									{ media: "(min-width: 768px)", width: 1200 }
								]}
							/>
						)}
					</div>
					<ThreeDashLine />
				</>
			)}

			<div className="prose mx-auto mt-8" dangerouslySetInnerHTML={renderHTMLCustom(event.textblob)}></div>
			{event.externalLink && (
				<div className="mt-8 flex justify-center">
					<LinkButton
						type="secondary"
						size="md"
						href={event.externalLink?.href}
						target={event.externalLink.target}
					>
						{event.externalLink.text}
					</LinkButton>
				</div>
			)}

			{event.noLinkText && <div className="mt-8 flex justify-center text-lg font-medium">{event.noLinkText}</div>}
		</Container>
	)
}
