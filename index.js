function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 == 0) {
        return "ERROR, CANNOT DIVIDE BY ZERO";
    } else return num1 / num2;
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
let string = "";
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", (e) => {
        if (e.target.id.match(numregex)) {
            string += e.target.id;
            display.innerText = string;
            for (let i = 0; i < operators.length; i++) {
                operators[i].removeAttribute("disabled");

            }
        }
        else {
            specialCharacters(e);
        };

    });
}

function specialCharacters(e) {
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

function commitOperators(e) {
    if (e.target.value == "sqrt") {
        string = `${e.target.value} (${string})`
    }
    else {
        string += e.target.value;
    }
    history.innerText = string;
    string = "";
    display.innerText = string;
    for (let i = 0; i < operators.length; i++) {
        operators[i].setAttribute("disabled", true);

    }
}

function clear() {
    string = "";
    display.innerText = string;
    history.innerText = string;
    for (let i = 0; i < operators.length; i++) {
        operators[i].removeAttribute("disabled");

    }
}