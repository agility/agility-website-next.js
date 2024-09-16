/* eslint-disable @next/next/no-img-element */
import { AgilityPic, renderHTML, UnloadedModuleProps } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { IPartner } from "lib/types/IPartner"

export const PartnerContentPanel = async ({ languageCode, dynamicPageItem, module }: UnloadedModuleProps) => {
	if (!dynamicPageItem) return null

	const partner: IPartner = dynamicPageItem.fields
	console.log("partner", dynamicPageItem)

	const logo = partner.partnerLogo || partner.logo

	return (
		<div className="bg-highlight-light text-white">
			<Container className="mx-auto max-w-7xl px-8">
				<div className="flex flex-col items-center lg:flex-row">
					<div className="flex flex-col justify-center gap-4 text-center lg:w-3/5 lg:text-left">
						<h1 className="text-5xl">{partner.title}</h1>
						<div
							className="prose prose-lg prose-invert"
							dangerouslySetInnerHTML={renderHTML(partner.contentPanelCopy || partner.companyDescription)}
						></div>
					</div>
					<div className="relative mt-10 flex justify-center lg:mt-0 lg:w-2/5">
						{logo && (
							<div className="relative z-[3] h-72 rounded-md bg-white p-6">
								<AgilityPic image={logo} className="h-full object-contain" fallbackWidth={600} />
							</div>
						)}

						<img
							src="/images/features/icon-Container.svg"
							alt=""
							className="absolute -bottom-10 -right-10 z-[2]"
						/>
					</div>
				</div>
			</Container>
		</div>
	)
}
