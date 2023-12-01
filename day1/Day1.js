const fs = require("node:fs");

/*******************************/
/************PART ONE***********/
/*******************************/
const firstNumberRegex = /\d/g; // Match to first digit, easy
const lastNumberRegex = /\d(?=[^\d]*$)/g; // Positive lookahead, there are no numbers beyond the current digit => last digit

let obfuscatedCalibrationValues;

try {
    obfuscatedCalibrationValues = fs.readFileSync("./input.txt", "utf8"); // not sure about leaving input values in my repo, TBD
} catch (err) {
    console.error(err);
}

let findCalibrationValue = (row) =>
    row.match(firstNumberRegex)[0].concat(row.match(lastNumberRegex)[0]);

let sumOfCalibratedValues = obfuscatedCalibrationValues
    .split("\n")
    .map(findCalibrationValue)
    .reduce((a, b) => parseInt(a) + parseInt(b));

console.log("Part one answer", sumOfCalibratedValues);

/*******************************/
/************PART TWO***********/
/*******************************/
const wordsToNumbers = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
};
let reverseString = (str) => str.split("").reverse().join("");
const numbersAsWordsRegexPipe = Object.keys(wordsToNumbers).join("|"); // cringe
let patternStringFrom = (pipedWords) => "(?:" + pipedWords + ")|\\d";

const firstNumberOrWordRegex = new RegExp(
    patternStringFrom(numbersAsWordsRegexPipe),
    "g"
); // Piped options for first occurrence, either a digit or match list of words
let findFirstOccPartTwo = (row) => row.match(firstNumberOrWordRegex)[0];

const lastNumberOrWordRegex = new RegExp(
    patternStringFrom(reverseString(numbersAsWordsRegexPipe)),
    "g"
); // Let's get freaky and flip the words in reverse
let findLastOccPartTwo = (row) =>
    reverseString(reverseString(row).match(lastNumberOrWordRegex)[0]); // and let's match the reversed row using the regex and then flip it back

let fetchDigit = (val) => /\d/g.test(val) ? parseInt(val) : wordsToNumbers[val]   // either keep the int or pull from mapping

let findCalibrationValuePt2 = (row) => {
    return parseInt("" + fetchDigit(findFirstOccPartTwo(row)) + fetchDigit(findLastOccPartTwo(row))) // concat those digits
}

let calibratedValuesPt2 = obfuscatedCalibrationValues
    .split("\n")
    .map(findCalibrationValuePt2).reduce((a,b) => a+b);

console.log("Part two answer", calibratedValuesPt2)