class Background {
  w = 1920;
  h = 1080;
  #accel = 10 / Game.fps;
  HorizontalVelocity = 0;
  VerticalVelocity = 0;
  #maxVelocity = 200 / Game.fps;

  constructor(x, y, player) {
    this.x = x;
    this.y = y;
    this.player = player;
    this.obstacles = new Obstacles(this);

    let img = new Image();
    img.src = './images/ice.jpg';
    this.image = img;
  }

  // @desc: Draw the background with corresponds x and y
  draw() {
    Canvas.context.drawImage(this.image, this.x, this.y);
  }

  // @desc: Update the elements of the background
  update() {
    this.checkVelocity();
    this.velocity();
    this.moveMap();
    this.obstacles.updateCoordinate();
  }

  // @desc: Check if the velcoity is excessive
  // @desc: When no key pressed, the velocity should be zero
  checkVelocity() {
    // The bound of determining excessive velocity
    const bound = this.#accel / 5;

    if (!Controller.d && !Controller.a && !Controller.w && !Controller.s) {
      if (Math.abs(this.HorizontalVelocity) < bound) {
        this.HorizontalVelocity = 0;
      }
      if (Math.abs(this.VerticalVelocity) < bound) {
        this.VerticalVelocity = 0;
      }
    }
  }

  // @desc: Modify the velocity based on user key-press
  velocity() {
    // If it does not exceed the max velocity we set
    if (Math.abs(this.HorizontalVelocity) <= this.#maxVelocity) {
      if (Controller.d) {
        this.HorizontalVelocity += this.#accel;
      }

      if (Controller.a) {
        this.HorizontalVelocity += -this.#accel;
      }
    }

    if (Math.abs(this.VerticalVelocity) <= this.#maxVelocity) {
      if (Controller.w) {
        this.VerticalVelocity += -this.#accel;
      }
      if (Controller.s) {
        this.VerticalVelocity += this.#accel;
      }
    }
  }

  // @desc: Move the map according to the player's movement
  moveMap() {
    const cameraX = Canvas.width / 2 - 35;
    const cameraY = Canvas.height / 2 - 54;

    // Moving down case
    if (this.VerticalVelocity > 0) {
      // If player is not in the middle, move player coor first
      if (this.player.y <= cameraY) {
        this.player.y += this.VerticalVelocity;
      }

      // Else if the map is on the edge of the canva, move player
      else if (this.y + this.h <= Canvas.height) {
        this.y = Canvas.height - this.h;
        this.player.y += this.VerticalVelocity;
      }

      // Neither map is on the edge nor player is not in the center
      else {
        this.y -= this.VerticalVelocity;
      }

      // Decrease the velocity by accel (acts as friction)
      this.VerticalVelocity -= this.#accel / 5;
    }

    // Moving up case
    if (this.VerticalVelocity < 0) {
      if (this.player.y >= cameraY) {
        this.player.y += this.VerticalVelocity;
      }
      else if (this.y >= 0) {
        this.y = 0;
        this.player.y += this.VerticalVelocity;
      }
      else {
        this.y -= this.VerticalVelocity;
      }

      this.VerticalVelocity += this.#accel / 5;

    }

    // Moving right case
    if (this.HorizontalVelocity > 0) {
      if (this.player.x <= cameraX) {
        this.player.x += this.HorizontalVelocity;
      }
      else if (this.x + this.w <= Canvas.width) {
        this.x = Canvas.width - this.w;
        this.player.x += this.HorizontalVelocity;
      }

      else {
        this.x -= this.HorizontalVelocity;
      }

      this.HorizontalVelocity -= this.#accel / 5;
    }

    // Moving left case
    if (this.HorizontalVelocity < 0) {

      if (this.player.x >= cameraX) {
        this.player.x += this.HorizontalVelocity;
      }

      else if (this.x >= 0) {
        this.x = 0;
        this.player.x += this.HorizontalVelocity;
      }

      else {
        this.x -= this.HorizontalVelocity;
      }

      this.HorizontalVelocity += this.#accel / 5;
    }
  }
}