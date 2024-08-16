/* eslint-disable @next/next/no-img-element */
import { renderHTML, UnloadedModuleProps } from "@agility/nextjs"
import { gql } from "gql/__generated__"
import { getAgilityGraphQLClient } from "lib/cms/getAgilityGraphQLClient"

import { getContentItem } from "lib/cms/getContentItem"
import { groupByCondition } from "./groupByCondition"
import { ThreeDashLine } from "components/micro/ThreeDashLine"
import { Container } from "components/micro/Container"
import clsx from "clsx"
import { IconAsterisk, IconStarFilled } from "@tabler/icons-react"
import { LinkButton } from "components/micro/LinkButton"
import { PricingPackagesModuleClient } from "./PricingPackagesModule.client"

interface IPricingPackagesModule {
	loadsByDefault: string
	saleOnTextYearly: string
	comparePackagesTitle: string
	primaryFeaturesTitle: string
	secondaryFeaturesTitle: string
	showmoretext: string
	showlesstext: string
}

interface PackageFeature {
	contentID: number
	properties: {
		referenceName: string
		itemOrder: number
	}
	fields: {
		isPrimary: boolean
		title: string
		pricingCategory_ValueField: string
		description: string
	}
}

export interface CatFeature {
	category: {
		id: string
		categoryName: string
	}
	listPackageFeature: PackageFeature[]
}

export const PricingPackagesModule = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { contentID, fields } = await getContentItem<IPricingPackagesModule>({
		contentID: module.contentid,
		languageCode
	})

	const gqlQuery = gql(`
		query getPricingItems {
	packagefeaturevalues(take: 250, sort: "properties.itemOrder") {
		contentID
		fields {
			packageFeature {
			contentID
			}
			pricingPackage {
			contentID
			}
			textValue
			trueFalseValue
		}
		properties {
			itemOrder
			referenceName
		}
	}

	pricingcategories {
		contentID
		fields {
			category
		}
	}

	primarypackagefeaturelabels (sort: "properties.itemOrder") {
		contentID
		fields {
			isPrimary
			title
			pricingCategory_ValueField
			description
		}
		properties {
			referenceName
			itemOrder
		}
	}

	pricingpackages(
		sort: "properties.itemOrder"
		filter: "fields.displayOnWebsite[eq]true"
	) {
		contentID
		fields {
			cTAButtonLabel
			cost
			saleCost
			isMostPopular
			title
			icon {
				url
				fileSize
				height
				width
				label
			}
			cTAButton {
				target
				href
				text
			}
			pricingPlan
			yearlyPricingPlan
			yearlyCTAButton {
				href
				target
				text
			}
			yearlyCTAButtonLabel
			description
			yearlyCost
			yearlyPricingPlan
			yearlyDescription
			yearlySaleCost
			displayInManager
			displayOnWebsite
		}
		properties {
			referenceName
			itemOrder
		}
	}

	}
`)

	const { query } = await getAgilityGraphQLClient({
		referenceNames: ["packagefeaturevalues", "pricingcategories", "primarypackagefeaturelabels", "pricingpackages"]
	})
	const { data } = await query({ query: gqlQuery })

	const primaryFeatures = data.primarypackagefeaturelabels?.filter((f) => f?.fields?.isPrimary)
	const moreFeatures = data.primarypackagefeaturelabels?.filter((f) => f?.fields?.pricingCategory_ValueField)

	const listPricingByCategory: CatFeature[] = []

	const groupByCategory = groupByCondition(moreFeatures, (item: any) => item.fields.pricingCategory_ValueField)

	groupByCategory.forEach((val, key) => {
		const catItem = data.pricingcategories?.find((item) => String(item?.contentID) === key)
		const categoryName = catItem?.fields?.category

		listPricingByCategory.push({
			category: {
				id: key,
				categoryName: categoryName || ""
			},
			listPackageFeature: val
		})
	})

	const headerIDstr = `${contentID}-header`
	const topSectionIDStr = `${contentID}-top`

	return (
		<>
			<div id={topSectionIDStr}>
				<Container className="relative z-[2] mx-auto max-w-5xl">
					<div className="flex flex-col items-center justify-center gap-14 lg:flex-row lg:items-start">
						{data.pricingpackages?.map((packageItem, index) => (
							<div
								key={packageItem?.contentID}
								className={clsx(
									"flex h-full w-full max-w-[400px] flex-col items-center gap-6 border-t-4 bg-white p-8 text-center shadow-lg",
									"lg:w-[350px]",
									index === 0
										? "border-t-slate-300"
										: index === 1
											? "border-t-secondary"
											: "border-t-highlight-light"
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
										dangerouslySetInnerHTML={renderHTML(packageItem?.fields?.description)}
									></div>
								</div>
								<div>
									<LinkButton
										type={index === 0 ? "slate" : index === 1 ? "alternate" : "primary"}
										size={"md"}
										href={packageItem?.fields?.cTAButton?.href}
										target={packageItem?.fields?.cTAButton?.target}
									>
										{packageItem?.fields?.cTAButton?.text}
									</LinkButton>
								</div>
							</div>
						))}
					</div>
				</Container>

				<div className="-mt-44 min-h-72 bg-slate-50 pt-52">
					<div id={headerIDstr}>
						{fields.comparePackagesTitle && (
							<h2 className="text-balance text-center text-5xl">{fields.comparePackagesTitle}</h2>
						)}
						<ThreeDashLine />
					</div>
				</div>
			</div>

			<PricingPackagesModuleClient
				{...{
					headerIDstr,
					topSectionIDStr,
					listPricingByCategory,
					pricingPackages: data.pricingpackages,
					featuresListing: data.packagefeaturevalues
				}}
			/>
		</>
	)
}
