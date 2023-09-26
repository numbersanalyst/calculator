const currentNumber = document.querySelector('.currentNumber');

const previousNumber = document.querySelector('.previousNumber p');

const mathSign = document.querySelector('.mathSign');

const numbersButtons = document.querySelectorAll('.number');

const operatorsButtons = document.querySelectorAll('.operator');

const equalsButton = document.querySelector('.equals');

const clearButton = document.querySelector('.clear');

const calculatorHistory = document.querySelector('.history');

const historyButton = document.querySelector('.history-btn');


let result = '';


function displayNumbers() {
    if (this.textContent === '.' && currentNumber.textContent.includes('.')) return;
    if (this.textContent === '.' && currentNumber.textContent === '') return currentNumber.textContent = '.0';

    currentNumber.textContent += this.textContent;
}


function operate() {
    if (currentNumber.textContent === '' && this.textContent === '-') {
        currentNumber.textContent = '-';
        return;
    }

    else if (currentNumber.textContent === '') {
        return;
    }

    if (mathSign.textContent !== '') { showResult(); }

    previousNumber.textContent = currentNumber.textContent;
    mathSign.textContent = this.textContent;
    currentNumber.textContent = '';
}

function showResult() {
    if (previousNumber.textContent === '' || currentNumber.textContent === '') return;

    let a = Number(currentNumber.textContent);
    let b = Number(previousNumber.textContent);
    let operator = mathSign.textContent;

    switch (operator) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = b - a;
            break;
        case 'x':
            result = a * b;
            break;
        case ':':
            result = b / a;
            break;
        case '2^':
            result = b ** a;
            break;
    }

    addToHistory();
    historyButton.classList.add('active');
    currentNumber.textContent = result;
    previousNumber.textContent = '';
    mathSign.textContent = '';
}

function addToHistory() {
    const newHistoryItem = document.createElement('li');
    newHistoryItem.textContent = `${currentNumber.textContent} ${mathSign.textContent} ${previousNumber.textContent} = ${result}`;
    newHistoryItem.classList.add('history-item');

    calculatorHistory.appendChild(newHistoryItem);
}

function clearScreen() {
    result = '';
    currentNumber.textContent = '';
    previousNumber.textContent = '';
    mathSign.textContent = '';
}

function clearHistory() {
    calculatorHistory.textContent = '';
    historyButton.classList.remove('active');
}


// Buttons listeners

operatorsButtons.forEach((button) => button.addEventListener('click', operate));

equalsButton.addEventListener('click', showResult);

clearButton.addEventListener('click', clearScreen);

numbersButtons.forEach((button) => {
    button.addEventListener('click', displayNumbers)
});

historyButton.addEventListener('click', clearHistory)