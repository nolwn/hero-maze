import { maps } from "../diagrams.data";

export function walkUp() {
	return {
		type: "WALK_UP",
	};
}

export function walkLeft() {
	return {
		type: "WALK_LEFT",
	};
}

export function walkDown() {
	return {
		type: "WALK_DOWN",
	};
}

export function walkRight() {
	return {
		type: "WALK_RIGHT",
	};
}

export function loadMap(mapIndex: number) {
	return {
		type: "LOAD_MAP",
		payload: maps[mapIndex],
	};
}

export function nextLevel() {
	return {
		type: "NEXT_LEVEL",
	};
}
