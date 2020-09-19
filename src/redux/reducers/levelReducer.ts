import { Action } from "../actionTypes";

const initialState = 0;

export default function (state = initialState, action: Action) {
	switch (action.type) {
		case "NEXT_LEVEL":
			return action.payload;
		default:
			return state;
	}
}
