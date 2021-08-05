// Track values used in each expression
const calculator = {
    displayValue: '0',
    firstValue: null,
    waitingOnSecondValue: false,
    operator: null,
};

// Get value from number keys
function inputNumber(number) {
    const { displayValue } = calculator;
    
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

    if (firstValue === null && !isNaN(inputValue)) {
        // Store input into firstValue
        calculator.firstValue = inputValue;
    }

    // Now, the next number entered by the user will be used as the second value in the expression
    calculator.waitingOnSecondValue = true;
    calculator.operator = nextOperator;
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
        console.log('clear', target.value);
        return;
    }

    inputNumber(target.value);
    updateDisplay();
});

