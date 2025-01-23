/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useLayoutEffect, useState } from "react"
import Link from "next/link"
import classNames from "classnames"

import { HeaderContent } from "lib/cms-content/getHeaderContent"
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	PopoverGroup
} from "@headlessui/react"
import { MenuItemOutput } from "./MenuItemOutput"
import { LinkButton } from "components/micro/LinkButton"
import { IconChevronDown, IconX } from "@tabler/icons-react"
import { renderHTML } from "@agility/nextjs"
import { MobileSearch, Search } from "components/search/Search"

interface Props {
	headerContent: HeaderContent
}

const SiteHeader = ({ headerContent: { header, links } }: Props) => {
	// open / close mobile nav
	const [open, setOpen] = useState(false)

	const [isScrolled, setIsScrolled] = useState(false)

	/**
	 * Keep track of whether the user has scrolled so we can show a shadow on the header
	 */
	useLayoutEffect(() => {
		const scrollHandler = (e: Event) => {
			if (window.scrollY > 0) {
				setIsScrolled(true)
			} else {
				setIsScrolled(false)
			}
		}
		window.addEventListener("scroll", scrollHandler)

		return () => {
			window.removeEventListener("scroll", scrollHandler)
		}
	}, [])

	if (!header) {
		return (
			<header className="relative p-8 text-center">
				<p className="font-bold text-gray-400">No Header Available</p>
			</header>
		)
	}

	return (
		<>
			{/* MARKETING MESSAGE */}
			{header.fields.hideMarketingBanner !== "true" && header.fields.marketingBanner && (
				<div className="marketing-banner hidden bg-highlight text-white lg:block">
					<div
						className="mx-auto max-w-7xl p-3 px-8 text-sm"
						dangerouslySetInnerHTML={renderHTML(header.fields.marketingBanner)}
					></div>
				</div>
			)}
			<header
				className={classNames(
					"sticky top-0 z-50 mx-auto w-full bg-white transition-shadow",
					isScrolled ? "shadow-b" : "shadow-none"
				)}
			>
				<div className="mx-auto max-w-7xl px-8">
					{/* DESKTOP NAV */}
					<div className="flex w-full items-center justify-between py-6 lg:justify-start lg:space-x-10">
						<div className="lg:w-0 lg:flex-1">
							<Link href="/" className="flex items-center">
								<img
									className="h-9 w-auto"
									src={header.fields.stickyLogo.url}
									alt={header.fields.stickyLogo.label}
									width={header.fields.stickyLogo.height}
									height={header.fields.stickyLogo.width}
								/>
							</Link>
						</div>
						<div className="-my-2 -mr-2 flex items-center gap-1 lg:hidden">
							<MobileSearch />
							{
								/* Contact Us */
								header.fields.contactus && (
									<LinkButton
										href={header.fields.contactus.href}
										target={header.fields.contactus.target}
										type="primary"
										className="hidden sm:flex"
									>
										{header.fields.contactus.text}
									</LinkButton>
								)
							}
							<button
								onClick={() => setOpen(!open)}
								aria-label="Toggle Menu"
								type="button"
								className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
							>
								{/* <!-- Heroicon name: menu --> */}
								<svg
									className="h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							</button>
						</div>
						<PopoverGroup as="nav" className="hidden items-center space-x-1 lg:flex">
							{links.map((link, index) => {
								return <MenuItemOutput key={link.menuItem.contentID} link={link} />
							})}

							<div className="w-4"></div>
							<Search />
							<div className="w-1"></div>
							{
								/* Contact Us */
								header.fields.contactus && (
									<LinkButton
										href={header.fields.contactus.href}
										target={header.fields.contactus.target}
										type="primary"
									>
										{header.fields.contactus.text}
									</LinkButton>
								)
							}

							{
								/* Sign In */
								header.fields.primaryButton && (
									<LinkButton
										href={header.fields.primaryButton.href}
										target={header.fields.primaryButton.target}
										type="secondary"
									>
										{header.fields.primaryButton.text}
									</LinkButton>
								)
							}
						</PopoverGroup>
					</div>
				</div>

				{/* MOBILE NAV */}
				<Dialog
					open={open}
					onClose={setOpen}
					transition
					className={classNames("lg:hidden", "transition duration-300 ease-out data-[closed]:opacity-0")}
				>
					<DialogBackdrop
						transition
						className="fixed inset-0 bg-black/30 duration-300 ease-out data-[closed]:opacity-0"
					/>
					<div className="fixed inset-0 z-[51]" />
					<DialogPanel
						className={classNames(
							"fixed inset-y-0 right-0 z-[52] w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
						)}
					>
						<div className="flex items-center justify-between">
							<a href="#" className="-m-1.5 p-1.5">
								<span className="sr-only">Agility CMS</span>
								<img alt="" src={header.fields.mobileLogo.url} className="h-8 w-auto" />
							</a>
							<button
								type="button"
								onClick={() => setOpen(false)}
								className="-m-2.5 rounded-md p-2.5 text-gray-700"
							>
								<span className="sr-only">Close menu</span>
								<IconX aria-hidden="true" className="h-6 w-6" />
							</button>
						</div>
						<div className="mt-6 flow-root">
							<div className="-my-6 divide-y divide-gray-500/10">
								<div className="space-y-2 py-6">
									{links.map((link, index) => {
										if (link.subMenuList && link.subMenuList.length > 0) {
											//has sub menu
											return (
												<Disclosure as="div" key={`mobile-${index}`} className="-mx-3">
													<DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
														<Link
															onClick={() => setOpen(false)}
															href={link.menuItem.fields.uRL.href}
															target={link.menuItem.fields.uRL.target}
															key={`mobile-${index}`}
															className="transition-colors hover:text-highlight"
														>
															{link.menuItem.fields.title}
														</Link>
														<IconChevronDown
															aria-hidden="true"
															className="h-5 w-5 flex-none group-data-[open]:rotate-180"
														/>
													</DisclosureButton>
													<DisclosurePanel className="mt-2 space-y-2">
														{link.subMenuList.map((subLink, subIndex) => (
															<DisclosureButton
																key={subLink.fields.title}
																as="a"
																href={subLink.fields.uRL.href}
																onClick={() => setOpen(false)}
																className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-primary transition-all hover:bg-gray-50 hover:text-highlight"
															>
																{subLink.fields.title}
															</DisclosureButton>
														))}
													</DisclosurePanel>
												</Disclosure>
											)
										} else {
											//no sub menu
											return (
												<Link
													href={link.menuItem.fields.uRL.href}
													target={link.menuItem.fields.uRL.target}
													key={`mobile-${index}`}
													className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
													onClick={() => setOpen(false)}
												>
													{link.menuItem.fields.title}
												</Link>
											)
										}
									})}
								</div>
								<div className="flex flex-col gap-2 py-6">
									{
										/* Contact Us */
										header.fields.contactus && (
											<LinkButton
												href={header.fields.contactus.href}
												target={header.fields.contactus.target}
												type="primary"
												className="block"
												onClick={() => setOpen(false)}
											>
												{header.fields.contactus.text}
											</LinkButton>
										)
									}
									{
										/* Sign In */
										header.fields.primaryButton && (
											<LinkButton
												href={header.fields.primaryButton.href}
												target={header.fields.primaryButton.target}
												type="secondary"
												onClick={() => setOpen(false)}
											>
												{header.fields.primaryButton.text}
											</LinkButton>
										)
									}
								</div>
							</div>
						</div>
					</DialogPanel>
				</Dialog>
			</header>
		</>
	)
}

export default SiteHeader
