import { Action } from "../actionTypes";

const initialState = { current: 0, final: NaN };

export default function (state = initialState, action: Action) {
	switch (action.type) {
		case "NEXT_LEVEL":
			return { ...state, current: action.payload };
		case "SET_FINAL_LEVEL":
			return { ...state, final: action.payload };
		default:
			return state;
	}
}
