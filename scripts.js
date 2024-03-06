function operate(operand1, operand2, operatorFunction) {
    return operatorFunction(operand1, operand2);
}
function sum(operand1, operand2) {
    return operand1 + operand2;
}
function subtract(operand1, operand2) {
    return operand1 - operand2;
}
function multiply(operand1, operand2) {
    return operand1 * operand2;
}
function divide(operand1, operand2) {
    return operand1 / operand2;
}

let elements = {}; // Declare elements variable outside the event listener callback function
document.addEventListener("DOMContentLoaded", () => {
    const gatherIds = (element) => {
        let buttons = Array.from(document.querySelectorAll(".calc-button"));
        buttons.forEach((button) => {
            element[button.id] = button.innerHTML;
        })
    }
    gatherIds(elements);
}); 

