// app/providers.tsx
"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"
import { useEffect } from "react"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		const timer = setTimeout(() => {
			if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
				posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
					api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
					defaults: "2025-05-24",
					before_send: (event) => {
						const exceptionList = event?.properties?.["$exception_list"]
						if (
							Array.isArray(exceptionList) &&
							exceptionList.some((e: any) => e?.value?.includes("ResizeObserver loop"))
						) {
							return null
						}
						return event
					}
				})
			}
		}, 1000)
		return () => clearTimeout(timer)
	}, [])

	return <PHProvider client={posthog}>{children}</PHProvider>
}
