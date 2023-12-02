const fs = require('fs');
const readline = require('readline');

var totalSumPartOne = 0, totalSumPartTwo = 0;

function calculateSumPartOne(line) {
    const gameParts = line.split(':');
    const gameStates = gameParts[1].split(';');
    const gameNumber = gameParts[0].match(/Game (\d+)/);
    var possible = true;
    for(gameState of gameStates) {   
        const myMap = {
            "green" : 0,
            "blue" : 0,
            "red" : 0,
        };
        const gameColours = gameState.split(',');
        for(gameColour of gameColours) {
            const gameBalls = gameColour.match(/(\s)(\d+)(\s)(\w+)/);
            myMap[gameBalls[4]] = gameBalls[2];
        }
        if(!(myMap["green"] <= 13 && myMap["blue"] <= 14 && myMap["red"] <= 12)) {
            possible = false;
            break;
        }
    }
    return possible ? parseInt(gameNumber[1],10) : 0;
}

function calculateSumPartTwo(line) {
    const gameParts = line.split(':');
    const gameStates = gameParts[1].split(';');
    const gameNumber = gameParts[0].match(/Game (\d+)/);
    var possible = true;
    var maxGreen = 0, maxBlue = 0, maxRed = 0;
    for(gameState of gameStates) {   
        const myMap = {
            "green" : 0,
            "blue" : 0,
            "red" : 0,
        };
        const gameColours = gameState.split(',');
        for(gameColour of gameColours) {
            const gameBalls = gameColour.match(/(\s)(\d+)(\s)(\w+)/);
            myMap[gameBalls[4]] = gameBalls[2];
        }
        maxGreen = Math.max(maxGreen, myMap["green"]);
        maxBlue = Math.max(maxBlue, myMap["blue"]);
        maxRed = Math.max(maxRed, myMap["red"]);
    }
    return maxGreen*maxBlue*maxRed;
}

const r1 = readline.createInterface({
    input: fs.createReadStream('inputDay2.txt'),
    crlfDelay: Infinity, 
});

r1.on('line', line => {
    totalSumPartOne += calculateSumPartOne(line);
    totalSumPartTwo += calculateSumPartTwo(line);
});

r1.on('close', () => {
    console.log(totalSumPartOne);
    console.log(totalSumPartTwo);
})