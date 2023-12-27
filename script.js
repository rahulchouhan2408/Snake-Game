let inputDir = {x:0, y:0};
let music = new Audio("bg-music.mp3")
let eat = new Audio("eating.mp3");
let gameOverMusic = new Audio("game-over.mp3");
let move = new Audio("direction.mp3");
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x:13, y:15}
]
let food = {x:10, y:10};
let board = document.querySelector('.board');
let scoreCard = document.getElementById('scoreCard');



// Game Function
function main(ctime){
    window.requestAnimationFrame(main);
    console.log(ctime);
    if((ctime - lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    // if you bump into the wall
    if (snake[0].x >= 20 || snake[0].x < 0 || snake[0].y < 0 || snake[0].y >= 20) {
        return true;
    }

    return false;
}



function gameEngine(){
// Part 1: updating the snake array and food
if(isCollide(snakeArr)){
    gameOverMusic.play();
    inputDir = {x:0, y:0};
    alert("Game Over, Press any key to play again");
    snakeArr = [{x:13, y:15}];
    score = 0;
    music.play();
}

// If you have eaten the food, increment the score and regenerate the food
if(snakeArr[0].y=== food.y && snakeArr[0].x === food.x){
    score += 1;
       if(score>highScore){
        highScoreValue = score;

        localStorage.setItem("highScore", JSON.stringify(highScoreValue));
        highscoreCard.innerHTML = "High score: " + highScoreValue;


       }

    if (scoreCard) {
        scoreCard.innerHTML = "score: " + score;
    }
    eat.play()
    snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y});
    let a = 2;
    let b = 16;
    food={x:Math.round(a+(b-a)* Math.random()), y:Math.round(a+(b-a)* Math.random())}
}
// moving the snake 
for(let i = snakeArr.length-2; i>=0; i--){
    snakeArr[i+1]= {...snakeArr[i]};
}
snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;



// part 2: Display the snake and food
// Display the snake
board.innerHTML = "";
snakeArr.forEach((e, index)=>{
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if(index === 0){
        snakeElement.classList.add('head');
    }else{

        snakeElement.classList.add('snake');
    }
   
    board.appendChild(snakeElement);
});
//Display the food 
foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}




// Main logic start here
let highScore = localStorage.getItem("highScore");
if(highScore === null){
    highScoreValue = 0;
    localStorage.setItem("highScore", JSON.stringify(highScoreValue))
}else{
    highScoreValue = JSON.parse(highScore);
    highscoreCard.innerHTML = "High score: " + highScore;
}

window.requestAnimationFrame(main);

window.addEventListener('keydown', (e) => {
    move.play();
    switch (e.key) {
        case 'ArrowUp':
            if (inputDir.y !== 1) {
                inputDir.x = 0;
                inputDir.y = -1;
            }
            break;
        case 'ArrowDown':
            if (inputDir.y !== -1) {
                inputDir.x = 0;
                inputDir.y = 1;
            }
            break;
        case 'ArrowLeft':
            if (inputDir.x !== 1) {
                inputDir.x = -1;
                inputDir.y = 0;
            }
            break;
        case 'ArrowRight':
            if (inputDir.x !== -1) {
                inputDir.x = 1;
                inputDir.y = 0;
            }
            break;
        default:
            break;
    }
});

// In your gameEngine function, replace the following line:
// snakeArr[0].x += inputDir.x;
// snakeArr[0].y += inputDir.y;
// with
snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;











