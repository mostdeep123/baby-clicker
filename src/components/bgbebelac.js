class BgBebelac extends Phaser.GameObjects.Sprite {
    constructor(scene)
    {
        super(
            scene, 
            scene.cameras.main.width/2,
            scene.cameras.main.height/2,
            'playgamebg'
        )

        scene.add.existing(this);
        this.setOrigin(0.5);
        this.setSize(852, 1108);
        this.setInteractive();
        this.setScale(0.6, 0.6);

    }
}