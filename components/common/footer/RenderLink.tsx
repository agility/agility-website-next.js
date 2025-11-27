import Link from "next/link"

interface RenderLinkProps {
	link: any
	adjustLink: (url: string) => string
}

export function RenderLink({ link, adjustLink }: RenderLinkProps) {


	if (link.fields.header === "true") {
		//HEADER
		return (
			<h4 className="font-bold text-base pb-3">
				{(link.fields.uRL && link.fields.uRL.href) ? (
					<Link
						href={adjustLink(link.fields.uRL.href)}
						target={link.fields.uRL.target}
						className="hover:text-white"
					>
						{link.fields.title || link.fields.uRL.text}
					</Link>
				) : (
					<span className="font-bold text-base pb-3">{link.fields.title}</span>
				)}
			</h4>
		)
	}


	//NON HEADER
	return (
		<>
			{(link.fields.uRL && link.fields.uRL.href) ? (
				<Link
					href={adjustLink(link.fields.uRL.href)}
					target={link.fields.uRL.target}
					className="block pb-3 text-indigo-100 hover:text-white"
				>
					{link.fields.title || link.fields.uRL.text}
				</Link>
			) : (
				<span className="block pb-3 text-indigo-100">{link.fields.title}</span>
			)}
		</>
	)
}
