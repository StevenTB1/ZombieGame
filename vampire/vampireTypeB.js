class VampireTypeB extends Vampire{
  #width = 136;
  #height = 122;
  hp = 300;
  #atk = 20;
  bottomVelocity = 25 / Game.fps;
  normalVelocity = 50 / Game.fps;
  
  constructor(x, y, player){
    super(x, y, player);   
    this.velocity = this.normalVelocity;

    let img = new Image();
    img.src = "./images/mon4.png";
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