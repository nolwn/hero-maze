import React from "react";
import { MapData } from "../../types";
import Piece from "../Piece";
import "./index.css";

interface props {
	map: MapData;
}

const Map: React.FC<props> = ({ map }) => {
	console.log("RENDER");
	const grid = map.grid;
	return (
		<div className="map-map">
			{grid.map((row, i) => (
				<div key={i} className="map-row">
					{row.map((piece, i) => (
						<Piece key={i} kind={piece} />
					))}
				</div>
			))}
		</div>
	);
};

export default Map;
