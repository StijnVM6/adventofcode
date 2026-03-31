// 2023 - Day 3: Gear Ratios
// Part 1

import * as fs from "fs";

const filePath = "./2023/day-3/data/data3.txt";

const dataRaw = fs
	.readFileSync(filePath, "utf-8")
	.split("\n")
	.map((line) => line.trim());

const transform = (data: string[]): string[] => {
	const newData = [];
	for (const line of data) {
		console.log(line);
		const regex = new RegExp(/[^.\w]/g);
		if (regex.test(line)) {
			newData.push(line.replace(regex, "#"));
		} else {
			newData.push(line);
		}
	}
	return newData;
};

const getNumber = (row: string, col: number): string => {
	const regex = new RegExp(/[^0-9]/g);
	if (!row || regex.test(row[col])) return "";

	let start = col,
		end = col;
	while (start > 0 && !regex.test(row[start - 1])) start--;
	while (end < row.length - 1 && !regex.test(row[end + 1])) {
		console.log("end: ", row[end]);
		console.log("end + 1: ", row[end + 1]);
		console.log(!regex.test(row[end + 1]));
		end++;
	}
	console.log(row.slice(start, end + 1));
	return row.slice(start, end + 1);
};

const calc = (data: string[]): string[] => {
	const regex = new RegExp(/[0-9]/g);
	const number: string[] = [];

	for (let row = 0; row < data.length; row++) {
		if (!data[row].includes("#")) continue;
		for (let col = 0; col < data[row].length; col++) {
			if (data[row][col] === "#") {
				console.log("-------------");
				number.push(getNumber(data[row], col - 1));
				number.push(getNumber(data[row], col + 1));
				if (row > 0) {
					if (regex.test(data[row - 1][col])) {
						number.push(getNumber(data[row - 1], col));
					} else {
						number.push(getNumber(data[row - 1], col - 1));
						number.push(getNumber(data[row - 1], col + 1));
					}
				}
				if (row < data.length - 1) {
					console.log("BELOW");
					console.log(
						data[row + 1][col - 1],
						data[row + 1][col],
						data[row + 1][col + 1]
					);
					if (regex.test(data[row + 1][col])) {
						console.log("middle");
						number.push(getNumber(data[row + 1], col));
					} else {
						number.push(getNumber(data[row + 1], col - 1));
						number.push(getNumber(data[row + 1], col + 1));
					}
				}
			}
		}
	}
	return number.filter((n) => n !== "");
};

const data = transform(dataRaw);
const numbersStringArray = calc(data);
console.log(`\n${numbersStringArray}\n`);
const numbers = numbersStringArray.map((number) => Number(number));
const result = numbers.reduce(
	(acc, currentValue): number => acc + currentValue,
	0
);

export default result;
