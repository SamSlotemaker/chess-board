//global values
const boardSize = 600
let columns = 8
let rows = 8
let tileSize = boardSize / columns

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


//update position to mouse position


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

function setup() {
    background(200)
    createCanvas(boardSize, boardSize);

    //draw the board with tiles
    //for each row
    for (let i = 0; i < rows; i++) {
        //for each column
        for (let j = 0; j < columns; j++) {
            board[i][j] = new Tile(tileSize, i, j)
        }
    }


    // Setup the pieces on the board
    let color
    //pawns 
    for (let i = 1; i < rows; i += 5) {
        //for each column
        for (let j = 0; j < columns; j++) {
            if (i < 5) {
                color = 'black'
            }
            else {
                color = 'white'
            }
            pieces[i][j] = new Pawn(tileSize, i, j, color)
        }
    }

    // rooks
    pieces[0][0] = new Rook(tileSize, 0, 0, 'black')
    pieces[0][7] = new Rook(tileSize, 0, 7, 'black')
    pieces[7][0] = new Rook(tileSize, 7, 0, 'white')
    pieces[7][7] = new Rook(tileSize, 7, 7, 'white')

    // bishops
    pieces[0][1] = new Bishop(tileSize, 0, 1, 'black')
    pieces[0][6] = new Bishop(tileSize, 0, 6, 'black')
    pieces[7][1] = new Bishop(tileSize, 7, 1, 'white')
    pieces[7][6] = new Bishop(tileSize, 7, 6, 'white')

    // horses
    pieces[0][2] = new Horse(tileSize, 0, 2, 'black')
    pieces[0][5] = new Horse(tileSize, 0, 5, 'black')
    pieces[7][2] = new Horse(tileSize, 7, 2, 'white')
    pieces[7][5] = new Horse(tileSize, 7, 5, 'white')

    // queens
    pieces[0][3] = new Queen(tileSize, 0, 3, 'black')
    pieces[7][3] = new Queen(tileSize, 7, 3, 'white')

    // kings
    pieces[0][4] = new King(tileSize, 0, 4, 'black')
    pieces[7][4] = new King(tileSize, 7, 4, 'white')
}

let runOnce = true

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
}


let columnClicked
let rowClicked
let locked

//update column/row clicked on mousepress
function mousePressed() {
    columnClicked = Math.floor(mouseX / tileSize)
    rowClicked = Math.floor(mouseY / tileSize)
}

//drag piece by updating position
function mouseDragged() {
    pieces[rowClicked][columnClicked].dragging(mouseY, mouseX)
}

//update position when piece is released
function mouseReleased() {
    let rowEnded = Math.floor(mouseY / tileSize)
    let columnEnded = Math.floor(mouseX / tileSize)

    //check if piece can move
    let pieceCanMove = pieces[rowClicked][columnClicked].move(rowEnded, columnEnded)

    //swap places in array with moved piece
    if (pieceCanMove) {
        pieces[rowEnded][columnEnded] = pieces[rowClicked][columnClicked]
        pieces[rowClicked][columnClicked] = ''
    }

    // draw all pieces again with thier updated positions
    for (let i = 0; i < rows; i++) {
        //for each column
        for (let j = 0; j < columns; j++) {
            if (typeof pieces[i][j] == 'object') {
                pieces[i][j].update(i, j)
            }
        }
    }



}