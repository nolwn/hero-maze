import React, { FC } from "react";
import "./index.css";

interface Props {
	[k: string]: never;
}

const GameOver: FC<Props> = () => {
	return (
		<>
			<div className="gameover-area">
				<div>
					<h1>Game Over</h1>
					<hr />
					<h2>Congradulations are in order</h2>
				</div>
			</div>
		</>
	);
};

export default GameOver;
