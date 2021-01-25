// Do a cornercheck van two items for collision, on both ways. It also accounts for objects that differ in sizes
class GameItem {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = heigth
        this.xw = x + width
        this.yh = y + height
    }

    cornerCheck(otherGameItem) {
        // check if the left upper coordinate (y,x) of other object lies ín the this.object
        if (this.x <= otherGameItem.x &&
            this.xw >= otherGameItem.x &&
            this.y <= otherGameItem.y &&
            this.yh >= otherGameItem.y) {
                return true
        }
        // check if the left down coordinate (x, yh) of other object lies ín the this.object
        if (this.x <= otherGameItem.x &&
            this.xw >= otherGameItem.x &&
            this.y <= otherGameItem.yh &&
            this.yh >= otherGameItem.yh) {
                return true
        }
        // check if the right upper coordinate (xw, y) of other object lies ín the this.object
        if (this.x <= otherGameItem.xw &&
            this.xw >= otherGameItem.xw &&
            this.y <= otherGameItem.y &&
            this.yh >= otherGameItem.y) {
                return true
        }
        // check if the right down coordinate (xw, yh) of other object lies ín the this.object
        if (this.x <= otherGameItem.xw &&
            this.xw >= otherGameItem.xw &&
            this.y <= otherGameItem.yh &&
            this.yh >= otherGameItem.yh) {
                return true
        }
        return false
    }

    // do the cornercheck the otherway around (using previous method)
    checkColission(otherGameItem) {
        return this.cornerCheck(otherGameItem) || otherGameItem.cornerCheck(this)
    }
}



