"use client"

import { useState, useMemo, useCallback, useEffect, useRef } from "react"
import clsx from "clsx"
import { LinkButton } from "components/micro/LinkButton"
import { IROICalculator } from "./ROICalculator"
import {
	IconMail,
	IconBuilding,
	IconWorld,
	IconLanguage,
	IconFileText,
	IconUsers,
	IconCurrencyDollar,
	IconCode,
	IconClock,
	IconHelp,
	IconSettings,
	IconCalendar,
	IconTool,
	IconCheck,
	IconArrowLeft,
	IconArrowRight,
	IconChartBar,
	IconPigMoney,
	IconUserCheck,
	IconClockHour4,
} from "@tabler/icons-react"

interface Props {
	fields: IROICalculator
}

type CalculatorStep = "form" | "step1" | "step2" | "step3" | "step4" | "results"

interface CalculatorState {
	// Form
	email: string
	company: string

	// Step 1
	websites: number
	markets: number
	monthlyUpdates: number

	// Step 2
	publishers: number
	marketingRate: number
	engineeringRate: number

	// Step 3
	publishTime: number
	devHelpPercent: number
	devTimePerRequest: number

	// Step 4
	maintenanceHours: number
	upgradeFrequency: number
	upgradeEffort: number
	legacyCost: number

	// Results
	implementationCost: number
}

