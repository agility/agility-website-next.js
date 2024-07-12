import classNames from "classnames"
import Link from "next/link"

interface Props {
	href?: string
	target?: string
	children: React.ReactNode
	type: "primary" | "secondary" | "secondary-inverted"
	buttonType?: "button" | "submit" | "reset"
	className?: string
	onClick?: () => void
}

export const LinkButton = ({ href, target, children, type, className, onClick, buttonType = "button" }: Props) => {
	if (!href && (onClick || buttonType)) {
		return (
			<button
				className={classNames(
					"inline-flex items-center justify-center px-3 py-2 text-sm ",
					"duration-200 ease-in-out transition-all",
					"hover:scale-105",
					type === "primary"
						? "text-white bg-highlight"
						: type === "secondary"
							? "text-highlight bg-white hover:bg-gray-50 ring-2 ring-highlight ring-inset"
							: "text-white bg-highlight ring-2 hover:bg-highlight-light ring-white",
					"focus:outline-none focus:text-primary-500 focus:bg-gray-50 ",
					className
				)}
				onClick={onClick}
				type={buttonType}
			>
				{children}
			</button>
		)
	}

	return (
		<Link
			href={href || "/"}
			target={target}
			className={classNames(
				"inline-flex items-center justify-center px-3 py-2 text-sm ",
				"duration-200 ease-in-out transition-all",
				"hover:scale-105",
				type === "primary"
					? "text-white bg-highlight"
					: type === "secondary"
						? "text-highlight bg-white hover:bg-gray-50 ring-2 ring-highlight ring-inset"
						: "text-white bg-highlight ring-2 hover:bg-highlight-light ring-white",
				"focus:outline-none focus:text-primary-500 focus:bg-gray-50 ",
				className
			)}
			onClick={onClick}
		>
			{children}
		</Link>
	)
}
