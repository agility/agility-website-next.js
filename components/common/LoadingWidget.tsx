import { IconRefresh } from "@tabler/icons-react"
import { Bouncy } from "components/micro/loaders/Bouncy"
import { MotionBlur } from "components/micro/loaders/MotionBlur"
import { Ripples } from "components/micro/loaders/Ripples"

interface Props {
	message?: string
}

const Widget = ({ message }: Props) => {
	//pick a random number between 1 and 3
	const random = Math.floor(Math.random() * 3) + 1

	return (
		<section className="flex h-screen flex-col items-center justify-center">
			<div className="h-10 w-10">
				{random === 1 && <Bouncy />}
				{random === 2 && <Ripples />}
				{random === 3 && <MotionBlur />}
			</div>
			{message && <p>{message}</p>}
		</section>
	)
}

export default Widget
