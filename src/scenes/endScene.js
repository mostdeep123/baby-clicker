class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EndScene' })
      }

      preload ()
      {

      }

      create ()
      {
        posX = this.cameras.main.width/2;
        posY = this.cameras.main.height/2;

        pointer = this.add.sprite(0, 0, 'cursor').setOrigin(.5);
        pointer.setScale(0.5, 0.5);
        if(!backgroundDesktop)pointer.visible = false;


        var bebelacPlacer = this.add.graphics();
        bebelacPlacer.fillStyle(0xFDB12B,1.0);
        bebelacPlacer.fillRect(0, 0, 1000, 1000);

        //add a delay timer
        //before play animation face 
        this.time.addEvent ({
            delay:500, 
            callback:this.PlaySmileyAnimationFace,
            callbackScope: this
        });

        this.time.addEvent ({
            delay:600, 
            callback:this.SpawnText,
            callbackScope: this
        });
        
        //trigger on mouse
        //button_bebelacshop.on('pointerdown', this.QuitGame);
    }

      update ()
      {
        //set the pointers of the game
        pointer.x = this.game.input.mousePointer.x;
        pointer.y = this.game.input.mousePointer.y;
        
        //most front of the layer
        pointer.depth = 6;
        
      }

    SpawnText ()
    {
        var endText = new PhaserText(this);
        endText.setFontFamily('font2');
        endText.text = "Nilai";
        endText.setColor('#ffffff');
        endText.setFontSize(30);
        endText.y -= 315;
        endText.depth = 2;
    }

    SpawnCommandWinText ()
    {
        var commandText = new PhaserText(this);
        commandText.setColor('#2F2D97')
        commandText.setFontFamily('font2');
        commandText.setFontStyle('bold');
        commandText.setFontSize(20);
        commandText.text = "Hebat Sekali";
        commandText.y -= 100;
        commandText.depth = 2;
    }

    SpawnCommandLoseText ()
    {
        var commandText2 = new PhaserText(this);
        commandText2.setColor('#2F2D97');
        commandText2.setFontSize(20);
        commandText2.text = "Yuk, pilih yang lebih sehat!";
        commandText2.setFontFamily('font2');
        commandText2.setFontStyle('bold');
        commandText2.y -= 100;
        commandText2.depth = 2;
    }

    ///play animation face
    ///and check if the animation was truly successful to load
    PlaySmileyAnimationFace ()
    {
         //smiley test animation config
         this.anims.create({
            key: 'smiley',
            frames: [
                { key: 'smiley-face-1'},
                { key: 'smiley-face-2'},
                { key: 'smiley-face-3'}
            ],
            frameRate: 6,
            repeat: 0

        });

        //sad test animation config
        this.anims.create({
            key:'sad',
            frames: [
                {key: 'smiley-face-1'},
                {key: 'sad-face-1'},
                {key: 'sad-face-2'}
            ],
            frameRate: 6, 
            repeat: 0
        });
        
        //play the animation
        if(winCondition) 
        {this.LoadPopUpResult(); this.PlayHappySound(); this.SpawnCommandWinText();}
        else 
        {this.LoadPopUpResult(); this.PlaySadSound(); this.SpawnCommandLoseText();}
    }

     LoadPopUpResult ()
     {
        howToPlayPopUp = this.add.graphics();
        howToPlayPopUpTittle = this.add.graphics();
        var white = this.add.graphics();
        graphicFirstLine = this.add.graphics();

        let group = this.add.group();

        //foreground background att
        white.fillStyle(0xFFFFFF,1.0);
        white.setScrollFactor(0, 0);
        white.fillRoundedRect(0, 0, 500, 550, 32);
        white.x = posX - 200;
        white.y = posY - 265;
        white.depth = 0;
        white.setScale(0.8, 0.8)
        group.add(white);

        let percentageFactor = 0.92;
        let tittleOffset = 210;
        let bodyOffsetWidth = -35
        let bodyOffsetHeight = 50;

        //foreground background att
        howToPlayPopUp.fillStyle(0xFFF6DE,1.0);
        howToPlayPopUp.setScrollFactor(0, 0);
        howToPlayPopUp.fillRoundedRect(0, 0, percentageFactor*(480 + bodyOffsetWidth), percentageFactor*(360 + bodyOffsetHeight), 
        {
            tl:0, tr:0, bl:32, br:32
        });
        howToPlayPopUp.x = posX - 185;
        howToPlayPopUp.y = posY - 185;
        howToPlayPopUp.depth = 2;
        howToPlayPopUp.setScale(0.9, 0.9)

        //add this to group
        group.add(howToPlayPopUp);

        //how to play pop up tittle
        howToPlayPopUpTittle.fillStyle(0x2F2D97,1.0);
        howToPlayPopUpTittle.setScrollFactor(0, 0);
        howToPlayPopUpTittle.fillRoundedRect(0, 0, percentageFactor*(800 + tittleOffset), percentageFactor*170, 
        {
            tl:32, tr:32, bl:0, br:0
        });
        howToPlayPopUpTittle.x = posX - 185;
        howToPlayPopUpTittle.y = posY - 250;
        howToPlayPopUpTittle.depth = 1;
        howToPlayPopUpTittle.setScale(0.4, 0.4)

        //add this to group
        group.add(howToPlayPopUpTittle);

        //graph text
        graphicFirstLine.fillStyle(0xFFFFFF,1.0);
        graphicFirstLine.setScrollFactor(0, 0);
        graphicFirstLine.fillRoundedRect(0, 0, 550, 165, 12);
        graphicFirstLine.x = posX - 165;
        graphicFirstLine.y = posY + 45;
        graphicFirstLine.depth = 4;
        graphicFirstLine.setScale(0.6, 0.6)   

        //create close text
        this.CreateCloseText();
         
        if(winCondition)
        {
            faceImageSprite = new Face(this);
            faceImageSprite.setTexture('smile-smile');
            faceImageSprite.x = posX;
            faceImageSprite.y = posY - 80.0;
            faceImageSprite.setScale(1.0 , 1.0);
            faceImageSprite.depth = 2;
        }
        else
        {
            faceImageSprite = new Face(this);
            faceImageSprite.setTexture('smile-sad');
            faceImageSprite.x = posX;
            faceImageSprite.y = posY - 80.0;
            faceImageSprite.setScale(1.0 , 1.0);
            faceImageSprite.depth = 2;
        }

        var button_reset = this.add.image(posX, posY+100, 'btn-reset');
        button_reset.setOrigin(0.5);
        button_reset.setInteractive();
        button_reset.depth = 2;
        button_reset.setScale(0.1, 0.1);
        button_reset.y += 115;

        //adding tweens to both of button
        this.tweens.add({
            targets: button_reset, 
            scaleX: 0.55, 
            scaleY: 0.55, 
            ease: 'Power1',
            duration: 500
        });

        button_reset.on('pointerdown', this.NextScenePointer);

        var bgBebelacBox = this.add.image(posX - 30, posY, 'bebelackaleng');
        bgBebelacBox.depth = 5;
        bgBebelacBox.setScale(0.055, 0.055);
        bgBebelacBox.x += 157;
        bgBebelacBox.y += 95;

     }

     CreateCloseText ()
     {
        howToPlayText = new PhaserText(this);
        howToPlayText.setFontFamily('font2');
        howToPlayText.y -= 5;
        howToPlayText.x -= 27;
        howToPlayText.text = ['Pastikan si Kecil Mendapatkan', 'Asupan yang sehat dan bernutrisi', 'untuk perutnya ya. Dukung pula', 
        'dengan Bebelac']; 
        howToPlayText.setAlign('center');
        howToPlayText.depth = 5;
        howToPlayText.setFontSize(13);
     }

    NextScenePointer ()
     {
        this.scene.scene.start("MainScene");
     }

     QuitGame ()
     {
        this.scene.scene.start('PreloadScene');
     }

    ///play sad sound
    PlaySadSound ()
    {
        if(userMediaCalled) audioX.volume = 0;
        else bgbgm.volume = 0;
        if(this.sadSound != null) this.sadSound.stop();
        if(this.happySound != null) this.happySound.stop();
        this.sadSound = this.sound.add('sad-sound', {volume:3.0});
        this.sadSound.loop = false;
        this.sadSound.play();
    }

    ///play happy sound
    PlayHappySound ()
    {
        if(userMediaCalled) audioX.volume = 0;
        else bgbgm.volume = 0;
        if(this.sadSound != null) this.sadSound.stop();
        if(this.happySound != null) this.happySound.stop();
        this.happySound = this.sound.add('happy-sound-2', {volume:3.0});
        this.happySound.loop = false;
        this.happySound.play();
    }
}