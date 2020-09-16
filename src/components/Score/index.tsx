import React, { FC } from "react";
import { useSelector } from "react-redux";
import { FullState } from "../../redux/reducers";

interface Props {
	[k: string]: never;
}

const Score: FC<Props> = () => {
	const score = useSelector(({ score }: FullState) => score);

	return (
		<div className="score-area">
			<span className="score">{score}</span>
		</div>
	);
};

export default Score;
