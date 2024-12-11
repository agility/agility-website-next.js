import { rebuildRedirectCache } from "lib/cms-content/rebuildRedirectCache"
const fs = require("fs")
const path = require("path")

require("dotenv").config({
	path: `.env.local`,
})

const doWork = async () => {

	console.log("Agility Website => Prebuild Started")
	//rebuild the redirects
	await rebuildRedirectCache()


	//download the contents of the typekit css file using fetch and output it to the typekit.css file in the /styles folder
	console.log("Agility Website => Downloading Typekit CSS for inlining")

	const typekitCSS = await fetch("https://use.typekit.net/arl7bjd.css")
	if (typekitCSS.ok) {
		const typekitCSSContent = await typekitCSS.text()
		fs.writeFileSync(path.join(process.cwd(), "./styles/typekit.css"), typekitCSSContent)
	} else {
		console.error("Error downloading Typekit CSS")
	}

	console.log("Agility Website => Prebuild Complete")

}


doWork()