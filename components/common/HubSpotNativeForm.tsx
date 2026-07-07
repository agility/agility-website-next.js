"use client"

/**
 * Shared native HubSpot form renderer.
 *
 * Renders a HubSpot form NATIVELY (no `js.hsforms.net` embed / iframe) from a
 * definition fetched server-side by `getHubSpotFormDefinition`, and submits
 * through our first-party `/api/forms/hubspot` proxy. This keeps forms working
 * for visitors with ad blockers / tracking prevention (Edge InPrivate, etc.)
 * that block the HubSpot domains, and off the LCP/INP critical path.
 *
 * Extracted from GetADemo.client.tsx (PR #86) so every form can reuse the same
 * validation / honeypot / submit / conversion-tracking path. See issue #87.
 */

import classNames from "classnames"
import { useRouter } from "next/navigation"
import { useCallback, useMemo, useRef, useState } from "react"
import { capture, identify } from "lib/analytics/posthog"
import { LinkButton } from "components/micro/LinkButton"
import type {
	HubSpotFormDefinition,
	HubSpotFormField,
} from "lib/hubspot/getHubSpotFormDefinition"

const SUBMIT_ENDPOINT = "/api/forms/hubspot"

const SUBMIT_ERROR_MESSAGE =
	"Something went wrong submitting the form. Please try again or email sales@agilitycms.com."

// Minimal fallback so a form still renders if the server-side definition fetch
// fails AND the caller didn't supply its own fallback. Business-email only.
const GENERIC_FALLBACK_DEFINITION: HubSpotFormDefinition = {
	submitText: "Submit",
	redirectUrl: "",
	fields: [
		{
			name: "email",
			label: "Business Email",
			fieldType: "email",
			required: true,
			hidden: false,
			placeholder: "",
			defaultValue: "",
			objectTypeId: "0-1",
			blockFreeEmail: true,
			options: [],
		},
	],
	processingConsentText:
		"I agree to allow Agility Inc. to store and process my personal data.",
	processingConsentType: "IMPLICIT",
	isLegitimateInterest: false,
	communicationConsentCheckboxes: [],
	captchaEnabled: false,
}

