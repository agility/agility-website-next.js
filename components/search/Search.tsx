'use client'

import { liteClient } from 'algoliasearch/lite';

import { getAlgoliaResults } from "@algolia/autocomplete-preset-algolia";




import {
	forwardRef,
	Suspense,
	useCallback,
	useEffect,
	useId,
	useRef,
	useState,
} from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
	type AutocompleteApi,
	type AutocompleteState,
	createAutocomplete,
} from '@algolia/autocomplete-core'
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react'
import clsx from 'clsx'
import SearchResults from './SearchResults';
import { SearchInput } from './SearchInput';
import { SearchIcon } from './SearchIcon';


export type Result = {
	url: string
	title: string
	query?: string
	description?: string
	ogImage?: string
	section?: string
	concept?: string
	__autocomplete_indexName?: string
}

const searchClient = liteClient(
	process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "",
	process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || ""
);

type EmptyObject = Record<string, never>

export type Autocomplete = AutocompleteApi<
	Result,
	React.SyntheticEvent,
	React.MouseEvent,
	React.KeyboardEvent
>

function useAutocomplete({ close }: { close: () => void }) {
	let id = useId()
	let router = useRouter()
	let [autocompleteState, setAutocompleteState] = useState<
		AutocompleteState<Result> | EmptyObject
	>({})

	function navigate({ item }: { item: Result }) {

		const itemUrl = item.url
		if (!itemUrl) {
			return
		}

		let url = itemUrl
		if (url.startsWith("https://agilitycms.com")) {
			//make absolutle URLs relative so they work locally and on deploy previews
			url = url.replace("https://agilitycms.com", "")
		} else if (url.startsWith('/')) {
			//make the docs URLs absolute
			url = `https://agilitycms.com/docs${url}`
		}


		router.push(url)

		if (
			itemUrl ===
			window.location.pathname + window.location.search + window.location.hash
		) {
			close()
		}
	}


	let [autocomplete] = useState<Autocomplete>(() =>
		createAutocomplete<
			Result,
			React.SyntheticEvent,
			React.MouseEvent,
			React.KeyboardEvent
		>({
			id,
			placeholder: 'Search...',
			defaultActiveItemId: 0,
			onStateChange({ state }) {
				setAutocompleteState(state)
			},
			shouldPanelOpen({ state }) {
				return state.query !== ''
			},
			navigator: {
				navigate,
			},
			insights: true,
			getSources({ query }) {
				return [
					{
						sourceId: 'documentation',
						getItems() {
							return getAlgoliaResults({
								searchClient,
								queries: [
									{
										indexName: 'agility-website',
										params: {
											query,
											hitsPerPage: 10,
										},
									},
									{
										indexName: 'doc_site',
										params: {
											query,
											hitsPerPage: 10,
										},
									},
								],
							});
						},
						getItemUrl({ item }) {
							return item.url
						},
						onSelect: navigate,
					},
				]
			},
		}),
	)

	return { autocomplete, autocompleteState }
}











