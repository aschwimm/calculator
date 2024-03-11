const MAX_DISPLAY_SIZE = 10;
const TO_PERCENT = 100;
function toPercent(param) {
    param = param.toString();
    if (param.includes("e-")) {
        const index = param.indexOf("e-") + 2;
        const numberAfterE = parseInt(param.substring(index));
        const newNumber = numberAfterE + 2;
        param = param.substring(0, index) + newNumber + param.substring(index + numberAfterE.toString().length);
        param = parseFloat(param);
        return param;
    }
    param = parseFloat(param);
    param /= 100;
    param = Math.round(param * 1000000000000) / 1000000000000;
    return param;
}

const calcNumbers = Array.from(document.querySelectorAll(".calc-button")).filter((element) => {
    if(!isNaN(element.id)) {
        return element;
    }
})
const display = document.getElementById("display");

const clearButton = document.getElementById("clear").addEventListener("click", () => {
    memory.operand1 = "0";
    memory.operand2 = "";
    display.innerHTML = "0";
    memory.operator = null;
})
const operatorButtons = Array.from(document.querySelectorAll(".operator-button"));
const sumButton = document.getElementById("sum");
sumButton.addEventListener("click", () => {
    memory.operator = calcSum;
    operatorButtons.forEach((element) => {
        element.classList.remove("operator-clicked-on");
    })
    sumButton.classList.add("operator-clicked-on");
})

const multiplyButton = document.getElementById("multiply");
multiplyButton.addEventListener("click", () => {
    memory.operator = calcMultiply;
    operatorButtons.forEach((element) => {
        element.classList.remove("operator-clicked-on");
    })
    multiplyButton.classList.add("operator-clicked-on");
})
const subtractButton = document.getElementById("subtract");
subtractButton.addEventListener("click", () => {
    memory.operator = calcSubtract;
    operatorButtons.forEach((element) => {
        element.classList.remove("operator-clicked-on");
    })
    subtractButton.classList.add("operator-clicked-on");
})
const divideButton = document.getElementById("divide");
divideButton.addEventListener("click", () => {
    memory.operator = calcDivide;
    operatorButtons.forEach((element) => {
        element.classList.remove("operator-clicked-on");
    })
    divideButton.classList.add("operator-clicked-on");
})
const equalsButton = document.getElementById("equals");
equalsButton.addEventListener("click", () => {
    if(memory.operand2 === "") {
        return;
    }
    let result = memory.operator(parseFloat(memory.operand1), parseFloat(memory.operand2));
    if (result > 100000000) {
        result = result.toExponential(2);
    } else if (result.toString().includes(".") && result.toString().split(".")[1].length > 8) {
        result = parseFloat(result.toFixed(8));
    }
    
    display.innerHTML = result;
    memory.operand1 = result.toString();
    memory.operand2 = "";
    operatorButtons.forEach((element) => {
        element.classList.remove("operator-clicked-on");
    })
});
const pointButton = document.getElementById("point").addEventListener("click", () => {
    const point = ".";
    if(!memory.operator) {
        if(memory.operand1.length >= MAX_DISPLAY_SIZE + 1) {
            return
        }
        else if (memory.operand1.includes(point)) {
            return;
        }
        memory.operand1 += point;
        display.innerHTML = memory.operand1;
    } else {
        if(memory.operand2.length >= MAX_DISPLAY_SIZE + 1) {
            return
        }
        else if (memory.operand2.includes(point)) {
            return;
        }
        memory.operand2 += point;
        display.innerHTML = memory.operand2;
    }
})
const percentButton = document.getElementById("percent").addEventListener("click", () => {
    if(!memory.operator || memory.operand2 === "") {
        if(memory.operand1.length >= MAX_DISPLAY_SIZE + 1) {
            return
        }
        memory.operand1 = toPercent(memory.operand1);
        display.innerHTML = memory.operand1;
    } else {
        if(memory.operand2.length >= MAX_DISPLAY_SIZE) {
            return
        }
        memory.operand2 = toPercent(memory.operand2);
        display.innerHTML = memory.operand2;
    }
})
const toggleNumberSignButton = document.getElementById("plus-minus").addEventListener("click", () => {
    let result;
    if(!memory.operator || memory.operand2 === "") {
        if(memory.operand1.length >= MAX_DISPLAY_SIZE) {
            return
        }
        result = parseFloat(memory.operand1);
        result *= -1;
        memory.operand1 = result.toString();
        display.innerHTML = memory.operand1;
    } 
    else {
        if(memory.operand2.length >= MAX_DISPLAY_SIZE) {
            return
        }
        result = parseFloat(memory.operand2);
        result *= -1;
        memory.operand2 = result.toString();
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
    operand1: "0",
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
            else if(memory.operand1 === "0") {
                memory.operand1 = "";
            }
            const operandValue = String(memory.operand1);
            console.log(typeof(operandValue));
            if (operandValue.includes("e-")) {
                return;
            }
            memory.operand1.toString();
            memory.operand1 += button.id;
            display.innerHTML = memory.operand1;
        } else {
            if(memory.operand2.length >= MAX_DISPLAY_SIZE) {
                return
            }
            memory.operand2.toString();
            memory.operand2 += button.id;
            display.innerHTML = memory.operand2;
        }
    })
})