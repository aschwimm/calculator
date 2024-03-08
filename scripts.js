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
const equalsButton = document.getElementById("equals").addEventListener("click", () => {
    let result = memory.operator(parseFloat(memory.operand1), parseFloat(memory.operand2));
    display.innerHTML = result;
    memory.operand1 = result.toString();
    memory.operand2 = "";
    


})
function calcSum(a, b) {
    return a + b;
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
            memory.operand1 += button.id;
            display.innerHTML = memory.operand1;
        } else {
            memory.operand2 += button.id;
            display.innerHTML = memory.operand2;
        }
    })
})