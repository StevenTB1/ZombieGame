
class BulletTypeD extends Bullet {
  // Private variables of type D bullet
  #damage = 70;
  #width = 15;
  #height = 15;
  #type = 'D';
  #color = 'rgb(192, 91, 235)';
  
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
    Canvas.context.fillRect(this.x, this.y, this.#width, this.#height);
  }
  
}