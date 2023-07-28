class Obstacles{
  #width = 150;
  #height = 150;
  
  constructor(background){
    this.background = background;
    this.x = Game.randomNum(200, 800);
    this.y = Game.randomNum(200, 500);
    
    this.tempx = this.background.x;
    this.tempy = this.background.y;
  }

  updateCoordinate(){
    if(this.background.x !== this.tempx ||
      this.background.y !== this.tempy){
      
      this.x += (this.background.x - this.tempx);
      this.y += (this.background.y - this.tempy);

      this.tempx = this.background.x;
      this.tempy = this.background.y;
    }
  }

  get width(){
    return this.#width;
  }

  get height(){
    return this.#height;
  }

  draw(){
    Canvas.context.fillStyle = "rgb(161, 239, 247)";
    Canvas.context.fillRect(this.x, this.y, this.#width, this.#height);
    Canvas.context.strokeRect(this.x, this.y, this.#width, this.#height);
  }

}