/* eslint-disable @next/next/no-img-element */
import Image from "next/image"
import React from "react"
import { IconBrandX, IconBrandInstagram, IconBrandSlack, IconBrandYoutube } from "@tabler/icons-react"
import { getContentList } from "lib/cms/getContentList"
import { useAgilityContext } from "lib/cms/useAgilityContext"
import Link from "next/link"
import { LinkButton } from "components/micro/LinkButton"
import { FooterSubscribe } from "./FooterSubscribe"
import { RenderLink } from "./RenderLink"

export default async function SiteFooter() {
	const { isPreview, locale } = useAgilityContext()

	const footerRes = await getContentList({
		referenceName: "globalfooter",
		take: 1,
		locale: locale,
		expandAllContentLinks: true
	})

	const adjustLink = (url: any) => {
		if (!url) return ""
		if (url.startsWith("https://agilitycms.com")) {
			return url.replace("https://agilitycms.com", "")
		}
		return url
	}

	if (!footerRes || !footerRes.items || footerRes.items.length === 0) {
		return null
	}

	const footer = footerRes.items[0]
	const year = new Date().getFullYear()

	return (
		<footer className="">
			<div className="bg-highlight px-8 py-20 text-white">
				<div className="mx-auto max-w-7xl">
					<div className="border-t border-t-white border-opacity-50"></div>
					<div className="mt-8 gap-2 lg:flex lg:flex-wrap lg:items-start">
						<div className="flex-1 gap-2 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
							<div className="flex-1 pt-8">
								{footer.fields.column1Title && (
									<h4 className="font-medium mb-3">{footer.fields.column1Title}</h4>
								)}
								<ul className="mt-2 flex flex-col text-sm text-gray-100">
									{footer.fields.column1Links.map((link: any) => (
										<li key={link.contentID}>
											<RenderLink link={link} adjustLink={adjustLink} />
										</li>
									))}
								</ul>
							</div>
							<div className="flex-1 pt-8">
								{footer.fields.column2Title && (
									<h4 className="font-medium mb-3">{footer.fields.column2Title}</h4>
								)}
								<ul className="mt-2 flex flex-col text-sm text-gray-100">
									{footer.fields.column2Links.map((link: any) => (
										<li key={link.contentID}>
											<RenderLink link={link} adjustLink={adjustLink} />
										</li>
									))}
								</ul>
							</div>
							<div className="flex-1 pt-8">
								{footer.fields.column3Title && (
									<h4 className="font-medium mb-3">{footer.fields.column3Title}</h4>
								)}
								<ul className="mt-2 flex flex-col text-sm text-gray-100">
									{footer.fields.column3Links.map((link: any) => (
										<li key={link.contentID}>
											<RenderLink link={link} adjustLink={adjustLink} />
										</li>
									))}
								</ul>
							</div>
							<div className="flex-1 pt-8">
								{footer.fields.column4Title && (
									<h4 className="font-medium mb-3">{footer.fields.column4Title}</h4>
								)}
								<ul className="mt-2 flex flex-col text-sm text-gray-100">
									{footer.fields.column4Links.map((link: any) => (
										<li key={link.contentID}>
											<RenderLink link={link} adjustLink={adjustLink} />
										</li>
									))}
								</ul>
							</div>
							<div className="flex-1 pt-8">
								{footer.fields.column5Title && (
									<h4 className="font-medium mb-3">{footer.fields.column5Title}</h4>
								)}
								<ul className="flex flex-col text-sm">
									{footer.fields.column5Links.map((link: any) => (
										<li key={link.contentID}>
											<RenderLink link={link} adjustLink={adjustLink} />
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-highlight-dark p-3 text-white">
				<div className="mx-auto max-w-7xl lg:flex lg:flex-row-reverse lg:items-center lg:justify-between text-sm">

					<div className="text-center lg:text-left">
						{footer.fields.copyright} {year}
					</div>


					<div className="flex flex-wrap justify-center lg:justify-start">
						{footer.fields.bottomLinks.map((link: any, index: number) => (
							<div key={link.contentID}>
								<Link
									className="hover-shadow-white p-1 px-2"
									href={link.fields.uRL.href}
									target={link.fields.uRL.target}
								>
									{link.fields.title}
								</Link>
								{index < footer.fields.bottomLinks.length - 1 && (
									<span className="text-white">|</span>
								)}
							</div>
						))}
					</div>

				</div>
			</div>
		</footer>
	)
}
