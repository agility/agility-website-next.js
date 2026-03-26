'use client'


import {
	type AutocompleteCollection,
} from '@algolia/autocomplete-core'
import { SearchResult } from './SearchResult';
import { Autocomplete, Result } from './Search';
import { NoResultsIcon } from './NoResultsIcon';

function interleaveByIndex(items: Result[]): Result[] {
	const indexA: Result[] = []
	const indexB: Result[] = []
	for (const item of items) {
		if (item.__autocomplete_indexName === 'doc_site') {
			indexB.push(item)
		} else {
			indexA.push(item)
		}
	}
	const result: Result[] = []
	const maxLen = Math.max(indexA.length, indexB.length)
	for (let i = 0; i < maxLen; i++) {
		if (i < indexA.length) result.push(indexA[i])
		if (i < indexB.length) result.push(indexB[i])
	}
	return result
}

export default function SearchResults({
	autocomplete,
	query,
	collection,
	extraResults = [],
	isLoadingMore = false,
	totalHits = null,
	onExtraResultClick,
}: {
	autocomplete: Autocomplete
	query: string
	collection: AutocompleteCollection<Result>
	extraResults?: Result[]
	isLoadingMore?: boolean
	totalHits?: number | null
	onExtraResultClick?: (result: Result) => void
}) {
	if (collection.items.length === 0 && extraResults.length === 0) {
		return (
			<div className="p-6 text-center">
				<NoResultsIcon className="mx-auto h-5 w-5 stroke-zinc-900 " />
				<p className="mt-2 text-xs text-zinc-700 ">
					Nothing found for{' '}
					<strong className="break-words font-semibold text-zinc-900 ">
						&lsquo;{query}&rsquo;
					</strong>
					. Please try again.
				</p>
			</div>
		)
	}

	const sorted = interleaveByIndex(collection.items)
	const displayedCount = sorted.length + extraResults.length

	return (
		<>
			{totalHits !== null && (
				<div className="sticky top-0 z-10 bg-white px-4 py-2 text-xs text-zinc-500 border-b border-zinc-100">
					Showing {displayedCount} of {totalHits} results
				</div>
			)}
			<ul {...autocomplete.getListProps()}>
				{sorted.map((result, resultIndex) => (
					<SearchResult
						key={result.url}
						result={result}
						resultIndex={resultIndex}
						autocomplete={autocomplete}
						collection={collection}
						query={query}
					/>
				))}
			</ul>
			{extraResults.length > 0 && (
				<ul>
					{extraResults.map((result, resultIndex) => (
						<SearchResult
							key={`extra-${result.url}-${resultIndex}`}
							result={result}
							resultIndex={sorted.length + resultIndex}
							query={query}
							onClick={() => onExtraResultClick?.(result)}
						/>
					))}
				</ul>
			)}
			{isLoadingMore && (
				<div className="px-4 py-3 text-center text-sm text-zinc-500">
					Loading more results...
				</div>
			)}
		</>
	)
}
