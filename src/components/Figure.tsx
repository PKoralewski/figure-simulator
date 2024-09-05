import { useState, useEffect } from "react"
import { FigureProps } from "../types/FigureProps"

import "../assets/Figure.css"

const Figure = ({ team }: FigureProps) => {
	const [backgroundColor] = useState(team === "A" ? "#FFF" : "#333")
	const [isHidden, setIsHidden] = useState(false)

	useEffect(() => {
		setIsHidden(true)
		const timeout = setTimeout(() => {
			setIsHidden(false)
		}, 300)

		return () => clearTimeout(timeout)
	}, [team])

	return <div className={`figure ${isHidden ? "figure-hidden" : ""}`} style={{ backgroundColor }}></div>
}

export default Figure
