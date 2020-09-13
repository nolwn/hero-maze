export interface Action {
	type: ActionType;
	payload: any;
}

export type ActionType = "WALK_LEFT" | "WALK_UP" | "WALK_DOWN" | "WALK_RIGHT";
