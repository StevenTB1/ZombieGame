  class Bullet {
  // Private variables
  #width;
  #height;
  #color; // abstract properties
  #speed = 500 / Game.fps;

  constructor(x, y, player) {
    this.x = x;
    this.y = y;
    this.player = player;
    
    this.angle = this.player.angle - 90;
    this.tempx = this.player.background.x;
    this.tempy = this.player.background.y;
  }

  // Abstract methods of getters
  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  get speed() {
    return this.#speed;
  }

  get color(){
    return this.#color;
  }

  // @desc: update the coordiante of bullets each time when player moves
  updateCoordinate() {
    const angle = this.angle * (Math.PI / 180);
    this.x += this.#speed * Math.cos(angle);
    this.y += this.#speed * Math.sin(angle);

    if (this.tempx !== this.player.background.x || this.tempy !== this.player.background.y) {

      this.x += (this.player.background.x - this.tempx);
      this.y += (this.player.background.y - this.tempy);

      this.tempx = this.player.background.x;
      this.tempy = this.player.background.y;
    }
  }
  
  // @desc: draw the bullets 
  draw() {
    Canvas.context.fillStyle = this.#color;
    Canvas.context.fillRect(this.x, this.y, this.#width, this.#height);
  }
}

