import { PageProps } from "lib/cms/getAgilityPage"
import { getRedirections, Redirection } from "lib/cms/getRedirections"

export const checkRedirect = async ({ params }: PageProps): Promise<Redirection | null> => {

	const redirections = await getRedirections()
	if (!redirections) return null



	const thisPath = `/${(params.slug || []).join("/")}`.toLowerCase()

	const redirection = redirections.items[thisPath]

	return redirection || null

}