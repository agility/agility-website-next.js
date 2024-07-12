/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useLayoutEffect, useState } from "react"
import Link from "next/link"
import classNames from "classnames"

import { HeaderContent } from "lib/cms-content/getHeaderContent"
import { PopoverGroup } from "@headlessui/react"
import { MenuItemOutput } from "./MenuItemOutput"
import { LinkButton } from "components/micro/LinkButton"

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
				<p className="text-gray-400 font-bold">No Header Available</p>
			</header>
		)
	}

	return (
		<header
			className={classNames(
				"w-full mx-auto bg-white px-8 sticky top-0  transition-shadow",
				isScrolled ? "shadow-b" : "shadow-none"
			)}
		>
			<div className="max-w-screen-xl mx-auto">
				<div className="flex justify-between items-center py-6 lg:justify-start lg:space-x-10 w-full">
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
					<div className="-mr-2 -my-2 lg:hidden flex gap-1 items-center">
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
						<button
							onClick={() => setOpen(!open)}
							aria-label="Toggle Menu"
							type="button"
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
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
					<PopoverGroup as="nav" className="hidden lg:flex space-x-4 items-center">
						{links.map((link, index) => {
							return <MenuItemOutput key={link.menuItem.contentID} link={link} />
						})}

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
			<div
				className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden z-20"
				style={{ display: open ? "block" : "none" }}
			>
				<div className="rounded-lg shadow-lg">
					<div className="rounded-lg shadow-xs bg-white divide-y-2 divide-gray-50">
						<div className="pt-5 pb-6 px-5 space-y-6">
							<div className="flex items-center justify-between ">
								<div>
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
								<div className="">
									<button
										onClick={() => setOpen(!open)}
										aria-label="Toggle Menu"
										type="button"
										className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-300"
									>
										{/* <!-- Heroicon name: x --> */}
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
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</div>
							</div>
							<div>
								<nav className="grid gap-y-8 ">
									{links.map((link, index) => {
										return (
											<Link
												href={link.menuItem.fields.uRL.href}
												target={link.menuItem.fields.uRL.target}
												key={`mobile-${index}`}
												className="text-sm leading-6 font-medium text-secondary-500 hover:text-primary-500 border-transparent border-b-2 hover:border-primary-500 hover:border-b-primary hover:border-b-2 focus:outline-none focus:text-primary-500 transition duration-300"
											>
												{link.menuItem.fields.title}
											</Link>
										)
									})}
								</nav>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default SiteHeader
