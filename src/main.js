/*
Ironhack project 1: Jan 2021
Cindy Teeven
Coffee Catch
source img: https://www.gameart2d.com/
*/
// Questions/stuck:

class Main {
    constructor() {
        this.gameScreen  = document.querySelector('#game-screen')
        this.gameScreen.style.backgroundColor = "#f2ffe6";
        this.gs     = this.gameScreen.getContext('2d')
        this.gameScreen.style.border = '1px solid #56b300'
        
        // general variables
        this.intervalID = 0;
        this.isUpArrow = false;
        this.isDownArrow = false;
        this.drawTimeMs = 300;
        this.drawIntervall = null;
        
        // draw the player (dummie object for time being)
        this.player = null; // null = non-existing object
        this.playerX = 100;
        this.playerY = 100;
        this.playerWidth = 35;
        this.playerHeight = 35;
        this.incrementPlayerY = 10;
        this.moveTimeMs = 100; // seperate checkkeys from drawing 
        this.moveIntervall = null;
     
        // // draw the coffeecup (dummie object for time being)
        this.coffeeCups = []
        this.coffeeCupProductionTimeMs = 1000
        this.coffeeSize = [15, 20, 30, 40]
        this.coffeeAxisY = [100, 200, 300, 400]
        this.coffeeImg = document.createElement('img')
        this.coffeeImg.src = 'images/cappoccino.png'
        this.coffeeCupProductionIntervall = null;

        this.coffeeTimeoutMs = 10;
        this.coffeeIncrX = 1;
        this.coffeeIncrXIntervall = null;
        
        //scorebords
        this.coffeeBar = 0;
    }

    // -------------------------------------------------------
    start() {
        // add listener for up Arrow up and down
        document.addEventListener('keydown', (event) => {
            if (event.keyCode == 38 || event.key == "ArrowUp") {
                this.isUpArrow = true;
                this.isDownArrow = false;
            }
            else if (event.keyCode == 40 || event.key == "ArrowDown" ) {
                this.isUpArrow = false;
                this.isDownArrow = true;
            }
        })

        document.addEventListener('keyup', (event) => {
            this.isUpArrow = false;
            this.isDownArrow = false;
        })

        // create dummie player bycreating RectItem object
        this.player = new RectItem(this.playerX, this.playerY, this.playerWidth, this.playerHeight, "#006600")

        // set intervals for draws and movements ----------------------------------
        // this HAS to be in an function, otherwise 'this' falls out of scope..
        this.drawIntervall = setInterval(() => {
            requestAnimationFrame(() => this.drawAllItems())
        }, this.drawTimeMs)

        //  set interval for moving the player
        this.moveIntervall = setInterval(() => {
            this.movePlayer()
        }, this.moveTimeMs)

        // this HAS to be in an function, otherwise 'this' falls out of scope..
        this.coffeeCupProductionIntervall = setInterval(() => {
            this.produceCoffeeCup()
        }, this.coffeeCupProductionTimeMs)

        // this HAS to be in an function, otherwise 'this' falls out of scope..
        this.coffeeIncrXIntervall = setInterval(() => {
            this.moveCoffeeCups()
        }, this.coffeeTimeoutMs)
    }

    drawAllItems() {
        this.gs.clearRect(0, 0, this.gameScreen.width, this.gameScreen.height)
        this.player.draw(this.gs) // draws the player rectangle from RecItem class
        this.coffeeCups.forEach((elem) => elem.draw(this.gs))

        // set here the score of the score

    };

    movePlayer() {
        if (this.isUpArrow && (this.player.y > 0)) {
            this.player.moveVertical(-this.incrementPlayerY) // minus since we're moving up
        }
        else if (this.isDownArrow && (this.player.y + this.playerWidth < this.gameScreen.height)) {
            this.player.moveVertical(this.incrementPlayerY)
        }
    };

    produceCoffeeCup() {
        let randomSize = this.coffeeSize[(Math.floor(Math.random()*this.coffeeSize.length))];
        let coffeeCup = new ImgItem(this.gameScreen.width - randomSize, 
            this.coffeeAxisY[(Math.floor(Math.random()*this.coffeeAxisY.length))],
            randomSize,
            randomSize,
            this.coffeeImg);
        this.coffeeCups.push(coffeeCup)
    };

    moveCoffeeCups() {
        this.coffeeCups.forEach((elem) => {
            elem.moveHorizontal(-this.coffeeIncrX)  // minus because it moves to the west
        })

        // filter out all the items that reached the west border or with the player
        this.coffeeCups = this.coffeeCups.filter((elem) => {
            if(elem.x <= 0) {
                return false
              // use the player object with the checkCollision method  
            } else if (elem.checkCollision(this.player)) {
                this.coffeeBar++
                return false
            } else {
                return true
            };           
        })
        //console.log('coffeecups: ', this.coffeeCups)
    };

    gameOver(){
        // space for gameover
        //clearInterval(# all intervals);
        console.log('game over')
    };
}

let main;

window.addEventListener('load', () => {
    main = new Main()
    main.start()
})

