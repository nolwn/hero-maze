import React from "react";
import { CoordMap, PieceKind, Pos } from "../../types";
import Piece from "../Piece";
import "./index.css";

interface Props {
	grid: PieceKind[][];
	heroPos: Pos;
	things: CoordMap;
}

const Map: React.FC<Props> = ({ grid, things, heroPos }) => {
	const [heroX, heroY] = heroPos;

	return (
		<div className="map-area">
			{grid.map((row, y) => (
				<div key={y} className="map-row">
					{row.map((piece, x) => {
						const thing = things[x]?.[y]?.type;
						return (
							<Piece
								key={x}
								isHero={y === heroY && x === heroX}
								kind={thing ? thing : piece}
							/>
						);
					})}
				</div>
			))}
		</div>
	);
};

export default Map;