function SearchDialog({
	open,
	setOpen,
	className,
}: {
	open: boolean
	setOpen: (open: boolean) => void
	className?: string
}) {
	let formRef = useRef<React.ElementRef<'form'>>(null)
	let panelRef = useRef<React.ElementRef<'div'>>(null)
	let inputRef = useRef<React.ElementRef<typeof SearchInput>>(null)
	let { autocomplete, autocompleteState } = useAutocomplete({
		close() {
			setOpen(false)
		},
	})
	let pathname = usePathname()
	let searchParams = useSearchParams()
	let router = useRouter()

	const [extraResults, setExtraResults] = useState<Result[]>([])
	const [isLoadingMore, setIsLoadingMore] = useState(false)
	const [totalHits, setTotalHits] = useState<number | null>(null)
	const pageRef = useRef(0)
	const queryRef = useRef('')
	const isLoadingMoreRef = useRef(false)
	const hasMoreRef = useRef(true)

	useEffect(() => {
		setOpen(false)
	}, [pathname, searchParams, setOpen])

	useEffect(() => {
		if (open) {
			return
		}

		function onKeyDown(event: KeyboardEvent) {
			if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
				event.preventDefault()
				setOpen(true)
			}
		}

		window.addEventListener('keydown', onKeyDown)

		return () => {
			window.removeEventListener('keydown', onKeyDown)
		}
	}, [open, setOpen])

	// Reset pagination when query changes and fetch total count
	useEffect(() => {
		const query = (autocompleteState as AutocompleteState<Result>).query || ''
		if (query !== queryRef.current) {
			queryRef.current = query
			pageRef.current = 0
			isLoadingMoreRef.current = false
			hasMoreRef.current = true
			setExtraResults([])
			setIsLoadingMore(false)
			setTotalHits(null)

			if (query) {
				searchClient.search({
					requests: [
						{ indexName: 'agility-website', query, hitsPerPage: 0 },
						{ indexName: 'doc_site', query, hitsPerPage: 0 },
					]
				}).then((response: any) => {
					if (queryRef.current === query) {
						const total = response.results.reduce(
							(sum: number, r: any) => sum + (r.nbHits || 0), 0
						)
						setTotalHits(total)
					}
				}).catch(() => {})
			}
		}
	}, [autocompleteState])

	function navigateToResult(result: Result) {
		let url = result.url
		if (!url) return
		if (url.startsWith("https://agilitycms.com")) {
			url = url.replace("https://agilitycms.com", "")
		} else if (url.startsWith('/')) {
			url = `https://agilitycms.com/docs${url}`
		}
		router.push(url)
		setOpen(false)
	}

	const loadMore = useCallback(async () => {
		const query = queryRef.current
		if (!query || isLoadingMoreRef.current || !hasMoreRef.current) return

		isLoadingMoreRef.current = true
		setIsLoadingMore(true)
		const nextPage = pageRef.current + 1

		try {
			const response: any = await searchClient.search({
				requests: [
					{ indexName: 'agility-website', query, hitsPerPage: 10, page: nextPage },
					{ indexName: 'doc_site', query, hitsPerPage: 10, page: nextPage },
				]
			})

			if (queryRef.current !== query) return

			const newResults: Result[] = []
			for (let i = 0; i < response.results.length; i++) {
				const indexName = i === 0 ? 'agility-website' : 'doc_site'
				for (const hit of (response.results[i].hits || [])) {
					newResults.push({
						url: hit.url,
						title: hit.title,
						description: hit.description,
						ogImage: hit.ogImage,
						section: hit.section,
						concept: hit.concept,
						__autocomplete_indexName: indexName,
					})
				}
			}

			if (newResults.length === 0) {
				hasMoreRef.current = false
			} else {
				const idxA = newResults.filter(r => r.__autocomplete_indexName !== 'doc_site')
				const idxB = newResults.filter(r => r.__autocomplete_indexName === 'doc_site')
				const interleaved: Result[] = []
				const maxLen = Math.max(idxA.length, idxB.length)
				for (let i = 0; i < maxLen; i++) {
					if (i < idxA.length) interleaved.push(idxA[i])
					if (i < idxB.length) interleaved.push(idxB[i])
				}
				setExtraResults(prev => [...prev, ...interleaved])
				pageRef.current = nextPage
			}
		} catch {
			// ignore errors
		} finally {
			if (queryRef.current === query) {
				isLoadingMoreRef.current = false
				setIsLoadingMore(false)
			}
		}
	}, [])

	const handlePanelScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
		const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
		if (scrollHeight - scrollTop - clientHeight < 150) {
			loadMore()
		}
	}, [loadMore])

	return (
		<Dialog
			open={open}
			onClose={() => {
				setOpen(false)
				autocomplete.setQuery('')
			}}
			className={clsx('fixed inset-0 z-50', className)}
		>
			<DialogBackdrop
				transition
				className="fixed inset-0 bg-zinc-400/25 backdrop-blur-sm data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in "
			/>

			<div className="fixed inset-0 overflow-y-auto px-4 py-4 sm:px-6 sm:py-20 md:py-32 lg:px-8 lg:py-[15vh]">
				<DialogPanel
					transition
					className="mx-auto transform-gpu overflow-hidden rounded-lg bg-zinc-50 shadow-xl ring-1 ring-zinc-900/7.5 data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:max-w-xl  "
				>
					<div {...autocomplete.getRootProps({})}>
						<form
							ref={formRef}
							{...autocomplete.getFormProps({
								inputElement: inputRef.current,
							})}
						>
							<SearchInput
								ref={inputRef}
								autocomplete={autocomplete}
								autocompleteState={autocompleteState}
								onClose={() => setOpen(false)}
							/>
							<div
								ref={panelRef}
								className="border-t border-zinc-200 bg-white empty:hidden max-h-[70vh] overflow-y-auto"
								{...autocomplete.getPanelProps({})}
								onScroll={handlePanelScroll}
							>
								{autocompleteState.isOpen && (
									<SearchResults
										autocomplete={autocomplete}
										query={autocompleteState.query}
										collection={autocompleteState.collections[0]}
										extraResults={extraResults}
										isLoadingMore={isLoadingMore}
										totalHits={totalHits}
										onExtraResultClick={navigateToResult}
									/>
								)}
							</div>
						</form>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	)
}

function useSearchProps() {
	let buttonRef = useRef<React.ElementRef<'button'>>(null)
	let [open, setOpen] = useState(false)

	return {
		buttonProps: {
			ref: buttonRef,
			onClick() {
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
	}
}

export function Search() {
	let [modifierKey, setModifierKey] = useState<string>()
	let { buttonProps, dialogProps } = useSearchProps()

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
			<Suspense fallback={null}>
				<SearchDialog className="hidden lg:block" {...dialogProps} />
			</Suspense>
		</div>
	)
}

export function MobileSearch() {
	let { buttonProps, dialogProps } = useSearchProps()

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
			<Suspense fallback={null}>
				<SearchDialog className="lg:hidden" {...dialogProps} />
			</Suspense>
		</div>
	)
}
