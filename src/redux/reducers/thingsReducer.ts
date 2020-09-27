import { Action } from "../actionTypes";
import { CoordMap, PieceKind, Pos, Thing } from "../../types";

const initialState: CoordMap = {};

export default function thingsReducer(state = initialState, action: Action) {
	switch (action.type) {
		case "LOAD_MAP":
			return loadItems(action.payload);

		case "TAKE_GOLD":
			const newState = { ...state };
			const [x, y] = action.payload;
			delete newState[x][y];

			return newState;

		default:
			return state;
	}
}

function loadItems(diagram: string) {
	const map: CoordMap = {};
	let x = 0;
	let y = 0;

	for (const char of diagram.trim()) {
		if (char === "*") {
			let row = map?.[x];

			if (row === undefined) {
				map[x] = {};
				row = map[x];
			}

			row[y] = makeThing([x, y], "gold");
		} else if (char === "\n") {
			y++;
			x = -1;
		}

		x++;
	}

	return map;
}

function makeThing(pos: Pos, type: PieceKind): Thing {
	return {
		pos,
		type,
	};
}
