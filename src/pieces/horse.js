class Horse {

    constructor(tileSize, y, x, color) {
        this.tileSize = tileSize
        this.size = this.tileSize
        this.row = y
        this.column = x
        this.x = this.tileSize * x
        this.y = this.tileSize * y
        this.color = color
        this.img;
        if (this.color == 'white') {
            this.img = horseImgWhite
        } else {
            this.img = horseImg
        }
        this.possibleMoves = []
    }

    checkPossibleMoves() {
        let oldRow = this.row
        let oldColumn = this.column

        // all possible moves
        let startPosition = [oldRow, oldColumn]
        let possibleMoves = []

        //horse moves, approx +2 +1 in every direction
        let possibleSpot1 = [startPosition[0] + 2, startPosition[1] + 1]
        let possibleSpot2 = [startPosition[0] + 2, startPosition[1] - 1]
        let possibleSpot3 = [startPosition[0] + 1, startPosition[1] + 2]
        let possibleSpot4 = [startPosition[0] + 1, startPosition[1] - 2]
        let possibleSpot5 = [startPosition[0] - 2, startPosition[1] - 1]
        let possibleSpot6 = [startPosition[0] - 2, startPosition[1] + 1]
        let possibleSpot7 = [startPosition[0] - 1, startPosition[1] - 2]
        let possibleSpot8 = [startPosition[0] - 1, startPosition[1] + 2]

        possibleMoves.push(...[possibleSpot1, possibleSpot2, possibleSpot3, possibleSpot4, possibleSpot5, possibleSpot6, possibleSpot7, possibleSpot8])

        // filter out all moves that go outside the board
        let possibleMovesFiltered = possibleMoves.filter(move => {
            if (move[0] < 0 || move[1] < 0 || move[0] > 7 || move[1] > 7 || move == startPosition) {
                return false
            } else {
                return true
            }
        })

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
