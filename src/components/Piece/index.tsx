import React, { FC } from "react";
import { PieceKind } from "../../types";
import "./index.css";

interface props {
	kind: PieceKind;
}

const Piece: FC<props> = ({ kind }) => {
	return <div className={`piece-piece piece-${kind}`} />;
};

export default Piece;