class VampireTypeA extends Vampire {
  // Private variables for type A vampire
  #width = 76;
  #height = 92;
  hp = 150;
  #atk = 8;
  bottomVelocity = 40 / Game.fps;
  normalVelocity = 80 / Game.fps;

  constructor(x, y, player) {
    super(x, y, player);
    this.velocity = this.normalVelocity;
    this.type = 'A';
    
    let img = new Image();
    img.src = "./images/mon3.png";
    this.image = img;
  }

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