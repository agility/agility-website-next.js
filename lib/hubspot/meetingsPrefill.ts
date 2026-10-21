import { useEffect } from "react"

// Carries a demo request's name and email to the HubSpot scheduler on the booking
// page, so the visitor doesn't type them twice. HubSpot can't do this on its own: it
// knows a visitor only by its cookie, and the booking page loads before HubSpot has
// linked that cookie to the new contact. The details wait in sessionStorage (this
// tab, this site), then go into the scheduler iframe's own URL, never the page URL,
// so no analytics tool sees them.

const KEY = "hs-meetings-prefill"
const MAX_AGE_MS = 30 * 60 * 1000
const FRAMES = ".meetings-iframe-container iframe"

// The query parameters HubSpot's meetings page reads to fill its form.
type Prefill = { firstName?: string; lastName?: string; email?: string }

export function savePrefill(details: Prefill) {
	try {
		sessionStorage.setItem(KEY, JSON.stringify({ ...details, savedAt: Date.now() }))
	} catch {
		// Storage blocked: the visitor types their details, as before.
	}
}

function readPrefill(): Prefill | null {
	try {
		const raw = sessionStorage.getItem(KEY)
		if (!raw) return null
		const { savedAt, ...details } = JSON.parse(raw)
		return Date.now() - savedAt < MAX_AGE_MS ? details : null
	} catch {
		return null
	}
}

/**
 * Fill the first HubSpot scheduler on the page with the saved details, once, then
 * forget them. Mounted site-wide because the booking step's scheduler comes from
 * CMS rich text. HubSpot's script builds the iframe whenever it loads, so this
 * watches for it and points it at the same URL plus the details.
 */
export function useMeetingsPrefill() {
	useEffect(() => {
		const details = readPrefill()
		if (!details) return

		let done = false
		const apply = () => {
			if (done) return true
			const frame = document.querySelector<HTMLIFrameElement>(FRAMES)
			if (!frame?.src) return false
			done = true
			const url = new URL(frame.src)
			for (const [name, value] of Object.entries(details)) if (value) url.searchParams.set(name, value)
			frame.src = url.toString()
			try {
				sessionStorage.removeItem(KEY)
			} catch {}
			return true
		}

		if (apply()) return
		const observer = new MutationObserver(() => apply() && observer.disconnect())
		observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["src"] })
		return () => observer.disconnect()
	}, [])
}
