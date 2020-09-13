import { PieceKind } from "../../types";
import { Action } from "../actionTypes";
import { MapData, Pos } from "../../types";

type Dimension = "VERTICAL" | "HORIZONTAL";

const initialState: MapData = {
	completed: false,
	grid: [],
	heroPos: [NaN, NaN],
};

export default function (state = initialState, action: Action): MapData {
	let newState = { ...state };

	switch (action.type) {
		case "WALK_UP":
			return updateHeroPosition(newState, "VERTICAL", -1);

		case "WALK_LEFT":
			return updateHeroPosition(newState, "HORIZONTAL", -1);

		case "WALK_DOWN":
			return updateHeroPosition(newState, "VERTICAL", 1);

		case "WALK_RIGHT":
			return updateHeroPosition(newState, "HORIZONTAL", 1);

		case "LOAD_MAP":
			return loadMap(action.payload);

		default:
			return newState;
	}
}

function updateHeroPosition(
	map: MapData,
	dim: Dimension,
	dist: number
): MapData {
	const [fromX, fromY] = map.heroPos;

	if (inBounds(map, dim, dist)) {
		let toPos: Pos;

		if (dim === "HORIZONTAL") {
			toPos = [fromX + dist, fromY];
		} else {
			toPos = [fromX, fromY + dist];
		}

		const posKind = checkPos(map, toPos);

		if (posKind === "floor") {
			moveHero(map, map.heroPos, toPos);
		}

		if (posKind === "exit") {
			moveHero(map, map.heroPos, toPos);
			map.completed = true;
		}
	}

	return map;
}

function inBounds(map: MapData, dim: Dimension, dist: number) {
	const [fromX, fromY] = map.heroPos;

	if (dim === "HORIZONTAL") {
		const newValue = fromX + dist;
		return newValue >= 0 && newValue <= map.grid[0].length;
	} else {
		const newValue = fromY + dist;
		return newValue >= 0 && newValue <= map.grid.length;
	}
}

function checkPos(state: MapData, [x, y]: Pos): PieceKind {
	return state.grid[y][x];
}

function setPos(state: MapData, [x, y]: Pos, piece: PieceKind) {
	state.grid[y][x] = piece;
}

function moveHero(map: MapData, fromPos: Pos, toPos: Pos) {
	setPos(map, toPos, "hero");
	setPos(map, fromPos, "floor");
	map.heroPos = toPos;
}

function getHeroPos(map: PieceKind[][]): Pos | null {
	for (let y = 0; map.length; y++) {
		const row = map[y];
		const x = row.findIndex((piece) => piece === "hero");

		if (x !== -1) {
			return [x, y];
		}
	}

	return null;
}

export function loadMap(diagram: string): MapData {
	const grid = compileFromString(diagram);
	const heroPos = getHeroPos(grid);

	if (heroPos === null) {
		throw new Error("Hero could not be found.");
	}

	return { grid, heroPos, completed: false };
}

function compileFromString(sketch: string): PieceKind[][] {
	const diagram: PieceKind[][] = [[]];
	let rI = 0;
	for (const char of sketch.trim()) {
		switch (char) {
			case "\n":
				rI++;
				diagram[rI] = [];
				break;
			case ".":
				diagram[rI].push("floor");
				break;
			case "#":
				diagram[rI].push("wall");
				break;
			case "@":
				diagram[rI].push("hero");
				break;
			case "e":
				diagram[rI].push("exit");
				break;
			case "\t":
			case " ":
				break;
			default:
				throw new Error(`${char} is not a valid piece character.`);
		}
	}

	return diagram;
}
