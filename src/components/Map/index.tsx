import React from "react";
import { MapData } from "../../types";
import Piece from "../Piece";
import "./index.css";

interface Props {
	map: MapData | null;
}

const Map: React.FC<Props> = ({ map }) => {
	const grid = map?.grid || [];
	return (
		<div className="map-area">
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
