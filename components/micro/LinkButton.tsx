import classNames from "classnames"
import Link from "next/link"

interface Props {
	href: string
	target: string
	children: React.ReactNode
	type: "primary" | "secondary"
	className?: string
}

export const LinkButton = ({href, target, children, type, className}: Props) => {
	return (
		<Link
			href={href}
			target={target}
			className={classNames(
				"inline-flex items-center justify-center px-3 py-2 text-sm ",
				"duration-200 ease-in-out transition-all",
				"hover:scale-105",
				type === "primary"
					? "text-white bg-highlight"
					: "text-highlight bg-white hover:bg-gray-50 ring-2 ring-highlight ring-inset",
				"focus:outline-none focus:text-primary-500 focus:bg-gray-50 ",
				className
			)}
		>
			{children}
		</Link>
	)
}
