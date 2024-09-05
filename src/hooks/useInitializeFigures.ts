import { useCallback } from "react"

const useInitializeFigures = (
	teamAName: string,
	teamAVelocity: number,
	teamBName: string,
	teamBVelocity: number,
	xLength: number,
	yLength: number,
) => {
	const getInitializeFigures = useCallback(() => {
		return Array.from({ length: 4 }, (_, index) => {
			const isTeamA = index < 2
			const x = index % 2 ? 1 : 0
			const y = isTeamA ? yLength - 1 : 0
			const name = isTeamA ? teamAName : teamBName
			const v = !(index % 2)
				? isTeamA
					? teamAVelocity
					: teamBVelocity
				: Math.pow(2, isTeamA ? teamAVelocity : teamBVelocity)

			return {
				team: isTeamA ? "A" : "B",
				name,
				v,
				x,
				y,
			}
		})
	}, [xLength, yLength, teamAVelocity, teamBVelocity])

	return { getInitializeFigures }
}

export default useInitializeFigures
