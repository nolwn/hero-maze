import { Action } from "redux";

const initialState = 0;

export default function (state = initialState, action: Action) {
	switch (action.type) {
		case "NEXT_LEVEL":
			return state + 1;
		default:
			return state;
	}
}
