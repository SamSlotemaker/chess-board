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
    }

    //check if piece can move
    move(row, column) {
        let oldRow = this.row
        let oldColumn = this.column

        let newRow = row
        let newColumn = column

        console.log(`moving pawn from ${oldRow}|${oldColumn} to: ${newRow}|${newColumn}`)

        let pawnStep;
        if ((this.color === 'white' && oldRow == 6) || (this.color === 'black' && oldRow == 1)) {
            pawnStep = 2
        } else {
            pawnStep = 1
        }

        //white needs to move up
        if (this.color === 'white') {
            //check if it lies between old spot and maximum steps forward
            if (newRow < oldRow && newRow >= oldRow - pawnStep) {
                //update new position
                this.row = newRow
                this.column = newColumn
                return true
            }
        } else {
            if (newRow > oldRow && newRow <= oldRow + pawnStep) {
                //update new position
                this.row = newRow
                this.column = newColumn
                return true
            }
        }
    }

}
