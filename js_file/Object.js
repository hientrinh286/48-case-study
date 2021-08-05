class Object {
    constructor(img, x, y, w, h){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.speedX = 0;
        this.speedY = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.img = img;
        this.moving = true;
        this.status = true;
        this.scale = 1;
        this.frameX_Max = 1;
        this.frameY_Max = 1;
        this.canvas = document.getElementById('my-canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    drawObject(){
        this.ctx.drawImage(this.img, this.width * this.frameX, this.height* this.frameY, this.width, this.height, this.x, this.y, this.width*this.scale, this.height*this.scale);
    }

    getMove(){
        this.x -=this.speedX;
    }

    updateMove(){
        this.frameX++;
        if (this.frameX > this.frameX_Max){
            this.frameX = 0;
        }
    }

    objectCollision(character, blood, bloodLost, fullManaStatus, score){
        if (this.status){
            if (this.x >= character.x - this.width * this.scale
                && this.x <= character.x + character.width * character.scale
                && this.y - character.fixPointCollision >= character.y - this.height * this.scale
                && this.y + character.fixPointCollision <= character.y + character.height * character.scale) {
                    this.status = false;
                    if (fullManaStatus){
                        score++;
                    } else {
                        blood.lostBlood(bloodLost);
                    }  
            }
            this.drawObject();
            this.updateMove();
            this.getMove();
        }
    }

    raiseSpeed(count){
        if (count % 100 == 0){
           this.speedX +=0.5;
        }
    }
}