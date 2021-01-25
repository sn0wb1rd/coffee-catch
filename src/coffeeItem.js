/*
Ironhack project 1: Jan 2021
Cindy Teeven
Coffee Catch
*/

let coffeeImg = document.createElement('img')
coffeeImg.src = 'images/cappoccino.png'

let incrX = 25; //defines the speed
let axisY = [100, 200, 300, 400]
let coffeeArr = [{x: 750, y: axisY[0], sW:40, sH:40},
                 {x: 750+100, y: axisY[2], sW:40, sH:40}
                ]
let coffeeSize = [15, 20, 30, 40]


function checkCollosion(x, y, height, width){

        // when player catches the coffee >> replaced by a class function
        // if (itemX-itemWidth == playerX &&  // check collision at the vertical axis AND
        //     (itemY >= playerY && itemY <= playerY+playerHeight || // check collision from with item top OR    
        //     itemY+itemHeight >= playerY && itemY+itemHeight <= playerY+playerHeight)) // check collision from with item bottom
        //     {
        //     // inscrease score at coffeeBar    
        //     coffeeBar++      
        //     //console.log('coffeebar: ', coffeeBar)
    
        // }   
}


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
                let randomSize = coffeeSize[(Math.floor(Math.random()*coffeeSize.length))];
                coffeeArr.push({
                    x:  750 + inbetween(50, 300, 25),
                    y:  axisY[(Math.floor(Math.random()*axisY.length))], 
                    sW: randomSize,
                    sH: randomSize
                })
                //console.log(coffeeArr[i])
                
            }
        }

        // checkCollosion()
    }
})



// >> not working



