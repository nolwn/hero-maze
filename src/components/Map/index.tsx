import React from "react";
import { MapData } from "../../types";
import Piece from "../Piece";
import "./index.css";

interface Props {
	map: MapData | null;
}

const Map: React.FC<Props> = ({ map }) => {
	if (map === null) {
		return <div className="map-area" />;
	}
	const grid = map.grid;
	const [heroX, heroY] = map?.heroPos;
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
