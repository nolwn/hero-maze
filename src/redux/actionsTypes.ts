export interface Action {
	type: ActionType;
	payload: any;
}

export type ActionType = "WALK_LEFT";
