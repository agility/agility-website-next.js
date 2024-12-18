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
						<div className="flex-1 gap-2 md:grid md:grid-cols-2 lg:grid-cols-4">
							<div className="flex-1 pt-8">
								<h4 className="font-medium">{footer.fields.column1Title}</h4>
								<ul className="mt-2 flex flex-col text-sm text-gray-100">
									{footer.fields.column1Links.map((link: any) => (
										<li key={link.contentID}>
											<Link
												href={adjustLink(link.fields.uRL.href)}
												target={link.fields.uRL.target}
												className="block py-1"
											>
												{link.fields.title || link.fields.uRL.text}
											</Link>
										</li>
									))}
								</ul>
							</div>
							<div className="flex-1 pt-8">
								<h4 className="font-medium">{footer.fields.column2Title}</h4>
								<ul className="mt-2 flex flex-col text-sm text-gray-100">
									{footer.fields.column2Links.map((link: any) => (
										<li key={link.contentID}>
											<Link
												href={adjustLink(link.fields.uRL.href)}
												target={link.fields.uRL.target}
												className="block py-1"
											>
												{link.fields.title || link.fields.uRL.text}
											</Link>
										</li>
									))}
								</ul>
							</div>
							<div className="flex-1 pt-8">
								<h4 className="font-medium">{footer.fields.column3Title}</h4>
								<ul className="mt-2 flex flex-col text-sm text-gray-100">
									{footer.fields.column3Links.map((link: any) => (
										<li key={link.contentID}>
											<Link
												href={adjustLink(link.fields.uRL.href)}
												target={link.fields.uRL.target}
												className="block py-1"
											>
												{link.fields.title || link.fields.uRL.text}
											</Link>
										</li>
									))}
								</ul>
							</div>
							<div className="flex-1 pt-8">
								<h4 className="font-medium">{footer.fields.column4Title}</h4>
								<ul className="mt-2 flex flex-col text-sm text-gray-100">
									{footer.fields.column4Links.map((link: any) => (
										<li key={link.contentID}>
											<Link
												href={adjustLink(link.fields.uRL.href)}
												target={link.fields.uRL.target}
												className="block py-1"
											>
												{link.fields.title || link.fields.uRL.text}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
						<div className="relative mt-8 w-full lg:w-1/3">
							<img
								src="https://static.agilitycms.com/layout/static/bg-top.svg"
								alt=""
								className="absolute -left-12 -top-12 z-[1]"
							/>
							<img
								src="https://static.agilitycms.com/layout/static/bg-top.svg"
								alt=""
								className="absolute -bottom-12 -right-12 z-[1]"
							/>
							<div className="relative z-[2] rounded bg-highlight-light p-8">
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
			<div className="bg-highlight-dark p-3 text-white">
				<div className="mx-auto max-w-7xl lg:flex lg:flex-row-reverse lg:items-center lg:justify-between">
					<ul className="mt-4 flex justify-center gap-4 lg:mt-0 lg:justify-start">
						{footer.fields.followLinks.map((social: any) => (
							<li key={social.contentID} className="-my-2 mx-4 lg:mx-0">
								<a
									href={social.fields.followURL.href}
									title={`Follow Agility CMS on ${social.fields.title}`}
									target="_blank"
									rel="noreferrer"
									className="block p-2"
								>
									<img
										src={social.fields.logo.url}
										alt={social.fields.logo.label || social.fields.title}
										className="h-6 w-6"
										style={{
											filter: "brightness(0) invert(1)"
										}}
									/>
								</a>
							</li>
						))}
					</ul>

					<div className="mt-6 flex-1 gap-1 text-sm lg:mt-0 lg:flex">
						<div className="text-center lg:text-left">
							{footer.fields.copyright} {year}
						</div>
						<div className="mt-4 flex flex-wrap justify-center lg:ml-8 lg:mt-0 lg:justify-start">
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
			</div>
		</footer>
	)
}
