import React, { Suspense } from "react"
import { ContentZone } from "@agility/nextjs"
import { getModule } from "../agility-components"


const MainTemplate = (props: any) => {
	return <ContentZone name="Main" {...props} getModule={getModule} />
}

export default MainTemplate
