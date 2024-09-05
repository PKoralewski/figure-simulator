import { useCallback } from "react"

import { FiguresProps } from "../types/FiguresProps"

const useDetermineWinner = () => {
	const getWinner = useCallback((figures: FiguresProps[]): string | null => {
		if (!figures.length) return "draw"

		const allAreTeamA = figures.every((f) => f.team === "A")
		const allAreTeamB = figures.every((f) => f.team === "B")

		if (allAreTeamA || allAreTeamB) return figures[0].name

		return null
	}, [])

	return { getWinner }
}

export default useDetermineWinner
