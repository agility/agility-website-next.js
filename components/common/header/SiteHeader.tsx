import Link from "next/link"
import Image from "next/image"

import type { HeaderContent } from "lib/cms-content/getHeaderContent"
import { PreHeader } from "./PreHeader"
import { HeaderShellClient } from "./HeaderShellClient"
import { MobileMenuClient } from "./MobileMenuClient"
import { DesktopNavClient } from "./DesktopNavClient"

interface Props {
	headerContent: HeaderContent
}

const SiteHeader = ({ headerContent: { header, links, preheaderLinks } }: Props) => {
	if (!header) {
		return (
			<header className="relative p-8 text-center">
				<p className="font-bold text-gray-400">No Header Available</p>
			</header>
		)
	}

	return (
		<>
			<PreHeader
				marketingBanner={header.fields.marketingBanner}
				hideMarketingBanner={header.fields.hideMarketingBanner}
				preheaderLinks={preheaderLinks}
			/>

			<HeaderShellClient>
				<div className="mx-auto max-w-7xl">
					<div className="flex w-full items-center justify-between py-6 lg:justify-start lg:space-x-10">
						{/* Logo */}
						<div className="lg:w-0 lg:flex-1">
							<Link href="/" className="flex items-center">
								<Image
									className="h-9 w-auto"
									src={header.fields.stickyLogo.url}
									alt={header.fields.stickyLogo.label}
									width={header.fields.stickyLogo.width || 200}
									height={header.fields.stickyLogo.height || 36}
									unoptimized={header.fields.stickyLogo.url.endsWith(".svg")}
									priority
								/>
							</Link>
						</div>

						{/* Mobile actions (search, contact button, hamburger, dialog) */}
						<MobileMenuClient
							links={links}
							mobileLogo={header.fields.mobileLogo}
							contactus={header.fields.contactus}
							primaryButton={header.fields.primaryButton}
						/>

						{/* Desktop nav with dropdowns + CTAs */}
						<DesktopNavClient
							links={links}
							contactus={header.fields.contactus}
							primaryButton={header.fields.primaryButton}
						/>
					</div>
				</div>
			</HeaderShellClient>
		</>
	)
}

export default SiteHeader
