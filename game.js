class Game {
  static fps = 60;
  static timeInterval = 1000 / Game.fps;
  #spawnCooldown = 0;

  constructor() {
    this.controller = new Controller();
    const midX = Canvas.width / 2 - 35;
    const midY = Canvas.height / 2 - 54;

    this.player = new Player(midX, midY, 70, 100, 150);
    this.vampireControl = new VampireControl(this.player);
    this.bulletController = new bulletController(this.player);

    this.gameInterval = setInterval(() => {
      this.#spawnMob();
      this.#update();
      this.#draw();
      this.#gameOver();
    }, Game.timeInterval)

  }

  // @desc: Update all the objects related to the game class
  #update() {
    this.player.update();
    this.vampireControl.update();
    this.bulletController.update();
  }

  // @desc: Draw all the objects related to the grand scale game
  #draw() {
    Fps.fpsDisplay();
    this.clear();
    this.player.draw();
    this.vampireControl.draw();
    this.bulletController.draw();
  }

  // @desc: Clear the canva each time interval
  clear() {
    Canvas.context.clearRect(0, 0, Canvas.width, Canvas.height);
  }


  // @desc: randomize a number between a minimum and maximum
  // @param: {number} min: the minimum value
  // @param: {number} max: the maximum value
  static randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }


  // @desc: Spawning the vampire after a particular cooldown and less than 15
  #spawnMob() {
    if (this.#spawnCooldown >= 120 && VampireControl.vampires.length <= 15) {
      const randomX = Game.randomNum(0, 1850);
      const randomY = Game.randomNum(0, 950);
      const typenum = Game.randomNum(0, 3);

      let temp; // For creating object instances

      if (this.#legitSpawns(randomX, randomY)) {
        switch (typenum) {
          case 0:
            temp = new VampireTypeA(randomX, randomY, this.player);
            break;
          case 1:
            temp = new VampireTypeB(randomX, randomY, this.player);
            break;
          case 2:
            temp = new VampireTypeC(randomX, randomY, this.player);
            break;
        }
        VampireControl.vampires.push(temp);
        this.#spawnCooldown = 0;
      }
    } else {
      this.#spawnCooldown++;
    }
  }

  // @desc: Check if the spawn positons are legit
  // @param {number} randomX: the generated x-coordinate
  // @param {number} randomY: the generated y-coordinate
  #legitSpawns(randomX, randomY) {
    // If it spawns near player, generate again at next time Interval
    if (Math.abs(this.player.x - randomX) ** 2 + Math.abs(this.player.y - randomY) ** 2 < 30000) {
      return false;
    }

    // If it spawns out of bound, generate again
    if (randomX < this.player.background.x ||
      randomY < this.player.background.y ||
      randomX > this.player.background.x + this.player.background.w ||
      randomY > this.player.background.y + this.player.background.h) {
      return false;
    }

    // If it spawns within the obstacle range, generate again
    if ((randomX > this.player.background.obstacles.x &&
      randomX <= this.player.background.obstacles.x +
      this.player.background.obstacles.width) ||
      (randomY > this.player.background.obstacles.y &&
        randomY <= this.player.background.obstacles.y +
        this.player.background.obstacles.height)) {
      return false;
    }

    return true;
  }

  #gameOver() {

    if (this.player.hp <= 0) {
      // Calculate the total anrmCount
      Player.finalAnrm += this.player.anrmCount;
      // Stop the setInterval
      clearInterval(this.gameInterval);
      // Reset all the used static arrays
      VampireControl.vampires = [];
      bulletController.bullets = [];
      // Display end div
      let fpsDisplay = document.getElementById('fps');
      fpsDisplay.innerText = `Total Vampire Cleased: ${Player.finalAnrm}`;
      Player.finalAnrm = 0;
      document.getElementById('gameScreen').style.display = "none";
      document.getElementById('title').style.display = "none";
      document.getElementById('rules').style.display = "none";
      document.getElementById('win').style.display = "none";
      document.getElementById('end').style.display = "block";
    }
    else if (Player.finalAnrm >= 1120) {
      clearInterval(this.gameInterval);
      //When the total number of kills exceeds all progress bars, jump to the victory screen
      // Reset all the used static arrays
      VampireControl.vampires = [];
      bulletController.bullets = [];
      //draw the final anrm count
      let fpsDisplay = document.getElementById('fps'); 
      fpsDisplay.innerText = `Total Vampire Cleansed: ${Player.finalAnrm}`;
      document.getElementById('gameScreen').style.display = "none";
      document.getElementById('title').style.display = "none";
      document.getElementById('rules').style.display = "none";
      document.getElementById('end').style.display = "none";
      document.getElementById('win').style.display = "block";

      Player.finalAnrm = 0; //reset anrm count
    }


  }
}