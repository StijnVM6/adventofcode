// 2023 - Day 1: Trebuchet?!
// Part 2

import * as fs from "fs";

const filePath = "./2023/day-1/data/data.txt";

export const data = fs.readFileSync(filePath, "utf-8").split("\n");

export function getExoOnePartTwo(data: string[]) {
	const stringNumbers = [
		"one",
		"two",
		"three",
		"four",
		"five",
		"six",
		"seven",
		"eight",
		"nine",
	];

	function getNumber(stringNumber: string) {
		if (stringNumber === "one") return 1;
		if (stringNumber === "two") return 2;
		if (stringNumber === "three") return 3;
		if (stringNumber === "four") return 4;
		if (stringNumber === "five") return 5;
		if (stringNumber === "six") return 6;
		if (stringNumber === "seven") return 7;
		if (stringNumber === "eight") return 8;

		return 9;
	}

	let res = data.reduce((sum, line) => {
		let firstNumberIndex = line
			.split("")
			.findIndex((e) => !Number.isNaN(parseInt(e)));
		let lastNumberIndex = line
			.split("")
			.reverse()
			.findIndex((e) => !Number.isNaN(parseInt(e)));

		const firstStringNumbers = stringNumbers
			.map((stringNum) => ({
				index: line.indexOf(stringNum),
				stringNum,
			}))
			.filter((e) => e.index !== -1)
			.sort((a, b) => a.index - b.index);

		const lastStringNumbers = stringNumbers
			.map((stringNum) => ({
				index: line.lastIndexOf(stringNum),
				stringNum,
			}))
			.filter((e) => e.index !== -1)
			.sort((a, b) => b.index - a.index);

		let firstNumber;
		let lastNumber;

		if (firstNumberIndex === -1) {
			firstNumber = getNumber(firstStringNumbers[0].stringNum);
		} else {
			if (
				firstStringNumbers.length > 0 &&
				firstStringNumbers[0].index < firstNumberIndex
			) {
				firstNumber = getNumber(firstStringNumbers[0].stringNum);
			} else {
				firstNumber = parseInt(line[firstNumberIndex]);
			}
		}

		if (lastNumberIndex === -1) {
			lastNumber = getNumber(lastStringNumbers[0].stringNum);
		} else {
			if (
				lastStringNumbers.length > 0 &&
				lastStringNumbers[0].index > line.length - 1 - lastNumberIndex
			) {
				lastNumber = getNumber(lastStringNumbers[0].stringNum);
			} else {
				lastNumber = parseInt(line[line.length - 1 - lastNumberIndex]);
			}
		}

		return sum + firstNumber * 10 + lastNumber;
	}, 0);

	return res;
}
