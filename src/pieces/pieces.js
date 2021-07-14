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


function isPiece(pieces, row, column) {
    if (typeof pieces[row][column] == 'object') {
        return true
    } else {
        return false
    }
}

//check if piece would capture own color
function wouldCaptureOwnPiece(pieces, oldRow, oldColumn, newRow, newColumn) {
    if (pieces[newRow][newColumn].color == pieces[oldRow][oldColumn].color) {
        return true
    } else {
        return false
    }
}

function checkPawnSpots(piece, row, column) {
    let color = piece.color
    let possibleSpots = []
    if (color == 'white') {
        possibleSpots.push([row - 1, column - 1])
        possibleSpots.push([row - 1, column + 1])
    } else {
        possibleSpots.push([row + 1, column - 1])
        possibleSpots.push([row + 1, column + 1])
    }
    return possibleSpots
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

function isOpposingPawn(pieces, piece, ownColor) {
    const pieceName = getPieceName(pieces, piece)
    const pieceColor = getPieceColor(pieces, piece)
    if (pieceName == 'pawn') {
        if (pieceColor != ownColor) {
            return true
        }
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

// check if piece can be taken
function canBeTakenBy(piece, i, j) {
    //check every roadblock, if corresponding roadblocks are checking pieces. 
    //check for knight moves
    const row = i
    const column = j

    const piecesThatCanTake = []

    const roadblockDown = checkRoadblockDown(pieces, row, column)
    const roadblockUp = checkRoadblockUp(pieces, row, column)
    const roadblockLeft = checkRoadblockLeft(pieces, row, column)
    const roadblockRight = checkRoadblockRight(pieces, row, column)
    const roadblockUpRight = checkRoadblockDiagonalUpRight(pieces, row, column)
    const roadblockUpLeft = checkRoadblockDiagonalUpLeft(pieces, row, column)
    const roadblockDownRight = checkRoadblockDiagonalDownRight(pieces, row, column)
    const roadblockDownLeft = checkRoadblockDiagonalDownLeft(pieces, row, column)


    let canTake = false;

    if (isOpposingRookOrQueen(pieces, roadblockUp, piece.color)) {
        piecesThatCanTake.push(pieces[roadblockUp[0]][roadblockUp[1]])
    }
    if (isOpposingRookOrQueen(pieces, roadblockDown, piece.color)) {
        piecesThatCanTake.push(pieces[roadblockDown[0]][roadblockDown[1]])
    }
    if (isOpposingRookOrQueen(pieces, roadblockLeft, piece.color)) {
        piecesThatCanTake.push(pieces[roadblockLeft[0]][roadblockLeft[1]])
    }
    if (isOpposingRookOrQueen(pieces, roadblockRight, piece.color)) {
        piecesThatCanTake.push(pieces[roadblockRight[0]][roadblockRight[1]])
    }

    if (isOpposingBishopOrQueen(pieces, roadblockUpRight, piece.color)) {
        piecesThatCanTake.push(pieces[roadblockUpRight[0]][roadblockUpRight[1]])
    }
    if (isOpposingBishopOrQueen(pieces, roadblockUpLeft, piece.color)) {
        piecesThatCanTake.push(pieces[roadblockUpLeft[0]][roadblockUpLeft[1]])
    }
    if (isOpposingBishopOrQueen(pieces, roadblockDownRight, piece.color)) {
        piecesThatCanTake.push(pieces[roadblockDownRight[0]][roadblockDownRight[1]])
    }
    if (isOpposingBishopOrQueen(pieces, roadblockDownLeft, piece.color)) {
        piecesThatCanTake.push(pieces[roadblockDownLeft[0]][roadblockDownLeft[1]])
    }

    // one move spots where pieces can be that can take the king
    let possibleKingSpots = checkKingSpots(row, column)
    let possiblePawnSpots = checkPawnSpots(piece, row, column)
    let possibleHorseSpots = checkHorseSpots(row, column)

    // filter out all moves that go outside the board
    let possibleHorseMovesFiltered = possibleHorseSpots.filter(move => {
        if (move[0] < 0 || move[1] < 0 || move[0] > 7 || move[1] > 7 || move == [piece.row, piece.column]) {
            return false
        } else {
            return true
        }
    })

    let possibleKingMovesFiltered = possibleKingSpots.filter(move => {
        if (move[0] < 0 || move[1] < 0 || move[0] > 7 || move[1] > 7 || move == [piece.row, piece.column]) {
            return false
        } else {
            return true
        }
    })

    let possiblePawnMovesFiltered = possiblePawnSpots.filter(move => {
        if (move[0] < 0 || move[1] < 0 || move[0] > 7 || move[1] > 7 || move == [piece.row, piece.column]) {
            return false
        } else {
            return true
        }
    })

    possiblePawnMovesFiltered.forEach(spot => {
        if (isOpposingPawn(pieces, spot, piece.color)) {
            piecesThatCanTake.push(pieces[spot[0]][spot[1]])
        }
    })

    possibleHorseMovesFiltered.forEach(spot => {
        if (isOpposingHorse(pieces, spot, piece.color)) {
            piecesThatCanTake.push(pieces[spot[0]][spot[1]])
        }
    })

    possibleKingMovesFiltered.forEach(spot => {
        if (isOpposingKing(pieces, spot, piece.color)) {
            piecesThatCanTake.push(pieces[spot[0]][spot[1]])
        }
    })
    return piecesThatCanTake
}

function filterCheckingMoves(possibleMoves, color, row, column) {
    //check if a move would check yourself
    let yourKing;
    for (let i = 0; i < rows; i++) {
        //for each column
        for (let j = 0; j < columns; j++) {
            if (getPieceName(pieces, [i, j]) == 'king' && pieces[i][j].color == color) {
                yourKing = pieces[i][j]
            }
        }
    }

    //filter moves to moves that wont put you in check
    let possibleMovesFiiltered = possibleMoves.filter(move => {
        const oldPiece = pieces[row][column]
        const movedPiece = pieces[move[0]][move[1]]

        //update board, check it and then reset it
        //update:
        pieces[move[0]][move[1]] = pieces[row][column]
        pieces[row][column] = ''

        pieces[move[0]][move[1]].row = move[0]
        pieces[move[0]][move[1]].column = move[1]
        let canMoveHere = false;

        //if king cant be taken in current board positions, allow the move
        if (canBeTakenBy(yourKing, yourKing.row, yourKing.column).length == 0) {
            canMoveHere = true;
        }

        //reset:
        pieces[move[0]][move[1]] = movedPiece
        pieces[row][column] = oldPiece

        pieces[row][column].row = row
        pieces[row][column].column = column

        return canMoveHere
    })
    return possibleMovesFiiltered
}

function isCheckMate(movedColor) {
    // CHECK FOR CHECKMATE
    let checkMate = true
    for (let i = 0; i < rows; i++) {
        //for each column
        for (let j = 0; j < columns; j++) {
            //check if the other king is in check
            if (getPieceName(pieces, [i, j]) == 'king' && pieces[i][j].color != movedColor) {
                let king = pieces[i][j]
                //check if another piece can block the king, only if 1 piece is checking and is no horse or pawn (those cant be blocked)
                for (let i = 0; i < rows; i++) {
                    //for each column
                    for (let j = 0; j < columns; j++) {
                        let piece = pieces[i][j]
                        if (typeof piece == 'object' && piece.color == king.color) {
                            piece.checkPossibleMoves()
                            if (piece.possibleMoves.length > 0) {
                                checkMate = false;
                            }
                        }
                    }
                }
            }
        }
    }
    return checkMate
}

function isInCheck(movedColor) {
    let king;
    for (let i = 0; i < rows; i++) {
        //for each column
        for (let j = 0; j < columns; j++) {
            if (getPieceName(pieces, [i, j]) == 'king' && pieces[i][j].color != movedColor) {
                king = pieces[i][j]
            }
        }
    }

    if (canBeTakenBy(king, king.row, king.column).length > 0) {
        return true
    } else {
        return false
    }
}