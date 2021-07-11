const gameSettings = {
  playerSpeed: 200,
};

const config = {
  width: 1002,
  height: 640,
  backgroundColor: 0x000000,
  scene: [SceneMajor, Scene1, Scene2],
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
};

window.onload = function () {
  const game = new Phaser.Game(config);
};
