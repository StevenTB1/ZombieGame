class Canvas {
  static canvas = document.getElementById("gameScreen");
  static context = Canvas.canvas.getContext('2d');
  
  static width = 1920 / 2;
  static height = 1080 / 2;
  
  constructor() {
    Canvas.canvas.width = Canvas.width;
    Canvas.canvas.height = Canvas.height;
    this.game = new Game();
  }
}
