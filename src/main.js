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
let incrementPlayerY = 5;


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

let intervallNr = 0

// main
function draw() {
    // console.log("gs.width " + gs.width + " gs.height " + gs.height)
    gs.clearRect(0, 0, gameScreen.width, gameScreen.height)

    intervallNr += 1

    tempObjectPlayer()

    if (isUpArrow && (playerY > 0)) {
        playerY -= incrementPlayerY
        console.log('check uparrow')
    }
    else if (isDownArrow && (playerY < gameScreen.height)) {
        playerY += incrementPlayerY
        console.log('check downarrow')
    }

}

console.log('player', playerY)

// setInterval(() => {
//     requestAnimationFrame(draw)
// }, 1)

function startGame(){
    intervalID = setInterval(() => {
        requestAnimationFrame(draw)
    }, 100)
}


startGame()