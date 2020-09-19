export type Dimension = "VERTICAL" | "HORIZONTAL";

export type PieceKind = "wall" | "floor" | "hero" | "exit" | "gold";

export interface MapData {
	completed: boolean;
	grid: PieceKind[][];
	heroPos: Pos;
}

export type Pos = [number, number];
