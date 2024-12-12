import { rebuildRedirectCache } from "lib/cms-content/rebuildRedirectCache"
const fs = require("fs")
const path = require("path")

require("dotenv").config({
	path: `.env.local`,
})

const doWork = async () => {

	console.log("Agility Website => Prebuild Started")
	// *** rebuild the redirects ***
	await rebuildRedirectCache()


	console.log("Agility Website => Prebuild Complete")

}


doWork()