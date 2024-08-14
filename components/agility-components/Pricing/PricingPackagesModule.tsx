import { UnloadedModuleProps } from "@agility/nextjs"
import { gql } from "gql/__generated__"
import { getAgilityGraphQLClient } from "lib/cms/getAgilityGraphQLClient"

import { getContentItem } from "lib/cms/getContentItem"
import { groupByCondition } from "./groupByCondition"
import { ThreeDashLine } from "components/micro/ThreeDashLine"
import { Container } from "components/micro/Container"

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

interface CatFeature {
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
	packagefeaturevalues(sort: "properties.itemOrder") {
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
		const categoryName = data.pricingcategories?.find((item) => String(item?.contentID) === key)?.fields?.category

		listPricingByCategory.push({
			category: {
				id: key,
				categoryName: categoryName || ""
			},
			listPackageFeature: val
		})
	})

	console.log("listPricingByCategory", listPricingByCategory[0].listPackageFeature[0])

	return (
		<div>
			<Container className="relative z-[2] mx-auto h-96 max-w-5xl bg-red-100">
				{data.pricingpackages?.map((packageItem) => (
					<div key={packageItem?.contentID}>{packageItem?.fields?.title}</div>
				))}
			</Container>

			<div className="-mt-40 min-h-96 bg-gradient-to-b from-background to-white pt-52">
				<div>
					{fields.comparePackagesTitle && (
						<h2 className="text-balance text-center text-5xl">{fields.comparePackagesTitle}</h2>
					)}
					<ThreeDashLine />
				</div>
			</div>
		</div>
	)
}
