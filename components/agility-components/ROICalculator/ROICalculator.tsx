import { UnloadedModuleProps, URLField } from "@agility/nextjs"
import { getContentItem } from "lib/cms/getContentItem"
import { ROICalculatorClient } from "./ROICalculator.client"

export interface IROICalculator {
	// Hero Section
	tagText: string
	heading: string
	headingHighlight: string
	subheading: string

	// Lead Capture Form
	formHeading: string
	formSubheading: string
	emailLabel: string
	emailPlaceholder: string
	companyLabel: string
	companyPlaceholder: string
	startButtonText: string
	privacyText: string

	// Consent & HubSpot
	hubspotPortalId?: string
	hubspotFormId?: string
	privacyPolicyLink?: URLField
	consentText: string
	marketingOptInText: string
	hubspotSubscriptionTypeId?: number

	// Step 1 - Baseline
	step1Heading: string
	step1Subheading: string
	websitesQuestion: string
	marketsQuestion: string
	updatesQuestion: string
	updatesMin: number
	updatesMax: number
	updatesDefault: number

	// Step 2 - Team
	step2Heading: string
	step2Subheading: string
	publishersQuestion: string
	publishersMin: number
	publishersMax: number
	publishersDefault: number
	marketingRateQuestion: string
	marketingRateMin: number
	marketingRateMax: number
	marketingRateDefault: number
	engineeringRateQuestion: string
	engineeringRateMin: number
	engineeringRateMax: number
	engineeringRateDefault: number
	step2Tip: string

	// Step 3 - Publishing
	step3Heading: string
	step3Subheading: string
	publishTimeQuestion: string
	devHelpQuestion: string
	devHelpDefault: number
	devTimeQuestion: string

	// Step 4 - IT Overhead
	step4Heading: string
	step4Subheading: string
	maintenanceQuestion: string
	maintenanceMin: number
	maintenanceMax: number
	maintenanceDefault: number
	upgradeFreqQuestion: string
	upgradeEffortQuestion: string
	upgradeEffortMin: number
	upgradeEffortMax: number
	upgradeEffortDefault: number
	legacyCostQuestion: string
	legacyCostHelp: string

	// Results & Assumptions
	resultsHeadingPrefix: string
	resultsHeadingSuffix: string
	publishTimeReduction: number
	devInvolvementReduction: number
	maintenanceReduction: number
	upgradeEffortReduction: number
	implementationMin: number
	implementationMax: number
	implementationDefault: number

	// CTA Section
	ctaHeading: string
	ctaSubheading: string
	ctaPrimaryButton?: URLField
	ctaSecondaryButton?: URLField
	footerText: string
}

export const ROICalculator = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields } = await getContentItem<IROICalculator>({
		contentID: module.contentid,
		languageCode,
	})

	return (
		<section className="bg-gradient-to-b from-background to-white px-4 pt-14 pb-20 md:px-8 2xl:px-0">
			<div className="mx-auto max-w-7xl">
				<ROICalculatorClient fields={fields} />
			</div>
		</section>
	)
}
