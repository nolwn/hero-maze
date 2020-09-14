import React, { useEffect, FC } from "react";
import Map from "../Map";
import { useDispatch, useSelector } from "react-redux";
import { MapData } from "../../types";
import {
	walkLeft,
	walkUp,
	walkDown,
	walkRight,
	loadMap,
	nextLevel,
} from "../../redux/actions";
import GameOver from "../../components/GameOver";

interface Props {}

const Game: FC<Props> = () => {
	const dispatch = useDispatch();

	const handleKeyDown = (ev: KeyboardEvent) => {
		switch (ev.code) {
			case "ArrowLeft":
				dispatch(walkLeft());
				break;
			case "ArrowUp":
				dispatch(walkUp());
				break;
			case "ArrowDown":
				dispatch(walkDown());
				break;
			case "ArrowRight":
				dispatch(walkRight());
				break;
			default:
				break;
		}
	};

	const { map, level } = useSelector(
		(state: { map: MapData; level: number }) => {
			return state;
		}
	);

	const completed = map?.completed;

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	});

	useEffect(() => {
		dispatch(loadMap(level));
	}, [dispatch, level]);

	useEffect(() => {
		if (completed) {
			dispatch(nextLevel());
		}
	}, [completed, dispatch]);

	if (map === null) {
		return <GameOver />;
	}
	return (
		<div className={"app-app"}>
			<Map map={map} />
		</div>
	);
};

export default Game;
