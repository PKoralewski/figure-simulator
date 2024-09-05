import { useEffect, useState } from "react"

import { FetchDataProps } from "../types/FetchDataProps"

const useFetchData = () => {
	const [data, setData] = useState<FetchDataProps>({
		teamAName: "",
		teamAVelocity: 0,
		teamBName: "",
		teamBVelocity: 0,
		xLength: 0,
		yLength: 0,
	})

	useEffect(() => {
		fetch("/data.txt")
			.then((response) => response.text())
			.then((text) => {
				const data = text.split("\n").map((line) => line.trim())
				const dataObj = {
					teamAName: data[0],
					teamAVelocity: Number(data[1]),
					teamBName: data[2],
					teamBVelocity: Number(data[3]),
					xLength: Number(data[4]),
					yLength: Number(data[5]),
				}
				setData(dataObj)
			})
			.catch((error) => {
				console.error("Błąd podczas odczytu pliku:", error)
			})
	}, [])

	return { data }
}

export default useFetchData
