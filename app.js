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
    // If display value is zero, overwrite it with number, else append number
    calculator.displayValue = displayValue === '0' ? number : displayValue + number;
}
// Append decimal
function inputDecimal(decimal) {
    // Only add a decimal if there already isn't one 
    if (!calculator.displayValue.includes(decimal)) {
        calculator.displayValue += decimal;
    }
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
        console.log('operator', target.value);
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

