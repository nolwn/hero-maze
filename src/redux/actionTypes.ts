export interface Action {
	type: MoveActionType | LevelActionType;
	payload?: any;
}

type MoveActionType =
	| "WALK_LEFT"
	| "WALK_UP"
	| "WALK_DOWN"
	| "WALK_RIGHT"
	| "LOAD_MAP"
	| "INCREASE_SCORE"
	| "SET_FINAL_LEVEL"
	| "TAKE_GOLD";

type LevelActionType = "NEXT_LEVEL";
