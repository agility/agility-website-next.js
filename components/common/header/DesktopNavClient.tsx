"use client"

import { PopoverGroup } from "@headlessui/react"
import { MenuItemOutput } from "./MenuItemOutput"
import { LinkButton } from "components/micro/LinkButton"
import type { MenuLink } from "lib/cms-content/getHeaderContent"
import type { URLField } from "@agility/nextjs"

interface CTALink {
	href: string
	target: string
	text: string
}

interface Props {
	links: MenuLink[]
	contactus?: CTALink | URLField
	primaryButton?: CTALink | URLField
}

export function DesktopNavClient({ links, contactus, primaryButton }: Props) {
	return (
		<PopoverGroup as="nav" className="hidden items-center space-x-3 lg:flex">
			{links.map((link) => (
				<MenuItemOutput key={link.menuItem.contentID} link={link} />
			))}

			<div className="w-1" />

			{contactus && (
				<LinkButton href={contactus.href} target={contactus.target} type="primary">
					{(contactus as CTALink).text}
				</LinkButton>
			)}

			{primaryButton && (
				<LinkButton href={primaryButton.href} target={primaryButton.target} type="secondary">
					{(primaryButton as CTALink).text}
				</LinkButton>
			)}
		</PopoverGroup>
	)
}
