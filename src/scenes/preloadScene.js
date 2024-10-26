//current food keys available in the games
const foodKeys = ['apple', 'brokoli', 'burger', 'candy', 'glass', 'nanas', 'pizza', 'salmon', 'coklat', 'soda'
,'banana', 'chicken', 'water', 'juice', 'coconut', 'fries', 'pull_tea'];
const foodAmountValue = [20, 20, -20, -20, 20, 20, -20, 20, -20, -20
,20, 20, 20, 20, 20, -20, -20];
var randomSpriteKey = [];
var randomAmountInScene = []
var sensorDetection = []
var currentBarValue = 0;

//create enumeration for baby type animation
const babyAnimationType = Object.freeze({
    idle: 0, 
    happy: 1, 
    sad: 2
});

//store baby animations data into key text
var happyBabyKeys = ['0','1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', 
                      '17', '18', '19', '20', '21', '22', '23', '24', '25', '26'];
var hungryBabyKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15',
                      '16', '17', '18', '19', '20', '21', '22', '23'];
var hungryBabyKeysSad = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15',
                      '16', '17', '18', '19', '20', '21', '22', '23', '24','25'];
                                          
//attributes
var food = null;
var posX = 0;
var posY = 0;
var foodArray = []
var randomSprite = null
var image = null
var currentIndexOfFood = 0;
var barFill = 0.5 * 298;
var maxBarFill = 298;
var startBarFill = 0;
var fillBarHeight = 21;
var progressBox = null;
var progressBar = null;
var pointer = null;
var sceneLayer = null;
var posX = 0;
var posY = 0;
var newFoodKey = '';
var startFill = 0;
var faceImageSprite = null;
var winCondition = false;
var button_play = null;
var faceImageInGame = null;
var goodFoodPercentage = 70;
var badFoodPercentage = 30;
var howToPlayPopUp = null;
var howToPlayPopUpTittle = null;
var buttonPlayTemp = null;
var countBadFoodSpawned = 0;
var foodOffsets = 90;
var screenOffset = 20;

//animation attributes
var animationFrameWidth = 142;
var animationFrameHeight = 130;
var spriteSheet = null;
var dragonAnim = null;
var babyAnim = null;
var babySprite = null;
var babyConfig = null;
var babyConfig2 = null;
var babyConfig3 = null;
var babyConfig4 = null;

//audio sounds
var sadSound = null;
var happySound = null;
var correctAudios = ['correct', 'correct-2', 'correct-3'];
var mistakeAudios = ['incorrect', 'incorrect-2', 'incorrect-3'];
var currentAudioSound = null;

class PreloadScene extends Phaser.Scene {
  
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.baseURL = 'src/assets/'
    this.load.image('apple', 'DESKTOP/' + foodKeys[0] + '.png');
    this.load.image('brokoli', 'DESKTOP/' + foodKeys[1] + '.png');
    this.load.image('burger', 'DESKTOP/' + foodKeys[2] + '.png');
    this.load.image('candy', 'DESKTOP/' + foodKeys[3] + '.png');
    this.load.image('glass', 'DESKTOP/' + foodKeys[4] + '.png');
    this.load.image('nanas', 'DESKTOP/' + foodKeys[5] + '.png');
    this.load.image('pizza', 'DESKTOP/' + foodKeys[6] + '.png');
    this.load.image('salmon', 'newfood/' + foodKeys[7] + '.png');
    this.load.image('coklat', 'newfood/' + foodKeys[8] + '.png');
    this.load.image('soda', 'newfood/' + foodKeys[9] + '.png');
    this.load.image('banana', 'newfood/' + foodKeys[10]+'.png');
    this.load.image('chicken', 'newfood/' + foodKeys[11] + '.png');
    this.load.image('background', 'img/white-background.png');
    this.load.image('bgbebelac', 'img/bgbebelac.png'); 
    this.load.image('btn-play', 'img/mainkan.png');
    this.load.image('cursor', 'img/cursor.png');
    this.load.image('btn-reset', 'img/main-lagi.png');
    this.load.image('button-next', 'img/lanjutkan.png');
    
    this.load.audio("audio-bg", 'img/background-sound.mp3');
    this.load.audio('sad-sound', 'img/sad-sound.wav');
    this.load.audio('happy-sound', 'img/happy-sound.wav');
    this.load.audio('happy-sound-2', 'img/baby-happy.mp3');

