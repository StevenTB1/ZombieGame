class Healthbar {
  constructor(x, y, width, height, hp) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.hp = hp;
  }

  // @desc: Draw the health Bar
  draw() {
    Canvas.context.lineWidth = 2;
    Canvas.context.font = '20px serif';

    if (this.hp >= 0) {
      // health part
      Canvas.context.fillStyle = 'rgb(42, 189, 49)';
      Canvas.context.fillRect(this.x, this.y, this.hp * 2, this.height);
      
      // minused part
      Canvas.context.fillStyle = 'rgb(207, 212, 208)';
      Canvas.context.fillRect(this.x + this.hp * 2, this.y, this.width - this.hp * 2, this.height);
      
      // Text part
      Canvas.context.fillStyle = 'rgb(0, 0, 0)';
      Canvas.context.fillText(`${this.hp} / 150`, this.x + 110, this.y + 24);
      
    } 
    
    else {
      // white part (not drawing green because you are dead!)
      Canvas.context.fillStyle = 'rgb(255, 255, 255)';
      Canvas.context.fillRect(this.x, this.y, this.width, this.height);
      
      // Text part
      Canvas.context.fillStyle = 'rgb(0, 0, 0)';
      Canvas.context.fillText(`0 / 150`, this.x + 110, this.y + 24);
    }

    // Draw the outline
    Canvas.context.strokeRect(this.x, this.y, this.width, this.height);
  }
}