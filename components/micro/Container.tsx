import clsx from "clsx"
import { DetailedHTMLProps, HTMLAttributes } from "react"

type Props = {} & DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>

export const Container = ({ children, className, ...props }: Props) => {
	return (
		<section className={clsx("px-8 2xl:px-0 pt-14", className)} {...props}>
			{children}
		</section>
	)
}
