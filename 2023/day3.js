const fs = require('fs')
const readline = require('readline')
const matrix = [];
const r1 = readline.createInterface({
    input: fs.ReadStream('inputFiles/inputDay3.txt'),
    crlfDelay: Infinity,
});

r1.on('line', line => {
    matrix.push(line);
});

r1.on('close', () => {
    let totalSumPartOne = 0;
    const n = matrix.length;
    for(var i=0; i < n; i++) {
        for(var j=0; j < matrix[i].length; j++) {
            if(matrix[i][j] >= '0' && matrix[i][j] <= '9') {
                var k = j, sum = 0;
                var possible = false;
                while(k < matrix[i].length && matrix[i][k] >= '0' && matrix[i][k] <= '9') {
                    sum = sum*10 + (matrix[i][k] - '0');
                    const comb = [
                        matrix[i==0?0:i-1][k],
                        matrix[i==n-1?n-1:i+1][k],
                        matrix[i==0?0:i-1][k==0?0:k-1],
                        matrix[i==0?0:i-1][k==n-1?n-1:k+1],
                        matrix[i==n-1?n-1:i+1][k==0?0:k-1],
                        matrix[i==n-1?n-1:i+1][k==n-1?n-1:k+1],
                        matrix[i][k==0?0:k-1],
                        matrix[i][k==n-1?n-1:k+1],
                    ];
                    for(var itr=0; itr < 8; itr++) {
                        if(comb[itr] != '.' && (comb[itr] < '0' || comb[itr] > '9')){
                            possible = true;
                        }
                    }
                    k++;
                }
                if(possible)
                    totalSumPartOne += sum;
                j = k;
            }
        }
    }
    console.log(totalSumPartOne);
});

