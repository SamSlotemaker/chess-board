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

        console.log(`moving bishop from ${oldRow}|${oldColumn} to: ${newRow}|${newColumn}`)

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
