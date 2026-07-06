"use client"

import classNames from "classnames"
import { capture, identify } from "lib/analytics/posthog"
import { LinkButton } from "components/micro/LinkButton"
import { useCallback, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import type {
	HubSpotFormDefinition,
	HubSpotFormField,
} from "lib/hubspot/getHubSpotFormDefinition"

interface Props {
	hubspotForm?: string
	redirectURL?: string
	/** Fetched server-side in GetADemo.tsx. Null -> use FALLBACK_DEFINITION. */
	formDefinition?: HubSpotFormDefinition | null
}

const SUBMIT_ENDPOINT = "/api/forms/hubspot"

// Used ONLY if the server-side definition fetch failed, so the form always
// renders. Mirrors the live "Demo Request On All Agility.com Webpages" form.
const FALLBACK_DEFINITION: HubSpotFormDefinition = {
	submitText: "Let's chat",
	redirectUrl: "",
	fields: [
		{ name: "firstname", label: "First name", fieldType: "text", required: true, hidden: false, placeholder: "", defaultValue: "", objectTypeId: "0-1", blockFreeEmail: false, options: [] },
		{ name: "lastname", label: "Last name", fieldType: "text", required: true, hidden: false, placeholder: "", defaultValue: "", objectTypeId: "0-1", blockFreeEmail: false, options: [] },
		{ name: "company", label: "Company name", fieldType: "text", required: true, hidden: false, placeholder: "", defaultValue: "", objectTypeId: "0-1", blockFreeEmail: false, options: [] },
		{ name: "email", label: "Business Email", fieldType: "text", required: true, hidden: false, placeholder: "", defaultValue: "", objectTypeId: "0-1", blockFreeEmail: true, options: [] },
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
	return "text"
}

const getCookie = (key: string): string | undefined => {
	if (typeof document === "undefined") return undefined
	const value = `; ${document.cookie}`
	const parts = value.split(`; ${key}=`)
	if (parts.length === 2) return parts.pop()?.split(";").shift()
	return undefined
}

const SUBMIT_ERROR_MESSAGE =
	"Something went wrong submitting the form. Please try again or email sales@agilitycms.com."

export const GetADemoClient = ({ hubspotForm, redirectURL, formDefinition }: Props) => {
	const def = formDefinition ?? FALLBACK_DEFINITION
	const { portalId, formId, name: formName } = JSON.parse(
		hubspotForm || '{"portalId":"","formId":"","name":""}'
	)
	const router = useRouter()

	const visibleFields = useMemo(() => def.fields.filter((f) => !f.hidden), [def])
	const hiddenFields = useMemo(() => def.fields.filter((f) => f.hidden), [def])

	const [values, setValues] = useState<Record<string, string>>(() =>
		Object.fromEntries(def.fields.map((f) => [f.name, f.defaultValue || ""]))
	)
	const [consents, setConsents] = useState<Record<number, boolean>>(() =>
		Object.fromEntries(def.communicationConsentCheckboxes.map((c) => [c.communicationTypeId, false]))
	)
	const [errors, setErrors] = useState<Record<string, string | undefined>>({})
	const [submitting, setSubmitting] = useState(false)
	const [submitError, setSubmitError] = useState<string | null>(null)
	const honeypotRef = useRef<HTMLInputElement>(null)

	const setField = (name: string, value: string) => {
		setValues((v) => ({ ...v, [name]: value }))
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
		const sp = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams()
		const fieldsPayload: Record<string, string> = {}
		for (const f of visibleFields) fieldsPayload[f.name] = (values[f.name] || "").trim()
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
					portalId: `${portalId}`,
					formId,
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
			capture("website-form-submission", { name: formName })

			const target = redirectURL || def.redirectUrl
			if (target) {
				// The redirect is a fully-qualified URL. If it's same-origin, push a
				// relative path so router.push does a soft (client-side) navigation —
				// that keeps the JS context alive so the PostHog conversion event above
				// reliably flushes. A fully-qualified same-origin URL would otherwise be
				// one protocol/subdomain difference away from a hard page unload.
				try {
					const url = new URL(target, window.location.origin)
					if (url.origin === window.location.origin) {
						router.push(`${url.pathname}${url.search}${url.hash}`)
					} else {
						window.location.href = target
					}
				} catch {
					router.push(target)
				}
			} else {
				setSubmitting(false)
			}
		} catch (err) {
			console.error("Demo form submission error:", err)
			setSubmitError(SUBMIT_ERROR_MESSAGE)
			setSubmitting(false)
		}
	}

	const inputClass = (hasError: boolean) =>
		classNames(
			"w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-highlight-light disabled:bg-gray-50",
			hasError ? "border-red-400" : "border-gray-300"
		)

	return (
		<form onSubmit={handleSubmit} noValidate className="space-y-4">
			{visibleFields.map((f) => {
				const id = `demo-${f.name}`
				const err = errors[f.name]
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
				return (
					<div key={f.name}>
						{f.label && (
							<label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
								{f.label} {f.required && <span className="text-red-500">*</span>}
							</label>
						)}
						{f.fieldType === "textarea" ? (
							<textarea
								{...common}
								rows={4}
								onChange={(e) => setField(f.name, e.target.value)}
								className={inputClass(!!err)}
							/>
						) : f.fieldType === "select" ? (
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
						) : (
							<input
								{...common}
								type={inputTypeFor(f)}
								autoComplete={AUTOCOMPLETE[f.name]}
								onChange={(e) => setField(f.name, e.target.value)}
								onBlur={() => handleFieldBlur(f)}
								className={inputClass(!!err)}
							/>
						)}
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
				const cid = `demo-consent-${c.communicationTypeId}`
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
							<label htmlFor={cid} className="text-xs text-gray-600">
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

			<LinkButton type="primary" size="lg" buttonType="submit" disabled={submitting} className="w-full">
				{submitting ? "Submitting…" : def.submitText}
			</LinkButton>
		</form>
	)
}
