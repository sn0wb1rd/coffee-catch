// Do a cornercheck van two items for collision, on both ways. It also accounts for objects that differ in sizes
class GameItem {
    constructor(x, y, width, height, category) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.category = category
    };
    // derivated value xw and xh insted of directly saving it
    // right bound of object
    xw() {
        return this.x + this.width;
    };
    // lower bound of object
    yh() {
        return this.y + this.height;
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
    // returns boolean (true with collision)
    checkCollision(otherGameItem) {
        return this.cornerCheck(otherGameItem) || otherGameItem.cornerCheck(this)
    }
    // move general
    move(xDistance, yDistance){
        this.x +=xDistance
        this.y +=yDistance
    }
    moveVertical(yDistance) {
        this.move(0, yDistance)
    }
    moveHorizontal(xDistance) {
        this.move(xDistance,0)
    }    
};
// temp class for rectangle dummie that extends the RectItem with the GameItems properties and methods
class RectItem extends GameItem {
    constructor(x, y, width, height, category, color){
        super(x, y, width, height, category)
        this.color = color
    };
    draw(canvas){
        canvas.beginPath()
        canvas.fillStyle = this.color
        canvas.fillRect(this.x, this.y, this.width, this.height)
        canvas.closePath()
    };
};

// extend the ImgItem with the GameItems properties and methods
class ImgItem extends GameItem {
    constructor(x, y, width, height, category, imgNode){
        super(x, y, width, height, category)
        this.imgNode = imgNode
    };
    draw(canvas){
        canvas.drawImage(this.imgNode, this.x, this.y, this.width, this.height)
    };
};



