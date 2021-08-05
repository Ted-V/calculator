// Track values used in each expression
const calculator = {
    displayValue: '0',
    firstValue: null,
    waitingOnSecondValue: false,
    operator: null,
};

// Get calculator display and update its value
function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
};

// Get calculator keys and add event listeners to each
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (e) => {
    const { target } = e;
    // Exit function if the target is not a button
    if (!target.matches('button')) {
        return;
    };

    if (target.classList.contains('operator')) {
        console.log('operator', target.value);
        return;
    }

    if (target.classList.contains('decimal')) {
        console.log('decimal', target.value);
        return;
    }

    if (target.classList.contains('all-clear')) {
        console.log('clear', target.value);
        return;
    }

    console.log('number', target.value);
});

