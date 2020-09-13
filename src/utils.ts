import { PieceKind } from "./types";

export const compileFromString = (sketch: string): PieceKind[][] => {
	const diagram: PieceKind[][] = [[]];
	let rI = 0;
	for (const char of sketch) {
		switch (char) {
			case "\n":
				rI++;
				diagram[rI] = [];
				break;
			case ".":
				diagram[rI].push("floor");
				break;
			case "#":
				diagram[rI].push("wall");
				break;
			case "@":
				diagram[rI].push("hero");
				break;
			case "e":
				diagram[rI].push("exit");
				break;
			case "\t":
			case " ":
				break;
			default:
				throw new Error(`${char} is not a valid piece character.`);
		}
	}

	return diagram;
};
