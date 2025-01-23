
import type { Config } from "@netlify/functions";
import { indexSite } from "lib/crawl/index-site";

export default async () => {

	await indexSite()

}

export const config: Config = {
	//run this every 2 hours (0 */2 * * *)
	schedule: "0 */2 * * *"
};