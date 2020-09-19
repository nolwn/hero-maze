import { Action } from "./actionTypes";
import { maps } from "../diagrams.data";

export function walkUp(): Action {
	return {
		type: "WALK_UP",
	};
}

export function walkLeft(): Action {
	return {
		type: "WALK_LEFT",
	};
}

export function walkDown(): Action {
	return {
		type: "WALK_DOWN",
	};
}

export function walkRight(): Action {
	return {
		type: "WALK_RIGHT",
	};
}

export function loadMap(mapIndex: number): Action {
	return {
		type: "LOAD_MAP",
		payload: maps[mapIndex],
	};
}

export function nextLevel(level: number): Action {
	return {
		type: "NEXT_LEVEL",
		payload: level + 1,
	};
}

export function increaseScore(amount: number): Action {
	return {
		type: "INCREASE_SCORE",
		payload: amount,
	};
}
