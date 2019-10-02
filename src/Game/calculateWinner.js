function checkWinnerOnRow(squares, index) {
    const listIndex = [];
    const currentRow = Math.floor(index / 20);
    let iBehind = index - 1;
    let iBefore = index + 1;
    let countLoop = 0;
    while (countLoop < 5) {
        if (Math.floor(iBehind / 20) === currentRow && squares[index] === squares[iBehind]) {
            listIndex.push(iBehind);
            iBehind -= 1;
        }
        if (Math.floor(iBefore / 20) === currentRow && squares[index] === squares[iBefore]) {
            listIndex.push(iBefore);
            iBefore += 1;
        }
        if (countLoop === 4) {
            let temp = 0;
            if ((Math.floor(iBehind / 20) !== currentRow || (squares[index] !== squares[iBehind] && squares[iBehind] !== null))) {
                temp += 1;
            }
            if ((Math.floor(iBefore / 20) !== currentRow || (squares[index] !== squares[iBefore] && squares[iBefore] !== null))) {
                temp += 1;
            }
            if (temp === 2) {
                listIndex.pop();
            }
        }
        countLoop += 1;
    }
    listIndex.push(index);
    return listIndex.length === 5 ? listIndex : null;
}

function checkWinnerOnColumn(squares, index) {
    const listIndex = [];
    let iBehind = index - 20;
    let iBefore = index + 20;
    let countLoop = 0;
    while (countLoop < 5) {
        if (iBehind >= 0 && squares[index] === squares[iBehind]) {
            listIndex.push(iBehind);
            iBehind -= 20;
        }
        if (iBefore < 400 && squares[index] === squares[iBefore]) {
            listIndex.push(iBefore);
            iBefore += 20;
        }
        if (countLoop === 4) {
            let temp = 0;
            if (iBehind < 0 || (squares[index] !== squares[iBehind] && squares[iBehind] !== null)) {
                temp += 1;
            }
            if (iBefore >= 400 || (squares[index] !== squares[iBefore] && squares[iBefore] !== null)) {
                temp += 1;
            }
            if (temp === 2) {
                listIndex.pop();
            }
        }
        countLoop += 1;
    }
    listIndex.push(index);
    return listIndex.length === 5 ? listIndex : null;
}

function checkWinnerOnMainDiagonal(squares, index) {
    const listIndex = [];
    const currRow = Math.floor(index / 20);
    let iBehind = index - 21;
    let rowBehind = 1;
    let iBefore = index + 21;
    let rowBefore = 1;
    let countLoop = 0;
    while (countLoop < 5) {
        if ((Math.floor(iBehind / 20) === currRow - rowBehind) && squares[index] === squares[iBehind]) {
            listIndex.push(iBehind);
            iBehind -= 21;
            rowBehind += 1;
        }
        if ((Math.floor(iBefore / 20) === currRow + rowBefore) && squares[index] === squares[iBefore]) {
            listIndex.push(iBefore);
            iBefore += 21;
            rowBefore += 1;
        }
        if(countLoop === 4){
            let temp = 0;
            if ((Math.floor(iBehind / 20) !== currRow - rowBehind) || (squares[index] !== squares[iBehind] && squares[iBehind] !== null)) {
                temp += 1;
            }
            if ((Math.floor(iBefore / 20) !== currRow + rowBefore) || (squares[index] !== squares[iBefore] && squares[iBefore] !== null)) {
                temp += 1;
            }
            if(temp === 2){
                listIndex.pop();
            }
        }
        countLoop += 1;
    }
    listIndex.push(index);
    return listIndex.length === 5 ? listIndex : null;
}
function checkWinnerOnMinorDiagonal(squares, index) {
    const listIndex = [];
    const currRow = Math.floor(index / 20);
    let iBehind = index - 19;
    let rowBehind = 1;
    let iBefore = index + 19;
    let rowBefore = 1;
    let countLoop = 0;
    while (countLoop < 5) {
        if ((Math.floor(iBehind / 20) === currRow - rowBehind) && squares[index] === squares[iBehind]) {
            listIndex.push(iBehind);
            iBehind -= 19;
            rowBehind += 1;
        }
        if ((Math.floor(iBefore / 20) === currRow + rowBefore ) && squares[index] === squares[iBefore]) {
            listIndex.push(iBefore);
            iBefore += 19;
            rowBefore += 1;
        }
        if(countLoop === 4){
            let temp = 0;
            if ((Math.floor(iBehind / 20) !== currRow - rowBehind) || (squares[index] !== squares[iBehind] && squares[iBehind] !== null)) {
                temp += 1;
            }
            if ((Math.floor(iBefore / 20) !== currRow + rowBefore) || (squares[index] !== squares[iBefore] && squares[iBefore] !== null)) {
                temp += 1;
            }
            if(temp === 2){
                listIndex.pop();
            }
        }
        countLoop += 1;
    }
    listIndex.push(index);
    return listIndex.length === 5 ? listIndex : null;
}


function calculateWinner(squares, index) {
    let listIndex = checkWinnerOnRow(squares, index);
    if (listIndex) {
        return listIndex;
    }
    listIndex = checkWinnerOnColumn(squares, index);
    if (listIndex) {
        return listIndex;
    }
    listIndex = checkWinnerOnMainDiagonal(squares, index);
    if (listIndex) {
        return listIndex;
    }
    listIndex = checkWinnerOnMinorDiagonal(squares, index);
    if (listIndex) {
        return listIndex;
    }
    return null;
}
export default calculateWinner;