import React from "react";
import { CoordMap, PieceKind, Pos } from "../../types";
import { SIGHT } from "../../constants";
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
			{grid.map((row, y) => {
				if (nearHero(grid, heroPos, null, y)) {
					return (
						<div key={y} className="map-row">
							{row.map((piece, x) => {
								if (nearHero(grid, heroPos, x, null)) {
									const thing = things[x]?.[y]?.type;
									return (
										<Piece
											key={x}
											isHero={y === heroY && x === heroX}
											kind={thing ? thing : piece}
										/>
									);
								}
							})}
						</div>
					);
				}

				return <div />;
			})}
		</div>
	);
};

function nearHero(
	grid: PieceKind[][],
	heroPos: Pos,
	x: number | null,
	y: number | null
): boolean {
	const checkDist = (heroCoord: number, coord: number | null): boolean => {
		if (coord === null) {
			return true;
		}

		if (Math.abs(heroCoord - coord) < SIGHT) {
			return true;
		}

		return false;
	};

	const [heroX, heroY] = heroPos;
	return checkDist(heroX, x) && checkDist(heroY, y);
}

export default Map;
