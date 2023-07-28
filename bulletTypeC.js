class BulletTypeC extends Bullet {
  // Private variables of type C bullet
  #damage = 50;
  #width = 12;
  #height = 12;
  #type = 'C';
  #color = 'rgb(93, 151, 245)';
  
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