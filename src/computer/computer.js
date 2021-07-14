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
    console.log(random)
    let randomObject = array[random]
    return randomObject
}