export const ROICalculatorClient = ({ fields }: Props) => {
	const [currentStep, setCurrentStep] = useState<CalculatorStep>("form")
	const [isTransitioning, setIsTransitioning] = useState(false)
	const [pendingStep, setPendingStep] = useState<CalculatorStep | null>(null)
	const [state, setState] = useState<CalculatorState>({
		email: "",
		company: "",
		websites: 1,
		markets: 1,
		monthlyUpdates: fields.updatesDefault || 100,
		publishers: fields.publishersDefault || 5,
		marketingRate: fields.marketingRateDefault || 65,
		engineeringRate: fields.engineeringRateDefault || 120,
		publishTime: 30,
		devHelpPercent: fields.devHelpDefault || 30,
		devTimePerRequest: 30,
		maintenanceHours: fields.maintenanceDefault || 30,
		upgradeFrequency: 2,
		upgradeEffort: fields.upgradeEffortDefault || 120,
		legacyCost: 0,
		implementationCost: fields.implementationDefault || 75000,
	})

	const [emailError, setEmailError] = useState("")
	const [companyError, setCompanyError] = useState("")
	const [consentGiven, setConsentGiven] = useState(false)
	const [marketingOptIn, setMarketingOptIn] = useState(false)
	const [consentError, setConsentError] = useState("")
	const [marketingOptInError, setMarketingOptInError] = useState("")
	const [hasSubmittedLead, setHasSubmittedLead] = useState(false)
	const [hasSubmittedSummary, setHasSubmittedSummary] = useState(false)

	// Ref for scrolling to top of calculator on step change
	const calculatorTopRef = useRef<HTMLDivElement>(null)

	// Handle smooth step transitions with fade effect
	const transitionToStep = useCallback((newStep: CalculatorStep) => {
		if (isTransitioning) return
		setIsTransitioning(true)
		setPendingStep(newStep)
	}, [isTransitioning])

	// Effect to handle the actual step change after fade out
	useEffect(() => {
		if (isTransitioning && pendingStep) {
			const timer = setTimeout(() => {
				setCurrentStep(pendingStep)
				setPendingStep(null)
				// Scroll to top of calculator
				calculatorTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
				// Small delay before fading back in
				setTimeout(() => {
					setIsTransitioning(false)
				}, 50)
			}, 200) // Match the CSS transition duration
			return () => clearTimeout(timer)
		}
	}, [isTransitioning, pendingStep])

	// Calculate ROI results
	const results = useMemo(() => {
		const publishTimeReduction = fields.publishTimeReduction || 0.35
		const devInvolvementReduction = fields.devInvolvementReduction || 0.6
		const maintenanceReduction = fields.maintenanceReduction || 0.35
		const upgradeEffortReduction = fields.upgradeEffortReduction || 0.5

		// Marketing efficiency savings
		const hoursPerUpdateSaved = (state.publishTime / 60) * publishTimeReduction
		const monthlyMarketingHoursSaved = state.monthlyUpdates * hoursPerUpdateSaved
		const annualMarketingSavings = monthlyMarketingHoursSaved * state.marketingRate * 12

		// Dev support reduction
		const currentDevRequestsPerMonth = state.monthlyUpdates * (state.devHelpPercent / 100)
		const devRequestsReduced = currentDevRequestsPerMonth * devInvolvementReduction
		const devHoursPerRequestSaved = state.devTimePerRequest / 60
		const monthlyDevHoursSaved = devRequestsReduced * devHoursPerRequestSaved
		const annualDevSavings = monthlyDevHoursSaved * state.engineeringRate * 12

		// Maintenance reduction
		const monthlyMaintenanceHoursSaved = state.maintenanceHours * maintenanceReduction
		const annualMaintenanceSavings = monthlyMaintenanceHoursSaved * state.engineeringRate * 12

		// Upgrade project reduction
		const annualUpgradeHours = state.upgradeEffort / state.upgradeFrequency
		const annualUpgradeHoursSaved = annualUpgradeHours * upgradeEffortReduction
		const annualUpgradeSavings = annualUpgradeHoursSaved * state.engineeringRate

		// Platform savings (if legacy cost provided)
		const platformSavings = state.legacyCost > 0 ? state.legacyCost * 0.25 : 0

		const totalAnnualSavings =
			annualMarketingSavings +
			annualDevSavings +
			annualMaintenanceSavings +
			annualUpgradeSavings +
			platformSavings

		const totalMonthlyHoursSaved = monthlyMarketingHoursSaved + monthlyDevHoursSaved + monthlyMaintenanceHoursSaved

		const fteCapacityFreed = totalMonthlyHoursSaved / 160

		const paybackMonths = state.implementationCost / (totalAnnualSavings / 12)

		return {
			totalAnnualSavings: Math.round(totalAnnualSavings),
			totalMonthlyHoursSaved: Math.round(totalMonthlyHoursSaved),
			fteCapacityFreed: Math.round(fteCapacityFreed * 10) / 10,
			paybackMonths: Math.round(paybackMonths),
			breakdown: {
				marketingEfficiency: Math.round(annualMarketingSavings),
				devSupport: Math.round(annualDevSavings),
				maintenance: Math.round(annualMaintenanceSavings),
				upgrades: Math.round(annualUpgradeSavings),
				platform: Math.round(platformSavings),
			},
			monthlyBreakdown: {
				marketingHours: Math.round(monthlyMarketingHoursSaved),
				devHours: Math.round(monthlyDevHoursSaved),
			},
		}
	}, [state, fields])

	const validateEmail = (email: string) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return re.test(email)
	}

	const handleStartCalculator = () => {
		let hasError = false

		if (!validateEmail(state.email)) {
			setEmailError("Please enter a valid email")
			hasError = true
		} else {
			setEmailError("")
		}

		if (!state.company.trim()) {
			setCompanyError("Please enter your company name")
			hasError = true
		} else {
			setCompanyError("")
		}

		if (!consentGiven) {
			setConsentError("Please agree to the privacy policy to continue")
			hasError = true
		} else {
			setConsentError("")
		}

		if (!marketingOptIn) {
			setMarketingOptInError("Please opt in to receive communications")
			hasError = true
		} else {
			setMarketingOptInError("")
		}

		if (hasError) return

		// Submit lead to HubSpot immediately to capture the contact
		submitLeadToHubSpot()

		transitionToStep("step1")
	}

	const handleNext = () => {
		const steps: CalculatorStep[] = ["form", "step1", "step2", "step3", "step4", "results"]
		const currentIndex = steps.indexOf(currentStep)
		if (currentIndex < steps.length - 1) {
			transitionToStep(steps[currentIndex + 1])
		}
	}

	const handleBack = () => {
		const steps: CalculatorStep[] = ["form", "step1", "step2", "step3", "step4", "results"]
		const currentIndex = steps.indexOf(currentStep)
		if (currentIndex > 0) {
			transitionToStep(steps[currentIndex - 1])
		}
	}

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(value)
	}

	const highlightText = (text: string, highlight: string) => {
		if (!highlight) return text
		const parts = text.split(new RegExp(`(${highlight})`, "gi"))
		return parts.map((part, i) =>
			part.toLowerCase() === highlight.toLowerCase() ? (
				<span key={i} className="text-highlight-light">
					{part}
				</span>
			) : (
				part
			)
		)
	}

	// Helper to get HubSpot tracking cookie
	const getHubSpotCookie = () => {
		const value = `; ${document.cookie}`
		const parts = value.split(`; hubspotutk=`)
		if (parts.length === 2) return parts.pop()?.split(";").shift()
		return undefined
	}

	// Submit lead to HubSpot immediately when user starts the calculator
	const submitLeadToHubSpot = useCallback(async () => {
		if (!fields.hubspotPortalId || !fields.hubspotFormId) {
			console.log("HubSpot not configured - skipping lead submission")
			return
		}

		if (hasSubmittedLead) return

		try {
			const url = `https://api.hsforms.com/submissions/v3/integration/submit/${fields.hubspotPortalId}/${fields.hubspotFormId}`
			const hubspotutk = getHubSpotCookie()

			const data = {
				fields: [
					{ objectTypeId: "0-1", name: "email", value: state.email },
					{ objectTypeId: "0-1", name: "company", value: state.company },
				],
				context: {
					hutk: hubspotutk,
					pageUri: typeof window !== "undefined" ? window.location.href : "",
					pageName: "ROI Calculator",
				},
				legalConsentOptions: {
					consent: {
						consentToProcess: true,
						text: fields.consentText || "I agree to the privacy policy.",
						communications: marketingOptIn
							? [
									{
										value: true,
										subscriptionTypeId: 999,
										text: fields.marketingOptInText || "I agree to receive marketing communications.",
									},
							  ]
							: [],
					},
				},
			}

			await fetch(url, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			})

			setHasSubmittedLead(true)
			console.log("Successfully submitted lead to HubSpot")
		} catch (error) {
			console.error("Error submitting lead to HubSpot:", error)
		}
	}, [fields, state.email, state.company, marketingOptIn, hasSubmittedLead])

	// Submit ROI summary to HubSpot when reaching results (updates existing contact)
	const submitSummaryToHubSpot = useCallback(async () => {
		if (!fields.hubspotPortalId || !fields.hubspotFormId) {
			console.log("HubSpot not configured - skipping summary submission")
			return
		}

		if (hasSubmittedSummary) return

		try {
			const url = `https://api.hsforms.com/submissions/v3/integration/submit/${fields.hubspotPortalId}/${fields.hubspotFormId}`
			const hubspotutk = getHubSpotCookie()

			// Build summary text for sales
			const summary = [
				`=== ROI CALCULATOR RESULTS ===`,
				``,
				`ESTIMATED SAVINGS:`,
				`• Annual Savings: ${formatCurrency(results.totalAnnualSavings)}`,
				`• Monthly Hours Saved: ${results.totalMonthlyHoursSaved} hrs`,
				`• FTE Capacity Freed: ${results.fteCapacityFreed}`,
				`• Payback Period: ${results.paybackMonths} months`,
				``,
				`THEIR SITUATION:`,
				`• Websites/Properties: ${state.websites === 4 ? "4+" : state.websites === 2 ? "2-3" : "1"}`,
				`• Markets/Languages: ${state.markets === 6 ? "6+" : state.markets === 3 ? "2-5" : "1"}`,
				`• Monthly Content Updates: ${state.monthlyUpdates}`,
				`• Content Team Size: ${state.publishers} publishers`,
				``,
				`CURRENT PAIN POINTS:`,
				`• Time to Publish: ${state.publishTime} min`,
				`• ${state.devHelpPercent}% of updates need dev help`,
				`• Dev Time per Request: ${state.devTimePerRequest} min`,
				`• Monthly CMS Maintenance: ${state.maintenanceHours} hrs`,
				`• Upgrade Cycle: Every ${state.upgradeFrequency} year(s), ${state.upgradeEffort} hrs effort`,
				state.legacyCost > 0 ? `• Current CMS Cost: ${formatCurrency(state.legacyCost)}/year` : ``,
				``,
				`COST ASSUMPTIONS:`,
				`• Marketing Rate: $${state.marketingRate}/hr`,
				`• Engineering Rate: $${state.engineeringRate}/hr`,
				`• Implementation Budget: ${formatCurrency(state.implementationCost)}`,
			].filter(line => line !== ``).join(`\n`)

			const data = {
				fields: [
					{ objectTypeId: "0-1", name: "email", value: state.email },
					{ objectTypeId: "0-1", name: "company", value: state.company },
					{ objectTypeId: "0-1", name: "roi_calculator_summary", value: summary },
				],
				context: {
					hutk: hubspotutk,
					pageUri: typeof window !== "undefined" ? window.location.href : "",
					pageName: "ROI Calculator",
				},
				legalConsentOptions: {
					consent: {
						consentToProcess: true,
						text: fields.consentText || "I agree to the privacy policy.",
						communications: marketingOptIn
							? [
									{
										value: true,
										subscriptionTypeId: 999,
										text: fields.marketingOptInText || "I agree to receive marketing communications.",
									},
							  ]
							: [],
					},
				},
			}

			await fetch(url, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			})

			setHasSubmittedSummary(true)
			console.log("Successfully submitted ROI summary to HubSpot")
		} catch (error) {
			console.error("Error submitting summary to HubSpot:", error)
		}
	}, [fields, state, results, marketingOptIn, hasSubmittedSummary])

	// Trigger summary submission when reaching results
	useEffect(() => {
		if (currentStep === "results" && !hasSubmittedSummary) {
			submitSummaryToHubSpot()
		}
	}, [currentStep, hasSubmittedSummary, submitSummaryToHubSpot])

	const steps = [
		{ id: "step1", label: "Baseline" },
		{ id: "step2", label: "Team" },
		{ id: "step3", label: "Publishing" },
		{ id: "step4", label: "IT Overhead" },
	]

	const currentStepIndex = steps.findIndex((s) => s.id === currentStep)

	return (
		<div className="py-10">
			{/* Hero Section */}
			<div className="mb-12 text-center">
				{fields.tagText && (
					<span className="mb-4 inline-flex items-center gap-2 rounded-full bg-highlight-light/10 px-4 py-2 text-sm font-medium text-highlight-light">
						<IconChartBar size={16} />
						{fields.tagText}
					</span>
				)}
				<h1 className="mt-4 text-4xl font-bold text-primary md:text-5xl">
					{highlightText(fields.heading, fields.headingHighlight)}
				</h1>
				<p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">{fields.subheading}</p>
			</div>

			{/* Scroll anchor for step navigation - positioned to show step indicators */}
			<div ref={calculatorTopRef} className="scroll-mt-24" />

			{/* Progress Steps (show when in calculator) */}
			{currentStep !== "form" && currentStep !== "results" && (
				<div className="mb-8 flex justify-center px-4">
					<div className="flex items-center gap-1 md:gap-2">
						{steps.map((step, index) => (
							<div key={step.id} className="flex items-center">
								<div
									className={clsx(
										"flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-all md:h-8 md:w-8 md:text-sm",
										currentStepIndex > index
											? "bg-highlight-light text-white"
											: currentStepIndex === index
												? "bg-highlight-light text-white ring-4 ring-highlight-light/20"
												: "bg-gray-200 text-gray-500"
									)}
								>
									{currentStepIndex > index ? <IconCheck size={14} /> : index + 1}
								</div>
								<span
									className={clsx(
										"ml-1 hidden text-xs font-medium md:inline md:ml-2 md:text-sm",
										currentStepIndex >= index ? "text-primary" : "text-gray-400"
									)}
								>
									{step.label}
								</span>
								{index < steps.length - 1 && (
									<div
										className={clsx(
											"mx-2 h-0.5 w-4 md:mx-4 md:w-12",
											currentStepIndex > index ? "bg-highlight-light" : "bg-gray-200"
										)}
									/>
								)}
							</div>
						))}
					</div>
				</div>
			)}

			{/* Form Card */}
			<div className="mx-auto max-w-2xl">
				<div
					className={clsx(
						"transition-all duration-200 ease-in-out",
						isTransitioning
							? "translate-y-2 opacity-0"
							: "translate-y-0 opacity-100"
					)}
				>
				{/* Lead Capture Form */}
				{currentStep === "form" && (
					<div className="rounded-2xl bg-white p-5 shadow-lg md:p-8">
						<h2 className="mb-2 text-center text-2xl font-bold text-primary">{fields.formHeading}</h2>
						<p className="mb-6 text-center text-gray-600">{fields.formSubheading}</p>

						<div className="space-y-4">
							<div>
								<label className="mb-1 flex items-center gap-2 text-sm font-medium text-gray-700">
									<IconMail size={16} className="text-gray-400" />
									{fields.emailLabel}
									<span className="text-red-500">*</span>
								</label>
								<input
									type="email"
									value={state.email}
									onChange={(e) => {
										setState({ ...state, email: e.target.value })
										setEmailError("")
									}}
									placeholder={fields.emailPlaceholder}
									className={clsx(
										"w-full rounded-lg border px-4 py-3 transition-colors focus:border-highlight-light focus:outline-none focus:ring-2 focus:ring-highlight-light/20",
										emailError ? "border-red-500" : "border-gray-300"
									)}
								/>
								{emailError && <p className="mt-1 text-sm text-red-500">{emailError}</p>}
							</div>

							<div>
								<label className="mb-1 flex items-center gap-2 text-sm font-medium text-gray-700">
									<IconBuilding size={16} className="text-gray-400" />
									{fields.companyLabel}
									<span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									value={state.company}
									onChange={(e) => {
										setState({ ...state, company: e.target.value })
										setCompanyError("")
									}}
									placeholder={fields.companyPlaceholder}
									className={clsx(
										"w-full rounded-lg border px-4 py-3 transition-colors focus:border-highlight-light focus:outline-none focus:ring-2 focus:ring-highlight-light/20",
										companyError ? "border-red-500" : "border-gray-300"
									)}
								/>
								{companyError && <p className="mt-1 text-sm text-red-500">{companyError}</p>}
							</div>

							{/* Consent Checkboxes */}
							<div className="space-y-3 pt-2">
								<label className={clsx(
									"flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors",
									consentError ? "border-red-500 bg-red-50" : consentGiven ? "border-highlight-light bg-highlight-light/5" : "border-gray-200 hover:border-gray-300"
								)}>
									<input
										type="checkbox"
										checked={consentGiven}
										onChange={(e) => {
											setConsentGiven(e.target.checked)
											if (e.target.checked) setConsentError("")
										}}
										className="mt-0.5 h-4 w-4 rounded border-gray-300 text-highlight-light focus:ring-highlight-light"
									/>
									<span className="text-sm text-gray-700">
										{fields.consentText || "I agree to the Privacy Policy and consent to having my data processed."}
										{fields.privacyPolicyLink?.href && (
											<>
												{" "}
												<a
													href={fields.privacyPolicyLink.href}
													target={fields.privacyPolicyLink.target || "_blank"}
													className="text-highlight-light underline hover:text-highlight-dark"
													onClick={(e) => e.stopPropagation()}
												>
													Privacy Policy
												</a>
											</>
										)}
										<span className="text-red-500"> *</span>
									</span>
								</label>
								{consentError && <p className="text-sm text-red-500">{consentError}</p>}

								<label className={clsx(
									"flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors",
									marketingOptInError ? "border-red-500 bg-red-50" : marketingOptIn ? "border-highlight-light bg-highlight-light/5" : "border-gray-200 hover:border-gray-300"
								)}>
									<input
										type="checkbox"
										checked={marketingOptIn}
										onChange={(e) => {
											setMarketingOptIn(e.target.checked)
											if (e.target.checked) setMarketingOptInError("")
										}}
										className="mt-0.5 h-4 w-4 rounded border-gray-300 text-highlight-light focus:ring-highlight-light"
									/>
									<span className="text-sm text-gray-700">
										{fields.marketingOptInText || "Send me product updates, tips, and content about headless CMS."}
										<span className="text-red-500"> *</span>
									</span>
								</label>
								{marketingOptInError && <p className="text-sm text-red-500">{marketingOptInError}</p>}
							</div>

							<button
								onClick={handleStartCalculator}
								className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-highlight-light px-6 py-3 font-medium text-white transition-all hover:scale-[1.02] hover:bg-highlight-dark"
							>
								{fields.startButtonText}
								<IconArrowRight size={18} />
							</button>
						</div>
					</div>
				)}

				{/* Step 1: Baseline */}
				{currentStep === "step1" && (
					<div className="rounded-2xl bg-white p-5 shadow-lg md:p-8">
						<h2 className="mb-2 text-2xl font-bold text-primary">{fields.step1Heading}</h2>
						<p className="mb-6 text-gray-600">{fields.step1Subheading}</p>

						<div className="space-y-6">
							<QuestionWithOptions
								icon={<IconWorld size={18} />}
								question={fields.websitesQuestion}
								value={state.websites}
								onChange={(v) => setState({ ...state, websites: v })}
								options={[
									{ value: 1, label: "1", sublabel: "Single property" },
									{ value: 2, label: "2-3", sublabel: "Small portfolio" },
									{ value: 4, label: "4+", sublabel: "Enterprise" },
								]}
							/>

							<QuestionWithOptions
								icon={<IconLanguage size={18} />}
								question={fields.marketsQuestion}
								value={state.markets}
								onChange={(v) => setState({ ...state, markets: v })}
								options={[
									{ value: 1, label: "1", sublabel: "Single market" },
									{ value: 3, label: "2-5", sublabel: "Multi-region" },
									{ value: 6, label: "6+", sublabel: "Global" },
								]}
							/>

							<SliderQuestion
								icon={<IconFileText size={18} />}
								question={fields.updatesQuestion}
								value={state.monthlyUpdates}
								onChange={(v) => setState({ ...state, monthlyUpdates: v })}
								min={fields.updatesMin || 10}
								max={fields.updatesMax || 500}
								formatValue={(v) => v.toString()}
							/>
						</div>

						<NavigationButtons onBack={handleBack} onNext={handleNext} showBack={false} />
					</div>
				)}

				{/* Step 2: Team & Costs */}
				{currentStep === "step2" && (
					<div className="rounded-2xl bg-white p-5 shadow-lg md:p-8">
						<h2 className="mb-2 text-2xl font-bold text-primary">{fields.step2Heading}</h2>
						<p className="mb-6 text-gray-600">{fields.step2Subheading}</p>

						<div className="space-y-6">
							<SliderQuestion
								icon={<IconUsers size={18} />}
								question={fields.publishersQuestion}
								value={state.publishers}
								onChange={(v) => setState({ ...state, publishers: v })}
								min={fields.publishersMin || 1}
								max={fields.publishersMax || 50}
								formatValue={(v) => `${v} people`}
							/>

							<SliderQuestion
								icon={<IconCurrencyDollar size={18} />}
								question={fields.marketingRateQuestion}
								value={state.marketingRate}
								onChange={(v) => setState({ ...state, marketingRate: v })}
								min={fields.marketingRateMin || 30}
								max={fields.marketingRateMax || 150}
								formatValue={(v) => `$${v}/hr`}
							/>

							<SliderQuestion
								icon={<IconCode size={18} />}
								question={fields.engineeringRateQuestion}
								value={state.engineeringRate}
								onChange={(v) => setState({ ...state, engineeringRate: v })}
								min={fields.engineeringRateMin || 50}
								max={fields.engineeringRateMax || 250}
								formatValue={(v) => `$${v}/hr`}
							/>

							{fields.step2Tip && (
								<div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
									<span className="mr-1">💡</span>
									<span className="font-medium">Tip:</span> {fields.step2Tip}
								</div>
							)}
						</div>

						<NavigationButtons onBack={handleBack} onNext={handleNext} />
					</div>
				)}

				{/* Step 3: Time-to-Publish Pain */}
				{currentStep === "step3" && (
					<div className="rounded-2xl bg-white p-5 shadow-lg md:p-8">
						<h2 className="mb-2 text-2xl font-bold text-primary">{fields.step3Heading}</h2>
						<p className="mb-6 text-gray-600">{fields.step3Subheading}</p>

						<div className="space-y-6">
							<QuestionWithOptions
								icon={<IconClock size={18} />}
								question={fields.publishTimeQuestion}
								value={state.publishTime}
								onChange={(v) => setState({ ...state, publishTime: v })}
								options={[
									{ value: 15, label: "15 min", sublabel: "Quick updates" },
									{ value: 30, label: "30 min", sublabel: "Standard" },
									{ value: 60, label: "60 min", sublabel: "Complex" },
									{ value: 120, label: "2+ hours", sublabel: "Very complex workflow" },
								]}
								columns={2}
							/>

							<SliderQuestion
								icon={<IconHelp size={18} />}
								question={fields.devHelpQuestion}
								value={state.devHelpPercent}
								onChange={(v) => setState({ ...state, devHelpPercent: v })}
								min={0}
								max={100}
								formatValue={(v) => `${v}%`}
							/>

							<QuestionWithOptions
								icon={<IconSettings size={18} />}
								question={fields.devTimeQuestion}
								value={state.devTimePerRequest}
								onChange={(v) => setState({ ...state, devTimePerRequest: v })}
								options={[
									{ value: 15, label: "15 min", sublabel: "Simple fix" },
									{ value: 30, label: "30 min", sublabel: "Standard" },
									{ value: 60, label: "60 min", sublabel: "Complex" },
								]}
							/>
						</div>

						<NavigationButtons onBack={handleBack} onNext={handleNext} />
					</div>
				)}

				{/* Step 4: IT Overhead */}
				{currentStep === "step4" && (
					<div className="rounded-2xl bg-white p-5 shadow-lg md:p-8">
						<h2 className="mb-2 text-2xl font-bold text-primary">{fields.step4Heading}</h2>
						<p className="mb-6 text-gray-600">{fields.step4Subheading}</p>

						<div className="space-y-6">
							<SliderQuestion
								icon={<IconTool size={18} />}
								question={fields.maintenanceQuestion}
								value={state.maintenanceHours}
								onChange={(v) => setState({ ...state, maintenanceHours: v })}
								min={fields.maintenanceMin || 0}
								max={fields.maintenanceMax || 200}
								formatValue={(v) => `${v} hrs/mo`}
							/>

							<QuestionWithOptions
								icon={<IconCalendar size={18} />}
								question={fields.upgradeFreqQuestion}
								value={state.upgradeFrequency}
								onChange={(v) => setState({ ...state, upgradeFrequency: v })}
								options={[
									{ value: 1, label: "Every year", sublabel: "Frequent" },
									{ value: 2, label: "Every 2 years", sublabel: "Standard" },
									{ value: 3, label: "Every 3+ years", sublabel: "Rare" },
								]}
							/>

							<SliderQuestion
								icon={<IconCode size={18} />}
								question={fields.upgradeEffortQuestion}
								value={state.upgradeEffort}
								onChange={(v) => setState({ ...state, upgradeEffort: v })}
								min={fields.upgradeEffortMin || 20}
								max={fields.upgradeEffortMax || 800}
								formatValue={(v) => `${v} hrs`}
							/>

							<div>
								<label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
									<IconCurrencyDollar size={18} className="text-gray-400" />
									{fields.legacyCostQuestion}
								</label>
								<div className="flex items-center gap-2">
									<span className="text-gray-500">$</span>
									<input
										type="number"
										value={state.legacyCost || ""}
										onChange={(e) =>
											setState({ ...state, legacyCost: parseInt(e.target.value) || 0 })
										}
										placeholder="Licensing + hosting + support"
										className="flex-1 rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-highlight-light focus:outline-none focus:ring-2 focus:ring-highlight-light/20"
									/>
								</div>
								<p className="mt-1 text-sm text-gray-500">{fields.legacyCostHelp}</p>
							</div>
						</div>

						<NavigationButtons
							onBack={handleBack}
							onNext={handleNext}
							nextLabel="Calculate ROI"
						/>
					</div>
				)}

				{/* Results */}
				{currentStep === "results" && (
					<div className="space-y-6">
						<button
							onClick={() => transitionToStep("step4")}
							className="flex items-center gap-2 text-sm font-medium text-highlight-light hover:text-highlight-dark"
						>
							<IconArrowLeft size={16} />
							Edit Inputs
						</button>

						{/* Main Results Card */}
						<div className="rounded-2xl bg-gradient-to-br from-highlight-light to-highlight-dark p-5 text-white shadow-lg md:p-8">
							<h2 className="text-lg font-medium md:text-xl">
								{fields.resultsHeadingPrefix}
								{results.totalMonthlyHoursSaved} hours/month and
							</h2>
							<p className="mt-2 text-3xl font-bold md:text-5xl">{formatCurrency(results.totalAnnualSavings)}/year</p>
							<p className="mt-2 text-base opacity-90 md:text-lg">{fields.resultsHeadingSuffix}</p>

							<div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-6">
								<div className="flex items-center gap-2">
									<IconUserCheck size={20} />
									<span>
										<strong>{results.fteCapacityFreed}</strong> FTE capacity freed
									</span>
								</div>
								<div className="flex items-center gap-2">
									<IconClockHour4 size={20} />
									<span>
										<strong>{results.paybackMonths}</strong> month payback
									</span>
								</div>
							</div>
						</div>

						{/* Savings Breakdown */}
						<div className="rounded-2xl bg-white p-4 shadow-lg md:p-6">
							<h3 className="mb-4 flex items-center gap-2 font-bold text-primary">
								<IconPigMoney size={20} className="text-highlight-light" />
								Savings Breakdown
							</h3>
							<div className="space-y-3">
								<BreakdownRow
									label="Marketing & content efficiency"
									value={formatCurrency(results.breakdown.marketingEfficiency)}
									sublabel={`${results.monthlyBreakdown.marketingHours} hours/month saved`}
									color="bg-purple-500"
								/>
								<BreakdownRow
									label="Less dev support work"
									value={formatCurrency(results.breakdown.devSupport)}
									sublabel={`${results.monthlyBreakdown.devHours} dev hours/month saved`}
									color="bg-blue-500"
								/>
								<BreakdownRow
									label="Lower CMS maintenance"
									value={formatCurrency(results.breakdown.maintenance)}
									sublabel={`${Math.round((fields.maintenanceReduction || 0.35) * 100)}% reduction`}
									color="bg-teal-500"
								/>
								<BreakdownRow
									label="Fewer upgrade projects"
									value={formatCurrency(results.breakdown.upgrades)}
									sublabel={`${Math.round((fields.upgradeEffortReduction || 0.5) * 100)}% reduction`}
									color="bg-green-500"
								/>
								{results.breakdown.platform > 0 && (
									<BreakdownRow
										label="Platform cost savings"
										value={formatCurrency(results.breakdown.platform)}
										sublabel="25% reduction"
										color="bg-orange-500"
									/>
								)}
							</div>
							{state.legacyCost === 0 && (
								<p className="mt-4 text-sm text-gray-500">
									* Platform savings not included — enter legacy CMS cost to see potential savings
								</p>
							)}
						</div>

						{/* Implementation Investment */}
						<div className="rounded-2xl bg-white p-4 shadow-lg md:p-6">
							<h3 className="mb-4 flex items-center gap-2 font-bold text-primary">
								<IconChartBar size={20} className="text-highlight-light" />
								Estimated Implementation Investment
							</h3>
							<div className="mb-4 flex flex-wrap gap-2">
								{[25000, 75000, 150000, 300000].map((amount) => (
									<button
										key={amount}
										onClick={() => setState({ ...state, implementationCost: amount })}
										className={clsx(
											"rounded-lg px-4 py-2 text-sm font-medium transition-all",
											state.implementationCost === amount
												? "bg-highlight-light text-white"
												: "bg-gray-100 text-gray-700 hover:bg-gray-200"
										)}
									>
										${amount / 1000}k
									</button>
								))}
							</div>
							<SliderQuestion
								icon={<IconCurrencyDollar size={18} />}
								question=""
								value={state.implementationCost}
								onChange={(v) => setState({ ...state, implementationCost: v })}
								min={fields.implementationMin || 10000}
								max={fields.implementationMax || 500000}
								step={5000}
								formatValue={(v) => formatCurrency(v)}
							/>
						</div>

						{/* CTA Section */}
						<div className="rounded-2xl bg-gradient-to-r from-primary to-gray-800 p-5 text-center text-white shadow-lg md:p-8">
							<h3 className="text-xl font-bold md:text-2xl">{fields.ctaHeading}</h3>
							<p className="mx-auto mt-2 max-w-md text-sm text-gray-300 md:text-base">{fields.ctaSubheading}</p>
							<div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
								{fields.ctaPrimaryButton?.href && (
									<LinkButton
										href={fields.ctaPrimaryButton.href}
										target={fields.ctaPrimaryButton.target}
										type="alternate"
										size="lg"
									>
										{fields.ctaPrimaryButton.text || "Schedule a Demo"}
									</LinkButton>
								)}
								{fields.ctaSecondaryButton?.href && (
									<LinkButton
										href={fields.ctaSecondaryButton.href}
										target={fields.ctaSecondaryButton.target}
										type="secondary-inverted"
										size="lg"
									>
										{fields.ctaSecondaryButton.text || "Learn More"}
									</LinkButton>
								)}
							</div>
						</div>
					</div>
				)}
				</div>
			</div>

			{/* Footer */}
			<p className="mt-12 text-center text-sm text-gray-500">{fields.footerText}</p>
		</div>
	)
}

