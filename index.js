function add(num1, num2) {
    return console.log(num1 + num2);
}

function subtract(num1, num2) {
    return console.log(num1 - num2);
}

function multiply(num1, num2) {
    return console.log(num1 * num2);
}

function divide(num1, num2) {
    if (num2 == 0) {
        return console.error("ERROR, CANNOT DIVIDE BY ZERO");
    } else return console.log(num1 / num2);
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
let operation = [];

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", (e) => {
        if (e.target.id.match(numregex)) {
            string += e.target.id;
            display.innerText = string;
            enableOperatorButtons();
        }
        else {
            operation.push(string);
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

function commitOperators(e) {
    if (e.target.value == "sqrt") {
        string = `${e.target.value} (${string})`
        compute();
    }
    else if (e.target.value == "divide") {
        document.querySelector(".zero").setAttribute("disable", true);
        //TODO some popup
        string += ` ${e.target.value} `;
    }
    else {
        string += ` ${e.target.value} `;
    }
    history.innerText = string;
    string = "";
    display.innerText = string;
    disableOperatorButtons();
}

function equals() {
    if (!(operation[operation.length - 1].match(numregex))) {
        console.error("Please complete your operation")
        // TODO popup
    }
    else {
        compute()
    };
}

function clear() {
    string = "";
    display.innerText = string;
    history.innerText = string;
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