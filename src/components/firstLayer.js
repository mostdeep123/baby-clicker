class FirstLayer extends Phaser.GameObjects.Sprite{
    constructor(scene)
    {
        super(
            scene,
            scene.cameras.main.width / 2,
            scene.cameras.main.height / 2 - 100,
            'layer-1'
          )

          scene.add.existing(this);
          this.setOrigin(0.5);
          this.y = 500
          this.setSize(272, 104);
          this.setScale(2.0, 2.0);
          this.setInteractive();
          
          
          
    }

    

}