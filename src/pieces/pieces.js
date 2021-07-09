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

//check king spots 
function checkKingSpots(row, column) {
    let possibleMoves = []
    //king can move 1 square in every direction
    // horizonal + vertical
    let possibleSpot1 = [row + 1, column]
    let possibleSpot2 = [row, column + 1]
    let possibleSpot3 = [row - 1, column]
    let possibleSpot4 = [row, column - 1]
    // diagonals
    let possibleSpot5 = [row + 1, column + 1]
    let possibleSpot6 = [row - 1, column - 1]
    let possibleSpot7 = [row - 1, column + 1]
    let possibleSpot8 = [row + 1, column - 1]
    possibleMoves.push(...[possibleSpot1, possibleSpot2, possibleSpot3, possibleSpot4, possibleSpot5, possibleSpot6, possibleSpot7, possibleSpot8])
    return possibleMoves
}

//check horse spots
function checkHorseSpots(row, column) {
    let possibleHorseSpots = []
    //horse moves, approx +2 +1 in every direction
    let possibleSpot1 = [row + 2, column + 1]
    let possibleSpot2 = [row + 2, column - 1]
    let possibleSpot3 = [row + 1, column + 2]
    let possibleSpot4 = [row + 1, column - 2]
    let possibleSpot5 = [row - 2, column - 1]
    let possibleSpot6 = [row - 2, column + 1]
    let possibleSpot7 = [row - 1, column - 2]
    let possibleSpot8 = [row - 1, column + 2]

    possibleHorseSpots.push(...[possibleSpot1, possibleSpot2, possibleSpot3, possibleSpot4, possibleSpot5, possibleSpot6, possibleSpot7, possibleSpot8])
    return possibleHorseSpots
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


function getPieceName(pieces, position) {
    if (position) {
        const pieceName = pieces[position[0]][position[1]].constructor.name
        return pieceName.toLowerCase()
    } else {
        return false
    }
}
function getPieceColor(pieces, position) {
    if (position) {
        const pieceColor = pieces[position[0]][position[1]].color
        return pieceColor
    } else {
        return false
    }
}

function isOpposingRookOrQueen(pieces, piece, ownColor) {
    const pieceName = getPieceName(pieces, piece)
    const pieceColor = getPieceColor(pieces, piece)
    if (pieceName == 'rook' || pieceName == 'queen') {
        if (pieceColor != ownColor) {
            return true
        }
    } else {
        return false
    }
}

function isOpposingBishopOrQueen(pieces, piece, ownColor) {
    const pieceName = getPieceName(pieces, piece)
    const pieceColor = getPieceColor(pieces, piece)

    if (pieceName == 'bishop' || pieceName == 'queen') {
        if (pieceColor != ownColor) {
            return true
        }
    } else {
        return false
    }
}

function isOpposingHorse(pieces, piece, ownColor) {
    const pieceName = getPieceName(pieces, piece)
    const pieceColor = getPieceColor(pieces, piece)
    if (pieceName == 'horse') {
        if (pieceColor != ownColor) {
            return true
        }
    } else {
        return false
    }
}

function isOpposingKing(pieces, piece, ownColor) {
    const pieceName = getPieceName(pieces, piece)
    const pieceColor = getPieceColor(pieces, piece)
    if (pieceName == 'king') {
        if (pieceColor != ownColor) {
            return true
        }
    } else {
        return false
    }
}

