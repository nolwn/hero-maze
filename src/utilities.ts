import { PieceKind, Pos } from "./types";

export function checkPos(grid: PieceKind[][], [x, y]: Pos): PieceKind {
	return grid[y][x];
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

export function inBounds(x: number, y: number, grid: PieceKind[][]) {
	const xInBounds = x >= 0 && x <= grid[0].length;
	const yInBounds = y >= 0 && y <= grid.length;

	return xInBounds && yInBounds;
}
