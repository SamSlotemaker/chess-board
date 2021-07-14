let boardNotation = [
    ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
    ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
    ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
    ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
    ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
    ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
    ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
    ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'],
]

let shorts = [
    {
        name: 'horse',
        short: 'N'
    },
    {
        name: 'rook',
        short: 'R'
    },
    {
        name: 'king',
        short: 'K'
    },
    {
        name: 'queen',
        short: 'Q'
    },
    {
        name: 'pawn',
        short: ''
    }, {
        name: 'bishop',
        short: 'B'
    }
]

function getNotation(from, to, oldPiece) {
    let pieceName = getPieceName(pieces, [to[0], to[1]])
    let abbr = shorts.find(short => short.name == pieceName).short
    let location = boardNotation[to[0]][to[1]]
    let takes = (typeof oldPiece == 'object') ? 'x' : ''

    if (pieceName == 'pawn') {
        if (takes == 'x') {
            takes = boardNotation[from[0]][from[1]].slice(0, 1) + 'x'
        }

    }
    let move = abbr + takes + location

    //castling
    if (pieceName == 'king' && (from[1] - to[1] == -2 || from[1] - to[1] == 2)) {
        if (from[1] - to[1] == -2) {
            //left
            move = 'O-O'
        } else {
            //right
            move = 'O-O-O'
        }

    }

    return move
}