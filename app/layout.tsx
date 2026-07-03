import { draftMode } from "next/headers"
import PreviewBar from "components/common/PreviewBar"
import SiteFooter from "components/common/footer/SiteFooter"
import SiteHeader from "components/common/header/SiteHeader"

import { useAgilityContext } from "lib/cms/useAgilityContext"

import "/styles/output.css"

import { getHeaderContent } from "lib/cms-content/getHeaderContent"
import { redirect } from "next/navigation"
import Script from "next/script"
import HubspotTracker from "components/common/HubspotTracker"
import { Mulish } from 'next/font/google'
import { PostHogProvider } from "./providers"

// If loading a variable font, you don't need to specify the font weight
const mulish = Mulish({
	subsets: ['latin'],
	display: 'swap', //using swap to avoid render blocking
	variable: '--font-mulish',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const { locale, sitemap, isDevelopmentMode, isPreview } = useAgilityContext()

	const headerContent = await getHeaderContent({ sitemap, locale })

	async function startPreviewMode(pathname: string) {
		"use server"

		//turn on draft/preview mode
		draftMode().enable()

		// Redirect to the same page
		let url = `${pathname}`
		if (url.includes("?")) {
			url = `${url}&preview=1`
		} else {
			url = `${url}?preview=1`
		}
		redirect(url)
	}

	return (
		<html lang="en" className={`font-sans text-primary ${mulish.variable}`}>
			<head>
				<link rel="preconnect" href="https://static.agilitycms.com" />
				<link rel="preconnect" href="https://js.hsforms.net" />
				<link rel="preconnect" href="https://forms.hsforms.com" />
				<link rel="preconnect" href="https://www.googletagmanager.com" />
				<link rel="dns-prefetch" href="https://unpkg.com" />
				<link rel="dns-prefetch" href="https://cdn.aglty.io" />
			</head>
			<body data-agility-guid={process.env.AGILITY_GUID}>
				{/* GTM via a hand-rolled lazyOnload snippet: the @next/third-parties
				    GoogleTagManager component always injects afterInteractive (it accepts
				    no strategy prop), which puts ~2MB of downstream tag JS on the main
				    thread during the critical window. lazyOnload waits for window.load. */}
				{process.env.GTM_ID && (
					<Script id="gtm" strategy="lazyOnload">
						{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${process.env.GTM_ID}');`}
					</Script>
				)}
				<PostHogProvider>
					<div id="site-wrapper">
						<div id="site">
							<div className="flex min-h-screen flex-col">
								<SiteHeader {...{ headerContent }} />

								<main className={`flex-grow`}>

									{children}</main>
								<SiteFooter />
							</div>
						</div>
					</div>
					{(isPreview || isDevelopmentMode) && (
						<PreviewBar {...{ isDevelopmentMode, isPreview, startPreviewMode }} />
					)}

					<HubspotTracker />
					{/* Load in the agility web-studio-sdk script - only in preview/dev (CMS editing context) */}
					{(isPreview || isDevelopmentMode) && (
						<Script
							src="https://unpkg.com/@agility/web-studio-sdk@latest/dist/index.js"
							strategy="lazyOnload"
						/>
					)}
				</PostHogProvider>
			</body>
		</html>
	)
}
