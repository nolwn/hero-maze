import { MapData, PieceKind, Pos } from "./types";

export function checkPos(state: MapData, [x, y]: Pos): PieceKind {
	return state.grid[y][x];
}

export function getHeroPos(map: PieceKind[][]): Pos | null {
	for (let y = 0; map.length; y++) {
		const row = map[y];
		const x = row.findIndex((piece) => piece === "hero");

		if (x !== -1) {
			return [x, y];
		}
	}

	return null;
}

export function inBounds(x: number, y: number, map: MapData) {
	const xInBounds = x >= 0 && x <= map.grid[0].length;
	const yInBounds = y >= 0 && y <= map.grid.length;

	return xInBounds && yInBounds;
}
