import { NextRequest, NextResponse } from "next/server"

/**
 * First-party proxy for HubSpot form submissions.
 *
 * The browser POSTs to this same-origin route instead of calling
 * `api.hsforms.com` directly, so submissions keep working for visitors with
 * ad blockers / tracking prevention (Edge InPrivate, etc.) that block the
 * HubSpot domain. We forward server-side to the HubSpot Forms Submission API,
 * attaching the real client IP for HubSpot analytics/geo.
 *
 * See GitHub issue #85.
 */

// Only our own portal is allowed through, so this can't be abused as an open
// relay to arbitrary HubSpot portals.
const ALLOWED_PORTAL_ID = "23239214"

interface SubmitBody {
	portalId: string
	formId: string
	fields: Record<string, string>
	/** One entry per HubSpot communication-consent checkbox on the form. */
	communications?: { subscriptionTypeId: number; value: boolean; text?: string }[]
	/** Defaults to true (implicit processing consent). */
	consentToProcess?: boolean
	processingConsentText?: string
	hutk?: string
	pageUri?: string
	pageName?: string
}

const getClientIp = (req: NextRequest): string | undefined => {
	const xff = req.headers.get("x-forwarded-for")
	if (xff) return xff.split(",")[0].trim()
	return (
		req.headers.get("x-nf-client-connection-ip") ||
		req.headers.get("x-real-ip") ||
		undefined
	)
}

export async function POST(req: NextRequest) {
	let body: SubmitBody
	try {
		body = await req.json()
	} catch {
		return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 })
	}

	const { portalId, formId, fields } = body

	if (portalId !== ALLOWED_PORTAL_ID || !formId) {
		return NextResponse.json({ success: false, message: "Unknown form." }, { status: 400 })
	}

	// Honeypot: a real user never fills this hidden field. If it's populated,
	// silently accept and drop (don't tip off the bot).
	if (fields?.["_hp_email"]) {
		return NextResponse.json({ success: true })
	}

	const hsFields = Object.entries(fields || {})
		.filter(([name, value]) => name !== "_hp_email" && value != null && `${value}`.trim() !== "")
		.map(([name, value]) => ({ objectTypeId: "0-1", name, value: `${value}` }))

	const communications = (body.communications || [])
		.filter((c) => c && c.subscriptionTypeId != null)
		.map((c) => ({
			value: !!c.value,
			subscriptionTypeId: c.subscriptionTypeId,
			text: c.text || "",
		}))

	const ipAddress = getClientIp(req)

	const payload = {
		fields: hsFields,
		context: {
			...(body.hutk ? { hutk: body.hutk } : {}),
			...(ipAddress ? { ipAddress } : {}),
			pageUri: body.pageUri || "",
			pageName: body.pageName || "",
		},
		legalConsentOptions: {
			consent: {
				consentToProcess: body.consentToProcess !== false,
				text:
					body.processingConsentText ||
					"I agree to allow Agility Inc. to store and process my personal data.",
				...(communications.length ? { communications } : {}),
			},
		},
	}

	try {
		const hsRes = await fetch(
			`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			}
		)

		if (hsRes.ok) {
			return NextResponse.json({ success: true })
		}

		const errBody = await hsRes.json().catch(() => null)
		const blockedEmail = errBody?.errors?.some(
			(e: { errorType?: string }) => e.errorType === "BLOCKED_EMAIL"
		)
		if (blockedEmail) {
			// 200 so the client treats it as a handled validation error, not a network failure.
			return NextResponse.json({ success: false, blockedEmail: true })
		}

		console.error("HubSpot submission error:", errBody)
		return NextResponse.json({ success: false, message: "Submission failed." }, { status: 502 })
	} catch (e) {
		console.error("HubSpot submission proxy error:", e)
		return NextResponse.json({ success: false, message: "Submission failed." }, { status: 502 })
	}
}
