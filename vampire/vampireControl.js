class VampireControl {
  static vampires = [];

  constructor(player) {
    this.player = player;
  }

  draw() {
    for (let vampire of VampireControl.vampires) {
      vampire.draw();
    }
  }

  // @desc: Update the related movement of all vampires
  update() {
    for (let vampire of VampireControl.vampires) {
      vampire.updateCoordinate();
      vampire.slowDown();
      this.#touchPlayer(this.player, vampire);

      if (Physics.objCollision(vampire, this.player.background.obstacles)) {
        this.#detectSide(vampire, this.player.background.obstacles);
        this.#determineMovement(this.player, vampire);
      }

      this.#moveAround(vampire, this.player.background.obstacles);
      this.move(this.player, vampire);

      this.#removeVampire(vampire);
    }
  }

  // @desc: Remove the vampire from the array if its health is lower than 0
  // @param: {object} vampire: The vampire object
  #removeVampire(vampire) {
    if (vampire.hp <= 0) {
      const index = VampireControl.vampires.indexOf(vampire);
      VampireControl.vampires.splice(index, 1);
      this.player.anrmCount = 1;
    }
  }

  // @desc: Detect which side the vam touch on the block
  // @param: {object} vam: The vampire object
  // @param: {object} block: The obstacle object
  #detectSide(vam, block) {
    // If it's not being detected before (one time run)
    if (!vam.isdetected) {
      // Within the y range of the block
      if (vam.y + vam.height > block.y + 5 && vam.y < block.y + block.height - 5) {
        if (vam.x < block.x && vam.x + vam.width >= block.x) {
          vam.obsLeft = true;
        }
        else if (vam.x > block.x && vam.x <= block.x + block.width) {
          vam.obsRight = true;
        }
      }
      // Within the x range of the block
      else if (vam.x + vam.width > block.x + 5 && vam.x < block.x + block.width - 5) {
        if (vam.y < block.y && vam.y + vam.height >= block.y) {
          vam.obsUp = true;
        }
        else if (vam.y > block.y && vam.y <= block.y + block.height) {
          vam.obsDown = true;
        }
      }
      vam.isdetected = true;
    }
  }

  // @desc: Detect which side the vam touch on the block
  // @param: {object} player: The player object
  // @param: {object} vam: The vampire object
  #determineMovement(player, vam) {
    // If it's not being determined before (one time run)
    if (!vam.isdetermined) {
      if (vam.obsLeft || vam.obsRight) {
        // player upper of the vampire
        if (player.y <= vam.y) {
          vam.moveUp = true;
        }
        // player lower of the vampire
        else {
          vam.moveDown = true;
        }
        vam.isdetermined = true;
      }

      //if (vam.obsUp || vam.obsDown)

      else {
        // player left of the vampire
        if (player.x <= vam.x) {
          vam.moveLeft = true;
        }
        // player right of the vampire
        else {
          vam.moveRight = true;
        }
        vam.isdetermined = true;
      }
    }
  }

  // @desc: Detect which side the vam touch on the block
  // @param: {object} vam: The vampire object
  // @param: {object} block: The obstacle object
  #moveAround(vam, block) {
    if (vam.moveUp) {
      vam.y -= vam.velocity;
      // have gone through the current wall
      if (vam.y + vam.height <= block.y - 5) {
        // Reset all obs detections
        vam.obsLeft = false;
        vam.obsRight = false;
        vam.moveUp = false;
        vam.isdetected = false;
        vam.isdetermined = false;
      }
    }

    if (vam.moveDown) {
      vam.y += vam.velocity;
      // have gone through the current wall
      if (vam.y >= block.y + block.height + 5) {
        // Reset all obstacle collision detections
        vam.obsLeft = false;
        vam.obsRight = false;
        vam.moveDown = false;
        vam.isdetected = false;
        vam.isdetermined = false;
      }
    }

    if (vam.moveRight) {
      vam.x += vam.velocity;
      if (vam.x >= block.x + block.width + 5) {
        vam.obsUp = false;
        vam.obsDown = false;
        vam.moveRight = false;
        vam.isdetected = false;
        vam.isdetermined = false;
      }
    }

    if (vam.moveLeft) {
      vam.x -= vam.velocity;
      if (vam.x + vam.width < block.x - 5) {
        vam.obsUp = false;
        vam.obsDown = false;
        vam.moveLeft = false;
        vam.isdetected = false;
        vam.isdetermined = false;
      }
    }
  }

  // @desc: Check if the vampire touches the player
  #touchPlayer(player, vampire) {
    if (Physics.objCollision(player, vampire)) {
      const index = VampireControl.vampires.indexOf(vampire);
    
      // Dealt damage to the player
      player.hp -= vampire.atk;
      player.healthbar.hp -= vampire.atk;
      
      // Remove this vampire from the index
      VampireControl.vampires.splice(index, 1);
    }
  }

  // @desc: Check for the vampires movement for next time interval
  move(player, vampire) {
    // If is not collided with the obstacles
    if (vampire.isdetected === false && 
        vampire.isdetermined === false && 
        typeof vampire !== 'undefined') {
      
      const xDiff = vampire.x - player.x;
      const yDiff = vampire.y - player.y;

      const angle = (Math.atan2(yDiff, xDiff) * 180 / Math.PI) + 180;
      const angleInRad = angle / 180 * Math.PI;
      vampire.angle = angleInRad;

      vampire.x += vampire.velocity * Math.cos(angleInRad);
      vampire.y += vampire.velocity * Math.sin(angleInRad);
    }
  }
}