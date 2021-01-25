// Do a cornercheck van two items for collision, on both ways. It also accounts for objects that differ in sizes
class GameItem {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = heigth
    };
    // derivated value xw and xh insted of directly saving it
    xw() {
        return this.x + this.width;
    };
    yh() {
        return this.y + this.heigth;
    };
    cornerCheck(otherGameItem) {
        // check if the left upper coordinate (y,x) of other object lies ín the this.object
        if (this.x <= otherGameItem.x &&
            this.xw() >= otherGameItem.x &&
            this.y <= otherGameItem.y &&
            this.yh() >= otherGameItem.y) {
                return true
        };
        // check if the left down coordinate (x, yh) of other object lies ín the this.object
        if (this.x <= otherGameItem.x &&
            this.xw() >= otherGameItem.x &&
            this.y <= otherGameItem.yh() &&
            this.yh() >= otherGameItem.yh()) {
                return true
        };
        // check if the right upper coordinate (xw, y) of other object lies ín the this.object
        if (this.x <= otherGameItem.xw() &&
            this.xw() >= otherGameItem.xw() &&
            this.y <= otherGameItem.y &&
            this.yh() >= otherGameItem.y) {
                return true
        };
        // check if the right down coordinate (xw, yh) of other object lies ín the this.object
        if (this.x <= otherGameItem.xw() &&
            this.xw() >= otherGameItem.xw() &&
            this.y <= otherGameItem.yh() &&
            this.yh() >= otherGameItem.yh()) {
                return true
        };
        return false
    };
    // do the cornercheck the otherway around (using previous method)
    checkColission(otherGameItem) {
        return this.cornerCheck(otherGameItem) || otherGameItem.cornerCheck(this)
    }
    // move general
    move(x, y){
        this.x +=x
        this.y +=y
    }
    moveVertical(y) {
        this.move(0, y)
    }
    moveHorizontal(x) {
        this.move(x,0)
    }    
};

// exten the ImgItem with the GameItems properties and methods
class ImgItem extends GamteItem {

};



