class Food extends Phaser.GameObjects.Sprite {
    constructor(scene)
    {
        super(
            scene, 
            scene.cameras.main.width/2 - 200.0,
            scene.cameras.main.width/2 - 300.0,
            'vegetable'
        )
        scene.add.existing(this);
        this.setOrigin(0.5);
        this.setSize(605, 413);
        this.setInteractive();
        this.setScale(0.25, 0.25);

    }
}