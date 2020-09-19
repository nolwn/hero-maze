import React, { FC } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Game from "./components/Game";
import GameOver from "./components/GameOver";
import { FullState } from "./redux/reducers";

interface Props {
	[k: string]: never;
}

const App: FC<Props> = () => {
	const map = useSelector(({ map }: FullState) => map);

	if (map === null) {
		return <GameOver />;
	}

	return <Game />;
};

export default App;
