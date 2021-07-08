class Pawn {
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
            this.img = pawnImgWhite
        } else {
            this.img = pawnImg
        }
        this.possibleMoves = []
    }

    checkPossibleMoves() {

        let oldRow = this.row
        let oldColumn = this.column

        // all possible moves
        let startPosition = [oldRow, oldColumn]
        let possibleMoves = []

        if (this.color === 'white') {
            let possibleSpot1 = [startPosition[0] - 1, startPosition[1]]

            //check if there's a piece in the way of a forward move
            if (typeof pieces[possibleSpot1[0]][possibleSpot1[1]] != 'object') {
                // push possible move when there isn't
                possibleMoves.push(possibleSpot1)
            }

            //2 steps possible when not moved yet
            if (startPosition[0] == 6) {
                //check if there's a piece in the way of a forward move
                if (typeof pieces[startPosition[0] - 2][startPosition[1]] != 'object') {
                    // push possible move when there isn't
                    possibleMoves.push([startPosition[0] - 2, startPosition[1]])
                }
            }

            //pawn needs to capture diagonaly
            // if there is a piece at a diagonal, add that spot to possible moves
            if (typeof pieces[startPosition[0] - 1][startPosition[1] - 1] == 'object') {
                possibleMoves.push([startPosition[0] - 1, startPosition[1] - 1])
            }
            if (typeof pieces[startPosition[0] - 1][startPosition[1] + 1] == 'object') {
                possibleMoves.push([startPosition[0] - 1, startPosition[1] + 1])
            }


        } else {
            let possibleSpot1 = [startPosition[0] + 1, startPosition[1]]

            if (typeof pieces[possibleSpot1[0]][possibleSpot1[1]] != 'object') {
                possibleMoves.push(possibleSpot1)
            }

            //2 steps possible when not moved yet
            if (startPosition[0] == 1) {
                if (typeof pieces[startPosition[0] + 2][startPosition[1]] != 'object') {
                    possibleMoves.push([startPosition[0] + 2, startPosition[1]])
                }
            }

            //pawn needs to capture diagonaly
            // if there is a piece at a diagonal, add that spot to possible moves
            if (typeof pieces[startPosition[0] + 1][startPosition[1] - 1] == 'object') {
                possibleMoves.push([startPosition[0] + 1, startPosition[1] - 1])
            }
            if (typeof pieces[startPosition[0] + 1][startPosition[1] + 1] == 'object') {
                possibleMoves.push([startPosition[0] + 1, startPosition[1] + 1])
            }
        }


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

        this.possibleMoves = possibleMovesFiltered

        this.possibleMoves.forEach(move => {
            board[move[1]][move[0]].possibleMove = true
        })

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

        //if move is possible, update position and return true
        let pieceCanMove = false;
        this.possibleMoves.forEach(move => {

            //if a possible move is the same as the move that you're trying to do
            if (move[0] === newRow && move[1] === newColumn) {
                // check if piece would capture own color, if not, move is valid
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
