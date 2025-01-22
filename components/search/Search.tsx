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
    console.log("RESULT", item)
    const itemUrl = item.url
    if (!itemUrl) {
      return
    }
    console.log("ITEM URL", itemUrl)
    let url = itemUrl
    if (url.startsWith('/')) url = `https://agilitycms.com/docs${url}`

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
                      hitsPerPage: 5,
                    },
                  },
                  {
                    indexName: 'doc_site',
                    params: {
                      query,
                      hitsPerPage: 5,
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
        className="fixed inset-0 bg-zinc-400/25 backdrop-blur-sm data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in dark:bg-black/40"
      />

      <div className="fixed inset-0 overflow-y-auto px-4 py-4 sm:px-6 sm:py-20 md:py-32 lg:px-8 lg:py-[15vh]">
        <DialogPanel
          transition
          className="mx-auto transform-gpu overflow-hidden rounded-lg bg-zinc-50 shadow-xl ring-1 ring-zinc-900/7.5 data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:max-w-xl dark:bg-zinc-900 dark:ring-zinc-800 "
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
                className="border-t border-zinc-200 bg-white empty:hidden dark:border-zinc-100/5 dark:bg-white/2.5 max-h-96 overflow-y-auto"
                {...autocomplete.getPanelProps({})}
              >
                {autocompleteState.isOpen && (
                  <SearchResults
                    autocomplete={autocomplete}
                    query={autocompleteState.query}
                    collection={autocompleteState.collections[0]}
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
    <div className="">
      <button
        type="button"
        title={`Search ${modifierKey}K`}
        className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 ui-not-focus-visible:outline-none dark:hover:bg-white/5 outline-violet-600"
        aria-label="Find something..."
        {...buttonProps}
      >
        <SearchIcon className="h-5 w-5 stroke-zinc-900 dark:stroke-white" />

        {/* <kbd className="ml-auto text-2xs text-zinc-400 dark:text-zinc-500">
          <kbd className="font-sans">{modifierKey}</kbd>
          <kbd className="font-sans">K</kbd>
        </kbd> */}
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
        className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 ui-not-focus-visible:outline-none lg:hidden dark:hover:bg-white/5 outline-violet-600"
        aria-label="Find something..."
        {...buttonProps}
      >
        <SearchIcon className="h-5 w-5 stroke-zinc-900 dark:stroke-white" />
      </button>
      <Suspense fallback={null}>
        <SearchDialog className="lg:hidden" {...dialogProps} />
      </Suspense>
    </div>
  )
}
