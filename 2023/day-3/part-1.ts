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

const regexCheck = (
	data: string[],
	row: number,
	col: number,
	end: number
): boolean => {
	const regexIsSymbol = new RegExp(/[^.0-9]/g);

	for (let i = row - 1; i <= row + 1; i++) {
		if (!data[i]) continue;
		for (let j = col - 1; j <= end; j++) {
			if (!data[i][j]) continue;
			if (regexIsSymbol.test(data[i][j])) return true;
		}
	}
	return false;
};

const calc = (data: string[]): number[] => {
	const regexIsNumber = new RegExp(/[0-9]/);
	const number: string[] = [];

	for (let row = 0; row < data.length; row++) {
		if (!regexIsNumber.test(data[row])) continue;
		for (let col = 0; col < data[row].length; col++) {
			if (regexIsNumber.test(data[row][col])) {
				const end = getEndOfNumber(data[row], col);
				if (regexCheck(data, row, col, end)) {
					number.push(data[row].slice(col, end));
				}
				col = end;
			} else continue;
		}
	}
	return number.map((n) => Number(n));
};

const numbers = calc(data);
console.log(numbers);
const result = numbers.reduce(
	(acc, currentValue): number => acc + currentValue,
	0
);

export default result;
