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

    }

    checkPossibleMoves() {
        let oldRow = this.row
        let oldColumn = this.column

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

    isInCheck() {
        //check every roadblock, if corresponding roadblocks are checking pieces. 
        //check for knight moves
        const row = this.row
        const column = this.column




        // check horzontals + verticals for rook or queen
        // const pieceUp = getPieceName(pieces, roadblockUp)
        // const pieceDown = getPieceName(pieces, roadBlockDown)
        // const pieceLeft = getPieceName(pieces, roadBlockLeft)
        // const pieceRight = getPieceName(pieces, roadBlockRight)


        // const pieceUpRight = getPieceName(pieces, roadblockUpRight)
        // const pieceUpLeft = getPieceName(pieces, roadblockUpLeft)
        // const pieceDownRight = getPieceName(pieces, roadblockDownRight)
        // const pieceDownLeft = getPieceName(pieces, roadblockDownLeft)
        // const pieceUpRightColor = getPieceColor(pieces, roadblockUpRight)
        // const pieceUpLeftColor = getPieceColor(pieces, roadblockUpLeft)
        // const pieceDownRightColor = getPieceColor(pieces, roadblockDownRight)
        // const pieceDownLeftColor = getPieceColor(pieces, roadblockDownLeft)

        const roadblockDown = checkRoadblockDown(pieces, row, column)
        const roadblockUp = checkRoadblockUp(pieces, row, column)
        const roadblockLeft = checkRoadblockLeft(pieces, row, column)
        const roadblockRight = checkRoadblockRight(pieces, row, column)
        const roadblockUpRight = checkRoadblockDiagonalUpRight(pieces, row, column)
        const roadblockUpLeft = checkRoadblockDiagonalUpLeft(pieces, row, column)
        const roadblockDownRight = checkRoadblockDiagonalDownRight(pieces, row, column)
        const roadblockDownLeft = checkRoadblockDiagonalDownLeft(pieces, row, column)


        let check = false;
        if (isOpposingRookOrQueen(pieces, roadblockUp, this.color) || isOpposingRookOrQueen(pieces, roadblockDown, this.color) || isOpposingRookOrQueen(pieces, roadblockLeft, this.color) || isOpposingRookOrQueen(pieces, roadblockRight, this.color)) {
            check = true
        }
        if (isOpposingBishopOrQueen(pieces, roadblockUpRight, this.color) || isOpposingBishopOrQueen(pieces, roadblockUpLeft, this.color) || isOpposingBishopOrQueen(pieces, roadblockDownRight, this.color) || isOpposingBishopOrQueen(pieces, roadblockDownLeft, this.color)) {
            check = true
        }

        // check all horse moves 
        // all possible moves
        let possibleHorseSpots = []

        //horse moves, approx +2 +1 in every direction
        let possibleSpot1 = [this.row + 2, this.column + 1]
        let possibleSpot2 = [this.row + 2, this.column - 1]
        let possibleSpot3 = [this.row + 1, this.column + 2]
        let possibleSpot4 = [this.row + 1, this.column - 2]
        let possibleSpot5 = [this.row - 2, this.column - 1]
        let possibleSpot6 = [this.row - 2, this.column + 1]
        let possibleSpot7 = [this.row - 1, this.column - 2]
        let possibleSpot8 = [this.row - 1, this.column + 2]

        possibleHorseSpots.push(...[possibleSpot1, possibleSpot2, possibleSpot3, possibleSpot4, possibleSpot5, possibleSpot6, possibleSpot7, possibleSpot8])
        // filter out all moves that go outside the board
        let possibleMovesFiltered = possibleHorseSpots.filter(move => {
            if (move[0] < 0 || move[1] < 0 || move[0] > 7 || move[1] > 7 || move == [this.row, this.column]) {
                return false
            } else {
                return true
            }
        })
        possibleMovesFiltered.forEach(spot => {
            if (isOpposingHorse(pieces, spot, this.color)) {
                check = true
            }
        })
        return check
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

                // return true
                pieceCanMove = true
            }
        })
        return pieceCanMove
    }

}

