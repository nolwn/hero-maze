export interface Action {
	type: MoveActionType | LevelActionType;
	payload: any;
}

type MoveActionType =
	| "WALK_LEFT"
	| "WALK_UP"
	| "WALK_DOWN"
	| "WALK_RIGHT"
	| "LOAD_MAP";

type LevelActionType = "NEXT_LEVEL";
