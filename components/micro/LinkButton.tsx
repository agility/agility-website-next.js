import classNames from "classnames"
import Link from "next/link"
import { useMemo } from "react"

interface Props {
	href?: string
	target?: string
	children: React.ReactNode
	type: "primary" | "secondary" | "secondary-inverted" | "alternate"
	size?: "sm" | "md" | "lg"
	buttonType?: "button" | "submit" | "reset"
	className?: string
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
	size = "sm"
}: Props) => {
	const btnClass = useMemo(() => {
		return classNames(
			"inline-flex items-center justify-center font-medium",
			size === "sm" ? "text-sm px-4 py-2" : size === "md" ? "text-base px-6 py-3" : "text-lg px-8 py-5",
			"duration-200 ease-in-out transition-all",
			"hover:scale-105",
			type === "primary"
				? "text-white bg-highlight-light"
				: type === "secondary"
					? "text-highlight-light bg-white hover:bg-gray-50 ring-2 ring-highlight-light ring-inset"
					: type === "alternate"
						? "bg-secondary ring-2 ring-secondary ring-inset"
						: "text-white bg-highlight-light ring-2 hover:bg-highlight-light-light ring-white",
			"focus:outline-none focus:text-primary-500 focus:bg-gray-50 ",
			className
		)
	}, [size, type, className])

	if (!href && (onClick || buttonType)) {
		return (
			<button className={btnClass} onClick={onClick} type={buttonType}>
				{children}
			</button>
		)
	}

	return (
		<Link href={href || "/"} target={target} className={btnClass} onClick={onClick}>
			{children}
		</Link>
	)
}
