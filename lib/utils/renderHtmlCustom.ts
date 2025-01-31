import * as cheerio from 'cheerio';

export const renderHTMLCustom = (html: string | null | undefined) => {
	if (!html) return { __html: "" };
	//fix '~' in links in HTML
	let str = html.replace(/href="~\//gi, 'href="/')

	try {
		const $ = cheerio.load(str);
		$("img").each((_, element) => {
			const src = $(element).attr("src");

			if (src && src.includes("static.agilitycms.com") && src.indexOf("format=auto") === -1) {
				//add format=auto to the src attribute
				if (src.indexOf("?") > -1) {
					$(element).attr("src", src + "&format=auto");
				} else {
					$(element).attr("src", src + "?format=auto");
				}
			}

			//turn on lazy loading if loading is not set
			if (!$(element).attr("loading")) {
				$(element).attr("loading", "lazy");
			}
		});

		str = $.html();

	} catch (error) {
		console.error("Error parsing HTML in renderHtml Method", error);
	}

	return { __html: str };
}
