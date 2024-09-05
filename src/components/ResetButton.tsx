import { ResetButtonProps } from "../types/ResetButtonProps"

import "../assets/ResetButton.css"

const ResetButton = ({ setReset }: ResetButtonProps) => {
	const handleResetGame = () => setReset(true)

	return (
		<button className='reset-btn' onClick={handleResetGame}>
			Reset
		</button>
	)
}

export default ResetButton
