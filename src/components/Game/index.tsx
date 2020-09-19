import React, { useEffect, FC, Dispatch } from "react";
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
import GameOver from "../GameOver";
import Score from "../Score";
import { inBounds, checkPos } from "../../utilities";
import "./game.css";
import { Action } from "redux";
import { act } from "react-dom/test-utils";

interface Props {}

const Game: FC<Props> = () => {
	const dispatch = useDispatch<Dispatch<Action>>();
	const { map, level } = useSelector(
		(state: { map: MapData; level: number }) => {
			return state;
		}
	);

	const completed = map?.completed;
	const handleKeyDown = (ev: KeyboardEvent) => {
		const [heroX, heroY] = map.heroPos;
		console.log("hero coords", [heroX, heroY]);
		let toX = heroX;
		let toY = heroY;
		let actionCreator;
		switch (ev.code) {
			case "ArrowLeft":
				toX--;
				actionCreator = walkLeft;
				break;
			case "ArrowUp":
				toY--;
				actionCreator = walkUp;
				break;
			case "ArrowDown":
				toY++;
				actionCreator = walkDown;
				break;
			case "ArrowRight":
				toX++;
				actionCreator = walkRight;
				break;
			default:
				break;
		}
		if (isWalkable(toX, toY, map) && actionCreator) {
			dispatch(actionCreator());
		}
	};

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
		<div className="game-area">
			<Score />
			<Map map={map} />
		</div>
	);
};

function getHeroSquare({ heroPos: [x, y], grid }: MapData) {
	return grid[y][x];
}

function isWalkable(x: number, y: number, map: MapData) {
	if (!inBounds(x, y, map)) {
		console.log("OUT OF BOUNDS!");
		return false;
	}

	const posKind = checkPos(map, [x, y]);

	console.log(posKind);

	return posKind === ("floor" || "gold" || "exit");
}

export default Game;
