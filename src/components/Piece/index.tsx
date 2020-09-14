import React, { FC } from "react";
import { PieceKind } from "../../types";
import "./index.css";

interface Props {
	kind: PieceKind;
}

const Piece: FC<Props> = ({ kind }) => {
	return <div className={`piece-piece piece-${kind}`} />;
};

export default Piece;
