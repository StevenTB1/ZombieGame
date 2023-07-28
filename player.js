class Player {
  angle = 0;
  // private variables of the player class
  #bulletCD = 0;
  static finalAnrm = 0;
  #anrmCount = 0;
  #upgradeCount = 0;
  #anrmStageCount;
  #typeArray = ['A', 'B', 'C', 'D'];
  #stageNumber = [30, 40, 50, 1000];  
  
  background = new Background(0, 0, this);
  bulletType = 'A';

  constructor(x, y, width, height, hp) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.hp = hp;
    
    this.healthbar = new Healthbar(15, 15, 300, 35, this.hp);
    this.#anrmStageCount = this.#stageNumber[0];
    this.killCount = new KillCount(this);

    let img = new Image();
    img.src = "./images/char.png";
    this.image = img;
  }

  get anrmCount() {
    return this.#anrmCount;
  }

  set anrmCount(value) {
    this.#anrmCount += value;
  }

  get anrmStageCount(){
    return this.#anrmStageCount;
  }

  set anrmStageCount(val){
    this.#anrmStageCount = val;
  }

  // draw the character's position
  draw() {
    this.background.draw();
    this.background.obstacles.draw();
    this.healthbar.draw();
    this.killCount.draw();

    // rotate character  
    Canvas.context.save();
    Canvas.context.translate(this.x + (this.width / 2), this.y + (this.height / 2));
    Canvas.context.rotate(this.angle * (Math.PI / 180));
    Canvas.context.translate(-this.x - (this.width / 2), -this.y - (this.height / 2));
    Canvas.context.drawImage(this.image, this.x, this.y);
    Canvas.context.restore();
  }

  update() {
    this.background.update();
    this.#getAngle();
    this.shoot();
    this.playerPositionUpdate();
    this.changeType();
    Physics.playerHitMap(this, this.background);
  }

  // @desc: Change the bullet Type when the amount exceeds stage count
  changeType() {
    if (this.#anrmCount >= this.#anrmStageCount) {
      Player.finalAnrm += this.#anrmCount;
      //When the total number of kills exceeds all progress bars, stop all the chack and spawn the vampire
      if(Player.finalAnrm >= 1120){ 
        return;
      }
      // Spawn the "boss" vampire
      VampireControl.vampires.push(new VampireTypeD(1200, 800, this));
      this.#upgradeCount++;
      this.bulletType = this.#typeArray[this.#upgradeCount];
      this.#anrmStageCount = this.#stageNumber[this.#upgradeCount];
      this.#anrmCount = 0;
    }
  }

  // @desc: Find the angle based on the cursor postion and the player position
  #getAngle() {
    let centerX = (this.x + this.width / 2);
    let centerY = (this.y + this.height / 2);

    let targetX = centerX - Controller.mousex;
    let targetY = centerY - Controller.mousey;

    // Angle towards the cursor position
    let newAngle = (Math.atan2(targetY, targetX) * (180 / Math.PI)) - 90;
    this.angle = newAngle;
  }

  // @desc: Allow users to shoot different bullets based on the type
  shoot() {
    const bulletx = this.x + this.width / 2;
    const bullety = this.y + this.height / 2;
    let temp;

    if (Controller.shootPressed && this.#bulletCD >= 15) {
      switch (this.bulletType) {
        case 'A':
          temp = new BulletTypeA(bulletx, bullety, this);
          break;
        case 'B':
          temp = new BulletTypeB(bulletx, bullety, this);
          break;
        case 'C':
          temp = new BulletTypeC(bulletx, bullety, this);
          break;
        case 'D':
          temp = new BulletTypeD(bulletx, bullety, this);
          break;
      }
      
      bulletController.bullets.push(temp);
      this.#bulletCD = 0;
    }
    
    this.#bulletCD++;
  }

  // @desc: Coliision with the generated obstacles
  playerPositionUpdate() {
    if (Physics.objCollision(this, this.background.obstacles)) {
      const obj = this;
      const obstacle = this.background.obstacles;
      // Within the y range of the block - 10
      if (obj.y + obj.height > obstacle.y + 5 && 
          obj.y < obstacle.y + obstacle.height - 5) 
      {
        // Hit from left side
        if (obj.x < obstacle.x && 
            obj.x + obj.width >= obstacle.x) 
        {
          obj.x = obstacle.x - obj.width;
          this.background.HorizontalVelocity = 0;
        }

        // Hit from right side
        else if (obj.x > obstacle.x && 
                 obj.x <= obstacle.x + obstacle.width) 
        {
          obj.x = obstacle.x + obstacle.width;
          this.background.HorizontalVelocity = 0;
        }
      }

      // Within the x range of the block - 10
      else if (obj.x + obj.width > obstacle.x + 5 && 
               obj.x < obstacle.x + obstacle.width - 5) 
      {
        // Hit from top side
        if (obj.y < obstacle.y && 
            obj.y + obj.height >= obstacle.y) 
        {
          obj.y = obstacle.y - obj.height;
          this.background.VerticalVelocity = 0;
        }
        // Hit from bottom side
        else if (obj.y > obstacle.y && 
                 obj.y <= obstacle.y + obstacle.height) 
        {
          obj.y = obstacle.y + obstacle.height;
          this.background.VerticalVelocity = 0;
        }
      }
    }
  }
}