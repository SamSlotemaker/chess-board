//global values
const boardSize = 600
let columns = 8
let rows = 8
let tileSize = boardSize / columns

//board
let board = [
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []]
]

let pieces = [
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []]
]

function preload() {
    pawnImg = loadImage('./pieces/images/pawn.png');
    rookImg = loadImage('./pieces/images/rook.png');
    kingImg = loadImage('./pieces/images/king.png');
    queenImg = loadImage('./pieces/images/queen.png');
    bishopImg = loadImage('./pieces/images/bishop.png');
    horseImg = loadImage('./pieces/images/horse.png');
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
            board[i][j].show()
        }
    }
}

function draw() {

    let color;

    // DRAW PIECES

    //pawns 
    for (let i = 1; i < rows; i += 5) {
        //for each column
        for (let j = 0; j < columns; j++) {
            if (i < 5) {
                color = 0
            }
            else {
                color = 255
            }

            pieces[i][j] = new Pawn(tileSize, i, j, color)
            pieces[i][j].show()
        }
    }

    // bishops
    pieces[0][1] = new Bishop(tileSize, 0, 1, color)
    pieces[0][1].show()
    pieces[0][6] = new Bishop(tileSize, 0, 6, color)
    pieces[0][6].show()

    pieces[7][1] = new Bishop(tileSize, 7, 1, color)
    pieces[7][1].show()
    pieces[7][6] = new Bishop(tileSize, 7, 6, color)
    pieces[7][6].show()


}