pointScheme = [
    {
        name: 'queen',
        points: 90
    },
    {
        name: 'bishop',
        points: 30
    },
    {
        name: 'horse',
        points: 30
    },
    {
        name: 'rook',
        points: 50
    },
    {
        name: 'pawn',
        points: 10
    },
    {
        name: 'king',
        points: 900
    },
    {
        name: '',
        points: 0
    }
]

// find all pieces
function findOwnPieces(pieces, color) {
    const yourPieces = []
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (pieces[i][j].color == color) {
                yourPieces.push(pieces[i][j])
                pieces[i][j].checkPossibleMoves()
            }
        }
    }
    return yourPieces
}

function findPiecesThatCanMove(yourPieces) {
    return yourPieces.filter(piece => piece.possibleMoves.length > 0)
}

function chooseRandom(array) {
    let random = Math.floor(Math.random() * array.length)
    let randomObject = array[random]
    return randomObject
}

function findPoints(name, pointScheme) {
    return pointScheme.find(item => item.name === name).points
}

function chooseHighestPointMove(pieces, moves, pointScheme) {
    let highestPoints = null
    let bestMove = null

    moves.forEach(move => {
        let pieceName = getPieceName(pieces, [move[0], move[1]])

        let points = 0
        //if its a piece, find the points you will get for capturing
        if (pieceName) {
            points = findPoints(pieceName, pointScheme)
        }

        //if there is no move yet, fill the move with a random one
        if (!bestMove) {
            bestMove = chooseRandom(moves)
        }

        if (typeof pieceName != '') {
            if (points > highestPoints) {
                bestMove = move
                highestPoints = points
            }
        }
    })
    return [bestMove, highestPoints]
}

function chooseBestPieceToMove(pieces, movingPieces, pointScheme) {
    let bestPiece = chooseRandom(movingPieces)
    let bestPoints = 0
    let bestMove = chooseRandom(bestPiece.possibleMoves)

    movingPieces.forEach(piece => {
        let moves = piece.possibleMoves
        let points = chooseHighestPointMove(pieces, moves, pointScheme)[1]

        if (points > bestPoints) {
            bestPiece = piece
            bestPoints = points
            bestMove = chooseHighestPointMove(pieces, moves, pointScheme)[0]
        }
    })

    return {
        piece: bestPiece,
        move: bestMove,
        points: bestPoints
    }
}

function chooseBestMove(pieces, movingPieces, pointScheme) {
    let bestPiece = chooseRandom(movingPieces)
    let bestMove = chooseRandom(bestPiece.possibleMoves)
    let board = pieces.map(function (arr) {
        return arr.slice();
    });

    let position = evaluatePosition(board, pointScheme)
    // console.log('oldPosition:' + position)

    movingPieces.forEach(piece => {

        let oldRow = piece.row
        let oldColumn = piece.column

        // console.log('checking piece:' + getPieceName(pieces, [oldRow, oldColumn]))
        piece.possibleMoves.forEach(move => {
            let copyBoard = board.map(function (arr) {
                return arr.slice();
            });

            // console.log('checking move:' + move)


            copyBoard[move[0]][move[1]] = piece
            copyBoard[oldRow][oldColumn] = ''


            // console.log(copyBoard)

            let newPosition = evaluatePosition(copyBoard, pointScheme)

            // console.log('newPosition:' + newPosition)

            if (newPosition < position) {
                position = newPosition
                bestPiece = piece
                bestMove = move
            }
        })
    })
    return {
        position: position,
        piece: bestPiece,
        move: bestMove
    }
}


function evaluatePosition(board, pointScheme) {
    let total = 0
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            let piece = board[i][j]
            if (typeof piece == 'object') {
                let pieceName = getPieceName(board, [i, j])
                if (pieceName) {
                    points = findPoints(pieceName, pointScheme)
                }
                if (piece.color == 'white') {
                    total += points
                } else {
                    total -= points
                }
            }
        }
    }
    return total
}