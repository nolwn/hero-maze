import { PieceKind } from "../../types";
import { Action } from "../actionsTypes";
import { MapData, Pos } from "../../types";

const sketch = `
  ##########
  #........e
  #.########
  #.......@#
  ##########
`;

const initialState = initializeGame();

export default function (state = initialState, action: Action): MapData {
	switch (action.type) {
		case "WALK_LEFT":
			console.log("walk left");
			const newState = { ...state };
			const [fromX, fromY] = state.heroPos;

			if (fromX === 0) {
				return newState;
			}

			const toPos: Pos = [fromX - 1, fromY];
			const left = checkPos(newState, toPos);

			if (left === "floor") {
				setPos(newState, toPos, "hero");
				setPos(newState, [fromX, fromY], "floor");
				newState.heroPos = toPos;
			}

			return newState;
		default:
			return { ...state };
	}
}

function checkPos(state: MapData, [x, y]: Pos): PieceKind {
	return state.grid[y][x];
}

function setPos(state: MapData, [x, y]: Pos, piece: PieceKind) {
	state.grid[y][x] = piece;
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

export function initializeGame(): MapData {
	const grid = compileFromString(sketch);
	const heroPos = getHeroPos(grid);

	if (heroPos === null) {
		throw new Error("Hero could not be found.");
	}

	return { grid, heroPos };
}

function compileFromString(sketch: string): PieceKind[][] {
	const diagram: PieceKind[][] = [[]];
	let rI = 0;
	for (const char of sketch) {
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
