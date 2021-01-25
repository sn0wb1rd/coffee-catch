/*
Ironhack project 1: Jan 2021
Cindy Teeven
Coffee Catch
*/

let coffeeImg = document.createElement('img')
coffeeImg.src = 'images/cappoccino.png'

let incrX = 15; //defines the speed
let axisY = [100, 200, 300, 400]
let coffeeArr = [{x: 750, y: 100, sW:40, sH:40},
                 {x: 750, y: 150, sW:40, sH:40}
                ]


// try with coffee picture
function moveCoffeeCup () {
    // loop over set of coffeecups
    for (let i=0; i < coffeeArr.length; i++) {
        gs.drawImage(coffeeImg, coffeeArr[i].x, coffeeArr[i].y, coffeeArr[i].sW, coffeeArr[i].sH)
        
        // if coffee item reaches left corner OR touches coffeeitem;
        // let is dissapear 
        // take into account the increment steps! (dissapears earlier)

        if (coffeeArr[i].x > 0) {
            coffeeArr[i].x -= incrX;

            //check if item reaches (west-end of screen)
            if (coffeeArr[i].x == 0) {
                // add a new item at East side
                coffeeArr.push({
                    x: gameScreen.width,
                    y: 100 //TODO: set random from axisY
                })

            }


        }
        // move to the west over x with incr (veloc.) and static y

    }


}



// >> not working



