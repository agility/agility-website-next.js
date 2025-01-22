'use client'

import {
	useId,
} from 'react'

import {
	type AutocompleteCollection,
} from '@algolia/autocomplete-core'
import clsx from 'clsx'
import { HighlightQuery } from './HighlightQuery';
import { Autocomplete, Result } from "./Search"

export function SearchResult({
	result,
	resultIndex,
	autocomplete,
	collection,
	query,
}: {
	result: Result
	resultIndex: number
	autocomplete: Autocomplete
	collection: AutocompleteCollection<Result>
	query: string
}) {
	let id = useId()


	return (
		<li
			className={clsx(
				'group block cursor-pointer px-4 py-3 aria-selected:bg-zinc-50 dark:aria-selected:bg-zinc-800/50',
				resultIndex > 0 && 'border-t border-zinc-100 dark:border-zinc-800',
			)}
			aria-labelledby={`${id}-hierarchy ${id}-title`}
			{...autocomplete.getItemProps({
				item: result,
				source: collection.source,
			})}
		>
			<div
				id={`${id}-title`}
				aria-hidden="true"
				className="text-base font-medium text-zinc-900 group-aria-selected:text-highlight-dark dark:text-white"
			>
				<HighlightQuery text={result.title} query={query} />
			</div>
			{result.description && (
				<div className='text-sm line-clamp-2'>
					<HighlightQuery text={result.description} query={query} />
				</div>
			)}
			<div>

				<div
					id={`${id}-hierarchy`}
					aria-hidden="true"
					className="mt-1 truncate whitespace-nowrap text-2xs text-zinc-500"
				>
					{result.__autocomplete_indexName == "doc_site" && (
						<div className='text-xs'>
							<span>Docs</span> {result.concept && <span> / {result.concept}</span>}
						</div>
					)}
					{result.__autocomplete_indexName == "agility-website" && (
						<div className='text-xs'>
							<span>General</span>
						</div>
					)}
				</div>

			</div>
		</li>
	)
}