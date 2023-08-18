//game constants
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('eating.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('direction.mp3');
const musicSound = new Audio('background.mp3');
let speed = 10;
let score=0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 };// food is particle not an array snake ka ekk element ha

//game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}


function isCollide(snake){
    for(let i=1; i<snakeArr.length; i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
        if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0){
            return true;
        }
        return false;
    }


function gameEngine() {
    //updating the snake and array &food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        //musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over, Press any key to play again! ");
        snakeArr = [{ x: 13, y: 15 }];
        //musicSound.play();
        score=0;
    }

    // if snake eat the food once increment the sore and regenrate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x== food.x){
        //foodSound.play
        score += 1;
        if(score>hiscoreval){
            hiscoreval=score; 
            localStorage.getItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML= "HiScore: "+ hiscoreval;

        }
        scoreBox.innerHTML = "score: "+score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a=1;
        let b=17;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())} // this is formula to genrate random numbers
    }

    // Moving the snake
    for(let i=snakeArr.length-2; i>=0; i--){
        snakeArr[i+1]={...snakeArr[i]}// here we use destructuring tan ki sare element ekk hi point ko ishara na krne lghb jauye
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //Display the snake 
    board.innerHTML = "";//iska matlab board me hamne pehle to koi snake nahi bna rkha na
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else { snakeElement.classList.add('snake'); }
        board.appendChild(snakeElement);
    });


    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}


//Main logic start here
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval=0;
    localStorage.getItem("hiscore", JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML= "HiScore: "+ hiscore;
}


window.requestAnimationFrame(main);
// this is use for thing which is going to repeat,we can use set interval also but animation is more impt.
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }//start the game and snake start moves downword
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0 ;
            inputDir.y=-1 ;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x= 0;
            inputDir.y= 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1 ;
            inputDir.y=0 ;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1 ;
            inputDir.y=0 ;
            break;

        default:


            break;
    }
})