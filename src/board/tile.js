class Tile {
    constructor(tileSize, x, y) {
        this.size = tileSize
        this.row = x + 1
        this.column = y + 1
        this.x = this.size * x
        this.y = this.size * y
    }

    update() {

    }

    //draw the tile
    show() {
        strokeWeight(0)
        //check which color it needs to be by even row or number
        if (!isEven(this.column)) {
            if (isEven(this.row)) {
                fill(180, 120, 80)
            } else {
                fill(255)
            }
        } else {
            if (isEven(this.row)) {
                fill(255)
            } else {
                fill(180, 120, 80)
            }
        }
        square(this.x, this.y, this.size)
    }
}

function isEven(number) {
    return (number % 2 == 0)
}

