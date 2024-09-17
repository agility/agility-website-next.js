

interface ContentItemIsh {
	contentID: number

}
/**
 * Sort a list of ContentItems by a list of IDs in a comma-separated string.
 * @param array An array of ContentItems (or anything with at LEAST a contentID)
 * @param sortIDs A comma-separated string of IDs to sort by.
 * @returns A new array of ContentItems sorted by the order of the IDs in the sortIDs string.
 */
export const sortByIDs = <T extends ContentItemIsh>(array: T[], sortIDs: string) => {

	const idAry = sortIDs.split(",").map((id) => parseInt(id))
	return array.slice().sort(
		(a, b) => idAry.indexOf(a.contentID) - idAry.indexOf(b.contentID)
	)

}