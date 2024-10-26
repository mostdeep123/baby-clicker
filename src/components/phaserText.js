class PhaserText extends Phaser.GameObjects.Text {
  constructor(scene) {
    super(
      scene,
      scene.cameras.main.width / 2,
      scene.cameras.main.height / 2 + 100,
      'HELLO',
      { color: '#000000', 
        fontSize: 10 ,
        font: '600 50px'
      }
    )

    scene.add.existing(this)
    this.setOrigin(0.5)
  }
}
