import { Fragment } from "react"
import { Container } from "components/micro/Container"
import { CatFeature } from "./PricingPackagesModule"

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
}

export const PricingPackagesModuleClient = async ({
	pricingPackages,
	listPricingByCategory,
	featuresListing
}: Props) => {
	const packages = pricingPackages as PricingPackage[]
	const features = featuresListing as PackageFeature[]
	return (
		<Container className="mx-auto max-w-7xl">
			<div className="flex gap-4 bg-red-100">
				<div className="flex-1"></div>
				{packages.map((packageItem, index) => (
					<div key={`listing-${packageItem?.contentID}`} className="w-52">
						<h3 className="text-2xl font-bold">{packageItem?.fields?.title}</h3>
					</div>
				))}
			</div>

			{listPricingByCategory.map((catFeature, index) => (
				<Fragment key={`cats-${catFeature.category}`}>
					{index > 0 && <h4 className="bg-background p-8 text-xl">{catFeature.category.categoryName}</h4>}

					<div key={`${catFeature.category || index}`}>
						{catFeature.listPackageFeature.map((feature, index) => (
							<div key={feature.contentID} className="bg-green-100-100 flex gap-4">
								<div className="flex-1">{feature.fields.title}</div>

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
											className="w-52"
										>
											{packageFeature?.fields.textValue}
											{packageFeature?.fields.trueFalseValue?.toString()}
										</div>
									)
								})}
							</div>
						))}
						<div className="flex-1"></div>
					</div>
				</Fragment>
			))}
		</Container>
	)
}
