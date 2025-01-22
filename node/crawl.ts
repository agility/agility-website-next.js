import { indexSite } from "lib/crawl/index-site"

require("dotenv").config({
	path: `.env.local`,
})

const doWork = async () => {

	console.log("Agility Website => Crawl")
	// *** rebuild the redirects ***
	await indexSite()

	console.log("Agility Website => Crawl Complete")

}


doWork()