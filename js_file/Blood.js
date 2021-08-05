class Blood {
    constructor(x, y, w, h, color){
        this.canvas = document.getElementById('my-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.blood = 100;
        this.color = color;
        this.full = false;
    }

    drawBlood(){
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'black';
        this.ctx.fillStyle = this.color;
        this.ctx.strokeRect(this.x-1, this.y-1, 152, this.h+2)
        this.ctx.fillRect(this.x, this.y, this.w, this.h);
        this.ctx.fill();
        this.ctx.stroke();
    }

    lostBlood(speed){
        this.w -=speed;
    }

    checkMana(){
        if (this.w >=150){
            this.w = 150;
        }
    }
}
