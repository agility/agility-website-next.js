"use client"

import { useEffect, useState } from "react"
import classNames from "classnames"

// Thin client wrapper that hosts the sticky <header> and toggles a shadow
// class based on scroll position. Children are rendered server-side and
// passed through as React children — no client JS for any of the static
// header content (logo, container divs, etc.).
export function HeaderShellClient({ children }: { children: React.ReactNode }) {
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		const scrollHandler = () => {
			setIsScrolled(window.scrollY > 0)
		}
		window.addEventListener("scroll", scrollHandler, { passive: true })
		return () => window.removeEventListener("scroll", scrollHandler)
	}, [])

	return (
		<header
			className={classNames(
				"sticky top-0 z-50 mx-auto w-full bg-white transition-shadow px-8 2xl:px-0",
				isScrolled ? "shadow-b" : "shadow-none"
			)}
		>
			{children}
		</header>
	)
}
