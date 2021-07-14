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
        points: 400
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

function chooseHighestPointMove(pieces, moves, pointScheme) {
    let highestPoints = null
    let bestMove = null

    moves.forEach(move => {
        let pieceName = getPieceName(pieces, [move[0], move[1]])

        let points = 0
        //if its a piece, find the points you will get for capturing
        if (pieceName) {
            points = pointScheme.find(item => item.name === pieceName).points
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