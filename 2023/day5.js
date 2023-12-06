const fs = require('fs')
const readline = require('readline')

const r1 = readline.createInterface({
    input: fs.ReadStream('inputFiles/inputDay5.txt'),
    crlfDelay: Infinity,
});

let currentState = -1;
let seedToSoil = new Set();
let soilToFert = new Set();
let fertToWater = new Set();
let waterToLight = new Set();
let lightToTemp = new Set(); 
let tempToHumidity = new Set();
let humidityToLoc = new Set();
let sets = [seedToSoil, soilToFert, fertToWater, waterToLight, lightToTemp, tempToHumidity, humidityToLoc];
let sizes = [17, 26, 47, 8, 15, 40, 24];
let numbers;

function findLocation(num) {
    for(ds of sets) {
        for(range of ds) {
            if(num >= range[1] && num <= (range[1]+range[2]-1)) {
                num = range[0] - range[1] + num;
                break;
            }
        }
    }
    return num;
}

r1.on('line', line => {
    if(currentState == -1) {
        numbers = line.split(' ').filter(value => !isNaN(value)).map(Number);
        numbers.sort();
        currentState = 0;
    } else {
        const range = line.split(' ').filter(value => (value !='' && !isNaN(value))).map(Number);
        if(range.length != 0) {
            sets[currentState].add(range);
            if(sets[currentState].size == sizes[currentState])
                currentState++;
        }
    }
})

r1.on('close', () => {
    let minimum = Infinity;
    for(num of numbers) {
        minimum = Math.min(minimum, findLocation(num));
    }
    console.log(minimum);
})