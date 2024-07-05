const start = performance.now();
let maxNum;
let minNum;
let numbersArr = [];
let median;

// fs.readFile("10m.txt", "utf8", (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }

//     numbers = data
//         .split("\n")
//         .map((line) => line.trim())
//         .filter((line) => line !== "");

//     for (i = 0; i < numbers.length; i++) {
//         numbersArr.push(numbers[i]);
//     }
// });

document
    .getElementById("filepath")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        const fileInput = document.getElementById("fileInput");
        const file = fileInput.files[0];
        console.log(file);

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const fileContent = e.target.result;
                const numbers = fileContent
                    .split("\n")
                    .map((line) => line.trim())
                    .filter((line) => line !== "")
                    .map(Number);

                for (i = 0; i < numbers.length; i++) {
                    numbersArr.push(numbers[i]);
                }
                console.log(numbersArr);
            };

            reader.readAsText(file);

            setTimeout(() => {
                const htmlLargest = largestNumber(numbersArr);
                const htmlSmallest = smallestNumber(numbersArr);
                const htmlMedian = medianNumber(numbersArr);
                const htmlAverage = averageNumber(numbersArr);
                const end = performance.now();
                const timeExecution = (end - start) / 1000;

                const combinedHTML = `
                    <div class="combined-results">
                        ${htmlLargest}
                        ${htmlSmallest}
                        ${htmlMedian}
                        ${htmlAverage}
                        <p>Time of exucution: ${timeExecution} seconds</p>
                    </div>
                `;

                const results = document.getElementById("results");
                results.innerHTML = combinedHTML;

                console.log(`Time of exucution: ${end - start} ms`);
            }, 1000);
        }
    });

// The largest number in the file
function largestNumber(array) {
    maxNum = array[0];

    for (i = 0; i < array.length; i++) {
        if (array[i] > maxNum) {
            maxNum = array[i];
        }
    }
    console.log("The largest number in the file is " + maxNum);
    return `
        <p>The largest number in the file is: ${maxNum}</p>        
    `;
}

// The smallest number in the file
function smallestNumber(array) {
    minNum = array[0];

    for (i = 0; i < array.length; i++) {
        if (array[i] < minNum) {
            minNum = array[i];
        }
    }
    console.log("The smallest number in the file is " + minNum);
    return `
        <p>The smallest number in the file is: ${minNum}</p>        
    `;
}

// Median
function medianNumber(array) {
    const indexOfMedian = array.length / 2;

    if (Number.isInteger(indexOfMedian)) {
        median = (array[indexOfMedian] + array[indexOfMedian - 1]) / 2;
    } else {
        median = array[Math.floor(indexOfMedian)];
    }
    console.log("Median from the numbers taken from the file is " + median);
    return `
        <p>Median from the numbers taken from the file is: ${median}</p>        
    `;
}

// Arithmetic mean
function averageNumber(array) {
    let sum = 0;
    const res = array.reduce((sum, item) => {
        sum = sum + item;

        return sum;
    }, 0);
    const average = res / array.length;
    console.log("The arithmetic mean of the numbers of the file is " + average);
    return `
        <p>The arithmetic mean of the numbers of the file is: ${average}</p>        
    `;
}
