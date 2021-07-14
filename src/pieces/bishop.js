class Bishop {

    constructor(tileSize, y, x, color) {
        this.tileSize = tileSize
        this.size = this.tileSize
        this.row = y
        this.column = x
        this.x = this.tileSize * x
        this.y = this.tileSize * y
        this.color = color
        this.img
        if (this.color == 'white') {
            this.img = bishopImgWhite
        } else {
            this.img = bishopImg
        }
        this.possibleMoves = []
    }

    checkPossibleMoves() {
        let oldRow = this.row
        let oldColumn = this.column

        // all possible moves
        let startPosition = [oldRow, oldColumn]
        let possibleMoves = []

        //bishop can move in a diagonal across the whole board
        for (let i = 1; i < columns; i++) {
            let possibleSpot1 = [startPosition[0] + i, startPosition[1] + i]
            let possibleSpot2 = [startPosition[0] - i, startPosition[1] - i]
            let possibleSpot3 = [startPosition[0] - i, startPosition[1] + i]
            let possibleSpot4 = [startPosition[0] + i, startPosition[1] - i]
            possibleMoves.push(...[possibleSpot1, possibleSpot2, possibleSpot3, possibleSpot4])
        }

        // filter out all moves that go outside the board
        let possibleMovesFiltered = possibleMoves.filter(move => {
            if (move[0] < 0 || move[1] < 0 || move[0] > 7 || move[1] > 7 || move == startPosition) {
                return false
            } else {
                return true
            }
        })


        //filter moves that bo beyond thier roadblocks
        possibleMovesFiltered = checkDiagonalRoadblocks(pieces, possibleMovesFiltered, oldRow, oldColumn)

        //filter all moves that would capture own piece
        possibleMovesFiltered = possibleMovesFiltered.filter(move => {
            if (!wouldCaptureOwnPiece(pieces, oldRow, oldColumn, move[0], move[1])) {
                return true;
            }
        })

        let possibleMovesFinal = filterCheckingMoves(possibleMovesFiltered, this.color, this.row, this.column)

        this.possibleMoves = possibleMovesFinal

        this.possibleMoves.forEach(move => {
            board[move[1]][move[0]].possibleMove = true
        })
    }

}
