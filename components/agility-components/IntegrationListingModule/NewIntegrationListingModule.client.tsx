"use client"

import { AgilityPic } from "@agility/nextjs"
import { IconChevronRight } from "@tabler/icons-react"
import { ComboboItem, FilterComboBox } from "components/micro/FilterComboBox"
import { LinkButton } from "components/micro/LinkButton"
import { IntegrationsQuery } from "gql/__generated__/graphql"
import Link from "next/link"
import { useMemo, useState } from "react"
interface Props {
	data: IntegrationsQuery
	allTypes: ComboboItem[]
	cTATitle: string
	filterLabel: string
	currentIntegration: ComboboItem | null
}

export const NewIntegrationListingModuleClient = ({
	data,
	allTypes,
	cTATitle,
	filterLabel,
	currentIntegration
}: Props) => {
	const [selectedType, setSelectedType] = useState<ComboboItem | null>(currentIntegration)

	const filtered = useMemo(() => {
		return data.integrations?.filter((integration) => {
			if (!integration || !integration.fields) return false

			const { integrationType: integrationTypes } = integration.fields

			const integrationType = integrationTypes && integrationTypes?.length > 0 ? integrationTypes[0] : null

			if (!selectedType) return true

			return integrationType?.contentID === selectedType.value
		})
	}, [selectedType, data])
	return (
		<div className="mx-auto max-w-7xl">
			<div className="flex w-full">
				<FilterComboBox
					{...{
						label: filterLabel,
						items: allTypes,
						selectedItem: selectedType,
						className: "md:w-1/3 w-full min-w-[300px]",
						onChange: (item) => {
							const val = item?.value ? item.text.replaceAll(" ", "-").toLowerCase() : ""
							if (val) {
								window.history.pushState(null, "", `?integration=${val}`)
								setSelectedType(item)
							} else {
								window.history.pushState(null, "", location.pathname)
								setSelectedType(null)
							}
						}
					}}
				/>
			</div>

			<div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
				{filtered?.map((integration) => {
					if (!integration || !integration.fields) return null

					const {
						uRL,
						title,
						logo,
						integrationType: integrationTypes,
						companyDescription
					} = integration.fields

					const integrationType =
						integrationTypes && integrationTypes?.length > 0 ? integrationTypes[0] : null

					let url = `/partners/integrations/${uRL}`

					return (
						<Link
							key={integration.contentID}
							href={url}
							className="group flex w-full flex-col items-start gap-2 border border-background p-6 text-left transition-shadow hover:shadow-lg"
						>
							<div className="flex h-32 w-full items-center justify-center">
								{logo && (
									<AgilityPic
										image={{
											url: logo.url,
											label: logo.label || title || "",
											height: logo.height,
											width: logo.width,
											filesize: 0,
											target: "_blank"
										}}
										fallbackWidth={200}
										className="transition-transform group-hover:scale-105"
									/>
								)}
							</div>
							<h3 className="text-xl font-bold">{title}</h3>
							<p className="flex-1">{companyDescription}</p>
							{/* {integrationType && <p>{integrationType.fields?.title}</p>} */}

							<div className="flex items-center gap-1 font-medium text-highlight-light">
								<span>{cTATitle}</span>
								<IconChevronRight className="h-5 w-5" />
							</div>
						</Link>
					)
				})}
			</div>
		</div>
	)
}
