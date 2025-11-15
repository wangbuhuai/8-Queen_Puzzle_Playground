// Created by Dayu Wang (dwang@stchas.edu) on 2025-11-13

// Last updated by Dayu Wang (dwang@stchas.edu) on 2025-11-15


/** Returns the dimension of the chessboard from user input. */
const getDimension = () => {
    try {
        const n = parseInt(document.getElementById('n').value);
        if (n >= 4 && n <= 10) { return n; }
        document.getElementById('n').value = 8;
        return 8;
    } catch (_) {
        document.getElementById('n').value = 8;
        return 8;
    }
};

/** Generates a blank chessboard. */
const loadChessboard = () => {
    const chessboard = document.getElementById('chessboard');
    chessboard.innerHTML += String.raw`<div class='topleft'>&nbsp;</div>`;
    for (let col = 0; col < getDimension(); col++) {
        chessboard.innerHTML += `<div class='colIndex'>${col}</div>`;
    }
    chessboard.innerHTML += String.raw`<br>`;
    for (let row = 0; row < getDimension(); row++) {
        chessboard.innerHTML += `<div class='rowIndex'>${row}</div>`;
        for (let col = 0; col < getDimension(); col++) {
            chessboard.innerHTML += `<button id=${(row + col) % 2 === 0 ? `white-${row}${col}` : `gray-${row}${col}`}>&nbsp;</button>`;
        }
        chessboard.innerHTML += String.raw`<br>`;
    }
};

/** Adds a queen on a button by clicking it. */
const addQueen = () => {
    document.querySelectorAll('button[id|=white], button[id|=gray]').forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent.trim().length === 0) { button.innerHTML = String.raw`&#9819`; }
            else { button.innerHTML = String.raw`&nbsp;`; }
            for (let row = 0; row < getDimension(); row++) {
                for (let col = 0; col < getDimension(); col++) {
                    const b = getButton(row, col);
                    if (b.textContent.trim().length === 0) { continue; }
                    b.innerHTML = String.raw`&nbsp;`;
                    if (isValid(b)) { b.style.color = 'black'; }
                    else { b.style.color = 'red'; }
                    b.innerHTML = String.raw`&#9819`;
                }
            }
            let numOfValidQueens = 0;
            for (let row = 0; row < getDimension(); row++) {
                for (let col = 0; col < getDimension(); col++) {
                    const b = getButton(row, col);
                    if (b.textContent.trim().length !== 0 && b.style.color === 'black') { numOfValidQueens++; }
                }
            }
            if (numOfValidQueens === getDimension()) {
                document.getElementById('solution-found').style.display = 'block';
            } else {
                document.getElementById('solution-found').style.display = 'none';
            }
        });
    });
};

/** Returns the row index of a button.
    @param button {HTMLButtonElement}: The input button element
    @returns {number}: The row index of the button
*/
const getRowIndex = (button) => {
    const id = button.getAttribute('id');
    return parseInt(id.charAt(id.length - 2));
}

/** Returns the column index of a button.
    @param button {HTMLButtonElement}: The input button element
    @returns {number}: The column index of the button
*/
const getColIndex = (button) => {
    const id = button.getAttribute('id');
    return parseInt(id.charAt(id.length - 1));
};

/** Returns the button element with specified row index and column index.
    @param row {number}: The row index of the button
    @param col {number}: The column index of the button
    @returns {HTMLButtonElement}: The button element with the row index and column index
*/
const getButton = (row, col) => {
    return document.getElementById(`${(row + col) % 2 === 0 ? 'white' : 'gray'}-${row}${col}`);
};

/** Tests whether adding a queen on a button is valid.
    @param button {HTMLButtonElement}: The button element to add a queen
    @returns {boolean}: {true} if adding a queen is valid, {false} otherwise
*/
const isValid = (button) => {
    const row = getRowIndex(button);
    const col = getColIndex(button);

    // If there is a queen in the same row, it is invalid.
    for (let j = 0; j < getDimension(); j++) {
        const button = getButton(row, j);
        if (button.textContent.trim().length !== 0) { return false; }
    }

    // If there is a queen in the same column, it is invalid.
    for (let i = 0; i < getDimension(); i++) {
        const button = getButton(i, col);
        if (button.textContent.trim().length !== 0) { return false; }
    }

    // If there is a queen in diagonal directions, it is invalid.
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        const button = getButton(i, j);
        if (button.textContent.trim().length !== 0) { return false; }
    }
    for (let i = row, j = col; i >= 0 && j < getDimension(); i--, j++) {
        const button = getButton(i, j);
        if (button.textContent.trim().length !== 0) { return false; }
    }
    for (let i = row, j = col; i < getDimension() && j < getDimension(); i++, j++) {
        const button = getButton(i, j);
        if (button.textContent.trim().length !== 0) { return false; }
    }
    for (let i = row, j = col; i < getDimension() && j >= 0; i++, j--) {
        const button = getButton(i, j);
        if (button.textContent.trim().length !== 0) { return false; }
    }
    return true;
};

/** Changes the dimension of the chessboard. */
const changeDimension = () => {
    document.getElementById('n').addEventListener('change', () => {
        document.getElementById('chessboard').innerHTML = '';
        loadChessboard();
        addQueen();
        updateN();
        document.getElementById('solution-found').style.display = 'none';
    });
};

/** Updates the N-value shown in the webpage. */
const updateN = () => {
    const ns = document.getElementsByClassName('queen-number');
    for (let i = 0; i < ns.length; i++) {
        ns.item(i).textContent = `${getDimension()}`;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    loadChessboard();
    addQueen();
    updateN();
    changeDimension();
});