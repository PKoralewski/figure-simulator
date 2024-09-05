import { useCallback } from "react"

import { FiguresProps } from "../types/FiguresProps"

const useResolveCollisions = () => {
	const resolveCollisions = useCallback((figures: FiguresProps[]): FiguresProps[] => {
		const figureMap = new Map<string, FiguresProps>()

		figures.forEach((figure) => {
			const key = `${figure.x}-${figure.y}`

			if (!figureMap.has(key)) {
				figureMap.set(key, figure)

				return
			}

			const existingFigure = figureMap.get(key)!

			if (figure.v < existingFigure.v) return

			figure.v === existingFigure.v ? figureMap.delete(key) : figureMap.set(key, figure)
		})

		return Array.from(figureMap.values())
	}, [])

	return { resolveCollisions }
}

export default useResolveCollisions
