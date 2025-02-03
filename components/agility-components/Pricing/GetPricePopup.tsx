'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { IconX } from '@tabler/icons-react'
import { HubspotForm } from 'lib/types/HubspotForm'
import clsx from 'clsx'
import LoadingWidget from "components/common/LoadingWidget"
import { Bouncy } from "components/micro/loaders/Bouncy"
import { load } from 'cheerio'

interface Props {
	hubSpotForm: HubspotForm
	priceDialogOpen: boolean
	setPriceDialogOpen: (open: boolean) => void
}

export default function GetPricePopup({ priceDialogOpen, setPriceDialogOpen, hubSpotForm }: Props) {


	const divID = `gatedownload-form-${hubSpotForm.formId}`
	const formLoadRef = useRef<Boolean>(false)
	const [formLoaded, setFormLoaded] = useState(false)

	const loadForm = useCallback(() => {
		if (formLoadRef.current) return
		formLoadRef.current = true

		/**
		 * docs for this are here: https://legacydocs.hubspot.com/docs/methods/forms/advanced_form_options
		 */
		window.hbspt.forms.create({
			portalId: hubSpotForm.portalId,
			formId: hubSpotForm.formId,
			target: `#${divID}`,
			onBeforeFormInit: function (ctx: any) {
				console.log('before form init', ctx)
			},
			onFormReady: function ($form: any) {
				console.log('form ready', $form)
			},

		})
	}, [divID, hubSpotForm])

	useEffect(() => {

		if (priceDialogOpen && window.hbspt) {
			setFormLoaded(false)
			loadForm()
			setTimeout(() => {
				setFormLoaded(true)
			}, 350)
		}
	}, [loadForm, priceDialogOpen])


	useEffect(() => {
		if (!priceDialogOpen) {
			formLoadRef.current = false
		}
	}, [priceDialogOpen])

	return (
		<Dialog open={priceDialogOpen} onClose={(value) => {
			setPriceDialogOpen(value)
		}} className="relative z-10" >
			<DialogBackdrop
				transition
				className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
			/>

			<div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
				<div className="flex min-h-full items-end justify-center p-1 text-center sm:items-center sm:p-0 ">
					<DialogPanel
						transition
						className={clsx(
							"relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-full",
							" sm:w-[640px] md:w-[800px]",
							"data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-indata-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95")}
					>
						<div className="absolute right-0 top-0 hiddenX pr-4 pt-4 sm:block">
							<button
								type="button"
								onClick={() => setPriceDialogOpen(false)}
								className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								<span className="sr-only">Close</span>
								<IconX aria-hidden="true" className="size-6" />
							</button>
						</div>
						<div className='min-h-[400px]'>
							{!formLoaded &&
								(
									<div className='min-h-[400px] flex justify-center items-center'>
										<div className="h-10 w-10"><Bouncy /></div>
									</div>
								)}

							<div id={divID} className={formLoaded ? "block" : "invisible "}></div>

						</div>

					</DialogPanel>
				</div>
			</div>
		</Dialog>
	)
}
