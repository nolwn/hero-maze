import { PieceKind } from "../../types";
import { Action } from "../actionTypes";
import { Dimension, MapData, Pos } from "../../types";
import { checkPos, getHeroPos, inBounds } from "../../utilities";

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
			console.log("newPos", newPos);
			moveHero(newState, state.heroPos, newPos);
			newState.heroPos = newPos;
			return newState;

		case "WALK_LEFT":
			newPos = [heroX - 1, heroY];
			console.log("newPos", newPos);
			moveHero(newState, state.heroPos, newPos);
			newState.heroPos = newPos;
			return newState;

		case "WALK_DOWN":
			newPos = [heroX, heroY + 1];
			console.log("newPos", newPos);
			moveHero(newState, state.heroPos, newPos);
			newState.heroPos = newPos;
			return newState;

		case "WALK_RIGHT":
			newPos = [heroX + 1, heroY];
			console.log("newPos", newPos);
			moveHero(newState, state.heroPos, newPos);
			newState.heroPos = newPos;
			return newState;

		case "LOAD_MAP":
			return loadMap(action.payload);

		default:
			return newState;
	}
}

function setPos(state: MapData, [x, y]: Pos, piece: PieceKind) {
	state.grid[y][x] = piece;
}

function moveHero(map: MapData, fromPos: Pos, toPos: Pos) {
	console.log("fromPos", fromPos);
	console.log("toPos", toPos);
	setPos(map, toPos, "hero");
	setPos(map, fromPos, "floor");
	map.heroPos = toPos;
}

export function loadMap(diagram: string): MapData {
	if (diagram === null) {
		return diagram;
	}

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
