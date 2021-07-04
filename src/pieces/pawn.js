class Pawn {

    constructor(tileSize, y, x, color) {
        this.tileSize = tileSize
        this.size = this.tileSize
        this.row = Number(y)
        this.column = Number(x)
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

    update(y, x) {
        this.x = this.tileSize * x
        this.y = this.tileSize * y
    }

    dragging(x, y) {
        this.x = y - this.size / 2
        this.y = x - this.size / 2
    }

    move(row, column) {
        console.log('old row: ' + this.row)
        console.log(this.column)

        let oldRow = this.row
        let oldColumn = this.column

        let newRow = Number(row)
        let newColumn = Number(column)

        console.log('to:');
        console.log('new row: ' + newRow)

        if (newRow == oldRow - 1) {
            this.row = newRow
            this.column = newColumn
            return true
        }


    }

    show() {
        image(this.img, this.x, this.y, this.size, this.size)
    }

    clicked() {
        console.log('clicked on pawn')
    }
}
