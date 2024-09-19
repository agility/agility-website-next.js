"use client"
import { Widget, PopupButton, Sidetab } from "@typeform/embed-react"
import { ITypeFormModule } from "./TypeFormModule"

export const TypeFormClient = ({ form, display, buttonLabel, buttonColor = "#ffcb28" }: ITypeFormModule) => {
	try {
		const formObj = JSON.parse(form)

		return (
			<>
				{display && display === "inline" && (
					<div className="my-14">
						<Widget
							id={formObj.formID}
							style={{ width: "50%", margin: "auto", height: 500 }}
							className="my-form"
						/>
					</div>
				)}

				{display && display === "popup" && (
					<div className="my-14 text-center">
						<PopupButton
							id={formObj.formID}
							style={{ margin: "auto", backgroundColor: buttonColor }}
							className="transform p-2 px-4 font-medium transition-transform duration-200 ease-in-out hover:scale-105"
						>
							{buttonLabel}
						</PopupButton>
					</div>
				)}

				{display && display === "sidetab" && (
					<Sidetab id={formObj.formID} buttonText={buttonLabel} buttonColor={buttonColor} />
				)}
			</>
		)
	} catch (error) {
		console.error("Error parsing TypeForm JSON", error)
		return null
	}
}
