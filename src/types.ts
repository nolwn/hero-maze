export type PieceKind = "wall" | "floor" | "hero" | "exit";

export interface MapData {
	grid: PieceKind[][];
	heroPos: Pos;
}

export type Pos = [number, number];
