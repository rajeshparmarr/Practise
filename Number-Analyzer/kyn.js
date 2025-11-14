/*
🔥 Mini Project 1 — "Number Analyzer App"
A simple app using ONLY JavaScript:
Input number
Check: even/odd
Multiply table
Prime or not
Reverse digits
Goal: No tutorial, no GPT.
Just your own thinking.
*/

// input any number between 1 to n
const num = 85;
function isEven(num) {
    if (num % 2 == 0) {
        console.log(num,"is a even number")
    } else {
        console.log(num, "is an odd number");
    }
}
function multipleTable(num) {
    for (let i = 1; i <= 10; i++){
        console.log(num,"X",i,"=",num*i)
    }
}
function isPrime(num) {
    isPrime = true
    if (num <= 0) {
        console.log("Please enter a value >= 0")
    } else if(num == 1){
        console.log(num,"is not a prime");
    }else {
        for (let i = 2; i < num; i++){
            if (num % i == 0) {
                isPrime = false;
                break
            }
        }
    }
    if (isPrime == true) {
        console.log(num,"is a prime number")
    } else {
        console.log(num, "is not a prime number");
    }
}
function reverseDigit(num) {
    var stringDigi = String(num)
    var reversedDigi = ''
    for (let i = stringDigi.length - 1; i >= 0; i--){
        reversedDigi += stringDigi[i]
    }
    console.log(reversedDigi)
}
reverseDigit(45)
function factorial(num) {
    if (num < 0) {
        console.log("Undefined")
    } else if(num == 0 || num == 1) {
        console.log("factorial of 0 or 1 is",1)
    } else {
        fact = 1
        for (let i = 1; i <= num; i++){
            fact *= i
        }
        console.log(fact)
    }
}
