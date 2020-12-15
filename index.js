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


//testing
