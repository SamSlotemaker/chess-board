//global values
const turnElement = document.getElementById('turn')
const turnInfo = document.getElementById('turn-info')
const boardSize = 600
let columns = 8
let rows = 8
let tileSize = boardSize / columns
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

let runOnce = true

//draws runs constantly
function draw() {

    //draw tiles
    //for each row
    for (let i = 0; i < rows; i++) {
        //for each column
        for (let j = 0; j < columns; j++) {
            board[i][j].show()
        }
    }

    // draw all pieces
    for (let i = 0; i < rows; i++) {
        //for each column
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

    //if mouse has already been pressed, reset the piece
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
    if (typeof pieces[rowClicked][columnClicked] == 'object') {
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

        //check if piece can move
        let pieceCanMove = pieces[rowClicked][columnClicked].move(rowReleased, columnReleased)

        if (pieceCanMove) {
            //swap places in array with moved piece

            const oldPiece = pieces[rowReleased][columnReleased]
            const movedPiece = pieces[rowClicked][columnClicked]
            pieces[rowReleased][columnReleased] = pieces[rowClicked][columnClicked]
            pieces[rowClicked][columnClicked] = ''

            const movedColor = movedPiece.color
            let setCheck = false

            // if a king moves 2 squares, it needs to be castled
            if (movedPiece.constructor.name.toLowerCase() == 'king') {
                if (columnReleased == columnClicked - 2 && rowClicked === rowReleased && !movedPiece.hasMoved) {
                    //add rook to new place
                    pieces[rowReleased][columnReleased + 1] = pieces[rowReleased][0]
                    pieces[rowReleased][0] = ''

                    pieces[rowReleased][columnReleased + 1].column = columnReleased + 1
                } else if (columnReleased == columnClicked + 2 && rowClicked === rowReleased && !movedPiece.hasMoved) {
                    //add rook to new place
                    pieces[rowReleased][columnReleased - 1] = pieces[rowReleased][7]
                    pieces[rowReleased][7] = ''

                    pieces[rowReleased][columnReleased - 1].column = columnReleased - 1
                }
            }

            for (let i = 0; i < rows; i++) {
                //for each column
                for (let j = 0; j < columns; j++) {


                    //find the king with the same color as the player thats moving
                    if (getPieceName(pieces, [i, j]) == 'king' && pieces[i][j].color == movedColor) {
                        let king = pieces[i][j]
                        //if he puts himself in check
                        if (canBeTakenBy(king, i, j).length > 0) {
                            console.log(movedColor + ' put himself in check')
                            turnInfo.textContent = 'You cant put yourself in check'
                            //reset moves because you can't put yourself in check
                            pieces[rowClicked][columnClicked] = movedPiece
                            pieces[rowReleased][columnReleased] = oldPiece
                            setCheck = true;
                        }
                    }
                }
            }

            if (!setCheck) {
                turnInfo.textContent = ''
                //update new position
                pieces[rowReleased][columnReleased].row = rowReleased
                pieces[rowReleased][columnReleased].column = columnReleased

                //if the moved piece is either king or rook, set it's state to moved, so it cant castle anymore
                if (getPieceName(pieces, [rowReleased, columnReleased]) == 'king' || getPieceName(pieces, [rowReleased, columnReleased]) == 'rook') {
                    pieces[rowReleased][columnReleased].hasMoved = true;
                }

                for (let i = 0; i < rows; i++) {
                    //for each column
                    for (let j = 0; j < columns; j++) {
                        //check if the other king is in check
                        if (getPieceName(pieces, [i, j]) == 'king' && pieces[i][j].color != movedColor) {
                            let king = pieces[i][j]

                            //if a king is put in check
                            if (canBeTakenBy(king, i, j).length > 0) {
                                console.log(king.color + ' is in check')

                                //for each possible move, check if the king could move there
                                let kingCanMove = true;
                                king.checkPossibleMoves()

                                king.possibleMoves.forEach(move => {

                                    let row = move[0]
                                    let column = move[1]
                                    if (canBeTakenBy(king, row, column).length > 0) {
                                        console.log('king cant move to this square')
                                        kingCanMove = false;
                                    }
                                })

                                //for each piece that has been checked, check if it can be taken by one of your pieces
                                let checkingPiecesCanBeTaken = false;
                                canBeTakenBy(king, i, j).forEach(piece => {
                                    console.log(`checking ${piece} at ${piece.row} ${piece.column}`)
                                    if (canBeTakenBy(piece, piece.row, piece.column).length > 0) {
                                        console.log('can be taken')
                                        checkingPiecesCanBeTaken = true;
                                    }
                                })
                                if (!kingCanMove && !checkingPiecesCanBeTaken) {
                                    console.log('checkmate')
                                }
                            }
                        }
                    }
                }

                //swap turns
                if (movedPiece.color == 'white') {
                    turn = 'black'
                } else {
                    turn = 'white'
                }
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
                    // if (getPieceName(pieces, [i, j]) == 'king') {
                    //     pieces[i][j].isInCheck()
                    // }
                    pieces[i][j].update(i, j)
                }
            }
        }
    }
    locked = false
}