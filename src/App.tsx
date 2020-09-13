import React, { useEffect } from "react";
import Map from "./components/Map";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { MapData } from "./types";
import { walkLeft, walkUp, walkDown, walkRight } from "./redux/actions";

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

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	});

	const map = useSelector(({ map }: { map: MapData }) => {
		return map;
	});

	return (
		<div className={"app-app"}>
			<Map map={map} />
		</div>
	);
}

export default App;
