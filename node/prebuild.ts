import { rebuildRedirectCache } from "lib/cms-content/rebuildRedirectCache"

require("dotenv").config({
	path: `.env.local`,
})

const doWork = async () => {

	//rebuild the redirects
	await rebuildRedirectCache()

}


doWork()