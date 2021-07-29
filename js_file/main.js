const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');


let score = 0;


// Input Image
const background = new Image();
background.src = 'img/background/background2.png';

const characterImage = new Image();
characterImage.src = 'img/character/character2.png';

const axeImage = new Image();
axeImage.src = 'img/character/axe.png';

const turtleImage = new Image();
turtleImage.src ='img/object/turtle.png';

const coinImage = new Image();
coinImage.src = 'img/object/coin.png';

const mushroomImage = new Image();
mushroomImage.src = 'img/object/mushroom.png';

const snailImage = new Image();
snailImage.src = 'img/object/snail.png';

const birdImage = new Image();
birdImage.src = 'img/object/bird.png';

const beeImage = new Image();
beeImage.src = 'img/object/bee.png';


let turtlesObject = [];
let coinsObject = [];
let mushroomsObject = [];
let snailsObject = [];
let birdsObject = [];
let beesObject = [];
let objects = [turtlesObject, coinsObject, mushroomsObject, snailsObject, birdsObject, beesObject];


//Create Character
let character = new Character(characterImage, 0, 330, 166.67, 166.67);

function drawCharacter(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

//Create array turtlesObject
const numberOfTurtle = 100;
for (let i = 0; i < numberOfTurtle; i++){
    let turtle = new Object(turtleImage, (i+2)*400, 360, 480, 387.67);
    turtle.speedX = Math.floor(Math.random()*(2-1)+1);
    turtle.speedY = 0;
    turtle.frameX_Max = 3;
    turtle.frameX = Math.floor(Math.random()*3);
    turtle.frameY = Math.floor(Math.random()*2);
    turtle.scale = 0.1;
    turtle.moving = true;

    turtlesObject.push(turtle);
}


//Create array coinsObject
const numberOfBlockCoin = 100;
for (let i = 0; i < numberOfBlockCoin; i++){
    let coinsInBlock = Math.floor(Math.random()*(10-1)+1);
    for(let j =0; j <coinsInBlock; j++){
        let coin = new Object(coinImage, (i+3)*400+j*10, Math.floor(Math.random()*(260-200)+200), 143.33, 135);
        coin.speedX = 5;
        coin.speedY = 0;
        coin.frameX_Max = 5;
        coin.frameX = Math.floor(Math.random()*5);
        coin.frameY = 0;
        coin.scale = 0.2;
        coin.moving = true;

        coinsObject.push(coin);
    }   
}

//Create array mushroomsObject
const numberOfMushroom = 100;
for (let i = 0; i < numberOfMushroom; i++){
    let mushroom = new Object(mushroomImage, (i+1)*500, 350, 95, 96);
    mushroom.speedX = 0;
    mushroom.speedY = 0;
    mushroom.frameX_Max = 3;
    mushroom.frameX = Math.floor(Math.random()*3);
    mushroom.frameY = Math.floor(Math.random()*2);
    mushroom.scale = 0.5;
    mushroom.moving = true;

    mushroomsObject.push(mushroom);
}


//Create array snailsObject
const numberOfSnail = 100;
for (let i = 0; i < numberOfSnail; i++){
    let snail = new Object(snailImage, (i+3)*200, 370, 480, 228);
    snail.speedX = Math.random()*0.7+0.3;
    snail.speedY = 0;
    snail.frameX_Max = 3;
    snail.frameX = Math.floor(Math.random()*3);
    snail.frameY = Math.floor(Math.random()*2);
    snail.scale = 0.1;
    snail.moving = true;

    snailsObject.push(snail);
}

//Create array birdsObject
const numberOfBird = 1000;
for (let i = 0; i < numberOfBird; i++){
    let bird = new Object(birdImage, i*500, Math.floor(Math.random()*(260-100)+100), 72, 72);
    bird.speedX = Math.floor(Math.random()*(30-10)+10);
    bird.speedY = 0;
    bird.frameX_Max = 7;
    bird.frameX = Math.floor(Math.random()*7);
    bird.frameY = 0;
    bird.scale = 0.5;
    bird.moving = true;

    birdsObject.push(bird);
}

//Create array beesObject
const numberOfBee = 1000;
for (let i = 0; i < numberOfBee; i++){
    let bee = new Object(beeImage, i*Math.floor(Math.random()*(400-300)+300), Math.floor(Math.random()*(260-100)+100), 273, 282);
    bee.speedX = Math.floor(Math.random()*(30-10)+10);
    bee.speedY = 0;
    bee.frameX_Max = 7;
    bee.frameX = Math.floor(Math.random()*12);
    bee.frameY = 0;
    bee.scale = 0.1;
    bee.moving = true;

    beesObject.push(bee);
}

const keys = [];

//Bắt đầu copy

var positionBackground = 0;
function MoveLeftBackground(speed){
    positionBackground -=speed;
    if (positionBackground == canvas.width){
        positionBackground =0;
    }
}

function MoveRightBackground(speed){
    positionBackground +=speed;
    if (positionBackground == -canvas.width){
        positionBackground =0;
    }
}


window.addEventListener('keydown', function(e){
    keys[e.keyCode] = true;
    character.moving = true;
})

window.addEventListener('keypress', function(e){
    delete keys[e.keyCode];
    character.moving = false;
})

window.addEventListener('keyup', function(e){
    delete keys[e.keyCode];
    character.moving = false;
})

//check Border
function checkBorder(){
    if (character.x > canvas.width - character.width/2 && character.checkRight) {
        character.x = canvas.width - character.width/2;
    } else if (character.x <= 0 && !character.checkRight) {
        character.x = 0;
    }
}

function gravitycharacter(){
    if (character.y < character.jumpPoint && !character.moving){
        if (character.checkRight){
            character.frameX = 4;
            character.frameY = 4;
            character.y +=character.speedY;
            character.x +=character.speedX;
        } else {
            character.frameX = 4;
            character.frameY = 3;
            character.y +=character.speedY;
            character.x -=character.speedX;
        }
    }
    checkGround();
}

function checkGround(){
    if (character.y == character.jumpPoint && !character.moving){
        countUp = 0;
        if (character.checkRight){
            character.frameX = 0;
            character.frameY = 0;
        } else {
            character.frameX = 1;
            character.frameY = 0;
        }
    }
    if (character.y == character.jumpPoint){
        character.checkGround = true;
    }
}

var countUp = 0;
function movecharacter(){
    checkBorder();
    if (keys[38] && character.checkGround){
        countUp++;
        if (countUp<=4){
            if (character.checkRight){
                character.frameX = 0;
                character.frameY = 4;
                character.y -= character.speedY*3;
                //character.x += character.speedX*3;
                MoveLeftBackground(character.speedX*5);
                for (let i = 0; i< objects.length; i++){
                    objects[i].forEach(function(element) {
                        element.x -=character.speedX*5;
                    });
                }
                } else {
                character.frameX = 2;
                character.frameY = 3;
                character.y -= character.speedY*3;
                //character.x -= character.speedX*3;
                MoveRightBackground(character.speedX*5);
                for (let i = 0; i< objects.length; i++){
                    objects[i].forEach(function(element) {
                        element.x +=character.speedX*5;
                    });
                }
            }
        }
        checkScore();
    } else if (keys[39] && character.x < canvas.width) {
        character.x +=character.speedX;
        character.runCharacter();
        character.frameY = 2;
        character.checkRight = true;
        MoveLeftBackground(character.speedX);
        for (let i = 0; i< objects.length; i++){
            objects[i].forEach(function(element) {
                element.x -=character.speedX;
            });
        }
        for (i in objects){
            for (item in objects[i]) {
                item.x -= character.speedX;
            }
        }
        checkScore()
    } else if (keys[37] && character.x >=0) {
        character.x -=character.speedX;
        character.frameY = 5;
        character.runCharacter();
        character.checkRight = false;
        MoveRightBackground(character.speedX);
        for (let i = 0; i< objects.length; i++){
            objects[i].forEach(function(element) {
                element.x +=character.speedX;
            });
        }
        checkScore()
    }
    checkGround();
}
// kết thúc copy
/*
var countUp = 0;
window.addEventListener('keydown', function(event){
    if (event.keyCode ==38 && character.checkGround){
        countUp++;
        if (countUp<=4){
            if (character.checkRight){
                character.frameX = 0;
                character.frameY = 4;
                character.y -= character.speedY*3;
                //character.x += character.speedX*3;
                MoveLeftBackground(character.speedX*5);
                for (let i = 0; i< objects.length; i++){
                    objects[i].forEach(function(element) {
                        element.x -=character.speedX*5;
                    });
                }
                } else {
                character.frameX = 2;
                character.frameY = 3;
                character.y -= character.speedY*3;
                //character.x -= character.speedX*3;
                MoveRightBackground(character.speedX*5);
                for (let i = 0; i< objects.length; i++){
                    objects[i].forEach(function(element) {
                        element.x +=character.speedX*5;
                    });
                }
            }
        }
        checkScore();
    } else if (event.keyCode ==39 && character.x < canvas.width) {
        character.x +=character.speedX;
        character.runCharacter();
        character.frameY = 2;
        character.checkRight = true;
        MoveLeftBackground(character.speedX);
        for (let i = 0; i< objects.length; i++){
            objects[i].forEach(function(element) {
                element.x -=character.speedX;
            });
        }
        for (i in objects){
            for (item in objects[i]) {
                item.x -= character.speedX;
            }
        }
        checkScore()
    } else if (event.keyCode ==37 && character.x >=0) {
        character.x -=character.speedX;
        character.frameY = 5;
        character.runCharacter();
        character.checkRight = false;
        MoveRightBackground(character.speedX);
        for (let i = 0; i< objects.length; i++){
            objects[i].forEach(function(element) {
                element.x +=character.speedX;
            });
        }
        checkScore();
    }
    checkGround();
}
)*/
function checkScore(){
    for (let i = 0; i<coinsObject.length; i++){
        if ((coinsObject[i].x <= character.x+ character.width * character.scale && character.x <= coinsObject[i].x + coinsObject[i].width* coinsObject[i].scale) && (character.y < coinsObject[i].y + coinsObject[i].height * coinsObject[i].scale && character.y + character.height * character.scale > coinsObject[i].y)) {
            score++;
            coinsObject[i].status = false;
            getCoinSound();
        }
    }
}

let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimate(fps){
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate(); 
}

function animate(){
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (positionBackground >= canvas.width || positionBackground <= -canvas.width) positionBackground =0;
    ctx.drawImage(background, positionBackground, 0, canvas.width, canvas.height);
    ctx.drawImage(background, positionBackground-canvas.width, 0, canvas.width, canvas.height);
    ctx.drawImage(background, positionBackground+canvas.width, 0, canvas.width, canvas.height);
    ctx.font = "30px Arial";
    ctx.fillText('SCORE:', 10, 50);
    ctx.fillText(score, 130, 50);
    character.drawCharacter();
    movecharacter();
    //drawCharacter(characterImage, character.width * character.frameX, character.height * character.frameY, character.width,
        //character.height, character.x/2, canvas.height/2, character.width, character.height);

    for (let i = 0; i< turtlesObject.length; i++){
        turtlesObject[i].drawObject();
        turtlesObject[i].updateMove();
        turtlesObject[i].getMove();
    }

    for (let i = 0; i< coinsObject.length; i++){
        if ((coinsObject[i].x <= character.x+ character.width*character.scale && character.x <= coinsObject[i].x + coinsObject[i].width* coinsObject[i].scale) && (character.y < coinsObject[i].y + coinsObject[i].height * coinsObject[i].scale && character.y + character.height * character.scale > coinsObject[i].y)) {
            score++;
            coinsObject[i].status = false;
        }

        if (coinsObject[i].status) {
            coinsObject[i].drawObject();
            coinsObject[i].updateMove();
            coinsObject[i].getMove();
        }
    }

    for (let i = 0; i< mushroomsObject.length; i++){
        mushroomsObject[i].drawObject();
        //mushroomsObject[i].updateMove();
        mushroomsObject[i].getMove();
    }

    for (let i = 0; i< snailsObject.length; i++){
        snailsObject[i].drawObject();
        snailsObject[i].updateMove();
        snailsObject[i].getMove();
    }

    for (let i = 0; i< birdsObject.length; i++){
        birdsObject[i].drawObject();
        birdsObject[i].updateMove();
        birdsObject[i].getMove();
    }

    for (let i = 0; i< beesObject.length; i++){
        beesObject[i].drawObject();
        beesObject[i].updateMove();
        beesObject[i].getMove();
    }
    gravitycharacter();

    }
}

startAnimate(15);

function getCoinSound(){
    var audio = new Audio('sound/get.wav');
    audio.play();
}