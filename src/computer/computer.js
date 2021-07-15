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
                pieces[i][j].checkPossibleMoves(pieces)
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

function chooseBestMove(pieces, movingPieces, pointScheme) {
    // let bestPiece = chooseRandom(movingPieces)
    // let bestMove = chooseRandom(bestPiece.possibleMoves)
    let scenarios = []
    let board = pieces.map(function (arr) {
        return arr.slice();
    });

    let position = evaluatePosition(board, pointScheme)

    //go trough each piece and fill the best move when you found it
    movingPieces.forEach(blackPiece => {

        let oldRow = blackPiece.row
        let oldColumn = blackPiece.column

        blackPiece.checkPossibleMoves(board)

        //go trough each move to find the best one
        blackPiece.possibleMoves.forEach(move => {
            let copyBoard = board.map(function (arr) {
                return arr.slice();
            })

            //clone the pawn into the copyboard place
            copyBoard[move[0]][move[1]] = blackPiece
            copyBoard[oldRow][oldColumn] = ''

            let newPositionBlack = evaluatePosition(copyBoard, pointScheme)

            //now, for every move white can make, calculate the best move for black
            const movingPiecesWhite = findPiecesThatCanMove(findOwnPieces(copyBoard, 'white'))
            // let positionWhite = newPosition

            let bestMoveWhite;
            let bestPieceWhite;
            let testboard;

            movingPiecesWhite.forEach(whitePiece => {
                let oldRow = whitePiece.row
                let oldColumn = whitePiece.column

                whitePiece.checkPossibleMoves(copyBoard)

                whitePiece.possibleMoves.forEach(whiteMove => {
                    let copyBoard2 = copyBoard.map(function (arr) {
                        return arr.slice();
                    });


                    console.log(copyBoard2)

                    //clone the pawn into the copyboard place
                    copyBoard2[whiteMove[0]][whiteMove[1]] = whitePiece
                    copyBoard2[oldRow][oldColumn] = ''

                    newPositionWhite = evaluatePosition(copyBoard2, pointScheme)

                    if (newPositionWhite >= newPositionBlack) {
                        newPositionBlack = newPositionWhite
                        bestPieceWhite = whitePiece
                        bestMoveWhite = whiteMove
                        testboard = copyBoard2
                    }
                })
            })
            scenarios.push({
                board: testboard,
                position: newPositionBlack,
                bestMoveWhite: bestMoveWhite,
                bestPieceWhite: bestPieceWhite,
                pieceBlack: blackPiece,
                moveBlack: move
            })
        })
    })

    console.log(scenarios)
    // find scenario with lowest possible position score
    let min;
    scenarios.forEach(scenario => {
        if (!min) {
            min = scenario.position
        } else {
            if (scenario.position < min) {
                min = scenario.position
            }
        }
    })

    const bestScenario = scenarios.find(scenario => scenario.position == min)
    console.log(bestScenario)
    const bestMove = bestScenario.moveBlack
    const bestPiece = bestScenario.pieceBlack

    return {
        position: bestScenario.position,
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