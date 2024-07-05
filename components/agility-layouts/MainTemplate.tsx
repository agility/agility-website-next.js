import React from "react"
import {ContentZone} from "@agility/nextjs"
import {getModule} from "../agility-components"

const MainTemplate = (props: any) => {
	return (
		<div>
			<ContentZone name="Main" {...props} getModule={getModule} />
		</div>
	)
}

export default MainTemplate
