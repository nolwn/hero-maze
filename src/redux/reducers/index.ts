import { combineReducers } from "redux";
import levelReducer from "./levelReducer";
import mapReducer from "./mapReducer";

export default combineReducers({
	map: mapReducer,
	level: levelReducer,
});
