import { rebuildRedirectCache } from "lib/cms-content/rebuildRedirectCache"

const doWork = async () => {

	//rebuild the redirects
	await rebuildRedirectCache()

}


doWork()