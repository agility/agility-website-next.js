import { AgilityPic } from "@agility/nextjs"
import { IconCalendar, IconCalendarCheck, IconClock, IconDeviceWatch } from "@tabler/icons-react"
import { LinkButton } from "components/micro/LinkButton"
import { IEventMin } from "lib/cms-content/getEventListing"
import { DateTime } from "luxon"
import Link from "next/link"

interface Props {
	event: IEventMin
}

export const EventCard = ({ event }: Props) => {
	const date = new Date(event.fields.date)
	const dt = DateTime.fromJSDate(date)
	const dateStr = dt.toFormat("LLL dd, yyyy")
	const timeStr = dt.toFormat("t")

	const isPast = dt < DateTime.now()
	const url = `/resources/events/${event.fields.uRL}`
	return (
		<div className="mt-10 flex gap-5 lg:flex-row">
			<Link href={url} className="w-1/2">
				{event.fields.mainImage && (
					<AgilityPic image={event.fields.mainImage} className="w-full rounded-lg object-contain" />
				)}
			</Link>
			<div className="flex w-1/2 flex-col gap-3">
				<h3 className="text-3xl font-medium">{event.fields.title}</h3>
				<time dateTime={dt.toISO()} className="flex gap-3">
					<div className="flex items-center gap-1">
						<IconCalendarCheck size={24} className="text-slate-500" />
						<div className="font-medium">{dateStr}</div>
					</div>
					<div className="flex items-center gap-1">
						<IconClock size={24} className="text-slate-500" />
						<div className="font-medium">{timeStr}</div>
					</div>
				</time>
				<p className="text-base text-slate-500">{event.fields.description}</p>
				<div>
					<LinkButton type="primary" href={url} className="mt-5">
						{isPast ? "View Event" : "Register Now"}
					</LinkButton>
				</div>
			</div>
		</div>
	)
}
