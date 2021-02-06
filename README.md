# **coffee-catch**

[Click here to see deployed game](https://github.com/sn0wb1rd/coffee-catch.git)

## **Description**
Coffee-catch is a perfect game for coffeelovers! Move up and down to grab the coffee and lab assigments (Labs) as they pass by. Be sure to drink enough coffee so you are able to complete enough Labs. Grab enough Labs and you win the game! You need to drink coffee for getting the labs, so make sure your coffeebar doesn't get emtpy. But don't drink too much coffee or you'll will get a coffee-overload!

## **MVP**
- 1 player-items that moves vertically on specific X-axis 
- coffee-item moves horizontally to the west on random Y-axis
- labs-item moves horizontally to the west on random Y-axis
- 1 vertical green bar (coffeebar aka energiebar) with that counts n-coffee
- 1 vertical red bar that counts n-labs (labs score)
- one canvas for the game itself with the moving items
- one canvas for the coffeebar and the labs score
- game over: coffeebar < 0 or > 5. 
- win: labs score = 8

## **Backlog**
- add coundown timer
- coffeebar and labsscore with gradient color that match the score
- soundeffect: when centren bar-value is reached (coffebar = 8 )
- 3x labs in a row = bonus items apprears on the screen to catch
- let the player jump over items
- different size of the items that accounts for different (fractional) points (0.5)
- item: extra time
- item: pc-crash
- item: BIG challenge
- item: idea, new insight
- item: tea (fraction of coffee for coffeebar)
- item: lunchbreak (donut, croissant, pie)
- soundeffect: by catching items

## **Data structure**
## **main.js**
### main.start()
- get setting radiobutton (choose player)
- install eventlisteners for cursors (up, down, w, s)
- create new ImgItem
- setting intervals (drawing, moving player, creating and moving coffeecup and labbooks)
### drawAllItems()
### movePlayer()
### produceCoffeeCup() 
### produceLabBoook()
### moveCoffeeCups() 
- checks collision
- change progressbars
### moveLabBooks() (checks collision, change progressbars)
### checkWinningConditions()

## **gameItem.js**
### GameItem()
- xw()
- yh()
- cornerCheck(otherGameItem)
- checkCollision(otherGameItem)
- move(xDistance, yDistance)
- moveVertical(yDistance) 
- moveHorizontal(xDistance)
- setCoffeeProgressBar(coffeeBarScore)
- setLabProgressBar(labBarScore)
- gameOver()
### RectItem
- draw(canvas)
### ImgItem()
- draw(canvas)

## **States (screen transitions)**
- gameView
- endView
- startView

## **Links**
- [Trello Link](https://trello.com/b/X8J2wJHS/coffee-catch)
- [Slides Link](https://slides.com/cindytvn/coffee-catch/fullscreen)
- [Github repository Link](https://github.com/sn0wb1rd/coffee-catch)
- [Deployment Link](https://sn0wb1rd.github.io/coffee-catch/)