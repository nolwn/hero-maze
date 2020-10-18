import React, { FC } from "react";
import { PieceKind } from "../../types";
import "./index.css";

export interface PieceProps {
	kind: PieceKind;
	isHero: boolean;
}

const Piece: FC<PieceProps> = ({ kind, isHero }) => {
	const hero: PieceKind = "hero";
	return <div className={`piece-area piece-${isHero ? hero : kind}`} />;
};

export default Piece;
