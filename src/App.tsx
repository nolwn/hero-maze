import React, { useEffect } from "react";
import Map from "./components/Map";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { MapData } from "./types";
import {
	walkLeft,
	walkUp,
	walkDown,
	walkRight,
	loadMap,
	nextLevel,
} from "./redux/actions";

function App() {
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

	const { completed } = map;

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

	return (
		<div className={"app-app"}>
			<Map map={map} />
		</div>
	);
}

export default App;
