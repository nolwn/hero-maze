import { GOLD_VALUE } from "../../constants";
import { Action } from "../actionTypes";

const initialState = 0;

export default function scoreReducer(
	state: number = initialState,
	action: Action
) {
	switch (action.type) {
		case "INCREASE_SCORE":
			const amount = action.payload;

			return state + amount;

		case "TAKE_GOLD":
			return state + GOLD_VALUE;

		default:
			return state;
	}
}
