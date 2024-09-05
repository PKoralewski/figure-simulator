import { useCallback } from "react"

import { FiguresProps } from "../types/FiguresProps"

const useUpdateFigurePositions = (yLength: number) => {
	const getUpdatedFigures = useCallback(
		(figures: FiguresProps[]): FiguresProps[] => {
			return figures
				.map((figure) => {
					const newY = figure.team === "A" ? figure.y - figure.v : figure.y + figure.v
					if (newY < 0 || newY >= yLength) {
						return null
					}
					return { ...figure, y: newY }
				})
				.filter((figure): figure is FiguresProps => figure !== null)
		},
		[yLength],
	)

	return { getUpdatedFigures }
}

export default useUpdateFigurePositions