    //load sprite baby face HAPPY
    let m = 0;
    for (m = 0; m < happyBabyKeys.length; m++) this.load.image('baby-' + happyBabyKeys[m+1], 'HAPPY/' + happyBabyKeys[m] + '.png');
    
    //load sprite baby face HUNGRY
    let n = 0;
    for(n = 0; n < hungryBabyKeys.length; n++)this.load.image('hungry-' + hungryBabyKeys[n+1], 'HUNGRY/' + hungryBabyKeys[n] + '.png');

    //load sprite baby face SAD
    let o = 0;
    for(o = 0; o < hungryBabyKeysSad.length; o++) this.load.image('sad-' + hungryBabyKeysSad[o], 'SAD/' + hungryBabyKeysSad[o] +'.png');

    //sound effects
    this.load.audio('correct', 'img/notif.mp3')
    this.load.audio('correct-2', 'img/notif-2.mp3')
    this.load.audio('correct-3', 'img/notif-3.mp3')
    this.load.audio('incorrect', 'img/wrong.mp3');
    this.load.audio('incorrect-2', 'img/wrong2.mp3');
    this.load.audio('incorrect-3', 'img/wrong3.mp3');

    //load spritesheet test dragon
    /*this.load.spritesheet({
      key: 'dragon',
      url: 'img/flying_dragon-gold.png',
      frameConfig: {
          frameWidth: animationFrameWidth,
          frameHeight: animationFrameHeight,
          startFrame: 9,
          endFrame: 12
      }
    });*/

    /*this.load.spritesheet({
      key: 'baby-sad',
      url: 'SAD/sad-sprite.png',
      frameConfig: {
        frameWidth: animationFrameWidth,
        frameHeight: animationFrameHeight,
        startFrame: 9,
        endFrame: 12
    }
    });*/
    
    //load sprite smiley face
    this.load.image('smile-sad', 'SMILEY/sad.png');
    this.load.image('smile-smile', 'SMILEY/senyum.png');

    //load sprite background
    this.load.image('background-bebelac', 'DESKTOP/tummybackground.png');
    this.load.image('background-tittle', 'DESKTOP/TummyverseGame.png');
    this.load.image('happy-gut', 'DESKTOP/HAPPY GUT.png');
    this.load.image('sad-gut', 'DESKTOP/SAD GUT.png');
    this.load.image('playgamebg', 'DESKTOP/BG.png');
    this.load.image('tablebg', 'DESKTOP/MEJA.png');
    this.load.image('bebelacbox', 'DESKTOP/bebelacbox.png');
    this.load.image('bebelackaleng', 'DESKTOP/bebelackaleng.png');
    this.load.image('good-text', 'img/wow.png');
    this.load.image('bad-text', 'img/tidak-bagus.png');
    this.load.image('doctor', 'DESKTOP/doctor.png');

    //new food load assets
    this.load.image('water', 'newfood/' + foodKeys[12] +'.png');
    this.load.image('juice', 'newfood/' + foodKeys[13] + '.png');
    this.load.image('coconut', 'newfood/' + foodKeys[14] + '.png');
    this.load.image('fries', 'newfood/' + foodKeys[15] + '.png');
    this.load.image('pull_tea', 'newfood/' + foodKeys[16] + '.png');

    //food load controls
    var bebelacPlacer = this.add.graphics();
    bebelacPlacer.fillStyle(0xFDB12B,1.0);
    bebelacPlacer.fillRect(0, 0, 1000, 1000);

    this.LoadFont('font2', 'https://d24eqpince6acm.cloudfront.net/assets/fonts/GothamRounded-Bold.woff2');

