const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

let score = 0;
var frame = 10;
let count = 0;

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
const numberOfBlockCoin = 1000;
for (let i = 0; i < numberOfBlockCoin; i++){
    let coinsInBlock = Math.floor(Math.random()*(10-2)+2);
    for(let j =0; j <coinsInBlock; j++){
        let coin = new Object(coinImage, (i+3)*300+j*10, Math.floor(Math.random()*(300-100)+100), 143.33, 135);
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
const numberOfMushroom = 1000;
for (let i = 0; i < numberOfMushroom; i++){
    let mushroom = new Object(mushroomImage, (i+1)*Math.floor(Math.random()*(1000-100)+100), 350, 95, 96);
    mushroom.speedX = character.speedX;
    mushroom.speedY = 0;
    mushroom.frameX_Max = 3;
    mushroom.frameX = Math.floor(Math.random()*3);
    mushroom.frameY = Math.floor(Math.random()*2);
    mushroom.scale = 0.5;
    mushroom.moving = false;
    mushroomsObject.push(mushroom);
}

//Create array snailsObject
const numberOfSnail = 1000;
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
const numberOfBird = 50;
for (let i = 0; i < numberOfBird; i++){
    let bird = new Object(birdImage, i*3000, Math.floor(Math.random()*(270-100)+100), 72, 72);
    bird.speedX = Math.floor(Math.random()*(30-20)+20);
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
    let bee = new Object(beeImage, i*Math.floor(Math.random()*(500-400)+400), Math.floor(Math.random()*(270-70)+70), 273, 282);
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
const numberOfFrog = 1000;
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

let blood = new Blood(620, 35, 150, 5, 'red');
let mana = new Blood(620, 50, 0, 5, 'green');

const keys = [];
var gameStatus = true;

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
        {
            character.frameX++;
            character.frameY = 2;
            character.y +=character.speedY;
        }
    }

    if (character.y == character.jumpPoint){
        character.frameY = 0;
        character.frameX++;
        if (character.frameX >12){
            character.frameX = 0;
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

var countMana = 0;
var fullManaStatus = false;

function animate(){
if (gameStatus){
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
    if (mana.w ==150){
        fullManaStatus = true;
        countMana ++;
        character.frameY = 5;
        character.frameX++;
        if (character.frameX >12){ character.frameX =0}
        if (countMana >150){
            countMana = 0;
            mana.w = 0;
        }
    }
    blood.drawBlood();
    mana.drawBlood();
    ctx.font = "30px Arial";
    ctx.fillStyle = 'red';
    ctx.fillText('SCORE:', 10, 50);
    ctx.fillText(score, 130, 50);
    ctx.font = "15px Arial";
    ctx.fillText('BLOOD:', 550, 40);
    ctx.fillText('MANA:', 559, 60);
    ctx.fill();
    character.drawCharacter();
    character.runCharacter();

    if (keys[38] && character.y >=100) {
        jumpSound();
        character.runCharacter();
        character.frameY = 0;
        character.y -= 30;
        if (blood.w < 30){
            character.frameY = 3;
            character.frameX ++;
            if (character.frameX >12){
                character.frameX = 0;
            }
        }
    }

    canvas.addEventListener('mousedown', function(e){
        if (character.y >=100) {
            jumpSound();
            character.runCharacter();
            character.frameY = 1;
            character.frameX++;
            if (character.frameX > 9) {
                character.frameX = 0;
            }
            character.y -= 30;
            if (blood.w < 50){
                character.frameY = 3;
                character.frameX ++;
                if (character.frameX >12){
                    character.frameX = 0;
                }
            }
        }       
    })

    canvas.addEventListener('touchstart', function(e){
        if (character.y >=100) {
            jumpSound();
            character.runCharacter();
            character.frameY = 1;
            character.frameX++;
            if (character.frameX > 9) {
                character.frameX = 0;
            }
            character.y -= 30;
            if (blood.w < 30){
                character.frameY = 3;
                character.frameX ++;
                if (character.frameX >12){
                    character.frameX = 0;
                }
            }
        }  
    })
    const fixPointCollosion = -20;
    for (let i = 0; i< coinsObject.length; i++){
        if (count % 100 == 0){
            coinsObject[i].speedX +=0.5;
        }
        if (coinsObject[i].status){
            if (coinsObject[i].x+fixPointCollosion >= character.x - coinsObject[i].width * coinsObject[i].scale
                && coinsObject[i].x - fixPointCollosion <= character.x + character.width * character.scale
                && coinsObject[i].y - fixPointCollosion >= character.y - coinsObject[i].height * coinsObject[i].scale
                && coinsObject[i].y - fixPointCollosion <= character.y + character.height * character.scale) {
                coinsObject[i].status = false;
                getCoinSound();
                score++;
                mana.w +=1;
                mana.checkMana();
            }
            coinsObject[i].drawObject();
            coinsObject[i].updateMove();
            coinsObject[i].getMove();
        }
    }

    for (let i = 0; i< mushroomsObject.length; i++){
        if (count % 100 == 0){
            mushroomsObject[i].speedX +=0.5;
        }
        if (mushroomsObject[i].status){
            if (mushroomsObject[i].x+fixPointCollosion >= character.x - mushroomsObject[i].width * mushroomsObject[i].scale
                && mushroomsObject[i].x - fixPointCollosion <= character.x + character.width * character.scale
                && mushroomsObject[i].y - fixPointCollosion >= character.y - mushroomsObject[i].height * mushroomsObject[i].scale
                && mushroomsObject[i].y - fixPointCollosion <= character.y + character.height * character.scale
                && (mushroomsObject[i].frameX == 0 && mushroomsObject[i].frameY == 1) ) {
                mushroomsObject[i].status = false;
                if (fullManaStatus){
                    score++;
                }
                if (blood.w <=90){
                    blood.w +=10;
                }  
            } else if (mushroomsObject[i].x+fixPointCollosion >= character.x - mushroomsObject[i].width * mushroomsObject[i].scale
                && mushroomsObject[i].x - fixPointCollosion <= character.x + character.width * character.scale
                && mushroomsObject[i].y - fixPointCollosion >= character.y - mushroomsObject[i].height * mushroomsObject[i].scale
                && mushroomsObject[i].y - fixPointCollosion <= character.y + character.height * character.scale) {
                mushroomsObject[i].status = false;
                if (fullManaStatus){
                    score++;
                } else {
                    blood.lostBlood(2);
                }
                
            }
            mushroomsObject[i].drawObject();
            mushroomsObject[i].getMove();
        }
    }

    for (let i = 0; i< snailsObject.length; i++){
        if (count % 100 == 0){
            snailsObject[i].speedX +=0.5;
        }
        if (snailsObject[i].status){
            if (snailsObject[i].x+fixPointCollosion >= character.x - snailsObject[i].width * snailsObject[i].scale*2
                && snailsObject[i].x -fixPointCollosion <= character.x + character.width * character.scale
                && snailsObject[i].y -fixPointCollosion >= character.y - snailsObject[i].height * snailsObject[i].scale*2
                && snailsObject[i].y-fixPointCollosion <= character.y + character.height * character.scale) {
                    snailsObject[i].status = false;
                    snailsObject[i].frameY = 2;
                    snailsObject[i].frameX =3;
                    if (fullManaStatus){
                        score++;
                    } else {
                        blood.lostBlood(2);
                    }  
            }
            snailsObject[i].drawObject();
            snailsObject[i].updateMove();
            snailsObject[i].getMove();
        }
    }

    for (let i = 0; i< birdsObject.length; i++){
        if (count % 100 == 0){
            birdsObject[i].speedX +0.5;
        }
        if (birdsObject[i].status){
            if (birdsObject[i].x+fixPointCollosion >= character.x - birdsObject[i].width * birdsObject[i].scale*2
                && birdsObject[i].x -fixPointCollosion <= character.x + character.width * character.scale
                && birdsObject[i].y -fixPointCollosion >= character.y - birdsObject[i].height * birdsObject[i].scale*2
                && birdsObject[i].y-fixPointCollosion <= character.y + character.height * character.scale) {
                    birdsObject[i].status = false;
                    birdsObject[i].frameY = 2;
                    birdsObject[i].frameX =3;
                    if (fullManaStatus){
                        score++;
                    } else {
                        blood.lostBlood(40);
                    }  
            }
            birdsObject[i].drawObject();
            birdsObject[i].updateMove();
            birdsObject[i].getMove();
        }
    }

    for (let i = 0; i< beesObject.length; i++){
        if (count % 100 == 0){
            beesObject[i].speedX +0.5;
        }
        if (beesObject[i].status){
            if (beesObject[i].x+fixPointCollosion >= character.x - beesObject[i].width * beesObject[i].scale*2
                && beesObject[i].x -fixPointCollosion <= character.x + character.width * character.scale
                && beesObject[i].y -fixPointCollosion >= character.y - beesObject[i].height * beesObject[i].scale*2
                && beesObject[i].y-fixPointCollosion <= character.y + character.height * character.scale) {
                    beesObject[i].status = false;
                    beesObject[i].frameY = 2;
                    beesObject[i].frameX =3;
                    if (fullManaStatus){
                        score++;
                    } else {
                        blood.lostBlood(50);
                    }  
            }
            beesObject[i].drawObject();
            beesObject[i].updateMove();
            beesObject[i].getMove();
        }
    }

    for (let i = 0; i< frogsObject.length; i++){
        if (frogsObject[i].status){
            if (frogsObject[i].x+fixPointCollosion > character.x - frogsObject[i].width * frogsObject[i].scale*2
                && frogsObject[i].x -fixPointCollosion < character.x + character.width * character.scale
                && frogsObject[i].y -fixPointCollosion >= character.y - frogsObject[i].height * frogsObject[i].scale*2
                && frogsObject[i].y+fixPointCollosion <= character.y + character.height * character.scale
                && character.jumpPoint - character.speedY == character.y) { //tính toán lại đoạn này cho các đối tượng khác
                    blood.lostBlood(0);
                    if (fullManaStatus){
                        score++;
                    }
                    mana.w +=30;
                    frogsObject[i].status = false;
            } else if (frogsObject[i].x+fixPointCollosion >= character.x - frogsObject[i].width * frogsObject[i].scale*2
                && frogsObject[i].x -fixPointCollosion <= character.x + character.width * character.scale
                && frogsObject[i].y -fixPointCollosion >= character.y - frogsObject[i].height * frogsObject[i].scale*2
                && frogsObject[i].y+fixPointCollosion < character.y + character.height * character.scale) {
                    frogsObject[i].status = false;
                    if (fullManaStatus){
                        score++;
                    } else {
                        blood.lostBlood(5);
                    }   
            }
            if (count % 100 == 0){
                frogsObject[i].speedX +0.5;
            }
            frogsObject[i].drawObject();
            frogsObject[i].updateMove();
            frogsObject[i].getMove();
        }
    }
    MoveLeftBackground(character.speedX);
    gravitycharacter();
    CheckGameOver();
    count++;
    if (count % 100 == 0){
        character.speedX +0.5;
    }
    if (blood.w < 30){
        character.frameY = 3;
        character.frameX ++;
        if (character.frameX >12){
            character.frameX = 0;
        }
    }
    }
}
    
}

startAnimate(15);

function getCoinSound(){
    var audio = new Audio('sound/get.wav');
    audio.play();
}

function jumpSound(){
    var audio = new Audio('sound/jumpSound.wav');
    audio.play();
}

function CheckGameOver(){
    if (blood.w <0){
        character.y = character.jumpPoint;
        alert('Game Over! Your score is: '+ score);
        gameStatus = false;
        document.getElementById('playAudio').autoplay = false;
        document.getElementById('playAudio').loop = false;
        document.getElementById('playAudio').muted = true;
    }
}