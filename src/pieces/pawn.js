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

    //update new position
    update(y, x) {
        this.x = this.tileSize * x
        this.y = this.tileSize * y
    }

    //update position to mouse position
    dragging(x, y) {
        this.x = y - this.size / 2
        this.y = x - this.size / 2
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

        if (this.color === 'white') {
            if (newRow >= oldRow - pawnStep && newRow < oldRow) {
                this.row = newRow
                this.column = newColumn
                return true
            }
        } else {
            if (newRow <= oldRow + pawnStep && newRow > oldRow) {
                this.row = newRow
                this.column = newColumn
                return true
            }
        }
    }

    show() {
        image(this.img, this.x, this.y, this.size, this.size)
    }

    clicked() {
        console.log('clicked on pawn')
    }
}
