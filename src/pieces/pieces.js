//logic that the pieces need to share 

//drag pieces to move them
Object.prototype.dragging = function (x, y) {
    this.x = y - this.size / 2
    this.y = x - this.size / 2
}

//update new position
Object.prototype.update = function (y, x) {
    this.x = this.tileSize * x
    this.y = this.tileSize * y
}

//show img
Object.prototype.show = function () {
    image(this.img, this.x, this.y, this.size, this.size)
}

//check if piece would capture own color
function wouldCaptureOwnPiece(pieces, oldRow, oldColumn, newRow, newColumn) {
    if (pieces[newRow][newColumn].color == pieces[oldRow][oldColumn].color) {
        return true
    } else {
        return false
    }
}


// Check if there are pieces in the way
// check horizontals
function checkStraightRoadblocks(pieces, possibleMoves, oldRow, oldColumn) {
    let possibleMovesArray = [...possibleMoves]
    //check down
    if (checkRoadblockDown(pieces, oldRow, oldColumn)) {
        let roadBlockDown = checkRoadblockDown(pieces, oldRow, oldColumn)
        possibleMovesArray = filterRoadBlockDown(possibleMovesArray, roadBlockDown)
    }

    //check up
    if (checkRoadblockUp(pieces, oldRow, oldColumn)) {
        let roadBlockUp = checkRoadblockUp(pieces, oldRow, oldColumn)
        possibleMovesArray = filterRoadBlockUp(possibleMovesArray, roadBlockUp)
    }

    //check right
    if (checkRoadblockRight(pieces, oldRow, oldColumn)) {
        let roadBlockRight = checkRoadblockRight(pieces, oldRow, oldColumn)
        possibleMovesArray = filterRoadBlockRight(possibleMovesArray, roadBlockRight)
    }
    // filter every move that goes further

    //check left
    if (checkRoadblockLeft(pieces, oldRow, oldColumn)) {
        let roadBlockLeft = checkRoadblockLeft(pieces, oldRow, oldColumn)
        possibleMovesArray = filterRoadBlockLeft(possibleMovesArray, roadBlockLeft)
    }

    return possibleMovesArray
}

function checkDiagonalRoadblocks(pieces, possibleMoves, oldRow, oldColumn) {
    let possibleMovesArray = [...possibleMoves]

    if (checkRoadblockDiagonalUpRight(pieces, oldRow, oldColumn)) {
        let roadBlock = checkRoadblockDiagonalUpRight(pieces, oldRow, oldColumn)
        possibleMovesArray = filterRoadBlockUpRight(possibleMovesArray, roadBlock, oldRow, oldColumn)
    }

    if (checkRoadblockDiagonalUpLeft(pieces, oldRow, oldColumn)) {
        let roadBlock = checkRoadblockDiagonalUpLeft(pieces, oldRow, oldColumn)
        possibleMovesArray = filterRoadBlockUpLeft(possibleMovesArray, roadBlock, oldRow, oldColumn)
    }

    if (checkRoadblockDiagonalDownRight(pieces, oldRow, oldColumn)) {
        let roadBlock = checkRoadblockDiagonalDownRight(pieces, oldRow, oldColumn)
        possibleMovesArray = filterRoadBlockDownRight(possibleMovesArray, roadBlock, oldRow, oldColumn)
    }

    if (checkRoadblockDiagonalDownLeft(pieces, oldRow, oldColumn)) {
        let roadBlock = checkRoadblockDiagonalDownLeft(pieces, oldRow, oldColumn)
        possibleMovesArray = filterRoadBlockDownLeft(possibleMovesArray, roadBlock, oldRow, oldColumn)
    }

    return possibleMovesArray
}


// VERTICALS 
//check down
function checkRoadblockDown(pieces, oldRow, oldColumn) {
    for (let i = oldRow + 1; i < rows; i++) {
        if (typeof pieces[i][oldColumn] == 'object') {
            return [i, oldColumn]
        }
    }
}

//check up
function checkRoadblockUp(pieces, oldRow, oldColumn) {
    for (let i = (oldRow - 1); i >= 0; i--) {
        if (typeof pieces[i][oldColumn] == 'object') {
            return [i, oldColumn]
        }
    }
}

