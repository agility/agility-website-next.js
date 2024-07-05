import { ImageField, URLField } from "@agility/nextjs"

export interface Header {
	marketingBanner: string
	hideMarketingBanner: string
	preHeaderLinks: {
		referencename: string,
		sortids: string
		fulllist: boolean
	}
	logo: ImageField
	stickyLogo: ImageField
	mobileLogo: ImageField
	menuStructure: {
		referencename: string,
		fulllist: boolean
	}
	contactus: URLField
	primaryButton: URLField
	secondaryButton: URLField
	marketingBannerButton: URLField
	sEOImage: ImageField

}