// Reasonable hardcoded fallback for standard lead-gen / gated forms, used when
// the server-side definition fetch fails so the form still renders + submits.
export const LEAD_FORM_FALLBACK: HubSpotFormDefinition = {
	submitText: "Submit",
	redirectUrl: "",
	fields: [
		{ name: "firstname", label: "First name", fieldType: "text", required: true, hidden: false, placeholder: "", defaultValue: "", objectTypeId: "0-1", blockFreeEmail: false, options: [] },
		{ name: "lastname", label: "Last name", fieldType: "text", required: true, hidden: false, placeholder: "", defaultValue: "", objectTypeId: "0-1", blockFreeEmail: false, options: [] },
		{ name: "email", label: "Business Email", fieldType: "email", required: true, hidden: false, placeholder: "", defaultValue: "", objectTypeId: "0-1", blockFreeEmail: true, options: [] },
		{ name: "company", label: "Company name", fieldType: "text", required: false, hidden: false, placeholder: "", defaultValue: "", objectTypeId: "0-1", blockFreeEmail: false, options: [] },
	],
	processingConsentText: "I agree to allow Agility Inc. to store and process my personal data.",
	processingConsentType: "IMPLICIT",
	isLegitimateInterest: false,
	communicationConsentCheckboxes: [
		{ communicationTypeId: 61656565, label: "I would like to receive marketing communications from Agility CMS on product & industry updates, services and events. I understand I can unsubscribe at any time.", required: false },
	],
	captchaEnabled: false,
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Common free / personal email providers. Mirrors HubSpot's "block free email
// domains" validation for instant client-side feedback; HubSpot's server-side
// list stays the authoritative backstop (BLOCKED_EMAIL) for anything not here.
const FREE_EMAIL_DOMAINS = new Set([
	"gmail.com", "googlemail.com",
	"yahoo.com", "yahoo.co.uk", "yahoo.co.in", "yahoo.ca", "yahoo.fr", "ymail.com", "rocketmail.com",
	"hotmail.com", "hotmail.co.uk", "hotmail.fr", "outlook.com", "outlook.co.uk", "live.com", "msn.com",
	"aol.com", "icloud.com", "me.com", "mac.com",
	"protonmail.com", "proton.me", "pm.me", "gmx.com", "gmx.net", "mail.com", "hey.com", "fastmail.com",
	"yandex.com", "yandex.ru", "zoho.com",
	"qq.com", "163.com", "126.com", "sina.com", "naver.com",
	"comcast.net", "verizon.net", "att.net", "sbcglobal.net", "bellsouth.net", "cox.net",
	"rediffmail.com", "hushmail.com", "inbox.com",
])

const isFreeEmailDomain = (email: string): boolean => {
	const at = email.lastIndexOf("@")
	if (at === -1) return false
	return FREE_EMAIL_DOMAINS.has(email.slice(at + 1).trim().toLowerCase())
}

// autoComplete hints keyed by HubSpot field name.
const AUTOCOMPLETE: Record<string, string> = {
	firstname: "given-name",
	lastname: "family-name",
	company: "organization",
	email: "email",
	phone: "tel",
	mobilephone: "tel",
	jobtitle: "organization-title",
}

const isEmailField = (f: HubSpotFormField): boolean =>
	f.name === "email" || f.fieldType === "email"

const inputTypeFor = (f: HubSpotFormField): string => {
	if (isEmailField(f)) return "email"
	if (f.fieldType === "phonenumber" || f.name.includes("phone")) return "tel"
	if (f.fieldType === "number") return "number"
	if (f.fieldType === "date") return "date"
	return "text"
}

// Field types the native renderer knows how to draw. Anything else is skipped
// with a dev warning so a form doesn't render a broken/blank control (see the
// "renderer gap" note in issue #87 — file uploads can't go through the JSON
// submission proxy, and unknown types need a developer before use).
const RENDERABLE_TYPES = new Set([
	"text", "textarea", "select", "radio", "checkbox", "booleancheckbox",
	"number", "phonenumber", "email", "date",
])

const getCookie = (key: string): string | undefined => {
	if (typeof document === "undefined") return undefined
	const value = `; ${document.cookie}`
	const parts = value.split(`; ${key}=`)
	if (parts.length === 2) return parts.pop()?.split(";").shift()
	return undefined
}

// A checkbox group stores its selection as a HubSpot-style ";"-joined string.
const splitMulti = (raw: string): string[] =>
	(raw || "").split(";").map((s) => s.trim()).filter(Boolean)

type LinkButtonType =
	| "primary"
	| "primary-outline"
	| "secondary"
	| "secondary-bg"
	| "secondary-inverted"
	| "alternate"
	| "slate"

export interface HubSpotNativeFormProps {
	/**
	 * Legacy fallback only. Prefer `contentID` — when set, the submission route
	 * resolves portal/form IDs from the CMS content item and ignores these.
	 */
	portalId?: string | number
	formId?: string
	/**
	 * Agility content item that holds the HubSpot form config. When set, the
	 * submission route resolves portal/form IDs from this item server-side
	 * (CMS as source of truth) instead of trusting the client-sent IDs.
	 */
	contentID?: number
	/** Locale for the content-item lookup in the submission route. */
	languageCode?: string
	/** Field on the content item holding the form JSON. Default "hubspotForm". */
	formFieldName?: string
	/** Name used for the PostHog conversion event payload. */
	formName?: string
	/** Fetched server-side via getHubSpotFormDefinition(). Null -> fallback. */
	formDefinition?: HubSpotFormDefinition | null
	/** Used when formDefinition is null so the form always renders. */
	fallbackDefinition?: HubSpotFormDefinition
	/** Overrides the form definition's redirectUrl when set. */
	redirectURL?: string
	/**
	 * "hard" = full-page navigation (default). Needed when the destination
	 * mounts third-party widgets that only initialize on a real document load
	 * (e.g. the demo thank-you scheduler). "soft" = client-side router.push.
	 */
	redirectStrategy?: "hard" | "soft"
	/** PostHog event captured on successful submit. */
	trackingEventName?: string
	/** Extra props for the PostHog event. Defaults to { name: formName }. */
	trackingProps?: Record<string, unknown>
	/** Shown after a successful submit when there is no redirect target. */
	successMessage?: string
	/** "light" (default) or "dark" for label/consent text on dark backgrounds. */
	theme?: "light" | "dark"
	/** LinkButton visual type for the submit button. */
	submitButtonType?: LinkButtonType
	/** Prefix for field element ids (a11y). Defaults to `hsf-${formId}`. */
	idPrefix?: string
	className?: string
	/** Extra classes on the submit button. */
	submitClassName?: string
}

export const HubSpotNativeForm = ({
	portalId,
	formId,
	contentID,
	languageCode,
	formFieldName,
	formName,
	formDefinition,
	fallbackDefinition,
	redirectURL,
	redirectStrategy = "hard",
	trackingEventName = "website-form-submission",
	trackingProps,
	successMessage = "Thanks! We'll be in touch shortly.",
	theme = "light",
	submitButtonType = "primary",
	idPrefix,
	className,
	submitClassName = "w-full",
}: HubSpotNativeFormProps) => {
	const router = useRouter()
	const def = formDefinition ?? fallbackDefinition ?? GENERIC_FALLBACK_DEFINITION
	const prefix = idPrefix || `hsf-${formId}`

	// Only draw field types we can actually render; warn on the rest.
	const renderableFields = useMemo(
		() =>
			def.fields.filter((f) => {
				if (RENDERABLE_TYPES.has(f.fieldType)) return true
				if (process.env.NODE_ENV !== "production") {
					console.warn(
						`HubSpotNativeForm: unsupported field type "${f.fieldType}" for "${f.name}" — skipping. A developer must add support before this form uses it.`
					)
				}
				return false
			}),
		[def]
	)
	const visibleFields = useMemo(() => renderableFields.filter((f) => !f.hidden), [renderableFields])
	const hiddenFields = useMemo(() => renderableFields.filter((f) => f.hidden), [renderableFields])

	const [values, setValues] = useState<Record<string, string>>(() =>
		Object.fromEntries(def.fields.map((f) => [f.name, f.defaultValue || ""]))
	)
	const [consents, setConsents] = useState<Record<number, boolean>>(() =>
		Object.fromEntries(def.communicationConsentCheckboxes.map((c) => [c.communicationTypeId, false]))
	)
	const [errors, setErrors] = useState<Record<string, string | undefined>>({})
	const [submitting, setSubmitting] = useState(false)
	const [submitError, setSubmitError] = useState<string | null>(null)
	const [submitted, setSubmitted] = useState(false)
	const honeypotRef = useRef<HTMLInputElement>(null)

	const labelClass = theme === "dark" ? "text-gray-100" : "text-gray-700"
	const consentTextClass = theme === "dark" ? "text-gray-200" : "text-gray-600"

	const setField = (name: string, value: string) => {
		setValues((v) => ({ ...v, [name]: value }))
		if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }))
	}

	const toggleMulti = (name: string, optionValue: string, checked: boolean) => {
		setValues((v) => {
			const current = splitMulti(v[name])
			const next = checked
				? Array.from(new Set([...current, optionValue]))
				: current.filter((o) => o !== optionValue)
			return { ...v, [name]: next.join(";") }
		})
		if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }))
	}

	// Per-field validation. Returns an error message or undefined.
	const getFieldError = useCallback((f: HubSpotFormField, raw: string): string | undefined => {
		const val = (raw ?? "").trim()
		if (f.required && !val) return `${f.label || f.name} is required.`
		if (isEmailField(f) && val) {
			if (!EMAIL_RE.test(val)) return "Please enter a valid email address."
			if (f.blockFreeEmail && isFreeEmailDomain(val)) return "Please use your business email address."
		}
		return undefined
	}, [])

	const validate = useCallback((): boolean => {
		const next: Record<string, string | undefined> = {}
		let ok = true
		for (const f of visibleFields) {
			const err = getFieldError(f, values[f.name] || "")
			if (err) {
				next[f.name] = err
				ok = false
			}
		}
		for (const c of def.communicationConsentCheckboxes) {
			if (c.required && !consents[c.communicationTypeId]) {
				next[`consent_${c.communicationTypeId}`] = "This consent is required."
				ok = false
			}
		}
		setErrors(next)
		return ok
	}, [visibleFields, values, def.communicationConsentCheckboxes, consents, getFieldError])

	// Instant feedback on blur for the work-email field only (skip when empty).
	const handleFieldBlur = (f: HubSpotFormField) => {
		if (!isEmailField(f)) return
		if (!(values[f.name] || "").trim()) return
		setErrors((prev) => ({ ...prev, [f.name]: getFieldError(f, values[f.name] || "") }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setSubmitError(null)
		if (submitting) return
		if (!validate()) return

		setSubmitting(true)

		// Hidden fields (e.g. utm_*) are populated from matching URL query params,
		// falling back to the field's default — matching HubSpot's embed behavior.
		const sp =
			typeof window !== "undefined"
				? new URLSearchParams(window.location.search)
				: new URLSearchParams()
		const fieldsPayload: Record<string, string> = {}
		for (const f of visibleFields) {
			let v = (values[f.name] || "").trim()
			// HubSpot's submission API expects date fields as an epoch-ms timestamp
			// at midnight UTC.
			if (f.fieldType === "date" && v) {
				const ms = Date.parse(`${v}T00:00:00Z`)
				if (!Number.isNaN(ms)) v = `${ms}`
			}
			if (v) fieldsPayload[f.name] = v
		}
		for (const f of hiddenFields) {
			const v = sp.get(f.name) ?? f.defaultValue ?? ""
			if (v) fieldsPayload[f.name] = v
		}
		fieldsPayload._hp_email = honeypotRef.current?.value || ""

		const communications = def.communicationConsentCheckboxes.map((c) => ({
			subscriptionTypeId: c.communicationTypeId,
			value: !!consents[c.communicationTypeId],
			text: c.label,
		}))

		try {
			const res = await fetch(SUBMIT_ENDPOINT, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					// contentID is authoritative server-side; portalId/formId are only
					// sent as a legacy fallback when a form has no content item to
					// resolve from.
					...(contentID
						? { contentID, languageCode, fieldName: formFieldName }
						: { portalId: `${portalId}`, formId }),
					fields: fieldsPayload,
					communications,
					processingConsentText: def.processingConsentText,
					hutk: getCookie("hubspotutk"),
					pageUri: typeof window !== "undefined" ? window.location.href : "",
					pageName: typeof document !== "undefined" ? document.title : "",
				}),
			})

			const data = await res.json().catch(() => null)

			// HubSpot's server-side "block free email domains" backstop.
			if (data?.blockedEmail) {
				const emailField = visibleFields.find(isEmailField)
				if (emailField) {
					setErrors((prev) => ({ ...prev, [emailField.name]: "Please use your business email address." }))
				}
				setSubmitting(false)
				return
			}

			if (!res.ok || !data?.success) {
				setSubmitError(SUBMIT_ERROR_MESSAGE)
				setSubmitting(false)
				return
			}

			// --- Conversion tracking: parity with the old embed's onFormSubmitted ---
			const emailField = visibleFields.find(isEmailField)
			const email = emailField ? (values[emailField.name] || "").trim() : ""
			if (email) identify(email)
			capture(trackingEventName, trackingProps ?? { name: formName })

			const target = redirectURL || def.redirectUrl
			if (target) {
				if (redirectStrategy === "soft") {
					router.push(target)
				} else {
					// Full-page (hard) navigation — see redirectStrategy docs: a soft SPA
					// navigation leaves third-party widgets on the destination un-run.
					// The PostHog event above is flushed by posthog-js's pagehide handler.
					window.location.assign(target)
				}
			} else {
				setSubmitted(true)
			}
		} catch (err) {
			console.error("HubSpot form submission error:", err)
			setSubmitError(SUBMIT_ERROR_MESSAGE)
			setSubmitting(false)
		}
	}

	const inputClass = (hasError: boolean) =>
		classNames(
			"w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-highlight-light disabled:bg-gray-50",
			hasError ? "border-red-400" : "border-gray-300"
		)

	if (submitted) {
		return (
			<p role="status" className={classNames("text-base", theme === "dark" ? "text-gray-100" : "text-gray-800")}>
				{successMessage}
			</p>
		)
	}

	return (
		<form onSubmit={handleSubmit} noValidate className={className || "space-y-4"}>
			{visibleFields.map((f) => {
				const id = `${prefix}-${f.name}`
				const err = errors[f.name]
				const labelEl = f.label ? (
					<label htmlFor={id} className={classNames("mb-1 block text-sm font-medium", labelClass)}>
						{f.label} {f.required && <span className="text-red-500">*</span>}
					</label>
				) : null

				const common = {
					id,
					name: f.name,
					value: values[f.name] || "",
					"aria-invalid": !!err,
					"aria-describedby": err ? `${id}-error` : undefined,
					disabled: submitting,
					required: f.required,
					placeholder: f.placeholder || undefined,
				}

				let control: React.ReactNode
				if (f.fieldType === "textarea") {
					control = (
						<textarea
							{...common}
							rows={4}
							onChange={(e) => setField(f.name, e.target.value)}
							className={inputClass(!!err)}
						/>
					)
				} else if (f.fieldType === "select") {
					control = (
						<select
							{...common}
							onChange={(e) => setField(f.name, e.target.value)}
							className={inputClass(!!err)}
						>
							<option value="">{f.placeholder || "Please select"}</option>
							{f.options.map((o) => (
								<option key={o.value} value={o.value}>
									{o.label}
								</option>
							))}
						</select>
					)
				} else if (f.fieldType === "radio") {
					control = (
						<div className="space-y-1">
							{f.options.map((o) => (
								<label key={o.value} className={classNames("flex items-center gap-2 text-sm", consentTextClass)}>
									<input
										type="radio"
										name={f.name}
										value={o.value}
										checked={values[f.name] === o.value}
										onChange={(e) => setField(f.name, e.target.value)}
										disabled={submitting}
										className="h-4 w-4 border-gray-300 text-highlight-light focus:ring-highlight-light"
									/>
									{o.label}
								</label>
							))}
						</div>
					)
				} else if (f.fieldType === "checkbox") {
					// Multi-select group — stored as a ";"-joined string.
					const selected = splitMulti(values[f.name])
					control = (
						<div className="space-y-1">
							{f.options.map((o) => (
								<label key={o.value} className={classNames("flex items-center gap-2 text-sm", consentTextClass)}>
									<input
										type="checkbox"
										value={o.value}
										checked={selected.includes(o.value)}
										onChange={(e) => toggleMulti(f.name, o.value, e.target.checked)}
										disabled={submitting}
										className="h-4 w-4 rounded border-gray-300 text-highlight-light focus:ring-highlight-light"
									/>
									{o.label}
								</label>
							))}
						</div>
					)
				} else if (f.fieldType === "booleancheckbox") {
					const checked = values[f.name] === "true"
					control = (
						<label className={classNames("flex items-start gap-2 text-sm", consentTextClass)}>
							<input
								id={id}
								type="checkbox"
								checked={checked}
								onChange={(e) => setField(f.name, e.target.checked ? "true" : "false")}
								disabled={submitting}
								className="mt-1 h-4 w-4 rounded border-gray-300 text-highlight-light focus:ring-highlight-light"
							/>
							<span>
								{f.label} {f.required && <span className="text-red-500">*</span>}
							</span>
						</label>
					)
				} else {
					control = (
						<input
							{...common}
							type={inputTypeFor(f)}
							autoComplete={AUTOCOMPLETE[f.name]}
							onChange={(e) => setField(f.name, e.target.value)}
							onBlur={() => handleFieldBlur(f)}
							className={inputClass(!!err)}
						/>
					)
				}

				return (
					<div key={f.name}>
						{/* booleancheckbox renders its own inline label */}
						{f.fieldType !== "booleancheckbox" && labelEl}
						{control}
						{err && (
							<p id={`${id}-error`} className="mt-1 text-sm text-red-600">
								{err}
							</p>
						)}
					</div>
				)
			})}

			{/* Honeypot — hidden from users, catches bots (form has no captcha). */}
			<div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
				<label>
					Please leave this field empty
					<input ref={honeypotRef} type="text" name="_hp_email" tabIndex={-1} autoComplete="off" />
				</label>
			</div>

			{def.communicationConsentCheckboxes.map((c) => {
				const cid = `${prefix}-consent-${c.communicationTypeId}`
				const err = errors[`consent_${c.communicationTypeId}`]
				return (
					<div key={c.communicationTypeId}>
						<div className="flex items-start gap-2">
							<input
								id={cid}
								type="checkbox"
								checked={!!consents[c.communicationTypeId]}
								onChange={(e) =>
									setConsents((prev) => ({ ...prev, [c.communicationTypeId]: e.target.checked }))
								}
								disabled={submitting}
								className="mt-1 h-4 w-4 rounded border-gray-300 text-highlight-light focus:ring-highlight-light"
							/>
							<label htmlFor={cid} className={classNames("text-xs", consentTextClass)}>
								{c.label} {c.required && <span className="text-red-500">*</span>}
							</label>
						</div>
						{err && <p className="mt-1 text-sm text-red-600">{err}</p>}
					</div>
				)
			})}

			{/* Processing consent is IMPLICIT — not displayed (matches the HubSpot form),
			    but still sent in the submission payload for the legal-basis record. */}

			{submitError && (
				<p role="alert" className="text-sm text-red-600">
					{submitError}
				</p>
			)}

			<LinkButton
				type={submitButtonType}
				size="lg"
				buttonType="submit"
				disabled={submitting}
				className={submitClassName}
			>
				{submitting ? "Submitting…" : def.submitText}
			</LinkButton>
		</form>
	)
}
