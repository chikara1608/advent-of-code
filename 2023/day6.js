const fs = require('fs')
const readline = require('readline')

const r1 = readline.createInterface({
    input: fs.ReadStream('inputFiles/inputDay6.txt'),
    crlfDelay: Infinity,
});

function totalWays(t, d) {
    let ctr = 0;
    for(let x = 0; x <= t; x++) {
        if(x*(t-x) > d) 
            ctr++;
    }
    return ctr;
}

let i = 0;
let time = [];
let dist = [];
let singleTime, singleDistance;

r1.on('line', line => {
    const values = line.split(' ').filter(value => value!='' && !isNaN(value));
    const numbers = values.map(Number);
    const singleString = values[0]+values[1]+values[2]+values[3];
    const singleNumber = parseInt(singleString, 10);
    if(i == 0) {
        time = numbers;
        singleTime = singleNumber;
        i++;
    } else {
        dist = numbers;
        singleDistance = singleNumber;
        i++;
    }
});

r1.on('close', () => {
    let totalProductPartOne = 1;
    for(let itr = 0; itr < 4; itr++) {
        totalProductPartOne *= totalWays(time[itr], dist[itr]);
    }
    console.log(totalProductPartOne);
    // console.log(singleDistance);
    // console.log(singleTime);
    let totalWaysPartTwo = totalWays(singleTime, singleDistance);
    console.log(totalWaysPartTwo);
});