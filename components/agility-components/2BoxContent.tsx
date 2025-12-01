import { AgilityPic, ImageField, URLField, UnloadedModuleProps } from "@agility/nextjs"
import clsx from "clsx"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import Link from "next/link"

interface ITwoBoxContent {
	heading?: string
	heading2?: string

	image?: ImageField
	image2?: ImageField
	description?: string
	description2?: string

	cTA?: URLField
	cTA2?: URLField

	darkMode?: string
}

export const TwoBoxContent = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<ITwoBoxContent>({
		contentID: module.contentid,
		languageCode
	})

	const darkMode = fields.darkMode === "true"

	return (
		<div className="bg-white dark:bg-gray-900">
			<Container className="relative z-[2] mx-auto -mt-32 max-w-5xl">
				<div className={clsx("flex h-[500px] min-h-0 w-full flex-col justify-center gap-8 lg:flex-row")}>
					{/* Box 1 */}
					{fields.image && fields.heading && fields.cTA && fields.description && (
						<Link
							href={fields.cTA.href}
							target={fields.cTA.target}
							className="flex h-full flex-col items-center justify-center gap-3 p-14 text-center shadow-lg hover:shadow-md lg:w-1/2 bg-white dark:bg-gray-800 dark:text-white"
						>
							<AgilityPic image={fields.image} className="w-44" />

							<h3 className="text-balance text-4xl dark:text-white">{fields.heading}</h3>
							<p className="flex-1 dark:text-gray-300">{fields.description}</p>
							<div className="font-medium text-highlight-light dark:text-secondary">{fields.cTA.text}</div>
						</Link>
					)}

					{/* Box 2 */}
					{fields.image2 && fields.heading2 && fields.cTA2 && fields.description2 && (
						<Link
							href={fields.cTA2.href}
							target={fields.cTA2.target}
							className="flex h-full flex-col items-center justify-center gap-3 p-14 text-center shadow-lg hover:shadow-md lg:w-1/2 bg-white dark:bg-gray-800 dark:text-white"
						>
							<AgilityPic image={fields.image2} className="w-44 object-contain" />

							<h3 className="text-balance text-4xl dark:text-white">{fields.heading2}</h3>
							<p className="flex-1 dark:text-gray-300">{fields.description2}</p>
							<div className="font-medium text-highlight-light dark:text-secondary">{fields.cTA2.text}</div>
						</Link>
					)}
				</div>
			</Container>
		</div>
	)
}