    LoadAudio(this);
}

  create() {

    //this.input.setDefaultCursor('url(src/assets/img/4.cur), pointer');
    this.input.setDefaultCursor('none');

    posX = this.cameras.main.width/2;
    posY = this.cameras.main.height/2;

    
    //dragon test animation config
   /* let animConfig = {
      key: "dragon-anim",
      frames: this.anims.generateFrameNumbers("dragon", { frames: [ 9,10,11 ] }),
      frameRate: 12,
      repeat: -1,
    };*/

    //create baby image data
    this.CreateBabyImageData(); 

    //create baby background
    this.CreateMainMenuBackground();
   
    //register baby animation config
    this.RegisterBabyAnimationConfig();
      
    //create dragon test animation
    /*this.anims.create(animConfig);
    this.dragonAnim = this.anims.create(animConfig);*/

    let i = 0;

    for(i = 0; i < foodKeys.length; i++)
       randomSpriteKey.push(foodKeys[i]);

    var bgbebelac = this.add.image(posX - 60, posY, 'background');
    
    bgbebelac.setSize(852, 1108);
    bgbebelac.setOrigin(0.5);
    bgbebelac.setScale(0.37, 0.30);
    bgbebelac.x += 18;
    bgbebelac.y -= 102 + screenOffset;  
   
    this.input.keyboard.on('keydown_ENTER', this.MuteSound, this);
    
    //pointer attributes
    pointer = this.add.sprite(0, 0, 'cursor').setOrigin(.5);
    pointer.setScale(0.4, 0.4);
    pointer.depth = 5

    // display the sprite (ANIMATION TEST)
    //this.anim = this.add.sprite(posX, posY, 'dragon');
    //this.anim.anims.play("dragon-anim");
    //this.CreateBabySprite();
    
    this.input.keyboard.on('keydown_D', this.DragonTestRight, this);
    this.input.keyboard.on('keydown_A', this.DragonTestLeft, this);
    
    //detect sound permission from class audio javascript

    //this.CreateBabySpriteTest();

    //direcly load to the next scene
    this.scene.start('MainScene');
  }

  update ()
  {
     pointer.x = this.game.input.mousePointer.x;
     pointer.y = this.game.input.mousePointer.y;

     this.AudioNativeBackgroundPlay();
  }

  LoadFont(name, url) {
    var newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
        document.fonts.add(loaded);
    }).catch(function (error) {
        return error;
    });
  }


  ///create baby sprite
  ///and play the baby animation sprites
  CreateBabySpriteTest ()
  {
    //play and adjust the baby sproite animation
    //and set it as to 'baby-hello' state
    this.babySprite = this.add.sprite(posX, posY, 'baby-1');

    this.babySprite.y -= 15;
    
    this.babySprite.setScale(0.5, 0.5);

    this.babySprite.depth = 10;

    this.PlayAnimation();
  }

  CreateMainMenuBackground ()
  {
     var bg = this.add.sprite(posX, posY, 'background-bebelac');

     var tittleBg = this.add.sprite(posX, posY, 'background-tittle');

     bg.setScale(0.48, 0.48);

     bg.depth = 1;

     bg.y += 20 - screenOffset;

     tittleBg.setScale(0.32, 0.32);

     tittleBg.depth = 2;

     tittleBg.y -= 180 + screenOffset;
  }
  

  CreateBabyImageData ()
  {
     //create animation config
    //register all images sprite keys
    babyConfig2 = {
      key: 'baby-smile_2',
      frames: [
        {key: 'baby-1'},
        {key: 'baby-2'},
        {key: 'baby-3'},
        {key: 'baby-4'},
        {key: 'baby-5'}, 
        {key: 'baby-6'},
        {key: 'baby-7'},
        {key: 'baby-8'}, 
        {key: 'baby-9'},
        {key: 'baby-10'},
        {key: 'baby-11'},
        {key: 'baby-12'},
        {key: 'baby-13'},
        {key: 'baby-14'},
        {key: 'baby-15'},
        {key: 'baby-16'},
        {key: 'baby-17'},
        {key: 'baby-18'},
        {key: 'baby-19'},
        {key: 'baby-20'},
        {key: 'baby-21'},
        {key: 'baby-22'},
        {key: 'baby-23'},
        {key: 'baby-24'},
        {key: 'baby-25'},
        {key: 'baby-26'}
      ],
      frameRate:15,
      repeat: 0
    };

    //create animation config
    //register all images sprite keys
    babyConfig = {
      key: 'baby-smile',
      frames: [
        {key: 'baby-1'},
        {key: 'baby-2'},
        {key: 'baby-3'},
        {key: 'baby-4'},
        {key: 'baby-5'}, 
        {key: 'baby-6'},
        {key: 'baby-7'},
        {key: 'baby-8'}, 
        {key: 'baby-9'},
        {key: 'baby-10'},
        {key: 'baby-11'},
        {key: 'baby-12'},
        {key: 'baby-13'},
        {key: 'baby-14'},
        {key: 'baby-15'},
        {key: 'baby-16'},
        {key: 'baby-17'},
        {key: 'baby-18'},
        {key: 'baby-19'},
        {key: 'baby-20'},
        {key: 'baby-21'},
        {key: 'baby-22'},
        {key: 'baby-23'},
        {key: 'baby-24'},
        {key: 'baby-25'},
        {key: 'baby-26'}
      ],
      frameRate:15,
      repeat: -1,
      yoyo: true
    };

     //create animation config
    //register all images sprite keys
    babyConfig3 = {
      key: 'baby-hungry',
      frames: [
        {key: 'hungry-1'},
        {key: 'hungry-2'},
        {key: 'hungry-3'},
        {key: 'hungry-4'},
        {key: 'hungry-5'}, 
        {key: 'hungry-6'},
        {key: 'hungry-7'},
        {key: 'hungry-8'}, 
        {key: 'hungry-9'},
        {key: 'hungry-10'},
        {key: 'hungry-11'},
        {key: 'hungry-12'},
        {key: 'hungry-13'},
        {key: 'hungry-14'},
        {key: 'hungry-15'},
        {key: 'hungry-16'},
        {key: 'hungry-17'},
        {key: 'hungry-18'},
        {key: 'hungry-19'},
        {key: 'hungry-20'},
        {key: 'hungry-21'},
        {key: 'hungry-22'}
      ],
      frameRate:15,
      repeat: 0,
      yoyo: true
    };  

    //create animation config
    //register all images sprite keys
    babyConfig4 = {
      key: 'baby-cry',
      frames: [
        {key: 'sad-0'},
        {key: 'sad-1'},
        {key: 'sad-2'},
        {key: 'sad-3'},
        {key: 'sad-4'}, 
        {key: 'sad-5'},
        {key: 'sad-6'},
        {key: 'sad-7'}, 
        {key: 'sad-8'},
        {key: 'sad-9'},
        {key: 'sad-10'},
        {key: 'sad-11'},
        {key: 'sad-12'},
        {key: 'sad-14'},
        {key: 'sad-15'},
        {key: 'sad-16'},
        {key: 'sad-17'},
        {key: 'sad-18'},
        {key: 'sad-19'},
        {key: 'sad-20'},
        {key: 'sad-21'},
        {key: 'sad-22'},
        {key: 'sad-23'},
        {key: 'sad-24'},
        {key: 'sad-25'}
      ],
      frameRate:15,
      repeat: 0
    }; 
  }

  PlayAnimation ()
  {
    this.babySprite.anims.play('baby-cry');
  }
 
  //register the baby animation config
  RegisterBabyAnimationConfig ()
  {
    //play this animation directly from sprite
    //create 3 states from baby sprite animation
    this.anims.create(babyConfig);
    this.anims.create(babyConfig2);
    this.anims.create(babyConfig3);
    this.anims.create(babyConfig4);
  }

  AudioNativeBackgroundPlay ()
  {
    if(!this.sys.game.device.os.desktop)triggerPlayButton = true;

       //check for trigger play button
    //and going to the next pointer assignment to read event pointer down
    if(triggerPlayButton)
    {
      triggerPlayButton = false;
      button_play = this.add.image(posX, posY+180,'btn-play');
      button_play.setInteractive();
      button_play.setScale(.1)
      button_play.on('pointerdown', this.NextScenePointer);
      button_play.depth = 2;

      //adding tweens to button plays
      this.tweens.add({
        targets: button_play, 
        scaleX: 0.55,
        scaleY: 0.55, 
        ease: 'Power1',
        duration:500
     });
     }
   }

  MuteSound ()
  {
     if(!this.audioBg.isPaused) this.audioBg.pause();
     else this.audioBg.play();
  }

  NextScene() {
    this.scene.start('MainScene')
  }

  NextScenePointer ()
  {
    this.scene.scene.start('MainScene')
  }

  PlayBgAudio(){
		this.audioBg = this.sound.add("audio-bg", {volume: 0.5});
		this.audioBg.loop = true
		this.audioBg.play();
	}

  

  DragonTestRight ()
  {
     this.anim.flipX = true;
  }

  DragonTestLeft ()
  {
     this.anim.flipX = false;
  }
}
