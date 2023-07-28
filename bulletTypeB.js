class BulletTypeB extends Bullet {
  // Private variables of type B bullet
  #damage = 35;
  #width = 11;
  #height = 11;
  #type = 'B';
  #color = 'rgb(122, 240, 136)';
  
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