const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

let score = 0;

// Input Image
const background = new Image();
background.src = 'img/background/background2.png';

const characterImage = new Image();
characterImage.src = 'img/character/character5.png';

const axeImage = new Image();
axeImage.src = 'img/character/axe.png';


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

const frogImage = new Image();
frogImage.src = 'img/object/frog.png';

const CharacterAction = ['run', 'jump', 'fall','dizzy', 'attack', 'ko'];

let coinsObject = [];
let mushroomsObject = [];
let snailsObject = [];
let birdsObject = [];
let beesObject = [];
let frogsObject = [];
let objects = [coinsObject, snailsObject, birdsObject, beesObject, mushroomsObject, frogsObject];

//Create Character
let character = new Character(characterImage, 0, 330, 166.67, 166.67);

function drawCharacter(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

//Create array coinsObject
const numberOfBlockCoin = 100;
for (let i = 0; i < numberOfBlockCoin; i++){
    let coinsInBlock = Math.floor(Math.random()*(10-3)+3);
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
    let mushroom = new Object(mushroomImage, (i+1)*Math.floor(Math.random()*(400-200)+200), 350, 95, 96);
    mushroom.speedX = 0;
    mushroom.speedY = 0;
    mushroom.frameX_Max = 3;
    mushroom.frameX = Math.floor(Math.random()*3);
    mushroom.frameY = Math.floor(Math.random()*2);
    mushroom.scale = 0.5;
    mushroom.moving = false;
    mushroomsObject.push(mushroom);
}

//Create array snailsObject
const numberOfSnail = 100;
for (let i = 0; i < numberOfSnail; i++){
    let snail = new Object(snailImage, (i+3)*300, 370, 480, 228);
    snail.speedX = Math.random()*5+4;
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

//Create array frogsObject
const numberOfFrog = 100;
for (let i = 0; i < numberOfFrog; i++){
    let frog = new Object(frogImage, (i+2)*450, 360, 64, 64);
    frog.speedX = Math.floor(Math.random()*(15-10)+10);
    frog.speedY = 0;
    frog.frameX_Max = 3;
    frog.frameX = 0;
    frog.frameY = 0;
    frog.scale = 0.5;
    frog.moving = true;

    frogsObject.push(frog);
}

let blood = new Blood(620, 35, 150, 10);

const keys = [];

var positionBackground = 0;
function MoveLeftBackground(speed){
    positionBackground -=speed;
    if (positionBackground == canvas.width){
        positionBackground =0;
    }
}

window.addEventListener('keydown', function(e){
    if (character.checkGround){
    keys[e.keyCode] = true;
    character.moving = true;
    }    
})

window.addEventListener('touchstart', function(e){
    if (character.checkGround){
    keys[e.keyCode] = true;
    character.moving = true;
    }    
})

window.addEventListener('mousedown', function(e){
    if (character.checkGround){
    keys[e.keyCode] = true;
    character.moving = true;
    }
})

window.addEventListener('keypress', function(e){
    //delete keys[e.keyCode];
    delete keys[e.keyCode];
    character.moving = false;
})

window.addEventListener('keyup', function(e){
    delete keys[e.keyCode];
    character.moving = false;
})

window.addEventListener('mouseup', function(e){
    delete keys[e.keyCode];
    character.moving = false;
})

window.addEventListener('touchend', function(e){
    delete keys[e.keyCode];
    character.moving = false;
})

function gravitycharacter(){
    if (character.y < character.jumpPoint && !character.moving){
        if (character.checkRight){
            character.frameX++;
            character.frameY = 2;
            character.y +=character.speedY;
        }
    }
}

{ //function checkGround
    function checkGround(){
        if (character.y == character.jumpPoint && !character.moving){
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
            character.moving = true;
        } else {
            character.checkGround = false;
        }
    
        if (character.y >= character.jumpPoint){
            character.y = character.jumpPoint ;
        }
    }
}

let fps, fpsInterval, startTime, now, then, elapsed;

{ // function start Animate
    function startAnimate(fps){
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate(); 
}
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
    ctx.fillText('BLOOD:', 500, 50);

    blood.drawBlood();
    character.drawCharacter();
    character.runCharacter();

    if (keys[38] && character.y >=200) {
        character.runCharacter();
        character.frameY = 0;
        character.y -= 30;
    }

    canvas.addEventListener('mousedown', function(e){
        if (character.y >=200) {
            character.runCharacter();
            character.frameY = 1;
            character.frameX++;
            if (character.frameX > 9) {
                character.frameX = 0;
            }
            character.y -= 30;
        }       
    })

    canvas.addEventListener('touchstart', function(e){
        if (character.y >=200) {
            character.runCharacter();
            character.frameY = 1;
            character.frameX++;
            if (character.frameX > 9) {
                character.frameX = 0;
            }
            character.y -= 30;
        }  
    })
    const fixPointCollosion = -20;
    for (let i = 0; i< coinsObject.length; i++){
        if (coinsObject[i].status){
            if (coinsObject[i].x+fixPointCollosion >= character.x - coinsObject[i].width * coinsObject[i].scale
                && coinsObject[i].x - fixPointCollosion <= character.x + character.width * character.scale
                && coinsObject[i].y - fixPointCollosion >= character.y - coinsObject[i].height * coinsObject[i].scale
                && coinsObject[i].y - fixPointCollosion <= character.y + character.height * character.scale) {
                coinsObject[i].status = false;
                getCoinSound();
                score++;
            }
            coinsObject[i].drawObject();
            coinsObject[i].updateMove();
            coinsObject[i].getMove();
        }
    }

    for (let i = 0; i< mushroomsObject.length; i++){
        mushroomsObject[i].drawObject();
    }

    for (let i = 0; i< snailsObject.length; i++){
        if (snailsObject[i].status){
            if (snailsObject[i].x+fixPointCollosion >= character.x - snailsObject[i].width * snailsObject[i].scale*2
                && snailsObject[i].x -fixPointCollosion <= character.x + character.width * character.scale
                && snailsObject[i].y -fixPointCollosion >= character.y - snailsObject[i].height * snailsObject[i].scale*2
                && snailsObject[i].y-fixPointCollosion <= character.y + character.height * character.scale) {
                    snailsObject[i].status = false;
                    snailsObject[i].frameY = 2;
                    snailsObject[i].frameX =3;
                blood.lostBlood(10);  
            }
        }
        if (snailsObject[i].status) {
            snailsObject[i].drawObject();
            snailsObject[i].updateMove();
            snailsObject[i].getMove();
        }
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

    for (let i = 0; i< frogsObject.length; i++){
        if (frogsObject[i].status){
            if (frogsObject[i].x+fixPointCollosion > character.x - frogsObject[i].width * frogsObject[i].scale*2
                && frogsObject[i].x -fixPointCollosion < character.x + character.width * character.scale
                && frogsObject[i].y -fixPointCollosion >= character.y - frogsObject[i].height * frogsObject[i].scale*2
                && frogsObject[i].y+fixPointCollosion <= character.y + character.height * character.scale
                && character.jumpPoint - character.speedY == character.y) { //tính toán lại đoạn này cho các đối tượng khác
                    blood.lostBlood(0);
                    frogsObject[i].status = false;
            } else if (frogsObject[i].x+fixPointCollosion >= character.x - frogsObject[i].width * frogsObject[i].scale*2
                && frogsObject[i].x -fixPointCollosion <= character.x + character.width * character.scale
                && frogsObject[i].y -fixPointCollosion >= character.y - frogsObject[i].height * frogsObject[i].scale*2
                && frogsObject[i].y+fixPointCollosion < character.y + character.height * character.scale) {
                    frogsObject[i].status = false;
                    blood.lostBlood(100);   
            }
            frogsObject[i].drawObject();
            frogsObject[i].updateMove();
            frogsObject[i].getMove();
        }
    }
    MoveLeftBackground(character.speedX);
    gravitycharacter();
    }
}

startAnimate(15);

function getCoinSound(){
    var audio = new Audio('sound/get.wav');
    audio.play();
}