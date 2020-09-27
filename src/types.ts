export type CoordMap = { [x: number]: { [y: number]: Thing } };
export type Dimension = "VERTICAL" | "HORIZONTAL";
export type LevelProgress = { current: number; final: number };
export type PieceKind = "wall" | "floor" | "hero" | "exit" | "gold";
export type Pos = [number, number];
export type Thing = { type: PieceKind; pos: Pos };
