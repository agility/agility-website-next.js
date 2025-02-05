"use client"
import { Fragment, useId, useLayoutEffect, useMemo, useRef, useState } from "react"
import { Container } from "components/micro/Container"
import { CatFeature } from "./PricingPackagesModule"
import { renderHTML } from "@agility/nextjs"
import {
	IconCheckbox,
	IconChevronDown,
	IconChevronUp,
	IconSquare,
	IconSquareCheck,
	IconSquareCheckFilled,
	IconStarFilled
} from "@tabler/icons-react"
import { entries } from "lodash"

import clsx from "clsx"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"
import { ThreeDashLine } from "components/micro/ThreeDashLine"
import { HubspotForm } from "lib/types/HubspotForm"
import GetPricePopup from "./GetPricePopup"
import { LinkButtonClient } from "components/micro/LinkButtonClient"
import Script from "next/script"

interface PricingPackage {
	contentID: number | null
	fields: {
		cTAButtonLabel?: string | null
		cost?: string | null
		saleCost?: string | null
		isMostPopular?: boolean | null
		title?: string | null
		pricingPlan?: string | null
		yearlyPricingPlan?: string | null
		yearlyCTAButtonLabel?: string | null
		description?: string | null
		yearlyCost?: string | null
		yearlyDescription?: string | null
		yearlySaleCost?: string | null
		displayInManager?: boolean | null
		displayOnWebsite?: boolean | null
		icon?: {
			url: string
			fileSize: number
			height: number
			width: number
			label?: string | null
		}
		cTAButton: {
			target: string
			href: string
			text: string
		}
		yearlyCTAButton?: {
			href: string
			target: string
			text: string
		}
	}
	properties: {
		referenceName: string
		itemOrder: number
	}
}

interface PackageFeature {
	contentID: number
	fields: {
		textValue?: string | null
		trueFalseValue?: boolean | null
		packageFeature?: {
			__typename?: "packagefeatures"
			contentID?: number | null
		}
		pricingPackage?: {
			__typename?: "pricingpackages"
			contentID?: number | null
		}
	}
	properties: {
		itemOrder: number
		referenceName: string
	}
}

interface Props {
	listPricingByCategory: CatFeature[]
	pricingPackages: any
	featuresListing: any
	headerIDstr: string
	topSectionIDStr: string
	comparePackagesTitle: string
	hubSpotForm: HubspotForm | null
}

