import { combineReducers } from "redux";
import { LevelProgress, PieceKind, Pos } from "../../types";
import levelReducer from "./levelReducer";
import gridReducer from "./gridReducer";
import heroReducer from "./heroReducer";
import scoreReducer from "./scoreReducer";

export interface FullState {
	heroPos: Pos;
	grid: PieceKind[][];
	level: LevelProgress;
	score: number;
}

export const rootReducer = combineReducers<FullState>({
	grid: gridReducer,
	heroPos: heroReducer,
	level: levelReducer,
	score: scoreReducer,
});
