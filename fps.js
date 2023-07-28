class Fps {
  constructor() {

  }

  // @desc: Simply show the fps
  static fpsDisplay() {
    let fpsDisplay = document.getElementById('fps');
    fpsDisplay.innerText = Player.finalAnrm;
  }
}