export const PricingPackagesModuleClient = ({
	pricingPackages,
	listPricingByCategory,
	featuresListing,
	headerIDstr,
	topSectionIDStr,
	comparePackagesTitle,
	hubSpotForm
}: Props) => {
	const packages = pricingPackages as PricingPackage[]
	const features = featuresListing as PackageFeature[]

	const [isScrolling, setIsScrolling] = useState(false)
	const [priceDialogOpen, setPriceDialogOpen] = useState(false)

	const idStr = "pricing-page"

	/**
	 * This effect will watch the header element and determine if it is showing or not
	 * Uses an IntersectionObserver to determine if the header is showing
	 */
	useLayoutEffect(() => {

		//get the header element
		const elem1 = document.getElementById(topSectionIDStr)

		if (!elem1) return

		let observer = new IntersectionObserver(
			(entries) => {
				if (entries.length < 1) return
				let showing = false

				if (entries[0].isIntersecting) {
					showing = true
				}

				//if the header is showing, then we are not scrolling
				if (!showing) {
					setIsScrolling(true)
				} else {
					setIsScrolling(false)
				}
			},
			{
				//root: null,
				rootMargin: "0px",
				threshold: 0.1
			}
		)
		observer.observe(elem1)

		return () => {
			observer.disconnect()
		}
	}, [headerIDstr, topSectionIDStr])

	return (
		<>

			<div id={topSectionIDStr}>
				<Container className="relative z-[2] mx-auto max-w-5xl">
					<div className="flex flex-col items-center justify-center gap-14 lg:flex-row lg:items-start">
						{packages?.map((packageItem, index) => (
							<div
								key={packageItem?.contentID}
								className={clsx(
									"flex h-full w-full max-w-[400px] flex-col items-center gap-6 border-t-4 bg-white p-8 text-center shadow-lg",
									"lg:w-[350px]",
									index === 0
										? "border-t-slate-300"
										: index === 1
											? "border-t-highlight-light"
											: "border-t-secondary"
								)}
							>
								<div className="flex items-center justify-center gap-2">
									<h2 className="text-2xl font-bold">{packageItem?.fields?.title}</h2>
									{packageItem?.fields?.isMostPopular && (
										<div className="flex items-center gap-1 rounded bg-background p-0.5 px-1 text-xs text-highlight-light">
											<IconStarFilled size={12} />
											Most Popular
										</div>
									)}
								</div>

								{/* icon */}
								<img
									src={packageItem?.fields?.icon?.url}
									alt={packageItem?.fields?.icon?.label || ""}
									className="h-14 w-14"
								/>

								{/* descriptions */}
								<div className="min-h-[100px]">
									<div className="font-bold">{packageItem?.fields?.pricingPlan}</div>

									<div
										className="prose mt-2 prose-p:leading-tight"
										dangerouslySetInnerHTML={renderHTMLCustom(packageItem?.fields?.description)}
									></div>
								</div>
								<div>
									<LinkButtonClient
										type={index === 0 ? "slate" : index === 1 ? "primary" : "alternate"}
										size={"md"}
										href={packageItem?.fields?.cTAButton?.href}
										target={packageItem?.fields?.cTAButton?.target}
										onClick={(e) => {
											if (hubSpotForm) {
												setPriceDialogOpen(true)
												e.preventDefault()
											}
										}}
									>
										{packageItem?.fields?.cTAButton?.text}
									</LinkButtonClient>
								</div>
							</div>
						))}
					</div>
				</Container>

				<div className="-mt-44 min-h-72 bg-slate-50 pt-52">
					<div id={headerIDstr}>
						{comparePackagesTitle && (
							<h2 className="text-balance text-center text-5xl">{comparePackagesTitle}</h2>
						)}
						<ThreeDashLine />
					</div>
				</div>
			</div>

			<div className="bg-slate-50 pt-6">
				<div id={idStr} className="sticky top-[83px] z-10 mb-3 gap-4 border-b border-b-slate-300 bg-slate-50 py-3">
					<div className="mx-auto flex max-w-7xl justify-center px-8">
						<h3 className="hidden flex-1 items-center text-xl font-bold lg:block">
							{isScrolling && <div className="">All Features</div>}
						</h3>
						{packages.map((packageItem, index) => (
							<div key={`listing-${packageItem?.contentID}`} className="w-52">
								<h3 className="text-center text-2xl font-bold">{packageItem?.fields?.title}</h3>
								{isScrolling && (
									<div className="mt-2 hidden justify-center md:flex">
										<LinkButtonClient
											type={index === 0 ? "slate" : index === 1 ? "alternate" : "primary"}
											size={"sm"}
											href={packageItem?.fields?.cTAButton?.href}
											target={packageItem?.fields?.cTAButton?.target}
											onClick={(e) => {
												if (hubSpotForm) {
													setPriceDialogOpen(true)
													e.preventDefault()
												}
											}}
										>
											{packageItem?.fields?.cTAButton?.text}
										</LinkButtonClient>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
				<div className={clsx("mx-auto max-w-7xl justify-center px-8", isScrolling && "-mt-10")}>
					{listPricingByCategory.map((catFeature, index) => (
						<Disclosure as="div" key={`cats-${catFeature.category.id}`} className="group" defaultOpen>
							{index > 0 && (
								<DisclosureButton className="my-4 flex w-full items-center justify-between bg-background/70 p-3 transition-all hover:bg-background">
									<h4 className="text-lg font-semibold text-highlight-light">
										{catFeature.category.categoryName}
									</h4>
									<div>
										<IconChevronDown
											stroke={2.5}
											className="text-highlight-light transition-transform duration-300 ease-in-out group-data-[open]:-rotate-180"
										/>
									</div>
								</DisclosureButton>
							)}

							<DisclosurePanel
								key={`${catFeature.category || index}`}
								transition
								className="origin-top transition duration-200 ease-in data-[closed]:-translate-y-6 data-[closed]:opacity-0"
							>
								{catFeature.listPackageFeature.map((feature, index) => (
									<Fragment key={feature.contentID}>
										<div className="pt-1 lg:hidden">
											<h5
												className="font-medium"
												dangerouslySetInnerHTML={renderHTMLCustom(feature.fields.title)}
											></h5>
										</div>
										<div className="my-2 flex justify-center bg-background/70 p-1 transition-all lg:my-0 lg:bg-background/0 lg:p-0 lg:hover:bg-background/70">
											<div className="hidden flex-1 p-3 lg:block">
												<h5
													className="font-bold"
													dangerouslySetInnerHTML={renderHTMLCustom(feature.fields.title)}
												></h5>
												<div
													className="prose prose-sm prose-slate mt-3 opacity-80"
													dangerouslySetInnerHTML={renderHTMLCustom(feature.fields.description)}
												></div>
											</div>

											{packages.map((packageItem, index) => {
												//try to find the feature in the package
												const packageFeature = features.find(
													(f) =>
														f.fields.packageFeature?.contentID === feature.contentID &&
														f.fields.pricingPackage?.contentID === packageItem.contentID
												)

												return (
													<div
														key={`listing-${catFeature.category}-${packageItem?.contentID}`}
														className="flex w-52 items-center justify-center"
													>
														{packageFeature?.fields.textValue ? (
															<div className="text-center lg:font-medium">
																{packageFeature?.fields.textValue}
															</div>
														) : packageFeature?.fields.trueFalseValue ? (
															<div className="flex justify-center">
																<IconSquareCheckFilled className="text-highlight-light" />
															</div>
														) : (
															<div>-</div>
														)}
													</div>
												)
											})}
										</div>
									</Fragment>
								))}
								<div className="flex-1"></div>
							</DisclosurePanel>
						</Disclosure>
					))}
				</div>
			</div>
			{hubSpotForm &&
				<>
					<GetPricePopup {...{ hubSpotForm, priceDialogOpen, setPriceDialogOpen }} />
					<Script
						{...{
							type: "text/javascript",
							async: true,
							defer: true,
							strategy: "afterInteractive",
							src: "//js.hsforms.net/forms/embed/v2.js",
						}}
					/>
				</>
			}
		</>
	)
}
