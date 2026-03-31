// 2023 - Day 2: Cube Conundrum
// Part 1

import * as fs from "fs";

const filePath = "./2023/day-2/data/data.txt";

const data = fs.readFileSync(filePath, "utf-8").split("\n");

export const parseGameData = (data: string[]) => {
	const games = data.map((line: string) => {
		const gameId = line.split(": ")[0].split(" ")[1];
		const gameDetails = line.split(": ")[1];

		const rounds = gameDetails.split(";").map((round) => {
			const colors = round.split(",").reduce((acc, colorData) => {
				const amount = colorData.trim().split(" ")[0];
				const color = colorData.trim().split(" ")[1];

				if (amount && color) {
					return Object.assign(acc, { [color]: amount });
				} else return new Error("Invalid color or amount");
			}, {});
			// console.log("Game: ", gameId, ": ", colors);
			return colors;
		});
		return { game: gameId, rounds: rounds }; // map to array instead
	});
	return games;
};

const gameObjects = parseGameData(data);

export const calculate = (
	games: any,
	maxRed: number,
	maxGreen: number,
	maxBlue: number
) => {
	// Filter games based on amount of each color
	const goodGames = [];
	for (const game of games) {
		let red = 0;
		let green = 0;
		let blue = 0;
		for (const rounds of game.rounds) {
			// if (parseInt(rounds.red) > red) red = parseInt(rounds.red);
			// if (parseInt(rounds.green) > green) green = parseInt(rounds.green);
			// if (parseInt(rounds.blue) > blue) blue = parseInt(rounds.blue);
			if (rounds.red) red = Math.max(red, parseInt(rounds.red));
			if (rounds.green) green = Math.max(green, parseInt(rounds.green));
			if (rounds.blue) blue = Math.max(blue, parseInt(rounds.blue));
		}

		if (red <= maxRed && green <= maxGreen && blue <= maxBlue) {
			goodGames.push(game.game);
		}
	}

	// Calculate the sum of the ids of the correct games
	return goodGames.reduce((acc, game) => acc + parseInt(game), 0);
};

const result = calculate(gameObjects, 12, 13, 14);
export default result;
