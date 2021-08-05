class Character {
    constructor(img){
        this.canvas = document.getElementById('my-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = 299;
        this.height = 300;
        this.img = img;
        this.jumpPoint = this.canvas.height - this.height*0.55;
        this.frameX = 0;
        this.frameY = 0;
        this.speedX = 5;
        this.speedY = 30;
        this.moving = false;
        this.checkGround = true;
        this.x = 50;
        this.y = this.jumpPoint;
        this.moving = true;
        this.scale = 0.2;
        this.frameX_Max = 12;
        this.frameY_Max = 1;
        this.fixPointCollision = 5;
        this.score = 0;

    }

    drawCharacter(){
        this.ctx.drawImage(this.img, this.width * this.frameX, this.height* this.frameY, this.width, this.height, this.x, this.y, this.width*this.scale, this.height*this.scale);
    }

    runCharacter(){
        this.frameX++;
        if (this.frameX >6){
            this.frameX = 0;
        }
    }
}