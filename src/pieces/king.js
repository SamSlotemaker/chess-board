class King {

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
            this.img = kingImgWhite
        } else {
            this.img = kingImg
        }

    }

    //check if piece can move
    move(row, column) {
        if (this.color !== turn) {
            return false
        }

        let oldRow = this.row
        let oldColumn = this.column

        let newRow = row
        let newColumn = column

        console.log(`moving rook from ${oldRow}|${oldColumn} to: ${newRow}|${newColumn}`)

        // all possible moves
        let startPosition = [oldRow, oldColumn]
        let possibleMoves = []

        //king can move 1 square in every direction
        // horizonal + vertical
        let possibleSpot1 = [startPosition[0] + 1, startPosition[1]]
        let possibleSpot2 = [startPosition[0], startPosition[1] + 1]
        let possibleSpot3 = [startPosition[0] - 1, startPosition[1]]
        let possibleSpot4 = [startPosition[0], startPosition[1] - 1]
        // diagonals
        let possibleSpot5 = [startPosition[0] + 1, startPosition[1] + 1]
        let possibleSpot6 = [startPosition[0] - 1, startPosition[1] - 1]
        let possibleSpot7 = [startPosition[0] - 1, startPosition[1] + 1]
        let possibleSpot8 = [startPosition[0] + 1, startPosition[1] - 1]

        possibleMoves.push(...[possibleSpot1, possibleSpot2, possibleSpot3, possibleSpot4, possibleSpot5, possibleSpot6, possibleSpot7, possibleSpot8])


        // filter out all moves that go outside the board
        let possibleMovesFiltered = possibleMoves.filter(move => {
            if (move[0] < 0 || move[1] < 0 || move[0] > 7 || move[1] > 7 || move == startPosition) {
                return false
            } else {
                return true
            }
        })


        //if move is possible, update position and return true
        let pieceCanMove = false;
        possibleMovesFiltered.forEach(move => {

            //if a possible move is the same as the move that you're trying to do
            if (move[0] === newRow && move[1] === newColumn) {
                //update new position
                this.row = newRow
                this.column = newColumn
                // return true
                pieceCanMove = true
            }
        })
        return pieceCanMove

    }

}

