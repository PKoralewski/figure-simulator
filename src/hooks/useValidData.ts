import { useEffect, useState } from "react"
import { FetchDataProps } from "../types/FetchDataProps"

const useValidData = (data: FetchDataProps) => {
	const [isValid, setIsValid] = useState<boolean>(true)

	useEffect(() => {
		const { teamAName, teamAVelocity, teamBName, teamBVelocity, xLength, yLength } = data

		const isTeamNameValid = (name: string) => /^[A-Za-z0-9]{1,10}$/.test(name)

		const areTeamsDifferent = teamAName !== teamBName

		const isVelocityValid = (velocity: number) => Number.isInteger(velocity) && velocity >= 1 && velocity <= 3

		const isBoardSizeValid = (size: number) => Number.isInteger(size) && size >= 1 && size <= 1000

		const valid =
			isTeamNameValid(teamAName) &&
			isTeamNameValid(teamBName) &&
			areTeamsDifferent &&
			isVelocityValid(teamAVelocity) &&
			isVelocityValid(teamBVelocity) &&
			isBoardSizeValid(xLength) &&
			isBoardSizeValid(yLength)

		setIsValid(valid)
	}, [data])

	return { isValid }
}

export default useValidData
