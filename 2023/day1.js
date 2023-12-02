const fs = require('fs');
const { parse } = require('path');
const readline = require('readline')

var totalSumPartOne = 0, totalSumPartTwo = 0;

const myMap = {
    "one" : 1,
    "two" : 2,
    "three" : 3,
    "four" : 4,
    "five" : 5,
    "six" : 6,
    "seven" : 7,
    "eight" : 8,
    "nine" : 9,
};

function calculateSumPartOne(line) {
    const numbers = line.match(/[0-9]/gi);
    const first = parseInt(numbers[0],10);
    const second = parseInt(numbers[numbers.length-1],10);
    return (first*10 + second);
}

function digit(str) {
    return str.length == 1 ? parseInt(str,10) : myMap[str];
}

function calculateSumPartTwo(line) {
    const numbers = line.match(/([0-9]|one|two|three|four|five|six|seven|eight|nine)/gi)
    const numbers2 = line.match(/([0-9]|one(?!ight)|two(?!ne)|three(?!ight)|four|five(?!ight)|six|seven(?!ine)|eight(?!wo|hree)|nine)/gi)
    const first = digit(numbers[0]);
    const second = digit(numbers2[numbers2.length - 1]);
    return (first*10 + second);
}

const r1 = readline.createInterface({
    input: fs.ReadStream('inputDay1.txt'),
    crlfDelay: Infinity,
});

r1.on('line', line => {
    totalSumPartOne += calculateSumPartOne(line);
    totalSumPartTwo += calculateSumPartTwo(line);
})

r1.on('close', () => {
    console.log(totalSumPartOne);
    console.log(totalSumPartTwo);
})