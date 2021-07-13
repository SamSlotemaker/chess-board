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
        this.possibleMoves = []
        this.hasMoved = false

    }

    checkPossibleMoves() {
        let oldRow = this.row
        let oldColumn = this.column

        // all possible moves
        let startPosition = [oldRow, oldColumn]

        let possibleMoves = checkKingSpots(startPosition[0], startPosition[1])

        // king can move 2 squares to castle when it has not moved
        if (!this.hasMoved) {
            //only add it when the corresponding rook has not moved yet
            //castle left
            if (typeof pieces[startPosition[0]][0] == 'object' && !pieces[startPosition[0]][0].hasMoved) {
                let castleSpot = [startPosition[0], startPosition[1] - 2]
                //to castle, there can't be a piece between king and rook
                if (typeof pieces[startPosition[0]][1] != 'object' && typeof pieces[startPosition[0]][2] != 'object' && typeof pieces[startPosition[0]][3] != 'object') {
                    possibleMoves.push(castleSpot)
                }
            }
            //castle right
            if (typeof pieces[startPosition[0]][7] == 'object' && !pieces[startPosition[0]][7].hasMoved) {
                let castleSpot = [startPosition[0], startPosition[1] + 2]
                //to castle, there can't be a piece between king and rook
                if (typeof pieces[startPosition[0]][5] != 'object' && typeof pieces[startPosition[0]][6] != 'object') {
                    possibleMoves.push(castleSpot)
                }
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

        let newRow = row
        let newColumn = column

        //if move is possible, update position and return true
        let pieceCanMove = false;
        this.possibleMoves.forEach(move => {

            //if a possible move is the same as the move that you're trying to do
            if (move[0] === newRow && move[1] === newColumn) {
                // check if piece would capture own color, if not, move is valid
                // return true
                pieceCanMove = true
            }
        })
        return pieceCanMove
    }

}

