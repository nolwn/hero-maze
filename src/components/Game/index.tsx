import React, { useEffect, FC, Dispatch } from "react";
import Map from "../Map";
import { useDispatch, useSelector } from "react-redux";
import { CoordMap, PieceKind, Pos } from "../../types";
import {
	walkLeft,
	walkUp,
	walkDown,
	walkRight,
	loadMap,
	nextLevel,
	takeGold,
} from "../../redux/actions";
import GameOver from "../GameOver";
import Score from "../Score";
import { inBounds, checkPos } from "../../utilities";
import { Action } from "redux";
import { FullState } from "../../redux/reducers";
import "./game.css";

interface Props {}

function getUnderHero(
	grid: PieceKind[][],
	things: CoordMap,
	heroPos: Pos
): PieceKind {
	const [heroX, heroY] = heroPos;
	if (isNaN(heroX)) {
		return "floor";
	}

	const thing = things[heroX]?.[heroY];

	if (thing !== undefined) {
		return thing.type;
	}

	return grid[heroY][heroX];
}

function isWalkable(x: number, y: number, grid: PieceKind[][]) {
	if (!inBounds(x, y, grid)) {
		return false;
	}

	const posKind = checkPos(grid, [x, y]);

	return posKind === "floor" || posKind === "gold" || posKind === "exit";
}

const Game: FC<Props> = () => {
	const dispatch = useDispatch<Dispatch<Action>>();
	const { heroPos, grid, level, things } = useSelector<FullState, FullState>(
		(state) => state
	);

	const handleKeyDown = (ev: KeyboardEvent) => {
		const [heroX, heroY] = heroPos;
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
		if (isWalkable(toX, toY, grid) && actionCreator) {
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
		switch (getUnderHero(grid, things, heroPos)) {
			case "exit":
				dispatch(loadMap(level.current + 1));
				dispatch(nextLevel(level.current));
				break;
			case "gold":
				dispatch(takeGold(heroPos));
				break;
			default:
				break;
		}

		if (grid.length === 0) {
			dispatch(loadMap(level.current));
		}
	}, [dispatch, level, things, grid, heroPos]);

	if (level.current === level.final) {
		return <GameOver />;
	}

	return (
		<div className="game-area">
			<Score />
			<Map grid={grid} things={things} heroPos={heroPos} />
		</div>
	);
};

export default Game;
