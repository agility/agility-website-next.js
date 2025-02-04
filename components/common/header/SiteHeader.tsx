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
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"

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
				<div className="marketing-banner hidden bg-highlight text-white lg:flex justify-center">
					<div
						className="mx-auto max-w-7xl p-3 px-8 text-sm"
						dangerouslySetInnerHTML={renderHTMLCustom(header.fields.marketingBanner)}
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
								<svg className="h-9 w-auto" width="248" height="64" viewBox="0 0 248 64" xmlns="http://www.w3.org/2000/svg"><title>logo copy</title><g fill="none" fillRule="evenodd"><path d="M99.652 48.322c2.741 0 5.14-.456 6.91-1.083v-6.55c-2.17-1.025-4.74-1.48-7.482-1.48-3.712 0-6.339 1.196-6.339 4.271 0 2.905 2.284 4.842 6.91 4.842m11.424-13.842v15.323c-2.514 1.367-7.255 2.62-11.48 2.62-8.225 0-11.595-3.76-11.595-8.715 0-5.468 4.798-8.544 11.08-8.544 2.97 0 5.54.57 7.482 1.367v-2.05c0-4.045-2.627-6.209-7.367-6.209-3.256 0-5.997 1.197-7.654 2.45a4.238 4.238 0 0 1-2.341-3.076C90.913 25.936 94.854 24 99.423 24c6.454 0 11.652 2.962 11.652 10.48m28.372 10.48V29.98c-1.37-1.082-3.598-1.766-6.054-1.766-5.712 0-9.653 3.93-9.653 9.57 0 5.753 3.941 9.17 9.653 9.17 3.027 0 4.683-.968 6.054-1.993m4.626-17.487v23.468c0 6.72-5.197 11.847-12.85 11.847-4.741 0-8.967-1.48-11.766-4.67.4-1.14 1.428-2.507 2.97-3.133 1.77 2.05 4.455 3.702 8.795 3.702 5.712 0 8.225-3.418 8.225-7.746v-1.538c-1.828.911-3.941 1.595-6.454 1.595-7.653 0-13.993-5.013-13.993-13.215C119 29.81 125.054 24 133.393 24c3.94 0 7.882 1.31 10.68 3.474m9.897 24.518V25.107c.8-.17 1.6-.228 2.342-.228.743 0 1.543.057 2.285.228v26.885c-.742.17-1.542.228-2.285.228-.742 0-1.542-.057-2.341-.228M153 17.247c0-1.823 1.428-3.247 3.312-3.247 1.77 0 3.199 1.424 3.199 3.247 0 1.822-1.428 3.246-3.199 3.246-1.827 0-3.312-1.424-3.312-3.246m16 34.403V14.229a10.69 10.69 0 0 1 2.284-.228c.743 0 1.6.057 2.342.228v37.423c-.743.17-1.599.227-2.342.227a10.72 10.72 0 0 1-2.284-.227m14.97.34V25.107c.8-.17 1.6-.228 2.342-.228.743 0 1.543.057 2.285.228v26.885c-.742.17-1.542.228-2.285.228-.742 0-1.542-.057-2.341-.228M183 17.247c0-1.823 1.428-3.247 3.312-3.247 1.77 0 3.199 1.424 3.199 3.247 0 1.822-1.428 3.246-3.199 3.246-1.827 0-3.312-1.424-3.312-3.246m34.76 32.707c-1.427 1.31-4.226 2.848-7.539 2.848-5.425 0-9.366-2.563-9.366-9V29.164h-4.627a7.063 7.063 0 0 1-.228-1.88c0-.626.057-1.196.228-1.822h4.627v-7.234c.742-.171 1.485-.228 2.284-.228.742 0 1.485.057 2.228.228v7.234h10.68c.171.626.228 1.196.228 1.822 0 .684-.057 1.196-.228 1.88h-10.68V42.89c0 4.842 2.284 5.867 5.197 5.867 2.17 0 4.283-1.31 5.14-2.05 1.142.797 1.828 2.05 2.056 3.246m29.57-24.383c-4.455 17.03-9.538 27.226-19.533 38.106-1.6-.285-2.742-1.539-3.256-2.791 2.799-3.076 5.369-6.266 7.254-9.4-5.197-8.6-8.453-17.315-10.795-26.087.914-.284 1.828-.398 2.856-.398.628 0 1.37.057 2.056.17 1.999 7.633 4.34 13.842 8.225 21.589l.456.854c.115-.285.286-.513.4-.798 3.712-7.12 5.826-14.069 7.653-21.644a11.04 11.04 0 0 1 1.885-.171c.914 0 1.942.228 2.799.57" fill="#717171" /><path d="M43.064 53.463H17.419l19.33-33.39 19.33 33.39 5.638 9.948h11.64L36.748.177.14 63.411h47.417z" fill="#FFCB28" /></g></svg>
								{/* <img
									className="h-9 w-auto"
									src={header.fields.stickyLogo.url}
									alt={header.fields.stickyLogo.label}
									width={header.fields.stickyLogo.height}
									height={header.fields.stickyLogo.width}
								/> */}
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
							<Link href="#" className="-m-1.5 p-1.5">
								<span className="sr-only">Agility CMS</span>
								<svg className="h-8 w-auto" width="248" height="64" viewBox="0 0 248 64" xmlns="http://www.w3.org/2000/svg"><title>logo copy</title><g fill="none" fillRule="evenodd"><path d="M99.652 48.322c2.741 0 5.14-.456 6.91-1.083v-6.55c-2.17-1.025-4.74-1.48-7.482-1.48-3.712 0-6.339 1.196-6.339 4.271 0 2.905 2.284 4.842 6.91 4.842m11.424-13.842v15.323c-2.514 1.367-7.255 2.62-11.48 2.62-8.225 0-11.595-3.76-11.595-8.715 0-5.468 4.798-8.544 11.08-8.544 2.97 0 5.54.57 7.482 1.367v-2.05c0-4.045-2.627-6.209-7.367-6.209-3.256 0-5.997 1.197-7.654 2.45a4.238 4.238 0 0 1-2.341-3.076C90.913 25.936 94.854 24 99.423 24c6.454 0 11.652 2.962 11.652 10.48m28.372 10.48V29.98c-1.37-1.082-3.598-1.766-6.054-1.766-5.712 0-9.653 3.93-9.653 9.57 0 5.753 3.941 9.17 9.653 9.17 3.027 0 4.683-.968 6.054-1.993m4.626-17.487v23.468c0 6.72-5.197 11.847-12.85 11.847-4.741 0-8.967-1.48-11.766-4.67.4-1.14 1.428-2.507 2.97-3.133 1.77 2.05 4.455 3.702 8.795 3.702 5.712 0 8.225-3.418 8.225-7.746v-1.538c-1.828.911-3.941 1.595-6.454 1.595-7.653 0-13.993-5.013-13.993-13.215C119 29.81 125.054 24 133.393 24c3.94 0 7.882 1.31 10.68 3.474m9.897 24.518V25.107c.8-.17 1.6-.228 2.342-.228.743 0 1.543.057 2.285.228v26.885c-.742.17-1.542.228-2.285.228-.742 0-1.542-.057-2.341-.228M153 17.247c0-1.823 1.428-3.247 3.312-3.247 1.77 0 3.199 1.424 3.199 3.247 0 1.822-1.428 3.246-3.199 3.246-1.827 0-3.312-1.424-3.312-3.246m16 34.403V14.229a10.69 10.69 0 0 1 2.284-.228c.743 0 1.6.057 2.342.228v37.423c-.743.17-1.599.227-2.342.227a10.72 10.72 0 0 1-2.284-.227m14.97.34V25.107c.8-.17 1.6-.228 2.342-.228.743 0 1.543.057 2.285.228v26.885c-.742.17-1.542.228-2.285.228-.742 0-1.542-.057-2.341-.228M183 17.247c0-1.823 1.428-3.247 3.312-3.247 1.77 0 3.199 1.424 3.199 3.247 0 1.822-1.428 3.246-3.199 3.246-1.827 0-3.312-1.424-3.312-3.246m34.76 32.707c-1.427 1.31-4.226 2.848-7.539 2.848-5.425 0-9.366-2.563-9.366-9V29.164h-4.627a7.063 7.063 0 0 1-.228-1.88c0-.626.057-1.196.228-1.822h4.627v-7.234c.742-.171 1.485-.228 2.284-.228.742 0 1.485.057 2.228.228v7.234h10.68c.171.626.228 1.196.228 1.822 0 .684-.057 1.196-.228 1.88h-10.68V42.89c0 4.842 2.284 5.867 5.197 5.867 2.17 0 4.283-1.31 5.14-2.05 1.142.797 1.828 2.05 2.056 3.246m29.57-24.383c-4.455 17.03-9.538 27.226-19.533 38.106-1.6-.285-2.742-1.539-3.256-2.791 2.799-3.076 5.369-6.266 7.254-9.4-5.197-8.6-8.453-17.315-10.795-26.087.914-.284 1.828-.398 2.856-.398.628 0 1.37.057 2.056.17 1.999 7.633 4.34 13.842 8.225 21.589l.456.854c.115-.285.286-.513.4-.798 3.712-7.12 5.826-14.069 7.653-21.644a11.04 11.04 0 0 1 1.885-.171c.914 0 1.942.228 2.799.57" fill="#717171" /><path d="M43.064 53.463H17.419l19.33-33.39 19.33 33.39 5.638 9.948h11.64L36.748.177.14 63.411h47.417z" fill="#FFCB28" /></g></svg>
								{/* <img alt="" src={header.fields.mobileLogo.url} className="h-8 w-auto" /> */}
							</Link>
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
