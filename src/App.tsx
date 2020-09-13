import React, { useEffect } from "react";
import Map from "./components/Map";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { MapData } from "./types";
import { walkLeft } from "./redux/action";

function App() {
	const dispatch = useDispatch();

	const handleKeyDown = (ev: KeyboardEvent) => {
		dispatch(walkLeft());
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

	return <Map map={map} />;
}

export default App;
