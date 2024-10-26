class Face extends Phaser.GameObjects.Sprite {
    constructor(scene)
    {
        super(
            scene, 
            scene.cameras.main.width/2,
            scene.cameras.main.height/2,
            'smiley-face-1'
        )

        scene.add.existing(this);
        this.setOrigin(0.5);
        this.setSize(512, 512);
        this.setInteractive();
        this.setScale(5.0, 5.0);

    }
}