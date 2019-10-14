// Features to add:
// - set display length character limit for displayCurrent
// - displayHistory should show latest history when overflow
// 
// All working, but code is complicated/hard to read. For refactor:
// - should not use eval(), replace with if/switch statement that points to different functions for each operator (or dispatch table - a data structure that holds functions)
// - start by writing the calculation functions
// - rewrite numberClicked function (maybe with switch statement and regex?)
// - use "let lastButtonClicked" (e.g. can check if user clicks another operator and will replace selectedOperator, and no need to check for "=" in displayHistory.innerHTML)


let displayHistory = document.getElementById("displayHistory");
let displayCurrent = document.getElementById("displayCurrent");
let numberButtonArea = document.getElementById("numberButtonArea");
let operatorArea = document.getElementById("operatorArea");
let equalsButton = document.getElementById("equalsButton");
let clearButton = document.getElementById("clearButton");

let valueCurrent = "0";
let valueOne = "";
let valueTwo = "";
let valueCalculated = 0;
let selectedOperator = "";
let lastSelectedOperator = "";
let operatorActive = false;

numberButtonArea.addEventListener("click", numberClicked);
operatorArea.addEventListener("click", operatorClicked);
equalsButton.addEventListener("click", equalsClicked);
clearButton.addEventListener("click", clear);

function clear() {
    valueCurrent = "0";
    valueOne = "";
    valueTwo = "";
    valueCalculated = 0;
    selectedOperator = "";
    lastSelectedOperator = "";
    displayHistory.innerHTML = "";
    displayCurrent.innerHTML = valueCurrent;
}

function numberClicked(event) {
    if (displayHistory.innerHTML.charAt(displayHistory.innerHTML.length-1) === "=") {
        clear();
    }
    // IF statement checks whether clicked element was a button (not blank space)
    if (event.target.className.includes("numberButton")) {
        // IF statement checks if decimal already exists - is there a built-in method/function to check if a valid number? Use parseFloat?
        if (event.target.innerHTML === "." && valueCurrent.includes(".")) {
            // do nothing
        } else if (event.target.innerHTML === "0" && valueCurrent.charAt(0) === "0" && valueCurrent.charAt(1) !== ".") {
            displayCurrent.innerHTML = valueCurrent;
        } else if (event.target.innerHTML === "." && valueCurrent.charAt(0) === "0" && valueCurrent.length < 9) {
            valueCurrent += event.target.innerHTML; // these two lines are repeated x 3, put into separate function?
            displayCurrent.innerHTML = valueCurrent;
        } else if (valueCurrent.charAt(0) === "0" && valueCurrent.charAt(1) !== "." && valueCurrent.length < 9) {
            valueCurrent = event.target.innerHTML;
            displayCurrent.innerHTML = valueCurrent;
        } else if (valueCurrent.length < 9) {
            valueCurrent += event.target.innerHTML;
            displayCurrent.innerHTML = valueCurrent;
        }
    }
    valueOne = parseFloat(valueCurrent);
    operatorActive = false;
}

function calculateValue(operator) {
    valueCalculated = eval(valueTwo + operator + valueOne);
    displayCurrent.innerHTML = valueCalculated;
    valueTwo = valueCalculated;
}

function equalsClicked() {
    if (valueOne !== "" && valueOne !== 0 && valueTwo !== "") {
        calculateValue(selectedOperator);
        lastSelectedOperator = selectedOperator;
        displayHistory.innerHTML += (" " + valueCurrent + " =");
        valueOne = "";
        valueCurrent = "0";
    }
}

function operatorClicked(event) {
    if (event.target.className.includes("operatorButton")) {
        lastSelectedOperator = selectedOperator;
        selectedOperator = event.target.innerHTML;
        if (valueTwo === "" && valueCurrent !== "0") {
            displayHistory.innerHTML += (displayCurrent.innerHTML + " " + selectedOperator);
            valueCurrent = "0";
            displayCurrent.innerHTML = valueCurrent;
            operatorActive = true;
            valueTwo = valueOne;
            valueOne = "";
        } else if(valueTwo !== "") {
            if (displayHistory.innerHTML.charAt(displayHistory.innerHTML.length-1) === "=") {
                displayHistory.innerHTML = displayHistory.innerHTML.slice(0, displayHistory.innerHTML.length-2);
                displayHistory.innerHTML += " " + valueOne + " " + selectedOperator;
                operatorActive = true;
            } else if (operatorActive && (displayHistory.innerHTML.charAt(displayHistory.innerHTML.length-1) === "+" || "-" || "*" || "/")) {
                displayHistory.innerHTML = displayHistory.innerHTML.slice(0, displayHistory.innerHTML.length-2);
                displayHistory.innerHTML += " " + selectedOperator;
            }
            else if (valueCurrent !== "0") {
                calculateValue(lastSelectedOperator);
                valueCurrent = "0";
                displayHistory.innerHTML += " " + valueOne + " " + selectedOperator;
                operatorActive = false;
            }
        }
    }
}