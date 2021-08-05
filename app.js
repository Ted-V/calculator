// Track values used in each expression
const calculator = {
    displayValue: '0',
    firstValue: null,
    waitingOnSecondValue: false,
    operator: null,
};

// Get value from number keys
function inputNumber(number) {
    const { displayValue, waitingOnSecondValue } = calculator;

    if (waitingOnSecondValue === true) {
        calculator.displayValue = number;
        calculator.waitingOnSecondValue = false;
    } else {
        // If display value is zero, overwrite it with number, else append number
        calculator.displayValue = displayValue === '0' ? number : displayValue + number;
    }
}
// Append decimal
function inputDecimal(decimal) {
    // Allow for a decimal to be added to the second value of an expression
    if(calculator.waitingOnSecondValue === true) {
        calculator.displayValue = '0.';
        calculator.waitingOnSecondValue = false;
        return
    }

    // Only add a decimal if there already isn't one 
    if (!calculator.displayValue.includes(decimal)) {
        calculator.displayValue += decimal;
    }
}

function handleOperator(nextOperator) {
    // Destructure the calculator object's properties
    const { firstValue, displayValue, operator } = calculator
    // Convert display value to float
    const inputValue = parseFloat(displayValue);

    // Check for existing operator, replace that operator
    if (operator && calculator.waitingOnSecondValue) {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }
    if (firstValue === null && !isNaN(inputValue)) {
        // Store input into firstValue
        calculator.firstValue = inputValue;
    } else if (operator) {
        const result = evaluate(firstValue, inputValue, operator);
        // Store calculation result in display and set it to the first value
        calculator.displayValue = String(result);
        calculator.firstValue = result;
    }

    // Now, the next number entered by the user will be used as the second value in the expression
    calculator.waitingOnSecondValue = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}

// Determine how to evaluate an expression
function evaluate(firstValue, secondValue, operator) {
    if (operator === '+') {
        return firstValue + secondValue;
    } else if (operator === '-') {
        return firstValue - secondValue;
    } else if (operator === '*') {
        return firstValue * secondValue;
    } else if (operator === '/') {
        return firstValue / secondValue;
    }
    // If the operator is '=', return the second value as is 
    return secondValue;
}

// Clear calculator aka reset to default state
function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstValue = null;
    calculator.waitingOnSecondValue = false;
    calculator.operator = null;
    console.log(calculator);
}

// Get calculator display and update its value
function updateDisplay() {
    const display = document.querySelector('.calculator-display');
    display.value = calculator.displayValue;
};

updateDisplay();

// Get calculator keys and add event listeners to each
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (e) => {
    const { target } = e;
    // Exit function if the target is not a button
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('all-clear')) {
        resetCalculator();
        updateDisplay();
        return;
    }

    inputNumber(target.value);
    updateDisplay();
});

