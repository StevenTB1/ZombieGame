class KillCount {

  constructor(player) {
    this.player = player;
    this.count = this.player.anrmCount;
    this.stageCount = this.player.anrmStageCount;
  }

  // @desc: Draw the vampire count bar below the health bar
  draw() {
    this.count = this.player.anrmCount;
    this.stageCount = this.player.anrmStageCount;

    Canvas.context.lineWidth = 2;
    Canvas.context.font = '20px serif';

    if (this.stageCount <= 50) {
      // Unfilled part
      Canvas.context.fillStyle = 'rgb(207, 212, 208)';
      Canvas.context.fillRect(15, 65, this.stageCount * 10, 35);

      // dealt part
      Canvas.context.fillStyle = 'rgb(135, 157, 237)';
      Canvas.context.fillRect(15, 65, this.count * 10, 35);

      // Text part
      Canvas.context.fillStyle = 'rgb(0, 0, 0)';
      const barMid = this.stageCount * 5;
      Canvas.context.fillText(`Vampire Count: ${this.count} / ${this.stageCount}`, barMid - 80, 89);

      // Draw the outline
      Canvas.context.strokeRect(15, 65, this.stageCount * 10, 35);
      
    } else {
      // Unfilled part
      Canvas.context.fillStyle = 'rgb(207, 212, 208)';
      Canvas.context.fillRect(15, 65, this.stageCount * 0.5, 35);

      // dealt part
      Canvas.context.fillStyle = 'rgb(135, 157, 237)';
      Canvas.context.fillRect(15, 65, this.count * 0.2, 35);

      // Text part
      Canvas.context.fillStyle = 'rgb(0, 0, 0)';
      const barMid = this.stageCount * 0.25;
      Canvas.context.fillText(`Vampire Count: ${this.count} / ${this.stageCount}`, barMid - 80, 89);

      // Draw the outline
      Canvas.context.strokeRect(15, 65, this.stageCount * 0.5, 35);
    }

  }
}