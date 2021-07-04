class Rook {

    constructor(tileSize, y, x, color) {
        this.tileSize = tileSize
        this.size = this.tileSize
        this.row = y + 1
        this.column = x + 1
        this.x = this.tileSize * x
        this.y = this.tileSize * y
        this.color = color
    }

    update() {

    }

    show() {
        let img;
        if (this.color == 'white') {
            img = rookImgWhite
        } else {
            img = rookImg
        }

        image(img, this.x, this.y, this.size, this.size)
    }
}
