const largeNumber = 100000000;
let tempNum;
let computeRan = false;

function add(num1, num2) {
    answer = num1 + num2;
    rounding()
    displayAnswer();

}

function subtract(num1, num2) {
    answer = num1 - num2;
    rounding()
    displayAnswer();
}

function multiply(num1, num2) {
    answer = num1 * num2;
    rounding()
    displayAnswer();
}

function divide(num1, num2) {
    if (num2 == 0) {
        window.alert("ERROR, CANNOT DIVIDE BY ZERO")
        clear();
    } else {
        answer = num1 / num2;
        rounding();
        displayAnswer();
    };
}

function squareRoot(num1) {
    answer = Math.sqrt(num1);
    rounding()
    displayAnswer();
}

function exponent(num1, num2) {
    answer = Math.pow(num1, num2);
    rounding()
    displayAnswer();
}

function modulo(num1, num2) {
    answer = num1 % num2;
    rounding()
    displayAnswer();
}

function rounding() {
    answer = (Math.round(answer * largeNumber) / largeNumber);
}

function displayAnswer() {
    if ((window.innerWidth < "576") && (answer.toString().length > 20)) {
        clear();
        display.innerText = "OVERFLOW ERROR";
    }
    else {
        display.innerText = answer;
        displayString = parseFloat(answer);
    }
}

function operate(operator, num1, num2) {
    switch (true) {
        case (operator == "+"):
            return add(num1, num2);
        case (operator == "-"):
            return subtract(num1, num2);
        case (operator == "*"):
            return multiply(num1, num2);
        case (operator == "/"):
            return divide(num1, num2);
        case (operator == "^"):
            return exponent(num1, num2);
        case (operator == "%"):
            return modulo(num1, num2);
    }
}
numregex = /\d|[.]/
const history = document.querySelector("#history");
const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");
const operators = document.querySelectorAll(".operator")
let displayString = "";
let historyString = "";
let operation = [];
let answer = 0;

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", (e) => {
        if (e.target.value.match(numregex)) {
            if (operation.length == 3) {
                clear();
                displayString += e.target.id;
                display.innerText = displayString;
            }
            else {
                displayString += e.target.value;
                display.innerText = displayString;
                enableOperatorButtons();
                enableZero();
            }
        }
        else if (e.target.id == "clear") {
            clear();
        }
        else if (e.target.id == "backspace") {
            backspace();
        }
        else if (e.target.id == "equals") {
            operation.push(displayString);
            equals();
        }
        else {
            if ((computeRan == true) && (operation.length !== 3)) {
                operation.push(displayString);
                history.innerText += ` ${displayString}`;
                display.innerText = "";
                specialCharacters(e);
                // equals();

            }
            else if ((displayString !== "") && (operation.length !== 3)) {
                operation.push(displayString);
                computeRan = true;
                specialCharacters(e);
            }
            else {
                operation = [];
                operation.push(displayString);
                specialCharacters(e);
            }
        };
    });
}


function specialCharacters(e) {

    switch (e.target.id) {
        case "plusminus":
            plusminus();
            break;
        case "plus":
        case "minus":
        case "times":
        case "divide":
        case "sqrt":
        case "pow":
        case "modulo":
            operation.push(e.target.value);
            enableDecimal();
            commitOperators(e);
            break;
        default:
            console.error("Error within specialCharacters")
            break;
    }
}


function commitOperators(e) {
    if (e.target.id == "sqrt") {
        history.innerText = `sqrt(${displayString})`;
        disableOperatorButtons();
        return compute();
    }
    else if (e.target.id == "divide") {
        disableZero()
        displayString += ` ${e.target.value} `;
    }
    else {
        displayString += ` ${e.target.value} `;
    }
    historyString = displayString;
    history.innerText = historyString;
    // displayString = "";
    disableOperatorButtons();
}

function equals() {
    if (!(operation[operation.length - 1].match(numregex))) {
        display.innerText = "Please complete your operation";
    }
    else {
        history.innerText += ` ${displayString}`;
        compute();
    };
}


function clear() {
    displayString = "";
    historyString = "";
    computeRan = false;
    display.innerText = displayString;
    history.innerText = historyString;
    operation = [];
    enableDecimal();
    enableZero();
    enableOperatorButtons();
}

function backspace() {
    let tempString = "";
    if ((historyString !== "") && (operation.length !== 3)) {
        history.innerText = ""
        historyString = "";
        displayString = "";
        operation.pop();
        for (let i = 0; i < operation.length; i++) {
            tempString = operation[i];
            displayString += tempString;

        }
        display.innerText = displayString;
        operation = [];
        enableOperatorButtons();
        enableDecimal();
        enableZero();
    }
    else {
        clear();
    }
}

function compute() {
    console.table(operation);
    num1 = parseFloat(operation[0]);
    operator = operation[1];
    num2 = parseFloat(operation[2]);
    if (operator == "sqrt") {
        squareRoot(num1);
    }
    else {
        operate(operator, num1, num2);
    }
}

//enable or disable buttons
function disableOperatorButtons() {
    for (let i = 0; i < operators.length; i++) {
        operators[i].setAttribute("disabled", true);
    }
}

function enableOperatorButtons() {
    for (let i = 0; i < operators.length; i++) {
        operators[i].removeAttribute("disabled");
    }
}

function disableZero() {
    document.querySelector(".zero").setAttribute("disabled", true);
}
function enableZero() {
    document.querySelector(".zero").removeAttribute("disabled");
}

function disableDecimal() {
    document.querySelector("#decimal").setAttribute("disabled", true);
}

function enableDecimal() {
    document.querySelector("#decimal").removeAttribute("disabled");
}