//logic that the pieces need to share 

//drag pieces to move them
Object.prototype.dragging = function (x, y) {
    this.x = y - this.size / 2
    this.y = x - this.size / 2
}

//update new position
Object.prototype.update = function (y, x) {
    this.x = this.tileSize * x
    this.y = this.tileSize * y
}

//show img
Object.prototype.show = function () {
    image(this.img, this.x, this.y, this.size, this.size)
}

//check if piece would capture own color
function wouldCaptureOwnPiece(pieces, oldRow, oldColumn, newRow, newColumn) {
    if (pieces[newRow][newColumn].color == pieces[oldRow][oldColumn].color) {
        console.log('cant capture own piece')
        return true
    } else {
        return false
    }
}


// Check if there are pieces in the way
//check down
function checkRoadblockDown(pieces, oldRow, oldColumn) {
    for (let i = oldRow + 1; i < rows; i++) {
        if (typeof pieces[i][oldColumn] == 'object') {
            return [i, oldColumn]
        }
    }
}

//check up
function checkRoadblockUp(pieces, oldRow, oldColumn) {
    for (let i = (oldRow - 1); i >= 0; i--) {
        if (typeof pieces[i][oldColumn] == 'object') {
            return [i, oldColumn]
        }
    }
}

//check right
function checkRoadblockRight(pieces, oldRow, oldColumn) {
    for (let i = (oldColumn + 1); i < rows; i++) {
        if (typeof pieces[oldRow][i] == 'object') {
            return [oldRow, i]
        }
    }
}

//check left
function checkRoadblockLeft(pieces, oldRow, oldColumn) {
    for (let i = (oldColumn - 1); i >= 0; i--) {
        if (typeof pieces[oldRow][i] == 'object') {
            return [oldRow, i]
        }
    }
}
