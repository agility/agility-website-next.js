import { draftMode } from "next/headers"
import PreviewBar from "components/common/PreviewBar"
import SiteFooter from "components/common/footer/SiteFooter"
import SiteHeader from "components/common/header/SiteHeader"

import { useAgilityContext } from "lib/cms/useAgilityContext"
import { GoogleTagManager } from "@next/third-parties/google"

import "/styles/typekit.css"
import "/styles/output.css"

import { getHeaderContent } from "lib/cms-content/getHeaderContent"
import { redirect } from "next/navigation"
import Script from "next/script"
import HubspotTracker from "components/common/HubspotTracker"

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
		<html lang="en" className="font-sans text-primary">
			<head>
				<head>
					<link rel="preconnect" href="https://static.agilitycms.com" />
					<link rel="preconnect" href="https://p.typekit.net" />
					<link rel="preconnect" href="https://use.typekit.net" />

					<link rel="preconnect" href="https://js.hsforms.net" />
					<link rel="preconnect" href="https://forms.hsforms.com" />
					<link rel="preconnect" href="https://www.googletagmanager.com" />
				</head>
			</head>
			{process.env.GTM_ID && <GoogleTagManager gtmId={process.env.GTM_ID} />}
			<body data-agility-guid={process.env.AGILITY_GUID}>
				<div id="site-wrapper">
					<div id="site">
						<div className="flex min-h-screen flex-col">
							<SiteHeader {...{ headerContent }} />

							<main className={`flex-grow`}>{children}</main>
							<SiteFooter />
						</div>
					</div>
				</div>
				{(isPreview || isDevelopmentMode) && (
					<PreviewBar {...{ isDevelopmentMode, isPreview, startPreviewMode }} />
				)}

				<HubspotTracker />
				{/* Load in the agility web-studio-sdk script */}
				<Script src="https://unpkg.com/@agility/web-studio-sdk@latest/dist/index.js" />
			</body>
		</html>
	)
}
