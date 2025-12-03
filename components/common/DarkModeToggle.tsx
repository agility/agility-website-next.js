"use client"

import { useEffect, useState } from "react"
import { IconSun, IconMoon, IconSunMoon } from "@tabler/icons-react"

type Theme = "system" | "light" | "dark"

const STORAGE_KEY = "theme-preference"

interface IDarkModeToggle {
	placeMent: "preheader" | "mobile-menu"
}

export function DarkModeToggle({ placeMent }: IDarkModeToggle) {
	const [theme, setTheme] = useState<Theme>("system")
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		// Get theme from localStorage or default to system
		const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
		if (stored && ["system", "light", "dark"].includes(stored)) {
			setTheme(stored)
		} else {
			setTheme("system")
		}
		setMounted(true)
	}, [])

	useEffect(() => {
		if (!mounted) return

		// Apply theme
		const root = document.documentElement
		const applyTheme = (themeValue: Theme) => {
			if (themeValue === "system") {
				const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
				if (systemPrefersDark) {
					root.classList.add("dark")
				} else {
					root.classList.remove("dark")
				}
			} else if (themeValue === "dark") {
				root.classList.add("dark")
			} else {
				root.classList.remove("dark")
			}
		}

		applyTheme(theme)

		// Listen for system preference changes when theme is "system"
		if (theme === "system") {
			const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
			const handleChange = () => applyTheme("system")
			mediaQuery.addEventListener("change", handleChange)
			return () => mediaQuery.removeEventListener("change", handleChange)
		}
	}, [theme, mounted])

	const cycleTheme = () => {
		const nextTheme: Theme = theme === "system" ? "dark" : theme === "dark" ? "light" : "system"
		setTheme(nextTheme)
		localStorage.setItem(STORAGE_KEY, nextTheme)
	}

	// Get color classes based on placement
	const getColorClasses = () => {
		if (placeMent === "mobile-menu") {
			return "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
		}
		return "text-white hover:text-secondary"
	}

	// Prevent hydration mismatch by not rendering until mounted
	if (!mounted) {
		if (placeMent === "mobile-menu") {
			return (
				<button
					type="button"
					aria-label="Toggle theme"
					title="Theme: System mode. Click to switch to Dark mode."
					className={`-mx-3 flex w-full items-center justify-between rounded-lg px-3 py-2 text-base font-semibold leading-7 ${getColorClasses()} hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none cursor-pointer`}
				>
					<span>Theme</span>
					<IconSunMoon className="h-5 w-5" />
				</button>
			)
		}
		return (
			<button
				type="button"
				aria-label="Toggle theme"
				title="Theme: System mode. Click to switch to Dark mode."
				className={`inline-flex items-center justify-center rounded-md p-2 ${getColorClasses()} transition-colors duration-150 ease-in-out focus:outline-none cursor-pointer bg-transparent`}
			>
				<IconSunMoon className="h-5 w-5" />
			</button>
		)
	}

	const getIcon = () => {
		switch (theme) {
			case "light":
				return <IconSun className="h-5 w-5" />
			case "dark":
				return <IconMoon className="h-5 w-5" />
			case "system":
			default:
				return <IconSunMoon className="h-5 w-5" />
		}
	}

	const getLabel = () => {
		switch (theme) {
			case "light":
				return "Light mode (click to switch to system)"
			case "dark":
				return "Dark mode (click to switch to light)"
			case "system":
			default:
				return "System preference (click to switch to dark)"
		}
	}

	const getTitle = () => {
		const nextTheme = theme === "system" ? "dark" : theme === "dark" ? "light" : "system"
		const currentThemeName = theme === "system" ? "System" : theme === "dark" ? "Dark" : "Light"
		const nextThemeName = nextTheme === "system" ? "System" : nextTheme === "dark" ? "Dark" : "Light"
		return `Theme: ${currentThemeName} mode. Click to switch to ${nextThemeName} mode.`
	}

	const getDisplayLabel = () => {
		switch (theme) {
			case "light":
				return "Light"
			case "dark":
				return "Dark"
			case "system":
			default:
				return "Theme"
		}
	}

	// Mobile menu layout: block element with label and icon
	if (placeMent === "mobile-menu") {
		return (
			<button
				type="button"
				onClick={cycleTheme}
				aria-label={getLabel()}
				title={getTitle()}
				className={`-mx-3 flex w-full items-center justify-between rounded-lg px-3 py-2 text-base font-semibold leading-7 ${getColorClasses()} hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none cursor-pointer`}
			>
				<span>{getDisplayLabel()}</span>
				{getIcon()}
			</button>
		)
	}

	// Preheader layout: icon-only button
	return (
		<button
			type="button"
			onClick={cycleTheme}
			aria-label={getLabel()}
			title={getTitle()}
			className={`inline-flex items-center justify-center rounded-md p-2 ${getColorClasses()} transition-colors duration-150 ease-in-out focus:outline-none cursor-pointer bg-transparent`}
		>
			{getIcon()}
		</button>
	)
}

