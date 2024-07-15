import clsx from "clsx"
import { DetailedHTMLProps, HTMLAttributes } from "react"

type Props = {} & DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>

export const Container = ({ children, className, ...props }: Props) => {
	return (
		<section className={clsx("py-14 px-8")} {...props}>
			{children}
		</section>
	)
}
