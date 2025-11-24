/*
🔥 Mini Project 1 — "Number Analyzer App"
A simple app using ONLY JavaScript:
Input number
Check: even/odd
Multiply table
Prime or not
Reverse digits
Add a Gemini ai api which tell 5 intereseting facts of Number.
Goal: No tutorial, no GPT.
Just your own thinking.
*/

// input any number between 1 to n
const num = -85;
function isEven(num) {
  let isEvenf = false;
  if (num % 2 == 0) {
    isEvenf = true;
    return isEvenf;
  } else {
    isEvenf = false;
    return isEvenf;
  }
}

function multipleTable(num) {
  for (let i = 1; i <= 10; i++) {
    return num, "X", i, "=", num * i;
  }
}

function isPrime(num) {
  let message = "";
  let isPrimef = true;
  if (num <= 0) {
    console.log("Please enter a value >= 0");
    message = "Please enter a value >= 0";
    isPrimef = false;
    return [isPrimef, message];
  } else if (num == 1) {
    console.log(num, "is not a prime");
    isPrimef = false;
    message = "1 is not a prime number";
    return [isPrimef, message];
  } else {
    for (let i = 2; i < num; i++) {
      if (num % i == 0) {
        isPrimef = false;
        message = `${num} is not a Prime number`;
        break;
      }
      isPrimef = true;
      message = "is a prime";
    }
    return [isPrimef, message];
  }
}

function reverseDigit(num) {
  var stringDigi = String(num);
    var reversedDigi = "";
    for (let i = stringDigi.length - 1; i >= 0; i--) {
        reversedDigi += stringDigi[i];
    }
    if (stringDigi[0] == "-") {
        return "-"+(reversedDigi.slice(0,stringDigi.length-1))
    } else {
        return reversedDigi
    }
    
}


function factorial(num) {
  if (num < 0) {
      console.log("Undefined");
      return ("undefined")
  } else if (num == 0 || num == 1) {
      console.log("factorial of 0 or 1 is", 1);
      return ("factorial of 0 or 1 is", 1)
  } else {
    let fact = BigInt(1)
    for (let i = BigInt(2); i <= BigInt(num); i++) {
      fact *= i;
    }
      console.log(fact);
      return fact
  }
}

async function geminiAPI(num) {
    const response = await fetch("http://localhost:1001/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({number:num}),
    })
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json()
}

async function analyzeNumber() {
  let num = parseInt(document.getElementById("numInput").value);

  if (isNaN(num)) {
    alert("Please enter a valid number!");
    return;
  }

  // Even or Odd
   const result2 = isEven(num);
   evenEle = document.getElementById("evenOdd")
    
  if (result2 == true) {
    evenEle.style.color = "green";
  } else {
    evenEle.style.color = "red";
    }
    evenEle.innerText = result2

  // Prime number
  const result1 = isPrime(num);
  let primeEle = document.getElementById("primeCheck");
  if (result1[0] == true) {
    primeEle.style.color = "green";
  } else {
    primeEle.style.color = "red";
  }
  primeEle.innerText = result1;

  // Reverse Digit
    const result = reverseDigit(num);
    let reverseEle = document.getElementById("reverseNum") 
    reverseEle.style.color = "green"
    reverseEle.innerText = result


  // multiplication Table
    let tableList = document.getElementById("tableList");
    tableList.innerText = "";
    for (let i = 1; i <= 10; i++){
        let li = document.createElement("li");
        li.style.color = 'green'
        li.innerText = `${num} X ${i} = ${num * i};`
        tableList.appendChild(li)
    }

    // factorial calculation
    let result3 = factorial(num);
    let factorialEle = document.getElementById("factorial")
    factorialEle.style.color = 'green'
    factorialEle.innerText = result3.toString();

 
    // gemini API
    let aiResult = await geminiAPI(num)
    let geminiEle = document.getElementById("geminiAPI");

    geminiEle.innerHTML = ""

    const ul = document.createElement("ul")

    aiResult.points.forEach(point => {
        const li = document.createElement("li")
        li.textContent = point
        ul.appendChild(li)
    })
    geminiEle.appendChild(ul);
   
}

