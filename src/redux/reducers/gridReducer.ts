import { PieceKind } from "../../types";
import { Action } from "../actionTypes";

const initialState: PieceKind[][] = [];

export default function (state = initialState, action: Action): PieceKind[][] {
	let newState = [...state];

	switch (action.type) {
		case "LOAD_MAP":
			return compileFromString(action.payload);

		default:
			return newState;
	}
}

function compileFromString(diagram: string): PieceKind[][] {
	if (diagram === null) {
		return [];
	}

	const grid: PieceKind[][] = [[]];
	let rI = 0;

	for (const char of diagram.trim()) {
		switch (char) {
			case "\n":
				rI++;
				grid[rI] = [];
				break;
			case "@":
			case ".":
				grid[rI].push("floor");
				break;
			case "#":
				grid[rI].push("wall");
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

	return grid;
}
