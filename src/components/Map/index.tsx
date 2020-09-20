import React from "react";
import { PieceKind, Pos } from "../../types";
import Piece from "../Piece";
import "./index.css";

interface Props {
	grid: PieceKind[][];
	heroPos: Pos;
}

const Map: React.FC<Props> = ({ grid, heroPos }) => {
	const [heroX, heroY] = heroPos;

	return (
		<div className="map-area">
			{grid.map((row, y) => (
				<div key={y} className="map-row">
					{row.map((piece, x) => (
						<Piece key={x} isHero={y === heroY && x === heroX} kind={piece} />
					))}
				</div>
			))}
		</div>
	);
};

export default Map;
