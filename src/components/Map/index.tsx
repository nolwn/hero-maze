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
	const gWidth = grid[0]?.length;
	const gHeight = grid.length;

	const viewBox = [];
	if (grid.length) {
		for (let row = -SIGHT; row <= SIGHT; row++) {
			const viewRow: { key: string; isHero: boolean; kind: PieceKind }[] = [];
			for (let col = -SIGHT; col <= SIGHT; col++) {
				const x = heroX + col;
				const y = heroY + row;

				console.log(heroY);

				if (x < 0 || x >= gWidth) {
					viewRow.push({ key: `${x}${y}`, isHero: false, kind: "wall" });
				} else if (y < 0 || y >= gHeight) {
					viewRow.push({ key: `${x}${y}`, isHero: false, kind: "wall" });
				} else {
					const thing = things[x]?.[y]?.type;
					const piece = grid[y]?.[x];
					viewRow.push({
						key: `${x}${y}`,
						isHero: y === heroY && x === heroX,
						kind: thing ? thing : piece,
					});
				}
			}
			viewBox.push(viewRow);
		}
	}

	return (
		<>
			{viewBox.map((row, i) => {
				return (
					<div key={"row" + i} className="map-row">
						{row.map((props) => (
							<Piece {...props} />
						))}
					</div>
				);
			})}
		</>
	);

	// return (
	// 	<div className="map-area">
	// 		{grid.map((row, y) => {
	// 			if (nearHero(grid, heroPos, null, y)) {
	// 				return (
	// 					<div key={y} className="map-row">
	// 						{row.map((piece, x) => {
	// 							if (nearHero(grid, heroPos, x, null)) {
	// 								const thing = things[x]?.[y]?.type;
	// 								return (
	// 									<Piece
	// 										key={x}
	// 										isHero={y === heroY && x === heroX}
	// 										kind={thing ? thing : piece}
	// 									/>
	// 								);
	// 							}

	// 							return <div key={x} />;
	// 						})}
	// 					</div>
	// 				);
	// 			}

	// 			return <div key={y} />;
	// 		})}
	// 	</div>
	// );
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
