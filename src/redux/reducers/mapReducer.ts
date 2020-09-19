import { PieceKind } from "../../types";
import { Action } from "../actionTypes";
import { MapData, Pos } from "../../types";

const initialState: MapData = {
	completed: false,
	grid: [],
	heroPos: [NaN, NaN],
};

export default function (state = initialState, action: Action): MapData {
	let newState = { ...state };
	const [heroX, heroY] = state.heroPos;
	let newPos: Pos;

	switch (action.type) {
		case "WALK_UP":
			newPos = [heroX, heroY - 1];
			newState.heroPos = newPos;
			return newState;

		case "WALK_LEFT":
			newPos = [heroX - 1, heroY];
			newState.heroPos = newPos;
			return newState;

		case "WALK_DOWN":
			newPos = [heroX, heroY + 1];
			newState.heroPos = newPos;
			return newState;

		case "WALK_RIGHT":
			newPos = [heroX + 1, heroY];
			newState.heroPos = newPos;
			return newState;

		case "LOAD_MAP":
			return loadMap(action.payload);

		default:
			return newState;
	}
}

export function loadMap(diagram: string): MapData {
	if (diagram === null) {
		return diagram;
	}

	const map = compileFromString(diagram);

	if (isNaN(map.heroPos[0])) {
		throw new Error("Hero could not be found.");
	}

	return map;
}

function compileFromString(sketch: string): MapData {
	const grid: PieceKind[][] = [[]];
	let rI = 0;
	let heroPos: Pos = [NaN, NaN];
	for (const char of sketch.trim()) {
		switch (char) {
			case "\n":
				rI++;
				grid[rI] = [];
				break;
			case ".":
				grid[rI].push("floor");
				break;
			case "#":
				grid[rI].push("wall");
				break;
			case "@":
				heroPos = [grid[rI].length, rI];
				grid[rI].push("floor");
				break;
			case "e":
				grid[rI].push("exit");
				break;
			case "\t":
			case " ":
				break;
			default:
				throw new Error(`${char} is not a valid piece character.`);
		}
	}

	return { grid, heroPos, completed: false };
}
