/* eslint-disable @next/next/no-img-element */
import Image from "next/image"
import React from "react"
import { IconBrandX, IconBrandInstagram, IconBrandSlack, IconBrandYoutube } from "@tabler/icons-react"
import { getContentList } from "lib/cms/getContentList"
import { useAgilityContext } from "lib/cms/useAgilityContext"
import Link from "next/link"
import { LinkButton } from "components/micro/LinkButton"
import { FooterSubscribe } from "./FooterSubscribe"

export default async function SiteFooter() {
	const { isPreview, locale } = useAgilityContext()

	const footerRes = await getContentList({
		referenceName: "globalfooter",
		take: 1,
		locale: locale,
		expandAllContentLinks: true
	})

	const adjustLink = (url: any) => {
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
			<div className="px-8 py-20 mt-8 bg-highlight text-white">
				<div className="max-w-screen-xl mx-auto">
					<div className="border-t border-t-white border-opacity-50"></div>
					<div className=" lg:flex lg:items-start lg:flex-wrap gap-2 mt-8">
						<div className="flex-1 md:grid  md:grid-cols-2 lg:grid-cols-4 gap-2">
							<div className="flex-1 pt-8">
								<h4 className="font-medium">{footer.fields.column1Title}</h4>
								<ul className="mt-2 flex flex-col gap-2 text-gray-100 text-sm">
									{footer.fields.column1Links.map((link: any) => (
										<div key={link.contentID}>
											{
												<Link
													href={adjustLink(link.fields.uRL.href)}
													target={link.fields.uRL.target}
												>
													{link.fields.title || link.fields.uRL.text}
												</Link>
											}
										</div>
									))}
								</ul>
							</div>
							<div className="flex-1 pt-8">
								<h4 className="font-medium">{footer.fields.column2Title}</h4>
								<ul className="mt-2 flex flex-col gap-2 text-gray-100 text-sm">
									{footer.fields.column2Links.map((link: any) => (
										<div key={link.contentID}>
											{
												<Link
													href={adjustLink(link.fields.uRL.href)}
													target={link.fields.uRL.target}
												>
													{link.fields.title || link.fields.uRL.text}
												</Link>
											}
										</div>
									))}
								</ul>
							</div>
							<div className="flex-1 pt-8">
								<h4 className="font-medium">{footer.fields.column3Title}</h4>
								<ul className="mt-2 flex flex-col gap-2 text-gray-100 text-sm">
									{footer.fields.column3Links.map((link: any) => (
										<div key={link.contentID}>
											{
												<Link
													href={adjustLink(link.fields.uRL.href)}
													target={link.fields.uRL.target}
												>
													{link.fields.title || link.fields.uRL.text}
												</Link>
											}
										</div>
									))}
								</ul>
							</div>
							<div className="flex-1 pt-8">
								<h4 className="font-medium">{footer.fields.column4Title}</h4>
								<ul className="mt-2 flex flex-col gap-2 text-gray-100 text-sm">
									{footer.fields.column4Links.map((link: any) => (
										<div key={link.contentID}>
											{
												<Link
													href={adjustLink(link.fields.uRL.href)}
													target={link.fields.uRL.target}
												>
													{link.fields.title || link.fields.uRL.text}
												</Link>
											}
										</div>
									))}
								</ul>
							</div>
						</div>
						<div className="w-full lg:w-1/3 mt-8 relative">
							<img src="/assets/layout/bg-top.svg" alt="" className="absolute -top-12 -left-12 z-[1]" />
							<img
								src="/assets/layout/bg-top.svg"
								alt=""
								className="absolute -bottom-12 -right-12 z-[1]"
							/>
							<div className="p-8 bg-highlight-light rounded z-[2] relative">
								<h4 className="font-medium">{footer.fields.subscribeTitle}</h4>
								<p className="mt-4 text-sm">{footer.fields.subscribeDescription}</p>
								<FooterSubscribe
									{...{
										subscribeButtonLabel: footer.fields.subscribeButtonLabel,
										subscribeEmailPlaceholder: footer.fields.subscribeEmailPlaceholder,
										subscribeRedirect: footer.fields.subscribeRedirect,
										newsletterSignupForm: footer.fields.newsletterSignupForm,
										subscribeConfirmationMessage: footer.fields.subscribeConfirmationMessage
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-highlight-dark text-white p-3">
				<div className="max-w-screen-xl mx-auto lg:flex lg:flex-row-reverse lg:items-center lg:justify-between">
					<ul className="flex justify-center lg:justify-start gap-4 mt-4 lg:mt-0">
						{footer.fields.followLinks.map((social: any) => (
							<li key={social.contentID} className="mx-4 lg:mx-0">
								<a
									href={social.fields.followURL.href}
									title={`Follow Agility CMS on ${social.fields.title}`}
									target="_blank"
									rel="noreferrer"
								>
									<img
										src={social.fields.logo.url}
										alt={social.fields.logo.label || social.fields.title}
										className="w-6 h-6"
										style={{
											filter: "brightness(0) invert(1)"
										}}
									/>
								</a>
							</li>
						))}
					</ul>

					<div className="lg:flex gap-1 flex-1 text-sm mt-6 lg:mt-0 ">
						<div className="text-center lg:text-left">
							{footer.fields.copyright} {year}
						</div>
						<div className="lg:ml-8 flex flex-wrap justify-center lg:justify-start gap-1 mt-4 lg:mt-0">
							{footer.fields.bottomLinks.map((link: any, index: number) => (
								<div key={link.contentID}>
									<Link
										className="hover-shadow-white"
										href={link.fields.uRL.href}
										target={link.fields.uRL.target}
									>
										{link.fields.title}
									</Link>
									{index < footer.fields.bottomLinks.length - 1 && (
										<span className="ml-2 mr-1 text-white">|</span>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
