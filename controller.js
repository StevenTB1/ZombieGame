class Controller {
  // Keeps track of which key is pressed down
  static w = false;
  static a = false;
  static s = false;
  static d = false;

  static shootPressed = false;
  static mousex = 0;
  static mousey = 0;
  
  constructor() {
    document.addEventListener("keydown", (e) => {
      this.keyDownHandler(e);
    })

    document.addEventListener("keyup", (e) => {
      this.keyUpHandler(e);
    })

    onmousemove = function(e) {
      Controller.mousex = e.clientX;
      Controller.mousey = e.clientY;
    };
  }

  // @desc: handling when a key is pressed down
  keyDownHandler(e) {
    if (e.key === "w") {
      Controller.w = true;
    }

    if (e.key === "a") {
      Controller.a = true;
    }

    if (e.key === "s") {
      Controller.s = true;
    }

    if (e.key === "d") {
      Controller.d = true;
    }

    if (e.code === "Space") {
      Controller.shootPressed = true;
    }

  }

  // @desc: handling when a key is not pressed or pressed up
  keyUpHandler(e) {
    if (e.key === "w") {
      Controller.w = false;
    }
    if (e.key === "a") {
      Controller.a = false;
    }
    if (e.key === "s") {
      Controller.s = false;
    }
    if (e.key === "d") {
      Controller.d = false;
    }
    if (e.code === "Space") {
      Controller.shootPressed = false;
    }
  }
}