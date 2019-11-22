// imports 
const { createWriteStream } = require("fs")
const { getRandomWordSync, getRandomWord } = require('word-maker');
const { fork } = require('child_process')

console.log("It worked")

// Inintialize the file writing 
const stream = createWriteStream('./log.txt', { flags: 'a' })

// Task 1 printing random words
const randomwordPrint = () => {
    stream.write('---------Task 1 Random Word Sync Function-----------\n')
    for (let i = 1; i < 101; i++) {

        stream.write(i + ': ' + getRandomWordSync() + '\n')
    }

}

// Task 2 Fizz Buzz Programe
const fizzBuzz = () => {
    stream.write('\n---------Task 2 FizzBuzz Sync Function-----------\n')
    for (let i = 1; i < 101; i++) {
        let word = getRandomWordSync()

        if (word.length % 3 == 0) {
            stream.write(i + ': Fizz' + '\n')
        } else if (word.length % 5 == 0) {
            stream.write(i + ': Buzz' + '\n')
        } else if (word.length % 3 == 0 && word.length % 5) {
            stream.write(i + ': FizzBuzz' + '\n')
        } else {
            stream.write(i + ': ' + word + '\n')
        }
    }

}


// Task 3 with asynchronous function for task 1, 2
const asyncRandomWordPrint = async () => {
    stream.write('\n---------Task 3 Random Word Async Function-----------\n')
    for (let i = 1; i < 101; i++) {
        await getRandomWord().then(word => {
            stream.write(i + ': ' + word + '\n')
        }).catch(error => {
            stream.write(i + ': ' + error + '\n')
        })
    }
}

const asyncFizzBuzz = async () => {
    stream.write('\n---------Task 3 FizzBuzz Async Function-----------\n')
    for (let i = 1; i < 101; i++) {
        await getRandomWord().then(word => {
            if (word.length % 3 == 0) {
                stream.write(i + ': Fizz' + '\n')
            } else if (word.length % 5 == 0) {
                stream.write(i + ': Buzz' + '\n')
            } else if (word.length % 3 == 0 && word.length % 5) {
                stream.write(i + ': FizzBuzz' + '\n')
            } else {
                stream.write(i + ': ' + word + '\n')
            }
        }).catch(error => {
            stream.write(i + ': ' + error + '\n')
        })
    }
}

/** 
 * Error handling for asyncrouns and syncronus functions  Task 4.
 * 
 * For handing errors in Sync function I have used try, catch, as well as for handing errors and receveing data 
 * in Async functions catch then have used
 * 
*/
// Syncronus Functions
const randomwordPrintWithErrorHandled = () => {
    stream.write('\n---------Task 4 Random Word Sync Function Error Handled-----------\n')
    // here we adding a for loop to start from 1 and stop befor 101.
    for (let i = 1; i < 101; i++) {
        let word
        try {
            word = getRandomWordSync({ withErrors: true })
        } catch (err) {
            word = "It shouldn't break anything!"
        }

        stream.write(i + ': ' + word + '\n')
    }
}

const fizzBuzzErrorHandled = () => {
    stream.write('\n---------Task 4 FizzBuzz Sync Function Error Handled-----------\n')
    // here we adding a for loop to start from 1 and stop befor 101.
    for (let i = 1; i < 101; i++) {

        let wordPrint = ''
        try {
            let word = getRandomWordSync({ withErrors: true })
            if (word.length % 3 == 0) {
                wordPrint = 'Fizz'
            } else if (word.length % 5 == 0) {
                wordPrint = 'Buzz'
            } else if (word.length % 3 == 0 && word.length % 5) {
                wordPrint = 'FizzBuzz'
            } else {
                wordPrint = word
            }

        } catch (err) {
            wordPrint = "It shouldn't break anything!"
        }

    stream.write(i + ': ' + wordPrint + '\n')
    }
}

// Asynchronus Functions
const asyncRandomWordPrintErrorHandled = async () => {
    stream.write('\n---------Task 4 Random Word Async Function Error Handled-----------\n')
    for (let i = 1; i < 101; i++) {
        let printWord;
        await getRandomWord({ withErrors: true }).then(word => {
            printWord = i + ': ' + word
        }).catch(error => {
            printWord = "It shouldn't break anything!"
        })
    stream.write(printWord + '\n')
    }
}

const asyncFizzBuzzErrorHandled = async () => {

    stream.write('\n---------Task 4 FizzBuzz Async Function Error Handled-----------\n')
    for (let i = 1; i < 101; i++) {
        let printWord;
        await getRandomWord({ withErrors: true }).then(word => {
            if (word.length % 3 == 0) {
                printWord = 'Fizz'
            } else if (word.length % 5 == 0) {
                printWord = 'Buzz'
            } else if (word.length % 3 == 0 && word.length % 5) {
                printWord = 'FizzBuzz'
            } else {
                printWord = word
            }
        }).catch(error => {
            printWord = "It shouldn't break anything!"
        })

        stream.write(i + ': ' + printWord + '\n')
    }
}



/**
 * Used child process to get speedup the funtion. now it gives result more faster
 * 
 * the speedupfunction
 */
const BonusSpeedupFunction = async () => {
    
    for (let i = 1; i < 101; i++) {
        const childProcess =  await fork("./word-maker/index.js");
        childProcess.send(true)
        childProcess.on("message", message => {
            if (message.length % 3 == 0) {
                console.log(i + ': Fizz')
            } else if (message.length % 5 == 0) {
                console.log(i + ': Buzz')
            } else if (message.length % 3 == 0 && message.length % 5 == 0) {
                console.log(i + ': FizzBuzz')
            } else {
                console.log(i + ': ' + message)
            }
        }, err => {
            console.log(i + ": It shouldn't break anything!")
        })
    }
}



/**
 * Wrapped the all functions in to the main function. This main function is an Async function. 
 * When we call those entire functions without the main function, the entire code is executing without
 * waiting for those async functions which has written above. As well as it closes the tream also. So when ever thos async
 * functions gives the data it will not able to add those data in to the txt file. So I used this main funcion. It helps to prevent
 * from the above mentioned scenario
 */
const main = async () => {
    // randomwordPrint();
    // fizzBuzz();

    // await asyncFizzBuzz();
    // await asyncRandomWordPrint()

    // randomwordPrintWithErrorHandled();
    // fizzBuzzErrorHandled();

    // await asyncRandomWordPrintErrorHandled();
    // await asyncFizzBuzzErrorHandled();

    await BonusSpeedupFunction();


    stream.end();
}

// calling main function
main();