// Helper Components

interface QuestionWithOptionsProps {
	icon: React.ReactNode
	question: string
	value: number
	onChange: (value: number) => void
	options: { value: number; label: string; sublabel: string }[]
	columns?: number
}

const QuestionWithOptions = ({
	icon,
	question,
	value,
	onChange,
	options,
	columns = 3,
}: QuestionWithOptionsProps) => (
	<div>
		<label className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-700">
			<span className="text-gray-400">{icon}</span>
			{question}
		</label>
		<div className={clsx("grid gap-3", columns === 2 ? "grid-cols-2" : "grid-cols-3")}>
			{options.map((opt) => (
				<button
					key={opt.value}
					onClick={() => onChange(opt.value)}
					className={clsx(
						"rounded-xl border-2 p-4 text-center transition-all",
						value === opt.value
							? "border-highlight-light bg-highlight-light/5"
							: "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
					)}
				>
					<div
						className={clsx(
							"text-lg font-bold",
							value === opt.value ? "text-highlight-light" : "text-primary"
						)}
					>
						{opt.label}
					</div>
					<div className="text-xs text-gray-500">{opt.sublabel}</div>
				</button>
			))}
		</div>
	</div>
)

interface SliderQuestionProps {
	icon: React.ReactNode
	question: string
	value: number
	onChange: (value: number) => void
	min: number
	max: number
	step?: number
	formatValue: (value: number) => string
}

