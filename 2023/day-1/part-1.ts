// 2023 - Day 1: Trebuchet?!
// Part 1

import * as fs from "fs";

const filePath = "./2023/day-1/data/data.txt";

const data = fs.readFileSync(filePath, "utf-8").split("\n");

const lineToArray = (line: string): string[] => {
	const array = line.split("");
	// console.log("line: ", array);
	return array;
};

const getFirstNumber = (line: string[]): number => {
	const firstNumber = line.find(
		(character: string) => !Number.isNaN(parseInt(character))
	);
	// console.log(`firstNumber: ${firstNumber}`);
	return Number(firstNumber);
};

const getLastNumber = (line: string[]) => {
	const lastNumber = line.findLast(
		(character: any) => !Number.isNaN(parseInt(character))
	);
	// console.log(`lastNumber: ${lastNumber}`);
	return Number(lastNumber);
};

const getNumberOfLine = (firstNumber: number, lastNumber: number): number => {
	const number = firstNumber.toString() + lastNumber.toString();
	// console.log(`number: ${number}`);
	return Number(number);
};

let result = 0;

for (const line of data) {
	const lineArray = lineToArray(line);
	// console.log(`lineArray: ${lineArray}`);

	const firstNumber = getFirstNumber(lineArray);
	if (firstNumber === undefined) {
		continue;
	}

	const number = getNumberOfLine(
		getFirstNumber(lineArray),
		getLastNumber(lineArray)
	);
	result += Number(number);
}

console.log(`total: ${result}`);

export default result;
