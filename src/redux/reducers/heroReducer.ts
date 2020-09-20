import { Action } from "../actionTypes";
import { Pos } from "../../types";

const initialState: Pos = [NaN, NaN];

export default function (state = initialState, action: Action): Pos {
	const [heroX, heroY] = state;

	switch (action.type) {
		case "WALK_UP":
			return [heroX, heroY - 1];

		case "WALK_LEFT":
			return [heroX - 1, heroY];

		case "WALK_DOWN":
			return [heroX, heroY + 1];

		case "WALK_RIGHT":
			return [heroX + 1, heroY];

		case "LOAD_MAP":
			return compileHeroPos(action.payload);

		default:
			return [heroX, heroY];
	}
}

function compileHeroPos(diagram: string): Pos {
	let row = 0;
	let column = 0;
	let x;
	let y;

	for (const char of diagram.trim()) {
		if (char === "\n") {
			row++;
			column = 0;
		} else if (char === "@") {
			x = column;
			y = row;
		} else if (char !== "\t" && char !== " ") {
			column++;
		}
	}

	if (x !== undefined && y !== undefined) {
		return [x, y];
	}

	return [NaN, NaN];
}
