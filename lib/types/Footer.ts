import { ContentItem } from "@agility/content-fetch"
import { FooterLink } from "./FooterLink"

export interface Footer {
	column1Title?: string
	column1Links?: ContentItem<FooterLink>[]
	column2Title?: string
	column2Links?: ContentItem<FooterLink>[]
	column3Title?: string
	column3Links?: ContentItem<FooterLink>[]
	column4Title?: string
	column4Links?: ContentItem<FooterLink>[]
	column5Title?: string
	column5Links?: ContentItem<FooterLink>[]
	followTitle?: string
	subscribeTitle?: string
	subscribeDescription?: string
	subscribeEmailPlaceholder?: string
	subscribeButtonLabel?: string
	subscribeRedirect?: string
	newsletterSignupForm?: string
	subscribeConfirmationMessage?: string
	copyright?: string
	bottomLinks: ContentItem<FooterLink>[]
}
