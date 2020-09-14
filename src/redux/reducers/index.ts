import { Reducer } from "react";
import { Action, combineReducers } from "redux";
import { MapData } from "../../types";
import levelReducer from "./levelReducer";
import mapReducer from "./mapReducer";

export interface FullState {
	map: MapData;
	level: number;
}

export const rootReducer = combineReducers({
	map: mapReducer,
	level: levelReducer,
});
