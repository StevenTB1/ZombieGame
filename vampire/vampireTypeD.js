class VampireTypeD extends Vampire{
  #width = 150;
  #height = 189;
  hp = 1250;
  #atk = 100;
  bottomVelocity = 100 / Game.fps;
  normalVelocity = 200 / Game.fps;
  
  constructor(x, y, player){
    super(x, y, player);
    this.velocity = this.normalVelocity;
    
    let img = new Image();
    img.src = "./images/mon2.png";
    this.image = img;
  }

  // @desc: need to crop the image so use a override method
  draw(){
    Canvas.context.drawImage(this.image, this.x, this.y, this.#width, this.#height);
  }

  // Getters for getting the private variables
  get width(){
    return this.#width;
  }

  get height(){
    return this.#height;
  }

  get atk(){
    return this.#atk;
  }

}