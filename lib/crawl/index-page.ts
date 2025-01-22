import { algoliasearch } from 'algoliasearch';
import * as cheerio from 'cheerio';

export const indexPage = async (path: string) => {

	const appID = process.env.ALGOLIA_APP_ID || ""
	const adminKey = process.env.ALGOLIA_ADMIN_API_KEY || ""
	const indexName = "agility-website"

	const algoliaClient = algoliasearch(appID, adminKey);

	console.log("Indexing Path: ", path)
	const url = `https://agilitycms.com${path}`
	const pageRes = await fetch(url)
	if (pageRes.ok) {
		const pageHTML = await pageRes.text()
		const objectID = path.replace(/\//g, "-")
		const $ = cheerio.load(pageHTML);

		let jsonld: any = undefined

		try {
			const jsonldNode = $('script[type="application/ld+json"]').html()
			if (jsonldNode) {
				jsonld = JSON.parse(jsonldNode);
			}
		} catch (err) { }

		$('script').remove();
		$("header").remove();
		$("footer").remove();

		let title = $('meta[property="og:title"]').attr('content') || "";
		let ogImage = $('meta[property="og:image"]').attr('content') || undefined;
		title = title.replace("| Agility CMS", "");
		title = title.replace("- Agility CMS", "");

		const description = $('meta[name=description]').attr('content');
		let mainHtml = $('main').html() || "";
		mainHtml = mainHtml
			.replaceAll(/<(.|\n)*?>/g, '\n') //replace tags and add a new line
			.replaceAll("&nbsp;", " ") //find non-breaking spaces
			.replace(/\s\s+/g, ' ').trim(); //remove extra spaces

		//also grab all the images
		const images = $('img').map((i, el) => {
			return {
				src: $(el).attr('src'),
				alt: $(el).attr('alt')
			}
		})

		if (!description) {
			console.error("No description found for page: ", path)
		}

		try {
			const response = await algoliaClient.addOrUpdateObject({
				indexName,
				objectID,
				body: {
					title,
					description,
					jsonld,
					ogImage,
					html: mainHtml,
					images: images.toArray(),
					url
				}

			});
		} catch (e) {
			console.error("Error indexing page: ", path, e)
		}
	} else {
		console.error("Error fetching page: ", path, pageRes.status, pageRes.statusText)
	}
}