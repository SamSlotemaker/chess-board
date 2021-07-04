//logic that the pieces need to share 
Object.prototype.dragging = function (x, y) {
    console.log('test drag prototype');
    this.x = y - this.size / 2
    this.y = x - this.size / 2
}

//update new position
Object.prototype.update = function (y, x) {
    this.x = this.tileSize * x
    this.y = this.tileSize * y
}