function add(num1, num2) {
    answer = num1 + num2;
    display.innerText = answer;
    displayString = parseInt(answer);
    answer = "";
}

function subtract(num1, num2) {
    answer = num1 - num2;
    display.innerText = answer;
    displayString = parseInt(answer);
    answer = "";
}

function multiply(num1, num2) {
    answer = num1 * num2;
    display.innerText = answer;
    displayString = parseInt(answer);
    answer = "";
}

function divide(num1, num2) {
    if (num2 == 0) {
        return console.error("ERROR, CANNOT DIVIDE BY ZERO");
    } else {
        answer = num1 / num2;
        display.innerText = answer;
        displayString = parseInt(answer);
        answer = "";
    };
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
    }
}
numregex = /\d/
const history = document.querySelector("#history");
const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");
const operators = document.querySelectorAll(".operator")
let displayString = "";
let historyString = "";
let operation = [];
let answer;

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", (e) => {
        if (e.target.id.match(numregex)) {
            if (operation.length == 3) {
                historyString = "";
                history.innerText = historyString;
                displayString = ""
                display.innerText = displayString;
                displayString += e.target.id;
                display.innerText = displayString;
                operation = [];
            }
            else {
                displayString += e.target.id;
                display.innerText = displayString;
                enableOperatorButtons();
            }
        }
        else {
            if (displayString !== "") {
                operation.push(displayString);
                specialCharacters(e);
            }
        };

    });
}

function specialCharacters(e) {
    if (operation.length == 3) {
        history.innerText += ` ${displayString}`;
        compute()
    }
    else {
        switch (e.target.id) {
            case "decimal":
                decimal();
                break;
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
                commitOperators(e);
                break;
            case "equals":
                equals();
                break;
            case "backspace":
                backspace();
                break;
            case "clear":
                clear();
                break;
            default:
                console.error("Error within specialCharacters")
                break;
        }
    }
}

function commitOperators(e) {
    if (e.target.value == "sqrt") {
        historyString = `${e.target.value} (${displayString})`
        compute();
    }
    else if (e.target.value == "divide") {
        document.querySelector(".zero").setAttribute("disable", true);
        //TODO some popup
        displayString += ` ${e.target.value} `;
    }
    else {
        displayString += ` ${e.target.value} `;
    }
    historyString = displayString;
    history.innerText = historyString;
    displayString = "";
    disableOperatorButtons();
}

function equals() {
    if (!(operation[operation.length - 1].match(numregex))) {
        display.innerText = "Please complete your operation";
        // TODO popup
    }
    else {
        history.innerText += ` ${displayString}`;
        compute();
    };
}

function clear() {
    displayString = "";
    historyString = "";
    display.innerText = displayString;
    history.innerText = historyString;
    operation = [];
    enableOperatorButtons();
}

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

function compute() {
    console.table(operation);
    num1 = parseInt(operation[0]);
    operator = operation[1];
    num2 = parseInt(operation[2]);
    operate(operator, num1, num2);
}