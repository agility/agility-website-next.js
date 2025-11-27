import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react"
import classNames from "classnames"
import { MenuLink } from "lib/cms-content/getHeaderContent"
import Link from "next/link"
import { useRef } from "react"
import { IconChevronDown } from "@tabler/icons-react"
import { AgilityPic } from "@agility/nextjs"

interface Props {
	link: MenuLink
}
export const MenuItemOutput = ({ link }: Props) => {
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
			console.log("showSubmenu")
			refPopoverButton.current?.click()
		}, 50)
	}

	const cancelShowSubmenu = () => {
		console.log("cancelShowSubmenu")
		clearTimeout(refShowSubmenuDelay.current)
		refIsMouseOnPopover.current = false
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
		}, 150)
	}

	if (!link.subMenuList || link.subMenuList.length == 0) {
		return (
			<Link
				href={link.menuItem.fields.uRL.href}
				target={link.menuItem.fields.uRL.target}
				className={classNames(
					"text-secondary-500 rounded-md px-2 text-sm font-medium leading-6",
					"transition-colors hover:text-highlight focus:text-highlight-light focus:outline-none"
					//"ring-highlight transition-all duration-300 focus:text-highlight focus:outline-none focus:ring-2 group-hover:text-highlight"
				)}
			>
				<div>{link.menuItem.fields.title}</div>
			</Link>
		)
	}

	return (
		<Popover className="relative">
			{({ open, close }) => (
				<>
					<PopoverButton
						ref={refPopoverButton}
						as="div"
						className="group flex cursor-pointer"
						onMouseEnter={() => showSubmenu(close)}
						onMouseLeave={() => {
							cancelShowSubmenu()
							checkClosePopover()
						}}
					>
						<Link
							href={link.menuItem.fields.uRL.href}
							target={link.menuItem.fields.uRL.target}
							className={classNames(
								"text-secondary-500 rounded-md px-2 text-sm font-medium leading-6 outline-highlight",
								"transition-colors hover:text-highlight focus:text-highlight-light focus:outline-none",
								open && "text-highlight"
							)}
							onClick={(e) => {
								// Allow the link to work normally
								e.stopPropagation()
								cancelShowSubmenu()
								checkClosePopover()
							}}
						>
							<div>{link.menuItem.fields.title}</div>
						</Link>
					</PopoverButton>
					<PopoverPanel
						transition
						anchor="bottom"
						className={classNames(
							"z-[51] bg-white shadow-lg ring-1 ring-gray-900/5 [--anchor-gap:12px]",
							hasMegaContent ? "w-screen max-w-lg" : "",
							"transition data-[closed]:translate-y-1 data-[closed]:opacity-0",
							"data-[enter]:duration-200 data-[enter]:ease-out",
							"data-[leave]:duration-150 data-[leave]:ease-in"
						)}
						onMouseEnter={() => mouseEnterPopover(close)}
						onMouseLeave={() => mouseLeavePopover()}
					>
						<div className="overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5">
							<div className="flex flex-1 gap-1">
								<div className="relative grid min-w-[260px] gap-5 bg-white px-6 py-7">
									{link.subMenuList?.map((subLink) => (
										<Link
											key={subLink.contentID}
											href={subLink.fields.uRL.href}
											target={subLink.fields.uRL.target}
											className={classNames(
												"text-secondary-500 text-sm font-medium leading-6",
												"transition-all duration-300 hover:text-highlight focus:text-highlight focus:outline-none"
											)}
											onClick={() => close()}
										>
											{subLink.fields.uRL.text || subLink.fields.title}
										</Link>
									))}
								</div>
								{megaContent && megaTitle && (
									<div className="flex-1 bg-gray-100 px-6 py-7">
										<div className="text-sm uppercase text-gray-500">{megaTitle}</div>

										<div className="mt-4 flex flex-col gap-2">
											{megaContent.map((item) => {
												if (!item.fields.uRL || !item.fields.uRL.href) return null

												if (isSpotlight) {
													return (
														<Link
															key={item.contentID}
															href={item.fields.uRL.href}
															target={item.fields.uRL.target}
															className={classNames(
																"text-secondary-500 text-sm font-medium leading-6",
																"transition-all duration-300 hover:text-highlight focus:text-highlight focus:outline-none"
															)}
															onClick={() => close()}
														>
															{item.fields.imageorIcon &&
																(item.fields.imageorIcon.url
																	.toLowerCase()
																	.endsWith(".svg") ? (
																	<img
																		src={item.fields.imageorIcon.url}
																		alt={item.fields.imageorIcon.label}
																		className="mt-2"
																	/>
																) : (
																	<AgilityPic
																		image={item.fields.imageorIcon}
																		fallbackWidth={300}
																		className="mt-2"
																	/>
																))}

															{item.fields.title && (
																<div className="mt-2 leading-5">
																	{item.fields.title}
																</div>
															)}
															{item.fields.description && (
																<div className="mt-2">{item.fields.description}</div>
															)}
														</Link>
													)
												}

												return (
													<Link
														key={item.contentID}
														href={item.fields.uRL.href}
														target={item.fields.uRL.target}
														className={classNames(
															"flex items-center gap-1",
															"text-secondary-500 text-sm font-medium leading-6",
															"transition-all duration-300 hover:text-highlight focus:text-highlight focus:outline-none"
														)}
														onClick={() => close()}
													>
														{item.fields.imageorIcon &&
															(item.fields.imageorIcon.url
																.toLowerCase()
																.endsWith(".svg") ? (
																<img
																	src={item.fields.imageorIcon.url}
																	alt={item.fields.imageorIcon.label}
																	className="mt-2"
																/>
															) : (
																<AgilityPic
																	image={item.fields.imageorIcon}
																	fallbackWidth={300}
																	className="mt-2"
																/>
															))}

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
