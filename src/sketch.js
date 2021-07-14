//global values
const turnElement = document.getElementById('turn')
const turnInfo = document.getElementById('turn-info')
const turnList = document.getElementById('turn-list')
const boardSize = 600
let columns = 8
let rows = 8
let tileSize = boardSize / columns
let turnCount = 1
let turn = 'white'

// don't let users rightclick the chessboard
document.addEventListener('contextmenu', (event) => {
    if (event.target.nodeName.toLowerCase() == 'canvas') {
        event.preventDefault();
    }
})


//board
let board = [
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
]

//board

let pieces = [
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
]

//load the images
function preload() {
    pawnImg = loadImage('./pieces/images/pawn.png');
    rookImg = loadImage('./pieces/images/rook.png');
    kingImg = loadImage('./pieces/images/king.png');
    queenImg = loadImage('./pieces/images/queen.png');
    bishopImg = loadImage('./pieces/images/bishop.png');
    horseImg = loadImage('./pieces/images/horse.png');

    pawnImgWhite = loadImage('./pieces/images/pawn_white.png');
    rookImgWhite = loadImage('./pieces/images/rook_white.png');
    kingImgWhite = loadImage('./pieces/images/king_white.png');
    queenImgWhite = loadImage('./pieces/images/queen_white.png');
    bishopImgWhite = loadImage('./pieces/images/bishop_white.png');
    horseImgWhite = loadImage('./pieces/images/horse_white.png');
}

//setup runs once
function setup() {
    background(200)
    var myCanvas = createCanvas(boardSize, boardSize);
    myCanvas.parent("board");


    //draw the board with tiles
    //for each row
    for (let i = 0; i < rows; i++) {
        //for each column
        for (let j = 0; j < columns; j++) {
            board[i][j] = new Tile(tileSize, i, j)
        }
    }

    //pawns
    for (let j = 0; j < columns; j++) {
        pieces[1][j] = new Pawn(tileSize, 1, j, 'black')
        pieces[6][j] = new Pawn(tileSize, 6, j, 'white')
    }

    // rooks
    pieces[0][0] = new Rook(tileSize, 0, 0, 'black')
    pieces[0][7] = new Rook(tileSize, 0, 7, 'black')
    pieces[7][0] = new Rook(tileSize, 7, 0, 'white')
    pieces[7][7] = new Rook(tileSize, 7, 7, 'white')

    // bishops
    pieces[0][2] = new Bishop(tileSize, 0, 2, 'black')
    pieces[0][5] = new Bishop(tileSize, 0, 5, 'black')
    pieces[7][2] = new Bishop(tileSize, 7, 2, 'white')
    pieces[7][5] = new Bishop(tileSize, 7, 5, 'white')

    // horses
    pieces[0][1] = new Horse(tileSize, 0, 1, 'black')
    pieces[0][6] = new Horse(tileSize, 0, 6, 'black')
    pieces[7][1] = new Horse(tileSize, 7, 1, 'white')
    pieces[7][6] = new Horse(tileSize, 7, 6, 'white')

    // queens
    pieces[0][3] = new Queen(tileSize, 0, 3, 'black')
    pieces[7][3] = new Queen(tileSize, 7, 3, 'white')

    // kings
    pieces[0][4] = new King(tileSize, 0, 4, 'black')
    pieces[7][4] = new King(tileSize, 7, 4, 'white')
}

//draws runs constantly
function draw() {

    //draw tiles
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            board[i][j].show()
        }
    }

    // draw all pieces
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (typeof pieces[i][j] == 'object') {
                pieces[i][j].show()
            }
        }
    }

    // change cursor when hovering over a piece check it by deviding the X and Y by the tilesize
    let columnHovered = Math.floor(mouseX / tileSize)
    let rowHovered = Math.floor(mouseY / tileSize)

    if (columnHovered >= 0 && rowHovered >= 0 && columnHovered <= 7 && rowHovered <= 7) {
        if (typeof pieces[rowHovered][columnHovered] === 'object') {
            cursor('grab')
        } else {
            cursor()
        }
    }
}

let columnClicked
let rowClicked
let locked = false;
//update column/row clicked on mousepress
function mousePressed(e) {
    //if mouse has already been pressed, reset the piece by updating again
    if (locked) {
        for (let i = 0; i < rows; i++) {
            //for each column
            for (let j = 0; j < columns; j++) {
                //remove possible move colors 
                board[i][j].possibleMove = false;
                if (typeof pieces[i][j] == 'object') {
                    pieces[i][j].update(i, j)
                }
            }
        }
    }

    //set clicked rows by mouse coordinates in relation to the canvas
    columnClicked = Math.floor(mouseX / tileSize)
    rowClicked = Math.floor(mouseY / tileSize)

    //check if clicked tile has a piece on it
    if (isPiece(pieces, rowClicked, columnClicked)) {
        //check possible moves when piece is clicked
        pieces[rowClicked][columnClicked].checkPossibleMoves()
        locked = true
    } else {
        locked = false
    }
}

