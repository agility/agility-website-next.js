import clsx from "clsx"
import { DetailedHTMLProps, HTMLAttributes } from "react"

type Props = {} & DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>

export const Container = ({ children, className, ...props }: Props) => {
	return (
		<section className={clsx("my-20")} {...props}>
			{children}
		</section>
	)
}