// HORIZONTALS
//check right
function checkRoadblockRight(pieces, oldRow, oldColumn) {
    for (let i = (oldColumn + 1); i < rows; i++) {
        if (typeof pieces[oldRow][i] == 'object') {
            return [oldRow, i]
        }
    }
}

//check left
function checkRoadblockLeft(pieces, oldRow, oldColumn) {
    for (let i = (oldColumn - 1); i >= 0; i--) {
        if (typeof pieces[oldRow][i] == 'object') {
            return [oldRow, i]
        }
    }
}

// DIAGONALS
//check down right
function checkRoadblockDiagonalDownRight(pieces, oldRow, oldColumn) {
    console.log(oldRow, oldColumn)
    for (let i = 1; i < rows; i++) {
        if (oldRow + i < 8 && oldColumn + i < 8)
            if (typeof pieces[oldRow + i][oldColumn + i] == 'object') {
                return [oldRow + i, oldColumn + i]
            }
    }
}
//check down left
function checkRoadblockDiagonalDownLeft(pieces, oldRow, oldColumn) {
    for (let i = 1; i < rows; i++) {
        if (oldRow + i < 8 && oldColumn - i >= 0)
            if (typeof pieces[oldRow + i][oldColumn - i] == 'object') {
                return [oldRow + i, oldColumn - i]
            }
    }
}
//check up right
function checkRoadblockDiagonalUpRight(pieces, oldRow, oldColumn) {
    for (let i = 1; i < rows; i++) {
        if (oldRow - i >= 0 && oldColumn + i < 8)
            if (typeof pieces[oldRow - i][oldColumn + i] == 'object') {
                return [oldRow - i, oldColumn + i]
            }
    }
}
//check up left
function checkRoadblockDiagonalUpLeft(pieces, oldRow, oldColumn) {
    for (let i = 1; i < rows; i++) {
        if (oldRow - i >= 0 && oldColumn - i >= 0)
            if (typeof pieces[oldRow - i][oldColumn - i] == 'object') {
                return [oldRow - i, oldColumn - i]
            }
    }
}

// filter the possible moves by the roadblocks
// VERTICAL
function filterRoadBlockUp(movesArray, roadBlock) {
    return movesArray.filter(move => {
        if (move[0] >= roadBlock[0] || move[1] != roadBlock[1]) {
            return move
        }
    })
}

function filterRoadBlockDown(movesArray, roadBlock) {
    return movesArray.filter(move => {
        if (move[0] <= roadBlock[0] || move[1] != roadBlock[1]) {
            return move
        }
    })
}

// HORIZONTAL
function filterRoadBlockRight(movesArray, roadBlock) {
    return movesArray.filter(move => {
        if (move[1] <= roadBlock[1] || move[0] != roadBlock[0]) {
            return move
        }
    })
}

function filterRoadBlockLeft(movesArray, roadBlock) {
    return movesArray.filter(move => {
        if (move[1] >= roadBlock[1] || move[0] != roadBlock[0]) {
            return move
        }
    })
}

// DIAGONAL
function filterRoadBlockUpRight(movesArray, roadBlock) {
    return movesArray.filter(move => {
        if (move[0] < roadBlock[0] && move[1] > roadBlock[1]) {
            return false;
        } else {
            return true;
        }
    })
}

// todo vanaf hier
function filterRoadBlockUpLeft(movesArray, roadBlock) {
    return movesArray.filter(move => {
        if (move[0] < roadBlock[0] && move[1] < roadBlock[1]) {
            return false;
        } else {
            return true;
        }
    })
}
function filterRoadBlockDownRight(movesArray, roadBlock) {
    return movesArray.filter(move => {
        if (move[0] > roadBlock[0] && move[1] > roadBlock[1]) {
            return false;
        } else {
            return true;
        }
    })
}
function filterRoadBlockDownLeft(movesArray, roadBlock) {
    return movesArray.filter(move => {
        if (move[0] > roadBlock[0] && move[1] < roadBlock[1]) {
            return false;
        } else {
            return true;
        }
    })
}
