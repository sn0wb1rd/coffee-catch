/*
Ironhack project 1: Jan 2021
Cindy Teeven
Coffee Catch
source img: https://www.gameart2d.com/
*/
// Questions/stuck:


// gameScreen
let gameScreen  = document.querySelector('#game-screen')
gameScreen.style.backgroundColor = "#f2ffe6";
let gs     = gameScreen.getContext('2d')
gameScreen.style.border = '1px solid #56b300'

// scoreBord
// let scoreBord  = document.querySelector('#score-bord')
// scoreBord.style.backgroundColor = "#f2ffe6";
// let sb     = scoreBord.getContext('2d')
// scoreBord.style.border = '1px solid #56b300'


// general variables
let intervalID = 0;
let isUpArrow = false;
let isDownArrow = false;

// draw the player (dummie object for time being)
let playerX = 100;
let playerY = 100;
let playerWidth = 35;
let playerHeight = 35;
let incrementPlayerY = 10;

// // draw the coffeecup (dummie object for time being)
// let itemX = 750;
// let itemY = 50;
// let itemWidth = 35;
// let itemHeight = 35;
// let incrementItemX = 15;

//scorebords
let coffeeBar = 0;



// add listener for up Arrow up and down
document.addEventListener('keydown', (event) => {
    if (event.keyCode == 38 || event.key == "ArrowUp") {
        isUpArrow = true;
        isDownArrow = false;
        (console.log('isArrowUp'))
    }
    else if (event.keyCode == 40 || event.key == "ArrowDown" ) {
        isUpArrow = false;
        isDownArrow = true;
        (console.log('isArrowDown'))
    }
})

document.addEventListener('keyup', (event) => {
    isUpArrow = false;
    isDownArrow = false;
})


// create dummie player object
function tempObjectPlayer() {
    gs.beginPath()
    gs.fillStyle = "#006600"
    // console.log(playerX + "/" + playerY + "/" + playerWidth + "/" + playerHeight)
    gs.fillRect(playerX, playerY, playerWidth, playerHeight)
    gs.closePath()
}




// let intervallNr = 0 // for testing

// let player move
function movePlayer() {

    //intervallNr += 1 // for testing

    tempObjectPlayer()

    if (isUpArrow && (playerY > 0)) {
        playerY -= incrementPlayerY
    }
    else if (isDownArrow && (playerY + playerWidth < gameScreen.height)) {
        playerY += incrementPlayerY
    }
}


function drawAllItems() {
    gs.clearRect(0, 0, gameScreen.width, gameScreen.height)
    
  
    
    movePlayer()
   
    // // if coffee item reaches left corner OR touches coffeeitem;
    // // let is dissapear 
    // // take into account the increment steps! (dissapears earlier)
    // if (itemX > 0) {
    //     moveCoffeeCup()
    //     itemX -= incrementItemX
    //     // console.log(itemX)
    // }  

    moveCoffeeCup()
    // console.log('itemX: ', itemX, ' / playerX: ', playerY)

 
}

function startGame(){
    intervalID = setInterval(() => {
        requestAnimationFrame(drawAllItems)
    }, 300)
}

startGame()