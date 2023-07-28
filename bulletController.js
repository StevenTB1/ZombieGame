 class bulletController {
   
  // The array that stores all the bullets
  static bullets = [];

  constructor(player) {
    this.player = player;
  }

  // @desc: draw all the bullets
  draw() {
    for (let bullet of bulletController.bullets) {
      bullet.draw();
    }
  }

  // @desc: Update all the bullets' status
  update() {
    for (let bullet of bulletController.bullets) {
      this.#removeBullet(bullet);
      this.#touchVampire(bullet);
      bullet.updateCoordinate();
    }
  }

  // @desc: Remove the bullet from the bullet array if it hits the border
  // @param: {object} bullet: The bullet object
  #removeBullet(bullet) {
    const index = bulletController.bullets.indexOf(bullet);
    if (Physics.bulletHitBorder(bullet, this.player)) {
      bulletController.bullets.splice(index, 1);
    }

    else if(Physics.objCollision(bullet, this.player.background.obstacles)){
      bulletController.bullets.splice(index, 1);
    }
  }

  // @desc: Determine if the bullet touches the vampires.
  // @desc: If it does, remove the bullet from the bullet array
  // @param: {object} bullet: The bullet object
  #touchVampire(bullet) {
    for (let vampire of VampireControl.vampires) {
      if (Physics.objCollision(bullet, vampire)) { 
        if(bullet.type === 'D') vampire.isSlowed = true;     
        vampire.hp -= bullet.damage;
        const index = bulletController.bullets.indexOf(bullet);
        bulletController.bullets.splice(index, 1);
      }
    }
  }
}