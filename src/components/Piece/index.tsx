import React, { FC } from "react";
import { PieceKind } from "../../types";
import "./index.css";

interface Props {
	kind: PieceKind;
	isHero: boolean;
}

const Piece: FC<Props> = ({ kind, isHero }) => {
	const hero: PieceKind = "hero";
	return <div className={`piece-area piece-${isHero ? hero : kind}`} />;
};

export default Piece;
