import React, { Suspense } from "react"
import { ContentZone } from "@agility/nextjs"
import { getModule } from "../agility-components"
import LoadingWidget from "components/common/LoadingWidget"

const MainTemplate = (props: any) => {
	return (
		<Suspense fallback={<LoadingWidget />}>
			<ContentZone name="Main" {...props} getModule={getModule} />
		</Suspense>
	)
}

export default MainTemplate
