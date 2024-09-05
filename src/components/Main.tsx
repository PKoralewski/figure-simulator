import Board from "./Board"

import "../assets/Main.css"
import useFetchData from "../hooks/useFetchData"
import useValidData from "../hooks/useValidData"

const Main = () => {
	const { data } = useFetchData()
	const { isValid } = useValidData(data)

	return (
		<div className='main'>
			{isValid ? (
				<Board
					teamAName={data.teamAName}
					teamAVelocity={data.teamAVelocity}
					teamBName={data.teamBName}
					teamBVelocity={data.teamBVelocity}
					xLength={data.xLength}
					yLength={data.yLength}
				/>
			) : (
				<div>error</div>
			)}
		</div>
	)
}

export default Main
