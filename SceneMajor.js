class SceneMajor extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    this.load.image("background", "gameImg/universeBg2.jpg");
    this.load.image("meteor1", "gameImg/meteor1.svg");
    this.load.image("meteor2", "gameImg/meteor2.svg");
    this.load.image("rocket", "gameImg/rocket2.svg");
    this.load.image("heart", "gameImg/heart-solid.png");
    this.load.image("star", "gameImg/star.png");
    this.load.image("triplemeteor", "gameImg/triplemeteor.svg");
    this.load.image("spaceship", "gameImg/spaceship.svg");
    this.load.image("volt", "gameImg/voltmeter.svg");
  }

  create() {
    this.add.text(20, 20, "Loading");
    this.scene.start("main");
  }
}
