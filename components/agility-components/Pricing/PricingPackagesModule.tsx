/* eslint-disable @next/next/no-img-element */
import { UnloadedModuleProps } from "@agility/nextjs"
import { gql } from "gql/__generated__"
import { getAgilityGraphQLClient } from "lib/cms/getAgilityGraphQLClient"

import { getContentItem } from "lib/cms/getContentItem"
import { groupByCondition } from "./groupByCondition"
import { ThreeDashLine } from "components/micro/ThreeDashLine"
import { Container } from "components/micro/Container"
import clsx from "clsx"
import { IconStarFilled } from "@tabler/icons-react"
import { LinkButton } from "components/micro/LinkButton"
import { PricingPackagesModuleClient } from "./PricingPackagesModule.client"
import { renderHTMLCustom } from "lib/utils/renderHtmlCustom"
import { HubspotForm } from "lib/types/HubspotForm"

interface IPricingPackagesModule {
	loadsByDefault: string
	saleOnTextYearly: string
	comparePackagesTitle: string
	primaryFeaturesTitle: string
	secondaryFeaturesTitle: string
	showmoretext: string
	showlesstext: string
	getPricingForm?: string
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

	let hubSpotForm: HubspotForm | null = null

	if (fields.getPricingForm) {
		try {
			hubSpotForm = JSON.parse(fields.getPricingForm)
		} catch (e) {
			console.warn("Error parsing hubspot form on pricing packages modele", fields.getPricingForm, e)
		}
	}


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


			<PricingPackagesModuleClient
				{...{
					headerIDstr,
					topSectionIDStr,
					comparePackagesTitle: fields.comparePackagesTitle,
					hubSpotForm,
					listPricingByCategory,
					pricingPackages: data.pricingpackages,
					featuresListing: data.packagefeaturevalues
				}}
			/>
		</>
	)
}
