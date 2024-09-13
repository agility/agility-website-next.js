import { IconBrandLinkedin, IconBrandX, IconBrandFacebook } from "@tabler/icons-react"

interface Props {
	url: string
	title: string
	className: string | undefined
}

export const SharePage = ({ url, title, className }: Props) => {
	return (
		<div className={className}>
			<div className="pt-6 font-bold">{title}</div>
			<div className="flex flex-wrap gap-2 pt-1">
				<a
					href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`}
					target="_blank"
					rel="noreferrer"
					className="group rounded-full bg-background p-1.5 text-highlight-light transition-colors hover:bg-highlight-light hover:text-white"
					title="Share on LinkedIn"
				>
					<IconBrandLinkedin className="transition-colors group-hover:text-white" />
				</a>
				<a
					href={`https://x.com/intent/post/?url=${encodeURIComponent(url)}`}
					target="_blank"
					rel="noreferrer"
					className="group rounded-full bg-background p-1.5 text-highlight-light transition-colors hover:bg-highlight-light hover:text-white"
					title="Share on X"
				>
					<IconBrandX className="transition-colors group-hover:text-white" />
				</a>

				<a
					href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
					target="_blank"
					rel="noreferrer"
					className="group rounded-full bg-background p-1.5 text-highlight-light transition-colors hover:bg-highlight-light hover:text-white"
					title="Share on Facebook"
				>
					<IconBrandFacebook className="transition-colors group-hover:text-white" />
				</a>
			</div>
		</div>
	)
}
