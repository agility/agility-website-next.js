import { draftMode } from "next/headers"
import LoadingWidget from "components/common/LoadingWidget"
import PreviewBar from "components/common/PreviewBar"
import SiteFooter from "components/common/footer/SiteFooter"
import SiteHeader from "components/common/header/SiteHeader"

import { useAgilityContext } from "lib/cms/useAgilityContext"

import "/styles/globals.css"

import { getHeaderContent } from "lib/cms-content/getHeaderContent"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

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
			<body data-agility-guid={process.env.AGILITY_GUID}>
				<div id="site-wrapper">
					<div id="site">
						<div className="flex flex-col min-h-screen">
							<SiteHeader {...{ headerContent }} />

							<main className={`flex-grow`}>{children}</main>
							<SiteFooter />
						</div>
					</div>
				</div>
				{(isPreview || isDevelopmentMode) && (
					<PreviewBar {...{ isDevelopmentMode, isPreview, startPreviewMode }} />
				)}
			</body>
		</html>
	)
}
