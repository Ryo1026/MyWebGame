class Scene1 extends Phaser.Scene {
  constructor() {
    super("main");
    this.tab = [
      0, 0, -4, 25, 250, 2, 1, -4, 25, 100, 3, 1, -2, 25, 100, 4, 2, 2, 25, 100,
      -4, 2, 2, 10, 100, 0, 0, -2, 25, 250, 0, 2, 0, 25, 200, 0, 2, 2, 25, 100,
      0, 0, 2, 25, 100, 2, 0, 2, 25, 200, 0, 2, 2, 25, 200, 2, 0, 2, 25, 200, 0,
      4, 2, 25, 200,
    ];

    this.ppDist = 800;
    this.speedx = 0;
    this.speedy = 0;
    this.speedz = 0;
    this.speedx2 = 0;
    this.speedy2 = 0;
    this.speedz2 = 0;
    this.max = 180;
    this.balls = [];
    this.xx = [];
    this.yy = [];
    this.zz = [];
    this.bx = 0;
    this.tabb = 0;
    this.del = this.tab[this.tabb + 4];
    this.delx = this.tab[this.tabb + 3];
    this.spx = 1;
    this.spy = 1;
    this.spz = 1;
  }

  create() {
    console.log(this.scene.systems.game.config);

    const sprites = this.add.group();

    this.balls = [];

    for (var i = 0; i < this.max; i++) {
      this.xx[i] = Math.floor(Math.random() * 1600) - 800;
      this.yy[i] = Math.floor(Math.random() * 1200) - 600;
      this.zz[i] = Math.floor(Math.random() * 1600) - 800;

      const star = this.add.sprite(0, 0, "star");
      star.setOrigin(0.5);

      sprites.add(star);

      this.balls.push(star);
    }

    this.speedx = this.tab[this.tabb + 0];
    this.speedy = this.tab[this.tabb + 1];
    this.speedz = this.tab[this.tabb + 2];

    // 隕石
    this.add
      .image((config.width / 7) * 5, 30, "triplemeteor")
      .setOrigin(0, 0)
      .setScale(0.25);

    // 大飛船
    this.spaceship1 = this.add
      .image((config.width / 7) * 2, 200, "spaceship")
      .setScale(0.45);
    this.spaceship1.rotation += 0.8;

    // 小飛船
    this.spaceship2 = this.add
      .image((config.width / 7) * 1, 250, "spaceship")
      .setScale(0.24);
    this.spaceship2.rotation += 0.8;

    // 文字
    this.add.text(config.width / 2 - 90, config.height / 2 - 90, "星際任務", {
      font: "45px Arial",
      fill: "white",
      fontWeight: "bold",
    });

    // 開始遊戲icon
    this.add
      .image(config.width / 2, config.height / 2 + 100, "volt")
      .setScale(0.2);

    // 開始按鈕
    this.button = this.add.rectangle(
      config.width / 2,
      config.height / 2 + 190,
      194,
      60,
      0xb388fe
    );
    this.add.text(config.width / 2 - 48, config.height / 2 + 178, "開始遊戲", {
      font: "24px Arial",
      fill: "white",
      fontWeight: "bold",
    });

    // 改變Scene
    this.button.setInteractive({ cursor: "pointer" });
    this.button.on(
      "pointerdown",
      function (pointer) {
        this.scene.start("playgame");
      },
      this
    );
  }

  update() {
    this.delx--;

    if (this.delx === 0) {
      if (this.speedz > this.speedz2) {
        this.speedz2++;
      }

      if (this.speedz < this.speedz2) {
        this.speedz2--;
      }

      if (this.speedx > this.speedx2) {
        this.speedx2++;
      }

      if (this.speedx < this.speedx2) {
        this.speedx2--;
      }

      if (this.speedy > this.speedy2) {
        this.speedy2++;
      }

      if (this.speedy < this.speedy2) {
        this.speedy2--;
      }

      this.delx = this.tab[this.tabb + 3];
    }

    this.del--;

    if (this.del === 0) {
      this.tabb += 5;

      if (this.tabb >= this.tab.length) {
        this.tabb = 0;
      }

      this.speedx = this.tab[this.tabb + 0];
      this.speedy = this.tab[this.tabb + 1];
      this.speedz = this.tab[this.tabb + 2];

      this.del = this.tab[this.tabb + 4];
    }

    for (var i = 0; i < this.max; i++) {
      var perspective = this.ppDist / (this.ppDist - this.zz[i]);

      this.balls[i].x = 400 + this.xx[i] * perspective;
      this.balls[i].y = 300 + this.yy[i] * perspective;
      this.balls[i].alpha = Math.min(perspective / 2, 1);
      this.balls[i].setScale(perspective / 2);

      this.xx[i] += this.speedx2;

      if (this.xx[i] < -800) {
        this.xx[i] = this.xx[i] + 1600;
      }

      if (this.xx[i] >= 800) {
        this.xx[i] = this.xx[i] - 1600;
      }

      this.yy[i] += this.speedy2;

      if (this.yy[i] < -600) {
        this.yy[i] = this.yy[i] + 1200;
      }

      if (this.yy[i] >= 600) {
        this.yy[i] = this.yy[i] - 1200;
      }

      this.zz[i] -= this.speedz2;

      if (this.zz[i] < -800) {
        this.zz[i] += 1600;
      }

      if (this.zz[i] > 800) {
        this.zz[i] -= 1600;
      }
    }
  }
}
