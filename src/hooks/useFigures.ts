import { useEffect, useState } from "react"

import { FiguresProps } from "../types/FiguresProps"
import useInitializeFigures from "./useInitializeFigures"
import useUpdateFigurePositions from "./useUpdateFigurePositions"
import useResolveCollisions from "./useResolveCollisions"
import useDetermineWinner from "./useDetermineWinner"
import { FetchDataProps } from "../types/FetchDataProps"

const useFigures = ({ teamAName, teamAVelocity, teamBName, teamBVelocity, xLength, yLength }: FetchDataProps) => {
	const [figures, setFigures] = useState<Array<FiguresProps>>([])
	const [winner, setWinner] = useState<string | null>(null)
	const [reset, setReset] = useState<boolean>(false)
	const [intervalTime] = useState((15 / yLength) * 1000)

	const { getInitializeFigures } = useInitializeFigures(
		teamAName,
		teamAVelocity,
		teamBName,
		teamBVelocity,
		xLength,
		yLength,
	)
	const { getUpdatedFigures } = useUpdateFigurePositions(yLength)
	const { resolveCollisions } = useResolveCollisions()
	const { getWinner } = useDetermineWinner()

	useEffect(() => {
		const initialFigures = getInitializeFigures()
		setFigures(initialFigures)
	}, [getInitializeFigures, reset])

	useEffect(() => {
		if (winner) return

		const interval = setInterval(() => {
			setFigures((prevFigures) => {
				if (!prevFigures) return prevFigures

				const updatedFigures = getUpdatedFigures(prevFigures)
				const figuresAfterCollisions = resolveCollisions(updatedFigures)
				const result = getWinner(figuresAfterCollisions)

				if (result) {
					setWinner(result)
				}

				return figuresAfterCollisions
			})
		}, intervalTime)

		return () => clearInterval(interval)
	}, [yLength, winner, getUpdatedFigures, resolveCollisions, getWinner])

	useEffect(() => {
		if (!reset) return

		setWinner(null)
		setReset(false)
	}, [reset])

	return { figures, winner, setReset }
}

export default useFigures
