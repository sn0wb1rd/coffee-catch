/*
Ironhack project 1: Jan 2021
Cindy Teeven
Coffee Catch
source img: https://www.gameart2d.com/
*/
// Questions/stuck:
// why again not using selectElement by Idea insted of queryselector?

class Main {
    constructor() {        
        this.startView = document.querySelector('#start-view')
        this.gameView = document.querySelector('#game-view')
        this.endView = document.querySelector('#end-view')

        this.gameScreen  = document.querySelector('#game-screen')        
        this.gs     = this.gameScreen.getContext('2d')

        // general html elements
        this.startBtn = document.querySelector('#start')
        this.startAgainBtn = document.querySelector('#start-again')
        this.endcontainerDOM = document.querySelector('#endcontainer span')
     
        // score
        this.coffeebarScoreDOM = document.querySelector('#coffeebar span')
        this.coffeebarScoreDOM.innerText = 0 // startvalue
        this.labsScoreDOM = document.querySelector('#labscore span')
        this.labsScoreDOM.innerText = 0 // startvalue
     
        // general variables
        this.intervalID = 0;
        this.isUpArrow = false;
        this.isDownArrow = false;
        this.drawTimeMs = 100;
        this.drawIntervall = null;
        
        // draw the player 
        this.player = null; // null = non-existing object
        this.playerCategory = "player"
        this.playerImg = document.createElement('img')
        //this.playerMaleImg.src = 'images/player_male_40x50.png' 
        this.playerImg.src = 'images/player_female_40x46.png'        
        this.playerX = 100;
        this.playerY = 100;
        this.playerWidth = 40;
        this.playerHeight = 46;
        this.incrementPlayerY = 10;
        this.moveTimeMs = 100; // seperate checkkeys from drawing 
        this.moveIntervall = null;

        // Items ------------------------------------------------
        this.movingItems = []

        // draw the coffeecup 
        this.coffeeCups = []
        this.coffeeCategory = "coffee"
        this.coffeeCupProductionTimeMs = 1000
        this.coffeeSize = [15, 20, 30, 40]
        this.coffeeAxisY = [100, 200, 300, 400]
        this.coffeeImg = document.createElement('img')
        this.coffeeImg.src = 'images/coffee.png'
        this.coffeeCupProductionIntervall = null;

        // draw the coffeecup (dummie object for time being)
        this.labBooks = []
        this.labBookCategory = "labbook"
        this.labBookProductionTimeMs = 1000
        this.labBookSize = [15, 20, 30, 40]
        this.labBookAxisY = [100, 200, 300, 400]
        this.labBookImg = document.createElement('img')
        this.labBookImg.src = 'images/book.png'
        this.labBookCupProductionIntervall = null;

        this.coffeeTimeoutMs = 10;
        this.coffeeIncrX = 1;
        this.coffeeIncrXIntervall = null;
        
        //scorebords
        this.coffeeBar = 0;
        this.labsScore = 0;
    }

    // -------------------------------------------------------
    start() {

        // make sure the gamescreen is visible
        this.startBtn.style.display = 'none'

        // add listener for up Arrow up and down
        document.addEventListener('keydown', (event) => {
            if (event.keyCode == 38 || event.key == "ArrowUp" ||
                event.keyCode == 87 || event.key == "W" 
                ) {
                this.isUpArrow = true;
                this.isDownArrow = false;
            }
            else if (event.keyCode == 40 || event.key == "ArrowDown" ||
                     event.keyCode == 83 || event.key == "ArrowDown"             
                ) {
                this.isUpArrow = false;
                this.isDownArrow = true;
            }
        })

        document.addEventListener('keyup', (event) => {
            this.isUpArrow = false;
            this.isDownArrow = false;
        })

        // DRAW rectangle - create dummie player by creating RectItem object
        this.player = new ImgItem(this.playerX, this.playerY, this.playerWidth, this.playerHeight, this.playerCategory, this.playerImg)

        // set intervals for draws and movements ----------------------------------
        // the intervals HAS to be in an function, otherwise 'this' falls out of scope..
        // TODO create one interval?

        //drawing the player
        this.drawIntervall = setInterval(() => {
            requestAnimationFrame(() => this.drawAllItems())
        }, this.drawTimeMs)

        //  set interval for moving the player (check the keydown presses)
        this.moveIntervall = setInterval(() => {
            this.movePlayer()
        }, this.moveTimeMs)

        // interval for creating coffeecups
        this.coffeeCupProductionIntervall = setInterval(() => {
            this.produceCoffeeCup()
            this.produceLabBoook()
        }, this.coffeeCupProductionTimeMs)

        // interval for moving the coffeecups ans labbooks
        this.coffeeIncrXIntervall = setInterval(() => {
            this.moveCoffeeCups()
            this.moveLabBooks()
        }, this.coffeeTimeoutMs)
        // -------------------------------------------------------------------------
    }

