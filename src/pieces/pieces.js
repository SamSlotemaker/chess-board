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
        console.log('cant capture own piece')
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
        possibleMovesArray = filterRoadBlockTop(possibleMovesArray, roadBlockUp)
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

// filter the possible moves by the roadblocks
function filterRoadBlockTop(movesArray, roadBlock) {
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