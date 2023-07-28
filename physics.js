class Physics {
  constructor() {

  }

  // @desc: Check if the bullet hits the border
  // @param: {object} bullet: The bullet object
  // @param: {object} player: The player object
  static bulletHitBorder(bullet, player) {
    if (bullet.x <= player.background.x ||
      (bullet.x + bullet.width) > (player.background.x + player.background.w) ||
      bullet.y <= player.background.y ||
      (bullet.y + bullet.height) > (player.background.y + player.background.h)) {
      return true;
    } else {
      return false;
    }
  }

  // @desc: Detect if the player hits the background edge
  // @param: {object} player: The player object
  // @param: {object} background: The background object
  static playerHitMap(player, background) {

    //Hit left border
    if (player.x <= background.x) {
      player.x = background.x;
      background.HorizontalVelocity = 0;
    }

    //Hit right border
    if (player.x + player.width >= background.x + background.w) {
      player.x = background.x + background.w - player.width;
      background.HorizontalVelocity = 0;
    }

    //Hit top border
    if (player.y <= background.y) {
      player.y = background.y;
      background.VerticalVelocity = 0;
    }

    //Hit bottom border
    if (player.y + player.height >= (background.y + background.h)) {
      player.y = (background.y + background.h) - player.height;
      background.VerticalVelocity = 0;
    }
  }

  // @desc: Check for if two game objects collide
  // @param: {object} obj1: the first object
  // @param: {object} obj2: the second object
  static objCollision(obj1, obj2) {
    if (
      obj1.x + obj1.width > obj2.x &&
      obj1.x < obj2.x + obj2.width &&
      obj1.y + obj1.height > obj2.y &&
      obj1.y < obj2.y + obj2.height
    ) {
      return true;
    }
    return false;
  }
}