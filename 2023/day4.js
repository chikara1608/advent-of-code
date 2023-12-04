const fs = require('fs')
const readline = require('readline')

let totalSumPartOne = 0, totalSumPartTwo = 0;

function findCaseId(line) {
    const idAndNumbers = line.split(':');
    let caseId = 0;
    for(num of idAndNumbers[0]) {
        if(num >= '0' && num <= '9') {
            caseId = caseId*10 + (num - '0');
        }
    }
    return caseId;
}

function calculatePointsOfCard(line) {
    const idAndNumbers = line.split(':');
    const numbers = idAndNumbers[1].split(' ');
    let index = 0;
    let set = new Set();
    for(itr in numbers) {
        if(numbers[itr] == ' ' || numbers[itr] == '')
            continue;
        if(numbers[itr] == '|') {
            index = parseInt(itr)+1;
            break;
        }
        set.add(numbers[itr]);
    }

    let points = 0;
    for(let itr = index; itr < numbers.length; itr++) {
        if(set.has(numbers[itr]))
            points++;
    }
    return points;
}

function calculateCardPointsPartOne(line) {
    let points = calculatePointsOfCard(line);
    if(points == 0)
        return 0;
    return Math.pow(2, points-1);
}

let freq = new Map();
for(let i = 1; i <= 205; i++)
        freq.set(i,1);

function calculateCardPointsPartTwo(line) {
    let points = calculatePointsOfCard(line);
    let id = findCaseId(line);
    let cardsToAdd = freq.get(id);
    for(let i=1; i<=points; i++) {
        freq.set(id+i,freq.get(id+i) + cardsToAdd);
    }
}

const r1 = readline.createInterface({
    input: fs.ReadStream('inputFiles/inputDay4.txt'),
    crlfDelay: Infinity,
});

r1.on('line', line => {
    totalSumPartOne += calculateCardPointsPartOne(line);
    calculateCardPointsPartTwo(line);
})

r1.on('close', ()=>{
    console.log(totalSumPartOne);
    for(let i=1; i <= 205; i++)
        totalSumPartTwo += freq.get(i);
    console.log(totalSumPartTwo);
})