import React, { Suspense } from "react"
import { ContentZone } from "@agility/nextjs"
import { getModule } from "../agility-components"
import LoadingWidget from "components/common/LoadingWidget"

export const TwoColumnswithTopZoneTemplate = (props: any) => {
	return (
		<>
			<ContentZone name="Top" {...props} getModule={getModule} />
			<div>
				<ContentZone name="Main" {...props} getModule={getModule} />
				<ContentZone name="RightColumn" {...props} getModule={getModule} />
			</div>
		</>
	)
}
