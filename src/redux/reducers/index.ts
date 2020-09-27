import { combineReducers } from "redux";
import { CoordMap, LevelProgress, PieceKind, Pos } from "../../types";
import levelReducer from "./levelReducer";
import gridReducer from "./gridReducer";
import heroReducer from "./heroReducer";
import scoreReducer from "./scoreReducer";
import thingsReducer from "./thingsReducer";

export interface FullState {
	heroPos: Pos;
	grid: PieceKind[][];
	level: LevelProgress;
	score: number;
	things: CoordMap;
}

export const rootReducer = combineReducers<FullState>({
	grid: gridReducer,
	heroPos: heroReducer,
	level: levelReducer,
	score: scoreReducer,
	things: thingsReducer,
});
