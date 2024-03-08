const MAX_DISPLAY_SIZE = 13;
const calcNumbers = Array.from(document.querySelectorAll(".calc-button")).filter((element) => {
    if(!isNaN(element.id)) {
        return element;
    }
})
const display = document.getElementById("display");
const clearButton = document.getElementById("clear").addEventListener("click", () => {
    memory.operand1 = "";
    memory.operand2 = "";
    memory.operator = null;
    display.innerHTML = "";
})
const sumButton = document.getElementById("sum").addEventListener("click", () => {
    memory.operator = calcSum;
})
const multiplyButton = document.getElementById("multiply").addEventListener("click", () => {
    memory.operator = calcMultiply;
})
const subtractButton = document.getElementById("subtract").addEventListener("click", () => {
    memory.operator = calcSubtract;
})
const divideButton = document.getElementById("divide").addEventListener("click", () => {
    memory.operator = calcDivide;
})
const equalsButton = document.getElementById("equals").addEventListener("click", () => {
    let result = memory.operator(parseFloat(memory.operand1), parseFloat(memory.operand2));
    display.innerHTML = "";
    display.innerHTML = result;
    memory.operand1 = result.toString();
    memory.operand2 = "";
})
const pointButton = document.getElementById("point").addEventListener("click", () => {
    const point = ".";
    if(!memory.operator) {
        if(memory.operand1.length >= MAX_DISPLAY_SIZE) {
            return
        }
        memory.operand1 += point;
        display.innerHTML = memory.operand1;
    } else {
        if(memory.operand2.length >= MAX_DISPLAY_SIZE) {
            return
        }
        memory.operand2 += point;
        display.innerHTML = memory.operand2;
    }
})
function calcSum(a, b) {
    return a + b;
}
function calcMultiply(a, b) {
    return a * b;
}
function calcSubtract(a, b) {
    return a - b;
}
function calcDivide(a, b) {
    return a / b;
}
const memory = {
    operand1: "",
    operand2: "",
    operator: null
}   
let input = "";
calcNumbers.forEach((button) => {
    button.addEventListener("click", () => {
        if(!memory.operator) {
            if(memory.operand1.length >= MAX_DISPLAY_SIZE) {
                return
            }
            memory.operand1 += button.id;
            display.innerHTML = memory.operand1;
        } else {
            if(memory.operand2.length >= MAX_DISPLAY_SIZE) {
                return
            }
            memory.operand2 += button.id;
            display.innerHTML = memory.operand2;
        }
    })
})