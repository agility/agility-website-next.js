import {Popover, PopoverButton, PopoverPanel} from "@headlessui/react"
import classNames from "classnames"
import {MenuLink} from "lib/cms-content/getHeaderContent"
import Link from "next/link"
import {useEffect, useId, useLayoutEffect, useRef, useState} from "react"

import {IconChevronDown} from "@tabler/icons-react"
import {getContentList} from "lib/cms/getContentList"
import {useAgilityContext} from "lib/cms/useAgilityContext"
import {AgilityPic} from "@agility/nextjs"

interface Props {
	link: MenuLink
}
export const MenuItemOutput = ({link}: Props) => {
	const refPopoverButton = useRef<any>()
	const refCheckCloseTimeout = useRef<any>()
	const refShowSubmenuDelay = useRef<any>()
	const refIsMouseOnPopover = useRef(false)
	const refIsMouseOnPopoverPanel = useRef(false)
	const refCloseMethod = useRef<any>()

	const megaContent = link.megaMenuList
	const megaTitle = link.menuItem.fields.megaTitle
	const linkOrSpotlight = link.menuItem.fields.linkorSpotlight
	const isSpotlight = linkOrSpotlight === "Spotlight"

	const hasMegaContent = !!(megaTitle && megaContent && megaContent.length > 0)

	/**
	 * Show the sub menu after a delay and set the over state for the popover
	 * @param closeMethod
	 */
	const showSubmenu = (closeMethod: () => void) => {
		refCloseMethod.current = closeMethod
		refIsMouseOnPopover.current = true
		cancelShowSubmenu()
		refShowSubmenuDelay.current = setTimeout(() => {
			refPopoverButton.current?.click()
		}, 300)
	}

	const cancelShowSubmenu = () => {
		clearTimeout(refShowSubmenuDelay.current)
		refIsMouseOnPopover.current = false
		checkClosePopover()
	}

	const mouseEnterPopover = (closeMethod: () => void) => {
		refIsMouseOnPopoverPanel.current = true
		refCloseMethod.current = closeMethod
	}

	const mouseLeavePopover = () => {
		refIsMouseOnPopoverPanel.current = false

		checkClosePopover()
	}

	/**
	 * Decide if we should close the popover based on the hover states
	 */
	const checkClosePopover = () => {
		clearTimeout(refCheckCloseTimeout.current)

		refCheckCloseTimeout.current = setTimeout(() => {
			if (!refIsMouseOnPopoverPanel.current && !refIsMouseOnPopover.current) {
				if (refCloseMethod.current) {
					refCloseMethod.current()
				}
			}
		}, 300)
	}

	if (!link.subMenuList || link.subMenuList.length == 0) {
		return (
			<Link
				href={link.menuItem.fields.uRL.href}
				target={link.menuItem.fields.uRL.target}
				className={classNames(
					"text-sm leading-6 font-medium text-secondary-500",
					"hover:text-highlight focus:outline-none focus:text-highlight transition-all duration-300"
				)}
			>
				<div>{link.menuItem.fields.title}</div>
			</Link>
		)
	}

	return (
		<Popover className="relative ">
			{({open, close}) => (
				<>
					<div
						className="flex gap-1 group"
						onMouseEnter={() => showSubmenu(close)}
						onMouseLeave={() => cancelShowSubmenu()}
					>
						<Link
							href={link.menuItem.fields.uRL.href}
							target={link.menuItem.fields.uRL.target}
							className={classNames(
								"text-sm leading-6 font-medium text-secondary-500",
								"group-hover:text-highlight focus:outline-none focus:text-highlight transition-all duration-300"
							)}
						>
							<div>{link.menuItem.fields.title}</div>
						</Link>
						<PopoverButton
							ref={refPopoverButton}
							className={classNames(
								"text-sm leading-6 font-medium text-secondary-500 rounded-full ",
								"group-hover:text-highlight focus:outline-none transition-all"
							)}
						>
							<IconChevronDown
								strokeWidth={2}
								className={classNames("transition-all h-4 w-4 ", open ? "rotate-180" : "rotate-0")}
							/>
						</PopoverButton>
					</div>
					<PopoverPanel
						transition
						anchor="bottom start"
						className={classNames(
							"absolute -ml-36 z-10 mt-3  bg-white shadow-lg ring-1 ring-gray-900/5",
							hasMegaContent ? "w-screen max-w-lg" : "",
							"transition data-[closed]:translate-y-1 data-[closed]:opacity-0",
							"data-[enter]:duration-200 data-[enter]:ease-out",
							"data-[leave]:duration-150 data-[leave]:ease-in"
						)}
						onMouseEnter={() => mouseEnterPopover(close)}
						onMouseLeave={() => mouseLeavePopover()}
					>
						<div className="shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
							<div className="flex flex-1 gap-1">
								<div className="relative grid gap-5 bg-white px-6 py-7 min-w-[260px]">
									{link.subMenuList?.map((subLink) => (
										<Link
											key={subLink.contentID}
											href={subLink.fields.uRL.href}
											target={subLink.fields.uRL.target}
											className={classNames(
												"text-sm leading-6 font-medium text-secondary-500",
												"hover:text-highlight focus:outline-none focus:text-highlight transition-all duration-300"
											)}
											onClick={() => close()}
										>
											{subLink.fields.uRL.text || subLink.fields.title}
										</Link>
									))}
								</div>
								{megaContent && megaTitle && (
									<div className="flex-1 bg-gray-100 px-6 py-7">
										<div className="text-sm text-gray-500 uppercase">{megaTitle}</div>

										<div className="flex flex-col gap-2 mt-4">
											{megaContent.map((item) => {
												if (!item.fields.uRL || !item.fields.uRL.href) return null

												if (isSpotlight) {
													return (
														<Link
															key={item.contentID}
															href={item.fields.uRL.href}
															target={item.fields.uRL.target}
															className={classNames(
																"text-sm leading-6 font-medium text-secondary-500",
																"hover:text-highlight focus:outline-none focus:text-highlight transition-all duration-300"
															)}
															onClick={() => close()}
														>
															{item.fields.imageorIcon && (
																<AgilityPic image={item.fields.imageorIcon} fallbackWidth={300} className="mt-2" />
															)}

															{item.fields.title && <div className="leading-5 mt-2">{item.fields.title}</div>}
															{item.fields.description && <div className="mt-2">{item.fields.description}</div>}
														</Link>
													)
												}

												return (
													<Link
														key={item.contentID}
														href={item.fields.uRL.href}
														target={item.fields.uRL.target}
														className={classNames(
															"flex gap-1 items-center",
															" text-sm leading-6 font-medium text-secondary-500",
															"hover:text-highlight focus:outline-none focus:text-highlight transition-all duration-300"
														)}
														onClick={() => close()}
													>
														{item.fields.imageorIcon && (
															// eslint-disable-next-line @next/next/no-img-element
															<img
																src={item.fields.imageorIcon.url}
																alt={item.fields.imageorIcon.label}
																loading="lazy"
															/>
														)}

														{item.fields.title}
													</Link>
												)
											})}
										</div>
									</div>
								)}
							</div>
						</div>
					</PopoverPanel>
				</>
			)}
		</Popover>
	)
}
