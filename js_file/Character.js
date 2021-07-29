class Character {
    constructor(img){
        this.canvas = document.getElementById('my-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = 144;
        this.height = 144;
        this.img = img;
        this.jumpPoint = this.canvas.height - this.height*1.15;
        this.frameX = 0;
        this.frameY = 0;
        this.speedX = 5;
        this.speedY = 30;
        this.moving = false;
        this.checkRight = true;
        this.checkGround = true;
        this.x = 0;
        this.y = this.jumpPoint;
        this.moving = true;
        this.scale = 0.4;
        this.frameX_Max = 1;
        this.frameY_Max = 1;

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