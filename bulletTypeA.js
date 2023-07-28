class BulletTypeA extends Bullet {
  // Private variables of type A bullet
  #damage = 100;
  #width = 10;
  #height = 10;
  #type = 'A';
  #color = 'rgb(168, 165, 165)';
  
  constructor(x, y, player) {
    super(x, y, player);
  }

  // Getters to get the private variables
  get damage(){
    return this.#damage;
  }

  get type(){
    return this.#type;
  }

  get width(){
    return this.#width;
  }

  get height(){
    return this.#height;
  }

  // @desc: draw the bullets 
  draw() {
    Canvas.context.fillStyle = this.#color;
    Canvas.context.fillRect(this.x, this.y, this.width, this.height);
  }
  
}