//drag piece by updating position
function mouseDragged() {
    if (locked) {
        pieces[rowClicked][columnClicked].dragging(mouseY, mouseX)
    }
}

//update position when piece is released
function mouseReleased() {
    if (locked) {
        let rowReleased = Math.floor(mouseY / tileSize)
        let columnReleased = Math.floor(mouseX / tileSize)
        console.log(`placing move: placeMove(${rowClicked},${columnClicked},${rowReleased},${columnReleased})`)
        placeMove(rowClicked, columnClicked, rowReleased, columnReleased)
        locked = false
    }

    //check if piece can move

}

function placeMove(fromRow, fromColumn, toRow, toColumn) {
    let pieceCanMove = pieces[fromRow][fromColumn].move(toRow, toColumn)
    console.log(pieces[6][3].move(5, 3))

    if (pieceCanMove) {
        //swap places in array with moved piece
        const oldPiece = pieces[toRow][toColumn]
        const movedPiece = pieces[fromRow][fromColumn]
        pieces[toRow][toColumn] = pieces[fromRow][fromColumn]
        pieces[fromRow][fromColumn] = ''

        const movedColor = movedPiece.color

        // if a king moves 2 squares, it needs to be castled
        if (movedPiece.constructor.name.toLowerCase() == 'king') {
            if (toColumn == fromColumn - 2 && fromRow === toRow && !movedPiece.hasMoved) {
                //add rook to new place
                pieces[toRow][toColumn + 1] = pieces[toRow][0]
                pieces[toRow][0] = ''

                pieces[toRow][toColumn + 1].column = toColumn + 1
            } else if (toColumn == fromColumn + 2 && fromRow === toRow && !movedPiece.hasMoved) {
                //add rook to new place
                pieces[toRow][toColumn - 1] = pieces[toRow][7]
                pieces[toRow][7] = ''

                pieces[toRow][toColumn - 1].column = toColumn - 1
            }
        }


        //remove other enpassants of your color. because it's only available 1 turn
        for (let i = 0; i < rows; i++) {
            //for each column
            for (let j = 0; j < columns; j++) {
                if (getPieceName(pieces, [i, j]) == 'pawn' && pieces[i][j].color == movedColor) {
                    pieces[i][j].enpassant = false
                }
            }
        }
        //check if a pawn moves
        if (getPieceName(pieces, [toRow, toColumn]) == 'pawn') {
            //check if it moved 2 places to enable an an passant capture
            if (toRow - movedPiece.row == 2 || toRow - movedPiece.row == -2) {
                movedPiece.enpassant = true;
            }

            //check if an enpassent has been made: column doesn't match but no piece captured
            if (typeof oldPiece != 'object' && movedPiece.column != toColumn) {
                //remove the piece that is captured en passant by checking which was was able to.
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < columns; j++) {
                        if (pieces[i][j].enpassant) {
                            pieces[i][j] = ''
                        }
                    }
                }
            }
        }

        let placedMove = getNotation([fromRow, fromColumn], [toRow, toColumn], oldPiece)

        turnInfo.textContent = ''

        //update new position
        pieces[toRow][toColumn].row = toRow
        pieces[toRow][toColumn].column = toColumn

        //if the moved piece is either king or rook, set it's state to moved, so it cant castle anymore
        if (getPieceName(pieces, [toRow, toColumn]) == 'king' || getPieceName(pieces, [toRow, toColumn]) == 'rook') {
            pieces[toRow][toColumn].hasMoved = true;
        }
        //check for checkmate
        let check = isInCheck(movedColor)
        let checkMate = isCheckMate(movedColor)
        if (checkMate) {
            turnInfo.textContent = 'Checkmate.'
            placedMove += '#'
        }
        if (check && !checkMate) {
            placedMove += '+'
        }
        turnList.insertAdjacentHTML('beforeend', `<li>${turnCount}. ${placedMove}</li>`)

        //swap turns
        if (movedPiece.color == 'white') {
            turn = 'black'
        } else {
            turnCount++
            turn = 'white'
        }

        if (turnElement) {
            turnElement.textContent = turn
        }
    }

    // update the piece locations with thier new positions
    for (let i = 0; i < rows; i++) {
        //for each column
        for (let j = 0; j < columns; j++) {
            //remove possible move colors 
            board[i][j].possibleMove = false;
            if (typeof pieces[i][j] == 'object') {
                pieces[i][j].update(i, j)
            }
        }
    }
}