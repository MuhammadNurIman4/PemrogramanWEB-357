const screen = document.getElementById('screen');
let currentInput = '0';
let previousInput = '';
let operator = '';
let shouldResetScreen = false;

function updateScreen(value) {
    screen.value = value;
}

function resetScreen() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    updateScreen(currentInput);
    shouldResetScreen = false;
}

function inputNumber(value) {
    if (shouldResetScreen) {
        currentInput = value;
        shouldResetScreen = false;
    } else {
        if (currentInput === '0' && value !== '.') {
            currentInput = value; // Replace '0' with the new number
        } else {
            currentInput += value; // Append the new number
        }
    }
    updateScreen(currentInput);
}

function setOperator(op) {
    if (operator !== '') calculate(); // Calculate if there's an existing operator
    previousInput = currentInput; // Save the current input
    operator = op; // Set the new operator
    currentInput = ''; // Reset current input
    shouldResetScreen = false;

    // Update the screen to show the current operation
    updateScreen(previousInput + ' ' + operator);
}

function calculate() {
    if (operator === '' || currentInput === '') return; // Ensure valid inputs

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        case '%':
            // For percentages: calculate the percentage of the last number entered
            result = (prev * current) / 100; 
            break;
        case '^':
            result = Math.pow(prev, current);
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateScreen(currentInput); // Display the final result
    shouldResetScreen = true;
}

function clearAll() {
    resetScreen();
}

document.querySelectorAll('.calculator-keys button').forEach(button => {
    button.addEventListener('click', (event) => {
        const value = event.target.value;

        if (value === 'clear') {
            clearAll();
        } else if (['+', '-', '*', '/', '%', '^'].includes(value)) {
            setOperator(value);
        } else if (value === '=') {
            calculate();
        } else {
            inputNumber(value);
        }
    });
});

resetScreen();
