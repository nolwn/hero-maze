export type PieceKind = "wall" | "floor" | "hero" | "exit";

export interface MapData {
	completed: boolean;
	grid: PieceKind[][];
	heroPos: Pos;
}

export type Pos = [number, number];
