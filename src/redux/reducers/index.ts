import { combineReducers } from "redux";
import { MapData } from "../../types";
import levelReducer from "./levelReducer";
import mapReducer from "./mapReducer";
import scoreReducer from "./scoreReducer";

export interface FullState {
	map: MapData;
	level: number;
	score: number;
}

export const rootReducer = combineReducers({
	map: mapReducer,
	level: levelReducer,
	score: scoreReducer,
});
