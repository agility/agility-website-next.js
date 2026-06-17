"use client"

import { useState } from "react"
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	Disclosure,
	DisclosureButton,
	DisclosurePanel
} from "@headlessui/react"
import { IconChevronDown, IconX } from "@tabler/icons-react"
import Link from "next/link"
import Image from "next/image"
import classNames from "classnames"
import { LinkButton } from "components/micro/LinkButton"
import { MobileSearch } from "components/search/Search"
import type { MenuLink } from "lib/cms-content/getHeaderContent"
import type { ImageField, URLField } from "@agility/nextjs"

interface CTALink {
	href: string
	target: string
	text: string
}

interface Props {
	links: MenuLink[]
	mobileLogo: ImageField
	contactus?: CTALink | URLField
	primaryButton?: CTALink | URLField
}

export function MobileMenuClient({ links, mobileLogo, contactus, primaryButton }: Props) {
	const [open, setOpen] = useState(false)

	return (
		<>
			<div className="-my-2 -mr-2 flex items-center gap-1 lg:hidden">
				<MobileSearch />
				{contactus && (
					<LinkButton
						href={contactus.href}
						target={contactus.target}
						type="primary"
						className="hidden sm:flex"
					>
						{(contactus as CTALink).text}
					</LinkButton>
				)}
				<button
					onClick={() => setOpen(!open)}
					aria-label="Toggle Menu"
					type="button"
					className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
				>
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

			<Dialog
				open={open}
				onClose={setOpen}
				transition
				className={classNames(
					"lg:hidden",
					"transition duration-300 ease-out data-[closed]:opacity-0"
				)}
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
							<Image
								src={mobileLogo.url}
								alt={mobileLogo.label || "Agility CMS"}
								width={mobileLogo.width || 200}
								height={mobileLogo.height || 32}
								unoptimized={mobileLogo.url.endsWith(".svg")}
								className="h-8 w-auto"
							/>
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
										return (
											<Disclosure as="div" key={`mobile-${index}`} className="-mx-3">
												<DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
													{link.menuItem.fields.uRL?.href ? (
														<Link
															onClick={() => setOpen(false)}
															href={link.menuItem.fields.uRL.href}
															target={link.menuItem.fields.uRL.target}
															key={`mobile-${index}`}
															className="transition-colors hover:text-highlight"
														>
															{link.menuItem.fields.title}
														</Link>
													) : (
														<span className="transition-colors hover:text-highlight">
															{link.menuItem.fields.title}
														</span>
													)}
													<IconChevronDown
														aria-hidden="true"
														className="h-5 w-5 flex-none group-data-[open]:rotate-180"
													/>
												</DisclosureButton>
												<DisclosurePanel className="mt-2 space-y-2">
													{link.subMenuList
														.filter((subLink) => subLink.fields.uRL?.href)
														.map((subLink) => (
															<DisclosureButton
																key={subLink.fields.title}
																as="a"
																href={subLink.fields.uRL!.href}
																onClick={() => setOpen(false)}
																className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-primary transition-all hover:bg-gray-50 hover:text-highlight"
															>
																{subLink.fields.title}
															</DisclosureButton>
														))}
												</DisclosurePanel>
											</Disclosure>
										)
									}

									if (!link.menuItem.fields.uRL?.href) return null
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
								})}
							</div>
							<div className="flex flex-col gap-2 py-6">
								{contactus && (
									<LinkButton
										href={contactus.href}
										target={contactus.target}
										type="primary"
										className="block"
										onClick={() => setOpen(false)}
									>
										{(contactus as CTALink).text}
									</LinkButton>
								)}
								{primaryButton && (
									<LinkButton
										href={primaryButton.href}
										target={primaryButton.target}
										type="secondary"
										onClick={() => setOpen(false)}
									>
										{(primaryButton as CTALink).text}
									</LinkButton>
								)}
							</div>
						</div>
					</div>
				</DialogPanel>
			</Dialog>
		</>
	)
}
