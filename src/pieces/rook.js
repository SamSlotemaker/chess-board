class Rook {

    constructor(tileSize, y, x, color) {
        this.tileSize = tileSize
        this.size = this.tileSize
        this.row = y + 1
        this.column = x + 1
        this.x = this.tileSize * x
        this.y = this.tileSize * y
        this.color = color
        this.img
        if (this.color == 'white') {
            this.img = rookImgWhite
        } else {
            this.img = rookImg
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

    show() {


        image(this.img, this.x, this.y, this.size, this.size)
    }
}
