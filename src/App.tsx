import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFinalLevel } from "./redux/actions";
import Game from "./components/Game";
import { FullState } from "./redux/reducers";
import "./App.css";

interface Props {
	[k: string]: never;
}

const App: FC<Props> = () => {
	const dispatch = useDispatch();
	const {
		level: { final },
	} = useSelector<FullState, FullState>((state) => state);

	if (isNaN(final)) {
		dispatch(setFinalLevel());
	}

	return <Game />;
};

export default App;
