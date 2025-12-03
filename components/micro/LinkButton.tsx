import classNames from "classnames"
import Link from "next/link"
import { useMemo } from "react"

interface Props {
	href?: string
	target?: string
	children: React.ReactNode
	type: "primary" | "primary-outline" | "secondary" | "secondary-bg" | "secondary-inverted" | "alternate" | "slate"
	size?: "sm" | "md" | "lg"
	buttonType?: "button" | "submit" | "reset"
	className?: string
	disabled?: boolean
	"data-agility-field"?: string
	onClick?: () => void
}

export const LinkButton = ({
	href,
	target,
	children,
	type,
	className,
	onClick,
	buttonType = "button",
	size = "sm",
	disabled,
	"data-agility-field": dataAgilityField
}: Props) => {
	let actualHref = href
	if (actualHref && actualHref.startsWith("http://agilitycms.com/")) {
		actualHref = actualHref.replace("http://agilitycms.com/", "/")
	}

	if (actualHref && actualHref.startsWith("https://agilitycms.com/")) {
		actualHref = actualHref.replace("https://agilitycms.com/", "/")
	}

	const btnClass = useMemo(() => {
		return classNames(
			"inline-flex items-center justify-center font-medium whitespace-nowrap",
			size === "sm" ? "text-sm px-4 h-9" : size === "md" ? "text-base px-6 h-10" : "text-lg px-8 h-12",
			"duration-200 ease-in-out transition-all",
			"hover:scale-105",
			type === "primary"
				? "text-white bg-highlight-light ring-2 ring-highlight-light ring-inset focus:ring-white/40"
				: type === "secondary"
					? "text-highlight-light bg-white/0 dark:bg-gray-900/0 hover:bg-gray-50 dark:hover:bg-gray-800 ring-2 ring-highlight-light ring-inset"
					: type === "secondary-bg"
						? "text-base bg-secondary"
						: type === "alternate"
							? "bg-secondary ring-2 ring-secondary ring-inset text-gray-900 dark:text-gray-900 focus:ring-white/40"
							: type === "slate"
								? "bg-slate-400 ring-2 ring-slate-400 ring-inset text-white"
								: "text-white bg-highlight-light ring-2 hover:bg-highlight-light-light ring-white ring-inset",
			"focus:outline-none  focus:ring-4",
			className
		)
	}, [size, type, className])

	if (!href && (onClick || buttonType)) {
		return (
			<button
				className={btnClass}
				onClick={onClick}
				type={buttonType}
				disabled={disabled}
				data-agility-field={dataAgilityField}
			>
				{children}
			</button>
		)
	}

	return (
		<Link
			href={href || "/"}
			target={target}
			className={btnClass}
			onClick={onClick}
			data-agility-field={dataAgilityField}
		>
			{children}
		</Link>
	)
}
