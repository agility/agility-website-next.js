// app/providers.tsx
"use client"

import { useEffect } from "react"
import { initPostHog } from "lib/analytics/posthog"
import { useBookingTracking } from "lib/analytics/conversions"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		initPostHog()
	}, [])
	useBookingTracking()

	return <>{children}</>
}