    drawAllItems() {
        this.gs.clearRect(0, 0, this.gameScreen.width, this.gameScreen.height)
        this.player.draw(this.gs) // draws the player rectangle from RecItem class
        this.coffeeCups.forEach((elem) => elem.draw(this.gs))
        this.labBooks.forEach((elem) => elem.draw(this.gs))

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
        let coffeeCup = new ImgItem(
            this.gameScreen.width - randomSize, 
            this.coffeeAxisY[(Math.floor(Math.random()*this.coffeeAxisY.length))],
            randomSize,
            randomSize,
            this.coffeeCategory,
            this.coffeeImg);
        this.coffeeCups.push(coffeeCup)
    };

    produceLabBoook() {
        let randomSize = this.coffeeSize[(Math.floor(Math.random()*this.coffeeSize.length))];
        let labBook = new ImgItem(
            this.gameScreen.width - randomSize +10, 
            this.coffeeAxisY[Math.floor(Math.random()*this.coffeeAxisY.length)] + 10,
            randomSize,
            randomSize,
            this.labBookCategory,
            this.labBookImg);
        this.labBooks.push(labBook)
    };

    // TODO make generic
    moveCoffeeCups() {
        this.coffeeCups.forEach((elem) => {
            elem.moveHorizontal(-this.coffeeIncrX)  // minus because it moves to the west
        })

        // filter out all the items that reached the west-border or collide with the player
        this.coffeeCups = this.coffeeCups.filter((elem) => {
            if(elem.x <= 0) {
                return false
              // use the player object with the checkCollision method  
            } else if (elem.checkCollision(this.player)) {
                this.coffeeBar++
                this.coffeebarScoreDOM.innerText = this.coffeeBar

                // set here the score of the coffeebar and labsscore
                console.log('coffeeBar: ', this.coffeeBar)
                this.checkWinningConditions()
                return false
            } else {
                return true
            };           
        })        
    };

    // TODO make generic together with coffeecup
    moveLabBooks() {
        this.labBooks.forEach((elem) => {
            elem.moveHorizontal(-this.coffeeIncrX)  // minus because it moves to the west
        })

        // filter out all the items that reached the west-border or collide with the player
        this.labBooks = this.labBooks.filter((elem) => {
            if(elem.x <= 0) {
                return false
                // use the player object with the checkCollision method  
            } else if (elem.checkCollision(this.player)) {
                this.labsScore++
                this.labsScoreDOM.innerText = this.labsScore
                this.coffeeBar--
                this.coffeebarScoreDOM.innerText = this.coffeeBar

                // set here the score of the coffeebar and labsscore
                console.log('coffeeBar: ', this.labsScore)
                this.checkWinningConditions()
                return false
            } else {
                return true
            };           
        })        
    };

    checkWinningConditions(){
        if ((this.coffeeBar > 5) || (this.coffeeBar < 0)){
            console.log('lost game') // test
            this.wingame = false
            this.gameOver(this.wingame)
        } else if (this.labsScore >= 8) {
            console.log('won game') // test
            this.wingame = true
            this.gameOver(this.wingame)
        };
    }

    gameOver(wingame){
        console.log('game over')
        this.startView.style.display = 'none'
        this.gameView.style.display = 'none'
        this.endView.style.display = ''

        // set coffee- and labscore back to 0
        this.coffeeBar = 0;
        this.labsScore = 0;
        this.labsScoreDOM.innerText = this.labsScore
        this.coffeebarScoreDOM.innerText = this.coffeeBar

        // set end-view text
        if(this.wingame){
            this.endcontainerDOM.innerText = "Congrats, You win! You've found the perfect balans between coffee and completing the labs."
            this.startAgainBtn.innerText = "Play again!"
            console.log('yeey you win!') // test
             // set coffee- and labscore back to 0
            this.coffeeBar = 0;
            this.labsScore = 0;

        } else {
            this.endcontainerDOM.innerText = "Aahw you loose.."
            this.startAgainBtn.innerText = "Try again?"
            console.log('aaah you loose') // test
            // set coffee- and labscore back to 0
            this.coffeeBar = 0;
            this.labsScore = 0;
        }


        //clearInterval(# all intervals);
        clearInterval(this.drawIntervall); 
        clearInterval(this.moveIntervall);
        clearInterval(this.coffeeCupProductionIntervall);
        clearInterval(this.coffeeIncrXIntervall);     
        clearInterval(this.labScoreCupProductionIntervall);
    };
}


// -------------------------------------------------------------------
let main;

// TODOdo refactor style.displays

window.addEventListener('load', () => {
    main = new Main()
    main.gameView.style.display = 'none'
    main.endView.style.display = 'none'
    main.startView.style.display = ''


    // start click event listener
    main.startBtn.addEventListener('click', () => {
        main.startView.style.display = 'none'
        main.endView.style.display = 'none'
        main.gameView.style.display = ''

        main.start()
    })    

    // klick button for try again
    main.startAgainBtn.addEventListener('click', () => {
        main.endView.style.display = 'none'
        main.startView.style.display = 'none'
        main.gameView.style.display = ''
        main.start()
    }) 

})
// -------------------------------------------------------------------
