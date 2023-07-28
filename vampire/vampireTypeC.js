class VampireTypeC extends Vampire{
  #width = 85;
  #height = 74;
  hp = 200;
  #atk = 15;
  bottomVelocity = 35 / Game.fps;
  normalVelocity = 70 / Game.fps;

  
  constructor(x, y, player){
    super(x, y, player);
    this.velocity = this.normalVelocity;
    
    let img = new Image();
    img.src = "./images/mon1.png";
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