const SliderQuestion = ({ icon, question, value, onChange, min, max, step = 1, formatValue }: SliderQuestionProps) => (
	<div className="rounded-xl bg-gray-50 p-4">
		<div className="mb-3 flex items-center justify-between">
			<label className="flex items-center gap-2 text-sm font-medium text-gray-700">
				<span className="text-gray-400">{icon}</span>
				{question}
			</label>
			<span className="text-lg font-bold text-highlight-light">{formatValue(value)}</span>
		</div>
		<input
			type="range"
			min={min}
			max={max}
			step={step}
			value={value}
			onChange={(e) => onChange(parseInt(e.target.value))}
			className="w-full accent-highlight-light"
		/>
		<div className="mt-1 flex justify-between text-xs text-gray-400">
			<span>{formatValue(min)}</span>
			<span>{formatValue(max)}</span>
		</div>
	</div>
)

interface NavigationButtonsProps {
	onBack: () => void
	onNext: () => void
	showBack?: boolean
	nextLabel?: string
}

const NavigationButtons = ({ onBack, onNext, showBack = true, nextLabel = "Next" }: NavigationButtonsProps) => (
	<div className="mt-8 flex justify-between">
		{showBack ? (
			<button
				onClick={onBack}
				className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-600 transition-colors hover:bg-gray-100"
			>
				<IconArrowLeft size={18} />
				Back
			</button>
		) : (
			<div />
		)}
		<button
			onClick={onNext}
			className="flex items-center gap-2 rounded-lg bg-highlight-light px-6 py-2 font-medium text-white transition-all hover:scale-[1.02] hover:bg-highlight-dark"
		>
			{nextLabel}
			<IconArrowRight size={18} />
		</button>
	</div>
)

interface BreakdownRowProps {
	label: string
	value: string
	sublabel: string
	color: string
}

const BreakdownRow = ({ label, value, sublabel, color }: BreakdownRowProps) => (
	<div className="flex items-center justify-between gap-2 rounded-lg bg-gray-50 p-3">
		<div className="flex min-w-0 items-center gap-2 md:gap-3">
			<div className={clsx("h-3 w-3 shrink-0 rounded-full", color)} />
			<div className="min-w-0">
				<div className="text-sm font-medium text-primary md:text-base">{label}</div>
				<div className="text-xs text-gray-500">{sublabel}</div>
			</div>
		</div>
		<div className="shrink-0 text-base font-bold text-primary md:text-lg">{value}</div>
	</div>
)
