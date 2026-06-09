'use client'

import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import type {
	AutocompleteApi,
	AutocompleteState,
} from '@algolia/autocomplete-core'
import { SearchIcon } from './SearchIcon'

export type Result = {
	url: string
	title: string
	query?: string
	description?: string
	ogImage?: string
	section?: string
	concept?: string
	/** Real publish date (Unix seconds), present only for dated pages. */
	publishedDate?: number
	/** Content-type label (e.g. "Blog Post", "Ebook"), present when inferable. */
	contentType?: string
	__autocomplete_indexName?: string
}

export type Autocomplete = AutocompleteApi<
	Result,
	React.SyntheticEvent,
	React.MouseEvent,
	React.KeyboardEvent
>

// Re-export AutocompleteState for SearchInput's type usage
export type { AutocompleteState }

const SearchDialog = dynamic(
	() => import('./SearchDialog').then((m) => m.SearchDialog),
	{ ssr: false }
)

function useSearchProps() {
	let buttonRef = useRef<React.ElementRef<'button'>>(null)
	let [open, setOpen] = useState(false)
	let [mounted, setMounted] = useState(false)

	// cmd/ctrl+K opens the dialog. Lifted out of SearchDialog so the
	// shortcut works without paying for the dialog JS upfront.
	useEffect(() => {
		function onKeyDown(event: KeyboardEvent) {
			if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
				event.preventDefault()
				setMounted(true)
				setOpen(true)
			}
		}
		window.addEventListener('keydown', onKeyDown)
		return () => {
			window.removeEventListener('keydown', onKeyDown)
		}
	}, [])

	return {
		buttonProps: {
			ref: buttonRef,
			onClick() {
				setMounted(true)
				setOpen(true)
			},
		},
		dialogProps: {
			open,
			setOpen: useCallback(
				(open: boolean) => {
					let { width = 0, height = 0 } =
						buttonRef.current?.getBoundingClientRect() ?? {}
					if (!open || (width !== 0 && height !== 0)) {
						setOpen(open)
					}
				},
				[setOpen],
			),
		},
		mounted,
	}
}

export function Search() {
	let [modifierKey, setModifierKey] = useState<string>()
	let { buttonProps, dialogProps, mounted } = useSearchProps()

	useEffect(() => {
		setModifierKey(
			/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? '⌘' : 'Ctrl ',
		)
	}, [])

	return (
		<div className="flex-nowrap text-nowrap">
			<button
				type="button"
				title={`Search ${modifierKey}K`}
				className="flex h-6 cursor-pointer items-center justify-end rounded-md transition-all duration-300 ease-in-out ui-not-focus-visible:outline-none outline-violet-600 group overflow-hidden w-8 hover:w-24 gap-1"
				aria-label="Find something..."
				{...buttonProps}
			>
				<span className="whitespace-nowrap text-sm font-medium text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
					Search
				</span>
				<SearchIcon className="h-5 w-5 flex-shrink-0 stroke-white stroke-2 group-hover:stroke-secondary transition-colors" />

			</button>
			{mounted && (
				<Suspense fallback={null}>
					<SearchDialog className="hidden lg:block" {...dialogProps} />
				</Suspense>
			)}
		</div>
	)
}

export function MobileSearch() {
	let { buttonProps, dialogProps, mounted } = useSearchProps()

	return (
		<div className="contents lg:hidden">
			<button
				type="button"
				className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 ui-not-focus-visible:outline-none lg:hidden  outline-violet-600"
				aria-label="Find something..."
				{...buttonProps}
			>
				<SearchIcon className="h-5 w-5 stroke-zinc-900 " />
			</button>
			{mounted && (
				<Suspense fallback={null}>
					<SearchDialog className="lg:hidden" {...dialogProps} />
				</Suspense>
			)}
		</div>
	)
}
