class Scene2 extends Phaser.Scene {
  constructor() {
    super("playgame");
  }

  // 創造元素
  create() {
    this.background = this.add.tileSprite(
      0,
      0,
      config.width,
      config.height,
      "background"
    );
    this.background.setOrigin(0, 0);

    this.rocket = this.physics.add.image(
      config.width / 10,
      config.height / 2,
      "rocket"
    );

    this.rocket.body.setSize(this.rocket.width - 50, this.rocket.height - 40);
    this.rocket.setScale(0.4);
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.rocket.setCollideWorldBounds(true);

    // 設定所有隕石碰撞
    this.enemies = this.physics.add.group();
    this.physics.add.overlap(
      this.rocket,
      this.enemies,
      this.hitRocket,
      null,
      this
    );

    // 隕石1群組 增加物理屬性
    this.mutiMeteor1 = this.physics.add.group();

    for (let i = 0; i < 8; i++) {
      const meteor1 = this.physics.add.image(
        config.width,
        config.height,
        "meteor1"
      );
      meteor1.setOrigin(1, 0).setScale(Phaser.Math.Between(3, 5) / 10);
      meteor1.x = config.width + meteor1.width + Phaser.Math.Between(0, 2000);
      const randomY = Phaser.Math.Between(0, config.height - meteor1.height);
      meteor1.y = randomY;

      this.mutiMeteor1.add(meteor1);
      this.enemies.add(meteor1);
    }

    // 隕石2群組
    this.mutiMeteor2 = this.physics.add.group();

    for (let j = 0; j < 7; j++) {
      const meteor2 = this.physics.add.image(
        config.width,
        config.height,
        "meteor2"
      );
      meteor2.setOrigin(1, 0).setScale(Phaser.Math.Between(2, 4) / 10);
      meteor2.x = config.width + meteor2.width + Phaser.Math.Between(0, 1000);
      const randomY = Phaser.Math.Between(0, config.height - meteor2.height);
      meteor2.y = randomY;

      this.mutiMeteor2.add(meteor2);
      this.enemies.add(meteor2);
    }

    // 設置純文字
    // this.add.text(20, 20, "咚咚鼠", { font: "25px Arial", fill: "yellow" });

    // 分數紀錄
    this.score = 0;
    this.scoreLabel = this.add.text(config.width - 130, 15, "分數:", {
      font: "25px Arial",
      fill: "yellow",
    });

    // 生命值紀錄
    this.lifeText = this.add.text(15, 15, "生命值:", {
      font: "25px Arial",
      fill: "yellow",
    });
    this.hp = 3;
    this.lifes = [];
    for (let i = 0; i < this.hp; i++) {
      const heart = this.add.image(105 + 40 * i, 15, "heart");
      heart.setOrigin(0, 0).setScale(0.065);
      this.lifes.push(heart);
    }

    // 結束畫面
    this.infoBox = this.add.rectangle(
      config.width / 2,
      config.height / 2,
      745,
      435,
      0xb388fe
    );

    this.infoBoxText = this.add.text(
      config.width / 2,
      config.height / 2 - 40,
      `恭喜完成任務!!
商品折價券已存入您的帳戶
請至會員中心確認
      
小提醒:一個帳號僅能獲得一次
遊戲可重複遊玩
但不會再獲得折價券`,
      {
        font: "25px Arial",
        fill: "white",
        align: "center",
      }
    );
    this.infoBoxText.setOrigin(0.5, 0.5);

    this.infoGroup = this.add.container(0, 0, [this.infoBox, this.infoBoxText]);
    this.infoGroup.setVisible(false);
  }

  // 火箭遭擊中
  hitRocket(rocket, enemies) {
    console.log("hit!");
    // 重置隕石位置
    this.resetMeteor(enemies);
    if (this.score <= 0) this.score = 0;
    // 生命值-1
    if (this.hp > 0) {
      this.hp -= 1;
    }
  }

  // 隕石位移
  moveMeteor(meteor, speed) {
    meteor.x -= speed;
    if (meteor.x < 0) {
      this.resetMeteor(meteor);
    }
  }

  // 重設隕石位置
  resetMeteor(meteor) {
    // console.log(meteor.width);
    meteor.x = config.width + meteor.width + Phaser.Math.Between(0, 1000);
    const randomY = Phaser.Math.Between(0, config.height - meteor.height);
    meteor.y = randomY;

    this.score += 5;
    this.scoreLabel.text = "分數:" + this.score;
  }

  // 火箭的移動
  moveRocketManager() {
    if (this.cursorKeys.up.isDown) {
      this.rocket.y -= 5;
    } else if (this.cursorKeys.down.isDown) {
      this.rocket.y += 5;
    }
  }

  // 更新狀態
  update() {
    for (let i = 0; i < this.mutiMeteor1.getChildren().length; i++) {
      this.moveMeteor(this.mutiMeteor1.getChildren()[i], 3);
    }

    for (let j = 0; j < this.mutiMeteor2.getChildren().length; j++) {
      this.moveMeteor(this.mutiMeteor2.getChildren()[j], 5);
    }

    this.background.tilePositionX += 1;

    this.moveRocketManager();

    for (let k = 0; k < this.lifes.length; k++) {
      if (k < this.hp) {
        this.lifes[k].setVisible(true);
      } else {
        this.lifes[k].setVisible(false);
      }
    }

    if (this.hp === 0) {
      this.infoGroup.setVisible(true);
      this.scene.pause();

      // todo:react寫入折價券資料庫
    }
  }
}
