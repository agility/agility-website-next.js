//@ts-nocheck
"use client"

import { LinkButton } from "components/micro/LinkButton"
import { HubspotForm } from "lib/types/HubspotForm"
import Script from "next/script"

interface Props {
	subscribeButtonLabel: string
	subscribeEmailPlaceholder: string
	subscribeRedirect: string
	newsletterSignupForm: string
	subscribeConfirmationMessage: string
}

export const FooterSubscribe = ({
	subscribeButtonLabel,
	subscribeEmailPlaceholder,
	subscribeRedirect,
	subscribeConfirmationMessage,
	newsletterSignupForm
}: Props) => {
	if (!newsletterSignupForm) {
		return null
	}

	const { portalId, formId }: HubspotForm = JSON.parse(newsletterSignupForm)
	const divID = `form_${formId}`

	return (
		<div className="mt-4">
			<Script
				{...{
					type: "text/javascript",
					strategy: "afterInteractive",
					defer: true,
					async: true,
					src: "//js.hsforms.net/forms/embed/v2.js",
					onReady: () => {
						hbspt.forms.create({
							region: "na1",
							portalId,
							formId,
							target: `#${divID}`
							//HACK: don't do a redirect here... redirectUrl: subscribeRedirect ? subscribeRedirect : undefined
						})
					}
				}}
			/>
			<div id={divID}></div>
		</div>
	)

	// return (
	// 	<form
	// 		className="mt-4 flex gap-1"
	// 		onSubmit={(e) => {
	// 			e.preventDefault()
	// 			console.log("SUBSCRIBE")
	// 		}}
	// 	>
	// 		<input type="email" placeholder="Email Address" className="w-full p-2 bg-white leading-6" required />
	// 		<LinkButton type="secondary-inverted" buttonType="submit">
	// 			{subscribeButtonLabel}
	// 		</LinkButton>
	// 	</form>
	// )
}
