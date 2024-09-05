import { useRef, useEffect, useState, useCallback } from "react"

import "../assets/Board.css"
import useFigures from "../hooks/useFigures"
import ResetButton from "./ResetButton"
import { FetchDataProps } from "../types/FetchDataProps"
import { FiguresProps } from "../types/FiguresProps"

const Board = ({ teamAName, teamAVelocity, teamBName, teamBVelocity, xLength, yLength }: FetchDataProps) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const containerRef = useRef<HTMLDivElement | null>(null)
	const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>()
	const [container, setContainer] = useState<HTMLDivElement | null>()
	const [viewport] = useState({ scale: 1, offsetX: 0, offsetY: 0 })
	const [cellSize] = useState(xLength > 100 || yLength > 100 ? 10 : 40)
	const [rectSize] = useState(cellSize * viewport.scale)
	const [scaledWidth] = useState(xLength * cellSize * viewport.scale)
	const [scaledHeight] = useState(yLength * cellSize * viewport.scale)
	const [prevFigures, setPrevFigures] = useState<Array<FiguresProps>>([])
	const { figures, winner, setReset } = useFigures({
		teamAName,
		teamAVelocity,
		teamBName,
		teamBVelocity,
		xLength,
		yLength,
	})

	useEffect(() => {
		setCtx(canvasRef.current?.getContext("2d"))
		setContainer(containerRef.current)
	}, [])

	useEffect(() => {
		const handleResize = () => {
			if (!canvasRef.current || !container) return
			const canvasWidth = xLength * cellSize
			const canvasHeight = yLength * cellSize

			container.style.width = "90vw"
			container.style.height = "500px"

			canvasRef.current.width = canvasWidth
			canvasRef.current.height = canvasHeight

			drawBoard()
		}

		handleResize()

		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [ctx, container, canvasRef, xLength, yLength, viewport])

	useEffect(() => {
		removePrevFigures()
		drawFigures()
		setPrevFigures(figures)
	}, [figures])

	const drawFigure = (x: number, y: number, team: string) => {
		if (!ctx) return

		const adjustedX = x * rectSize - viewport.offsetX
		const adjustedY = y * rectSize - viewport.offsetY

		ctx.beginPath()
		ctx.arc(adjustedX + rectSize / 2, adjustedY + rectSize / 2, rectSize / 2 - 2, 0, Math.PI * 2)
		ctx.fillStyle = team === "A" ? "#333" : "#ddd"
		ctx.fill()
		ctx.strokeStyle = "#FFF"
		ctx.stroke()
	}

	const drawBoard = useCallback(() => {
		if (!ctx) return

		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

		ctx.fillStyle = "rgba(255,255,255,0.05)"
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

		ctx.strokeStyle = "#FFF"
		ctx.lineWidth = viewport.scale

		ctx.beginPath()
		for (let x = 0; x <= xLength; x++) {
			const drawX = x * cellSize * viewport.scale - viewport.offsetX
			ctx.moveTo(drawX, 0)
			ctx.lineTo(drawX, scaledHeight)
		}
		for (let y = 0; y <= yLength; y++) {
			const drawY = y * cellSize * viewport.scale - viewport.offsetY
			ctx.moveTo(0, drawY)
			ctx.lineTo(scaledWidth, drawY)
		}
		ctx.stroke()
	}, [ctx, cellSize, viewport, scaledWidth, scaledHeight, xLength, yLength])

	const removePrevFigures = () => {
		if (!ctx) return

		ctx.fillStyle = "#252525"

		prevFigures.forEach((figure: { x: number; y: number; team: string }) => {
			for (let a = figure.x; a < xLength; a += 2) {
				const startX = a * rectSize - viewport.offsetX
				const startY = figure.y * rectSize - viewport.offsetY

				ctx.clearRect(startX, startY, rectSize, rectSize)
				ctx.fillRect(startX, startY, rectSize, rectSize)
				ctx.strokeRect(startX, startY, rectSize, rectSize)
			}
		})
	}

	const drawFigures = () => {
		if (!ctx) return

		figures.forEach((figure: { x: number; y: number; team: string }) => {
			for (let a = 0; a < xLength; a += 2) {
				drawFigure(figure.x + a, figure.y, figure.team)
			}
		})
	}

	return (
		<div className='board'>
			<h1>Plansza</h1>
			{winner && (winner === "draw" ? <h1>Remis!</h1> : <h1>Wygrała drużyna {winner}!</h1>)}
			<div ref={containerRef} className='board-canvas'>
				<canvas ref={canvasRef} />
			</div>
			{winner && (
				<div>
					<ResetButton setReset={setReset} />
				</div>
			)}
		</div>
	)
}

export default Board
