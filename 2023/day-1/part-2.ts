// 2023 - Day 1: Trebuchet?!
// Part 2

import * as fs from "fs";

const filePath = "./2023/day-1/data/data.txt";

export const data = fs.readFileSync(filePath, "utf-8").split("\n");

export const verifyWordNumber = (
	substr: string,
	firstOrLast: string
): string => {
	const wordArray = [];
	if (substr.includes("one")) wordArray.push("one");
	if (substr.includes("two")) wordArray.push("two");
	if (substr.includes("three")) wordArray.push("three");
	if (substr.includes("four")) wordArray.push("four");
	if (substr.includes("five")) wordArray.push("five");
	if (substr.includes("six")) wordArray.push("six");
	if (substr.includes("seven")) wordArray.push("seven");
	if (substr.includes("eight")) wordArray.push("eight");
	if (substr.includes("nine")) wordArray.push("nine");

	if (wordArray.length == 0) return "";
	else if (wordArray.length == 1) return wordArray[0];
	else {
		const indexArray = [];
		for (const word of wordArray) {
			indexArray.push(substr.indexOf(word));
		}

		if (firstOrLast === "first") {
			const minIndex = Math.min(...indexArray);
			return wordArray[indexArray.indexOf(minIndex)];
		} else if (firstOrLast === "last") {
			const maxIndex = Math.max(...indexArray);
			return wordArray[indexArray.indexOf(maxIndex)];
		} else throw new Error("Invalid firstOrLast");
	}
};

export const wordNumberToNumber = (wordNumber: string): number => {
	switch (true) {
		case wordNumber === "one":
			return 1;
		case wordNumber === "two":
			return 2;
		case wordNumber === "three":
			return 3;
		case wordNumber === "four":
			return 4;
		case wordNumber === "five":
			return 5;
		case wordNumber === "six":
			return 6;
		case wordNumber === "seven":
			return 7;
		case wordNumber === "eight":
			return 8;
		case wordNumber === "nine":
			return 9;
		default:
			return NaN;
	}
};

export const lineToArray = (line: string): string[] => {
	return line.split("");
};

export const getPositionOfNumber = (
	number: number,
	line: string,
	firstOrLast: string
): number => {
	if (firstOrLast === "first") {
		return Number(line.indexOf(number.toString()));
	} else if (firstOrLast === "last") {
		return Number(line.lastIndexOf(number.toString()));
	} else throw new Error("Invalid firstOrLast");
};

export const checkStringForWordNumbers = (
	numberIndex: number,
	line: string,
	firstOrLast: string
): string => {
	if (firstOrLast === "first") {
		const substr = line.substring(0, numberIndex);
		// console.log(`substr: ${substr}`);
		return verifyWordNumber(substr, firstOrLast);
	} else if (firstOrLast === "last") {
		const substr = line.substring(numberIndex);
		// console.log(`substr: ${substr}`);
		return verifyWordNumber(substr, firstOrLast);
	} else throw new Error("Invalid firstOrLast");
};

export const getFirstNumber = (line: string[]): number => {
	const firstNumber = line.find(
		(character: string) => !Number.isNaN(parseInt(character))
	);
	return Number(firstNumber);
};

export const getLastNumber = (line: string[]) => {
	const lastNumber = line.findLast(
		(character: any) => !Number.isNaN(parseInt(character))
	);
	return Number(lastNumber);
};

export const setNumber = (wordNumber: string, number: number): number => {
	if (wordNumber && wordNumber !== "") {
		return Number(wordNumberToNumber(wordNumber));
	} else return number;
};

export const getNumberOfLine = (
	firstNumber: number,
	lastNumber: number
): number => {
	const number = firstNumber.toString() + lastNumber.toString();
	return Number(number);
};

export const calculate = (data: string[]): number => {
	let result = 0;

	for (const line of data) {
		const lineArray = lineToArray(line);
		// console.log(`lineArray: ${lineArray}`);

		// FIRST NUMBER
		const firstNumber = getFirstNumber(lineArray);
		// console.log(`firstNumber: ${firstNumber}`);

		let firstNumberIndex = 0;
		let firstWordNumber = "";
		if (!Number.isNaN(firstNumber)) {
			// numbers found
			firstNumberIndex = getPositionOfNumber(firstNumber, line, "first");
			// console.log(`firstNumberIndex: ${firstNumberIndex}`);
			firstWordNumber = checkStringForWordNumbers(
				firstNumberIndex,
				line,
				"first"
			);
		} else {
			// no numbers found
			firstWordNumber = checkStringForWordNumbers(
				line.length,
				line,
				"first"
			);
		}
		// console.log(`wordNumber: ${firstWordNumber}`);

		const firstNumberFinal = setNumber(firstWordNumber, firstNumber);

		// LAST NUMBER
		const lastNumber = getLastNumber(lineArray);
		// console.log(`lastNumber: ${lastNumber}`);

		let lastNumberIndex = 0;
		let lastWordNumber = "";
		if (Number.isNaN(firstNumber)) {
			// no numbers found
			lastWordNumber = checkStringForWordNumbers(0, line, "last");
		} else {
			// numbers found
			lastNumberIndex = getPositionOfNumber(lastNumber, line, "last");
			if (firstNumberIndex === lastNumberIndex) {
				// only one number present
				lastWordNumber = checkStringForWordNumbers(
					firstNumberIndex,
					line,
					"last"
				);
			} else {
				// multiple numbers present
				lastWordNumber = checkStringForWordNumbers(
					lastNumberIndex,
					line,
					"last"
				);
			}
		}
		// console.log(`lastWordNumber: ${lastWordNumber}`);

		const lastNumberFinal = setNumber(lastWordNumber, lastNumber);

		// console.log(`firstNumberFinal: ${firstNumberFinal}`);
		// console.log(`lastNumberFinal: ${lastNumberFinal}`);

		const number = getNumberOfLine(firstNumberFinal, lastNumberFinal);
		// console.log(`number: ${number}\n`);
		result += Number(number);
	}

	// console.log(`total: ${result}`);
	return result;
};
