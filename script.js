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

numberButtonArea.addEventListener("click", numberClicked);
operatorArea.addEventListener("click", operatorClicked);
equalsButton.addEventListener("click", equalsClicked);
clearButton.addEventListener("click", clear);

function clear() {
    valueCurrent = "0";
    valueCalculated = 0;
    displayHistory.innerHTML = "";
    displayCurrent.innerHTML = valueCurrent;
}

function numberClicked(event) {
// this whole function is ugly, rewrite it (maybe with switch statement and regex?)
    if (displayHistory.innerHTML.charAt(displayHistory.innerHTML.length-1) === "=") {
        clear();
    }
    // IF statement checks whether clicked element was a button (not blank space)
    if (event.target.className === "numberButton") {
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
}

function calculateValue(selectedOperator) {
    // I need to make this calculate...
    valueCalculated = eval(valueTwo + selectedOperator + valueOne);
    displayCurrent.innerHTML = valueCalculated;
    valueTwo = valueCalculated;
}

function operatorClicked(event) {
    if (displayHistory.innerHTML.charAt(displayHistory.innerHTML.length-1) === "=") {
        displayHistory.innerHTML = displayHistory.innerHTML.slice(0, displayHistory.innerHTML.length-2);
    }
    selectedOperator = event.target.innerHTML;
    if (event.target.className === "operatorButton" && valueCurrent !== "0") {
        if (valueTwo === "") {
            displayHistory.innerHTML += (displayCurrent.innerHTML + " " + selectedOperator);
            valueCurrent = "0";
            displayCurrent.innerHTML = valueCurrent;
            valueTwo = valueOne;
            valueOne = "";
        } else if (valueTwo !== "") {
            displayHistory.innerHTML += " " + valueOne + " " + selectedOperator;
            calculateValue(selectedOperator);
            valueCurrent = "0";
        }
    }
}

function equalsClicked() {
    if (valueOne !== "" && valueTwo !== "") {
        lastSelectedOperator = selectedOperator;
        calculateValue(selectedOperator);
        displayHistory.innerHTML += (" " + valueCurrent + " =");
        valueOne = "";
    }
}


// if/switch statement that points to different functions for + - * /
// dispatch table - a data structure that holds functions








