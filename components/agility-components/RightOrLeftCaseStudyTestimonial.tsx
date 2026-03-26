import { AgilityPic, ImageField, UnloadedModuleProps } from "@agility/nextjs"
import { IconChevronRight, IconQuote } from "@tabler/icons-react"
import clsx from "clsx"
import { Container } from "components/micro/Container"
import { LinkButton } from "components/micro/LinkButton"
import { getContentItem } from "lib/cms/getContentItem"
import { ICaseStudy } from "lib/types/ICaseStudy"
import { ITestimonial } from "lib/types/ITestimonial"


interface IRightOrLeftCaseStudyTestimonial {
	cTA: string
	textSide: "left" | "right"
	image: ImageField
	testimonial: {
		contentid: number
	}
	casestudy: {
		contentid: number
	}
}

export const RightOrLeftCaseStudyTestimonial = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields } = await getContentItem<IRightOrLeftCaseStudyTestimonial>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	const testimonial = await getContentItem<ITestimonial>({
		contentID: fields.testimonial.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	const casestudy = await getContentItem<ICaseStudy>({
		contentID: fields.casestudy.contentid,
		languageCode,
		contentLinkDepth: 0
	})

	if (!testimonial || !casestudy) return null

	return (
		<Container >
			<div className="mx-auto max-w-7xl">
				<div className={clsx("flex flex-col gap-10 lg:items-center",
					fields.textSide == "right" ? "lg:flex-row" : "lg:flex-row-reverse")}>
					<div className="flex-1 space-y-5">
						<div>
							<AgilityPic image={casestudy.fields.customerLogo} className="w-32" fallbackWidth={160} />
						</div>
						<h2 className="text-3xl">{casestudy.fields.title}</h2>
						<div className="text-lg">{casestudy.fields.contentPanelCopy}</div>
						<LinkButton href={`/resources/case-studies/${casestudy.fields.uRL}`} type="alternate" size="md">
							{fields.cTA}
							<IconChevronRight size={20} />
						</LinkButton>
					</div>
					<div className="flex-1">
						<div className="pr-14">
							<AgilityPic image={fields.image} className="w-full" fallbackWidth={640} />
						</div>
						<div className="relative -mt-28 ml-[20%] w-4/5 rounded bg-white p-4 pl-10 shadow-md">
							<div className="text-lg">{testimonial.fields.excerpt}</div>
							<div className="mt-6 text-sm text-highlight-light">{testimonial.fields.title}</div>
							<div className="text-sm text-gray-500">{testimonial.fields.jobTitle}</div>
							<div className="absolute -left-7 top-4 flex h-14 w-14 items-center justify-center rounded-full bg-highlight-light">
								<IconQuote size={32} stroke={2} className="text-white" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</Container>
	)
}
