// 2023 - Day 3: Gear Ratios
// Part 1

import * as fs from "fs";

const filePath = "./2023/day-3/data/data.txt";

const data = fs
	.readFileSync(filePath, "utf-8")
	.split("\n")
	.map((line) => line.trim());

const getEndOfNumber = (row: string, col: number): number => {
	const regexIsNumber = new RegExp(/[0-9]/);
	let end = col;
	while (end <= row.length - 1 && regexIsNumber.test(row[end])) end++;
	return end;
};

const getRegexPosition = (
	data: string[],
	row: number,
	col: number,
	end: number
): string => {
	const regexIsSymbol = new RegExp(/[*]/g);

	for (let i = row - 1; i <= row + 1; i++) {
		if (!data[i]) continue;
		for (let j = col - 1; j <= end; j++) {
			if (!data[i][j]) continue;
			if (regexIsSymbol.test(data[i][j])) {
				return `${i}, ${j}`;
			}
		}
	}
	return "";
};

const filterExactTwice = (numbers: string[][]): Map<string, number[]> => {
	const countMap = new Map<string, number>();
	const sumMap = new Map<string, number[]>();

	for (const [value, position] of numbers) {
		countMap.set(position, (countMap.get(position) || 0) + 1);
		if (!sumMap.has(position)) sumMap.set(position, []);
		sumMap.get(position)!.push(Number(value));
	}

	return sumMap;
};

const multiplyPairs = (sumMap: Map<string, number[]>): number[] => {
	const numbers: number[] = [];
	for (const [key, value] of sumMap) {
		if (value.length === 2) {
			const result = Number(value[0]) * Number(value[1]);
			numbers.push(result);
		}
	}
	return numbers;
};

const calc = (data: string[]): any => {
	const regexIsNumber = new RegExp(/[0-9]/);
	const numbers = [];

	for (let row = 0; row < data.length; row++) {
		if (!regexIsNumber.test(data[row])) continue;
		for (let col = 0; col < data[row].length; col++) {
			if (regexIsNumber.test(data[row][col])) {
				const end = getEndOfNumber(data[row], col);
				const regexPos = getRegexPosition(data, row, col, end);
				if (regexPos != "") {
					numbers.push([data[row].slice(col, end), regexPos]);
					col = end;
				} else continue;
			} else continue;
		}
	}

	const pairs = filterExactTwice(numbers);
	// console.log("pairs: ", pairs);
	const numbersArray = multiplyPairs(pairs);
	// console.log("numbersArray: ", numbersArray);
	return numbersArray.reduce(
		(acc, currentValue): number => acc + currentValue,
		0
	);
};

const result = calc(data);

export default result;
