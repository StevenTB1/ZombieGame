class Vampire {
  angle = 0;
  bottomVelocity;
  normalVelocity;
  slowTimer = 0;
  isSlowed = false;

  // These variables are for bonus's checks
  obsLeft = false;
  obsRight = false;
  obsUp = false;
  obsDown = false;
  moveLeft = false;
  moveRight = false;
  moveUp = false;
  moveDown = false;
  isdetected = false;
  isdetermined = false;
  
  constructor(x, y, player) {
    this.player = player;
    this.x = x;
    this.y = y;
    this.tempx = this.player.background.x;
    this.tempy = this.player.background.y;
  }

  updateCoordinate(){
    if(this.player.background.x !== this.tempx ||
      this.player.background.y !== this.tempy){
      this.x += (this.player.background.x - this.tempx);
      this.y += (this.player.background.y - this.tempy);
      this.tempx = this.player.background.x;
      this.tempy = this.player.background.y;
    }
    
  }

  // @desc: a virutal method used on all extends classes
  draw() {
    Canvas.context.drawImage(this.image, this.x, this.y);
  }

  slowDown() {
    if (this.isSlowed) {
      this.velocity = this.bottomVelocity;
      this.slowTimer++;
      if (this.slowTimer >= 60) {
        this.velocity = this.normalVelocity;
        this.slowTimer = 0;
        this.isSlowed = false;
      }
    } 
  }
  
}