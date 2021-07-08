class Tile {
    constructor(tileSize, x, y) {
        this.size = tileSize
        this.row = x + 1
        this.column = y + 1
        this.x = this.size * x
        this.y = this.size * y
        this.possibleMove = false;
    }

    //draw the tile
    show() {
        strokeWeight(0)
        //check which color it needs to be by even row or number
        if (!isEven(this.column)) {
            if (isEven(this.row)) {
                fill(101, 139, 111)
            } else {

                fill(255)
            }
        } else {
            if (isEven(this.row)) {
                fill(255)
            } else {
                fill(101, 139, 111)
            }
        }
        square(this.x, this.y, this.size)

        if (this.possibleMove) {
            //draw a litle circle in the middle of the square
            fill(255, 40, 255)
            translate(this.size / 2, this.size / 2)
            circle(this.x, this.y, this.size / 2)
            translate(-(this.size / 2), -(this.size / 2))
        }
    }
}

function isEven(number) {
    return (number % 2 == 0)
}

