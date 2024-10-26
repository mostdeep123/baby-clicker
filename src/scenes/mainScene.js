//food attribute logic 
var goodFoodkeys = ['apple', 'brokoli', 'glass', 'nanas', 'salmon', 'banana', 'chicken', 'water', 'juice', 'coconut'];
var badFoodkeys = ['burger', 'candy', 'pizza', 'coklat', 'soda', 'fries', 'pull_tea'];
var allFoodKeys = ['apple', 'brokoli', 'burger', 'candy', 'glass', 'nanas', 'pizza', 'salmon', 'coklat', 'soda'
,'banana', 'chicken', 'water', 'juice', 'coconut', 'fries', 'pull_tea'];
var howToPlayText = '';
var howToPlayTextTittle = '';
var bgbebelac = null;
var graphicFirstLine = null;
var graphicSecondLine = null;
var graphicThirdLine = null;
var currKeyFood = '';
var wowText = null;
var badText = null;
var badTween = null;
var goodTween = null;
var doctor = null;
var isDesktop = false;
var backgroundDesktop = true;
var bgbgm  = null;

///all the play game scene will be included here
///for test and the actual gameplay 
class MainScene extends Phaser.Scene {

  constructor() {
    super({ key: 'MainScene' })
   }

  preload ()  
  {
     //set the phase of android
    if(this.sys.game.device.os.android || this.sys.game.device.os.iOS) 
    {
        //isDesktop = false;

        //this.scale.resize(430, 690);

        backgroundDesktop = false;
    }


      //create gameplay backgrund
      this.CreateGameplayBackground();

      //spawn time bar
      this.createTimeBar();
   }

  create() {
    //declare group of spites
    let foodGroups = this.add.group();

    posX = this.cameras.main.width/2;
    posY = this.cameras.main.height/2;    

    //reset food keys
    this.ResetFoodKeys();
    
    //register food in scene
    this.RegisterFoodsInScene(foodGroups);

    pointer = this.add.sprite(0, 0, 'cursor').setOrigin(.5);
    pointer.setScale(0.5, 0.5);
    if(!backgroundDesktop)pointer.visible = false;

    startFill = barFill;

    this.CheckBGMMusic();

    //set the start bar fill
    startBarFill = barFill;   

    //load smiley face
    //this.LoadFaceSmiley();

    //create animation attribute
    //smiley test animation config
    this.anims.create({
      key: 'smiley-game',
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
      key:'sad-game',
      frames: [
          {key: 'smiley-face-1'},
          {key: 'sad-face-1'},
          {key: 'sad-face-2'}
      ],
      frameRate: 6, 
      repeat: 0
  });

   //create baby sprite
   this.CreateBabySprite();
  
  //spawn pop up 
  //check if no local storage data
  if(localStorage.getItem('how-to-play')<=0)this.LoadPopUp();

  //check load text noticement
  //this.LoadTextNoticement();

}

CheckBGMMusic ()
{
     //reset the audio to 1
     if(userMediaCalled) 
     {
       audioX.volume = 1;
       audioX.loop = true;
       audioX.play();
     }
     else
     {
        bgbgm = this.sound.add('audio-bg');
 
        bgbgm.loop = true;
 
        bgbgm.play();
     }
}


  //all game logic will be inputed here
  update ()
  { 
    pointer.x = this.game.input.mousePointer.x;
    pointer.y = this.game.input.mousePointer.y;
    
    //most front of the layer
    pointer.depth = 10;

    //check game conclusion
    this.CheckGameConclusion();

  }

  ///reset all foods 
  ///that currently in the keys
  ResetFoodKeys ()
  {
      goodFoodkeys = ['apple', 'brokoli', 'glass', 'nanas', 'salmon', 'banana', 'chicken', 'water', 'juice', 'coconut'];

      badFoodkeys = ['burger', 'candy', 'pizza', 'coklat', 'soda', 'fries', 'pull_tea'];

      allFoodKeys = ['apple', 'brokoli', 'burger', 'candy', 'glass', 'nanas', 'pizza', 'salmon', 'coklat', 'soda'
      ,'banana', 'chicken', 'water', 'juice', 'coconut', 'fries', 'pull_tea'];

      sensorDetection = [];
  }

  ///reset good and bad food 
  ///sorrounding at the table
  ResetGoodBadFoodKeys ()
  {
   goodFoodkeys = ['apple', 'brokoli', 'glass', 'nanas', 'salmon', 'banana', 'chicken', 'water', 'juice', 'coconut'];

   badFoodkeys = ['burger', 'candy', 'pizza', 'coklat', 'soda', 'fries', 'pull_tea'];

   sensorDetection = [];

  }

  CreateGameplayBackground ()
  {
       image = new BgBebelac(this);

     //if in desktop
      if(!backgroundDesktop)
      {
         image.setScale(0.33, 0.33);
         image.y -= 130;
         image.depth = -2
      }
      else
      {
         image.setScale(0.24, 0.24);
         image.y -= 100;
         image.depth = -2
      }
      
      var table = this.add.image(posX, posY, 'tablebg');
      if(!isDesktop)
      {
         table.setScale(0.5, 0.5);
         table.y += 200;
      }
      else{
         table.setScale(0.5, 0.6);
         table.y += 250;
      } 
      table.depth = 0;
  }

  CreateBabySprite ()
  {
    //play and adjust the baby sproite animation
    //and set it as to 'baby-hello' state
    this.babySprite = this.add.sprite(posX, posY, 'baby-1');
    
    this.babySprite.setScale(0.6, 0.6);

    this.babySprite.depth = -1;
  }
  
  LoadPopUp ()
  {
     bgbebelac = this.add.image(posX - 60, posY, 'background');
     bgbebelac.setSize(852, 1108);
     bgbebelac.setOrigin(0.5);
     bgbebelac.setScale(0.6, 0.6)
     bgbebelac.depth = 3;

     //bg doctor
     doctor = this.add.sprite(posX, posY, 'doctor');
     doctor.setScale(0.40, 0.40);
     doctor.depth = 4;
     doctor.y -= 200;


     //all pop up attribute
     buttonPlayTemp = this.add.image(posX, posY, 'button-next');
     howToPlayPopUp = this.add.graphics();
     howToPlayPopUpTittle = this.add.graphics();
     howToPlayPopUp.fillStyle(0xFFF6DE,1.0);
     howToPlayPopUp.setScrollFactor(0, 0);
     howToPlayPopUp.fillRoundedRect(0, 0, 638, 480, {tl:0, tr:0, bl:32, br:32});
     howToPlayPopUp.x = posX - 190;
     howToPlayPopUp.y = posY - 110;
     howToPlayPopUp.depth = 5;
     howToPlayPopUp.setScale(0.6, 0.6)
     howToPlayPopUpTittle.fillStyle(0x2F2D97,1.0);
     howToPlayPopUpTittle.setScrollFactor(0, 0);
     howToPlayPopUpTittle.fillRoundedRect(0, 0, 635, 140, {tl:32, tr:32, bl:0, br:0});
     howToPlayPopUpTittle.x = posX - 190;
     howToPlayPopUpTittle.y = posY - 170;
     howToPlayPopUpTittle.depth = 6;
     howToPlayPopUpTittle.setScale(0.6, 0.6)
     buttonPlayTemp.setOrigin(0.5);
     buttonPlayTemp.depth = 7;
     buttonPlayTemp.setScale(0.6, 0.6);
     buttonPlayTemp.y += 230;
     buttonPlayTemp.setInteractive();

     howToPlayTextTittle = new PhaserText(this);
     howToPlayTextTittle.setFontFamily('font2');
     howToPlayTextTittle.x -= 0;
     howToPlayTextTittle.y -= 240;
     howToPlayTextTittle.text = 'Cara Bermain';
     howToPlayTextTittle.setColor('#ffffff');
     howToPlayTextTittle.depth = 8;
     howToPlayTextTittle.setFontSize(30);
     
     this.SetTextHowToPlay();

     //register event pointer down handler
     buttonPlayTemp.on('pointerdown',function(pointer){
      this.SavePopUpLocalStorage();
     },this);
  }   

  ///update baby animation
  UpdateBabyAnimation ()
  {
      switch(babyAnimationType)
      {
         case babyAnimationType.idle: {
            //baby idle
            this.anims.play('baby-idle');
         }
         case babyAnimationType.happy: {
            //baby happy
            this.anims.play('baby-happy');
         }
         case babyAnimationType.sad: {
            //baby sad
            this.anims.play('baby-sad');
         }
      }
  }

  CreateTextBorder ()
  {
    graphicFirstLine = this.add.graphics();
    graphicSecondLine = this.add.graphics();
    graphicThirdLine = this.add.graphics();
   
   //first line
   graphicFirstLine.fillStyle(0xFFFFFF,1.0);
   graphicFirstLine.setScrollFactor(0, 0);
   graphicFirstLine.fillRoundedRect(0, 0, 540, 105 + 20, 12);
   graphicFirstLine.x = posX - 160;
   graphicFirstLine.y = posY - 85 - 5;
   graphicFirstLine.depth = 5;
   graphicFirstLine.setScale(0.6, 0.6)   
   
   //second line
   graphicSecondLine.fillStyle(0xFFFFFF,1.0);
   graphicSecondLine.setScrollFactor(0, 0);
   graphicSecondLine.fillRoundedRect(0, 0, 540, 140 + 20, 12);
   graphicSecondLine.x = posX - 160;
   graphicSecondLine.y = posY - 5 - 5;
   graphicSecondLine.depth = 5;
   graphicSecondLine.setScale(0.6, 0.6)  

   //third line
   graphicThirdLine.fillStyle(0xFFFFFF,1.0);
   graphicThirdLine.setScrollFactor(0, 0);
   graphicThirdLine.fillRoundedRect(0, 0, 540, 100 + 20, 12);
   graphicThirdLine.x = posX - 160;
   graphicThirdLine.y = posY + 100 - 5;
   graphicThirdLine.depth = 5;
   graphicThirdLine.setScale(0.6, 0.6)  

  }

  SetTextHowToPlay ()
  {
   //create Text Background 
   this.CreateTextBorder();   
   howToPlayText = new PhaserText(this);
   howToPlayText.setFontFamily('font2');
   howToPlayText.y -= 80;
   howToPlayText.x += 0;
   howToPlayText.text = 
   ['','','1. Klik satu per satu makanan ke mulut', '    si kecil sampai menandakan ia sudah', '    kenyang',
   '',
   '2. Pastikan pilihan makanan sehat, ya!', '    semakin banyak makanan sehat. si', '    Kecil akan menunjukan ekspresi', 
   '    bahagia. Begitu pula sebaliknya'
,'',''
,'3. Ibu dan si Kecil akan mendapatkan',
 '    nilai bagus jika sudah tepat memilih',
'    makanan-makanan yang sehat']; 
   howToPlayText.setAlign('left');
   howToPlayText.depth = 5;
   howToPlayText.setFontSize(15);
   
  }

  //save local storage and disable the pop up
  SavePopUpLocalStorage () {localStorage.setItem('how-to-play', 1);buttonPlayTemp.visible = false;howToPlayPopUp.visible = false;howToPlayText.depth=-1;
   bgbebelac.visible = false;howToPlayTextTittle.visible = false;graphicFirstLine.visible = false;graphicSecondLine.visible=false;graphicThirdLine.visible=false;howToPlayPopUpTittle.visible=false;
   doctor.visible = false;howToPlayText.visible = false;}
  
  createTimeBar ()
  {
    progressBox = this.add.graphics();
    progressBar = this.add.graphics();

    var sadGut = this.add.sprite(posX, posY, 'sad-gut');
    var happyGut = this.add.sprite(posX, posY, 'happy-gut');

    currentBarValue = barFill;
   
    //sad gut properties
    sadGut.x -= 178;
    sadGut.y -= 240;
    sadGut.setScale(0.2, 0.2);

    //happy gut properties
    happyGut.x += 170;
    happyGut.y -= 240;
    happyGut.setScale(0.2, 0.2);

    progressBox.fillStyle(0xFFFFFF,0.8);
    progressBox.fillRect(0, 0, 300, 22);
    
    progressBar.fillStyle(0x00FF00, 1.0);
    progressBar.fillRect(0, 0, barFill, fillBarHeight);
    
    progressBar.x = posX - 150;
    progressBox.x = posX - 150;
    progressBox.y += 30;
    progressBar.y += 30;
  }

    LoadFaceSmiley ()
    {
       faceImageInGame = new Face(this);
       faceImageInGame.setScale(8.0, 8.0);
       faceImageInGame.depth = 8;
       faceImageInGame.alpha = 0;
    }

    LoadTextNoticement ()
    {
        wowText = this.add.sprite(posX, posY, 'good-text');
        wowText.depth = 8;
        wowText.setScale(0, 0);
        badText = this.add.sprite(posX, posY, 'bad-text');
        badText.depth = 8;
        badText.setScale(0, 0);
    }

    ///animate wow text
    AnimateWowText ()
    {
      if(goodTween != null)goodTween.restart();
      
      goodTween = this.tweens.add ({
         targets: wowText, 
         scaleX: 0.5, 
         scaleY: 0.5, 
         ease: 'Power1',
         yoyo: true,
         duration: 500
      });

        //add a delay timer
        //before play animation face 
        this.time.addEvent ({
         delay:500, 
         callback:this.ResetWowText,
         callbackScope: this
      });

    }

    ResetWowText ()
    {
      wowText.setScale(0, 0);
    }

    //animate bad text
    AnimateBadText ()
    {
      if(badTween != null)badTween.restart();
      
      badTween = this.tweens.add ({
         targets:badText,
         scaleX: 0.5,
         scaleY:0.5, 
         ease: 'Bounce', 
         yoyo: true,
         duration: 500
       });

        //add a delay timer
        //before play animation face 
        this.time.addEvent ({
         delay:500, 
         callback:this.ResetBadText,
         callbackScope: this
      });
    }

    ResetBadText ()
    {
      badText.setScale(0, 0);
    }


  RegisterFoodsInScene (group)
  {
    let i = 0;

    let x = 0;

     //register all foods in the scene to the arrays
    for(i = 0; i < 7; i++)
    {  
       food = new Food(this);

       food.setInteractive(new Phaser.Geom.Rectangle(0, 0, 0, 0));

       var randomKey = this.RetriveRandomFoodKey(food);

       food.setTexture(randomKey);

       this.KeyFoodResize(randomKey, food);

       var index3 = this.ArrayReturnValue(food);

       var amount = this.DefineAmountOfFood(index3);

       randomAmountInScene.push(amount);
 
       foodArray.push(food);

       group.add(food);
    } 

    //set all foods in the scene to the position
    this.SetPosFoodInScene(foodArray, 0, foodArray[0].x + 200, foodArray[0].y + 465 + foodOffsets, 1);
    this.SetPosFoodInScene(foodArray, 1, foodArray[1].x + 70,  foodArray[1].y + 440 + foodOffsets, 0);
    this.SetPosFoodInScene(foodArray, 2, foodArray[2].x + 70, foodArray[2].y + 325 + foodOffsets, 0);
    this.SetPosFoodInScene(foodArray, 3, foodArray[3].x + 320, foodArray[3].y + 475 + foodOffsets, 3 );
    this.SetPosFoodInScene(foodArray, 4, foodArray[4].x + 270, foodArray[4].y + 340 + foodOffsets, 1);
    this.SetPosFoodInScene(foodArray, 5, foodArray[5].x + 150, foodArray[5].y + 380 + foodOffsets, 0);
    this.SetPosFoodInScene(foodArray, 6, foodArray[6].x + 330, foodArray[6].y + 400 + foodOffsets, 2);

    //create always milk
    this.CreateMilk();   

    //create graphic sensor
    //this.SetGraphicSensor();

    //set the food array of length
    for(x = 0; x < foodArray.length; x++)
    {
      this.SetClickPointer(foodArray, x, randomAmountInScene[x]);

       //this.SetClickPointerSensor(foodArray, x,  randomAmountInScene[x], sensorDetection);

       //assign the graphic to interactive
    }
   }

  SetGraphicSensor ()
  {
      let z;

      for(z = 0; z < 7; z++)
      {
         var graphSensor = new Food(this);

         graphSensor.setTexture('');
         
         sensorDetection.push(graphSensor);
      }
      
    //set all sensors in the scene to the position
    this.SetSensorInScene(sensorDetection, 1, posX - 160, posY + 80, 9);
    this.SetSensorInScene(sensorDetection, 0, posX + 60,  posY + 90, 9);
    this.SetSensorInScene(sensorDetection, 2, posX - 50, posY + 140, 9);
    this.SetSensorInScene(sensorDetection, 3, posX + 150, posY + 140, 9);
    this.SetSensorInScene(sensorDetection, 4, posX, posY + 220, 9);
    this.SetSensorInScene(sensorDetection, 5, posX - 190, posY + 190, 9);
    this.SetSensorInScene(sensorDetection, 6, posX + 140, posY + 220, 9);
  }

  CreateMilk ()
  {
    //milk start food
    var milkStartFood = new Food(this);
    milkStartFood.setTexture('glass');
    var index3 = this.ArrayReturnValue(food);
    var amount = this.DefineAmountOfFood(index3);
    milkStartFood.x = posX + 140;
    milkStartFood.y = posY + 110;
    milkStartFood.depth = 2;
    milkStartFood.visible = false;
    //this.SetClickPointerSprite(milkStartFood, 4, 4);
    randomAmountInScene.push(amount);

    if(isDesktop)
    {
      //create bebelac box
      var bebelacBox = this.add.sprite(milkStartFood.x + 106, milkStartFood.y -80, 'bebelacbox');
      bebelacBox.depth = 0;
      bebelacBox.setScale(0.3, 0.3);
      bebelacBox.y += 40;
    } 
    else
    {
       //create bebelac box
      var bebelacBox = this.add.sprite(milkStartFood.x-23, milkStartFood.y -80, 'bebelacbox');
      bebelacBox.depth = 0;
      bebelacBox.setScale(0.3, 0.3);
    }
   }

  ///assign food in scene 
  ///considering foods that available in the scene
  DefineAmountOfFood (foodsKey)
  {
      switch(foodsKey)
      {
         case foodKeys[0]: {
            return foodAmountValue[0];
         }
         case foodKeys[1]: {
            return foodAmountValue[1];
         }
         case foodKeys[2]: {
            return foodAmountValue[2];
         }
         case foodKeys[3]: {
            return foodAmountValue[3];
         }
         case foodKeys[4]: {
            return foodAmountValue[4];
         }
         case foodKeys[5]: {
            return foodAmountValue[5];
         }
         case foodKeys[6]: {
            return foodAmountValue[6];
         }
         case foodKeys[7]: {
            return foodAmountValue[7];
         }
         case foodKeys[8]: {
            return foodAmountValue[8];
         }
         case foodKeys[9]: {
            return foodAmountValue[9];
         }
         case foodKeys[10]: {
            return foodAmountValue[10];
         }
         case foodKeys[11]: {
            return foodAmountValue[11];
         }
         case foodKeys[12]: {
            return foodAmountValue[12];
         }
         case foodKeys[13]: {
            return foodAmountValue[13];
         }
         case foodKeys[14]: {
            return foodAmountValue[14];
         }
         case foodKeys[15]: {
            return foodAmountValue[15];
         }
         case foodKeys[16]: {
            return foodAmountValue[16];
         }
      }
  }

  SetClickPointerSensor (arrays, index, index2, sp)
  {
     sp[index].on('pointerdown', function(pointer){
      this.RandomSprite(arrays[index], index2, index);
     }, this);
  }

  //register click pointer event to all food objects in the scene
  SetClickPointer (arrays, index, index2)
  {
     arrays[index].on('pointerdown',function(pointer){
      this.RandomSprite(arrays[index], index2, index);
     },this);
  }

  //register click pointer sprite
  SetClickPointerSprite (sprite, index, index2)
  {
     sprite.on('pointerdown', function(pointer){
       this.RandomSprite(sprite, index2, index);
     }, this);
  }
  
  ///random spirte
  RandomSprite (foodX, ind, currentIndex)
  {
   //check the local storage if theres how to play
    if(localStorage.getItem('how-to-play') > 0)
    {
      var randomKey = this.RetriveRandomFoodKey(foodX);

      currKeyFood = foodX.texture.key;

      this.KeyFoodResize(randomKey, foodX);

      if(allFoodKeys.length < 3) allFoodKeys.push(currKeyFood);

      foodX.removeAllListeners();
  
      var randomSpriteX = randomKey;
    
      foodX.setTexture(randomSpriteX)
  
      var increasor = ind
  
      //check if this food good or bad
      if(increasor < 0)
      {
         var randomAudioKey = Phaser.Utils.Array.GetRandom(mistakeAudios);
         currentAudioSound = this.sound.add(randomAudioKey);
         currentAudioSound.loop = false;
         currentAudioSound.play();
         //this.AnimateBadText();
         this.babySprite.play('baby-cry');
      } 
      else if (increasor > 0)
      {
         var randomAudioKey = Phaser.Utils.Array.GetRandom(correctAudios);
         currentAudioSound = this.sound.add(randomAudioKey);
         currentAudioSound.loop = false;
         currentAudioSound.play();
         //this.AnimateWowText();
         this.babySprite.play('baby-smile_2');
      }
  
      this.DelayFaceAnimation();
  
      this.UpdateBar(increasor);
  
      this.UpdateFoodValueInScene(randomSpriteX, currentIndex, foodX);   
    }
  }

  KeyFoodResize (foodKey, foodObj)
  {
     if(foodKey == 'banana') foodObj.setScale(0.4, 0.4);
     else if(foodKey == 'fries') foodObj.setScale(0.4, 0.4);
     else if(foodKey == 'coklat')foodObj.setScale(0.4, 0.4);
     else if(foodKey == 'soda')foodObj.setScale(0.4, 0.4);
     else if(foodKey == 'water')foodObj.setScale(0.4, 0.4);
     else if(foodKey == 'pull_tea')foodObj.setScale(0.4, 0.4);
     else foodObj.setScale(0.3, 0.3);
  }

  ///retrive random key between percentage of the keys
  RetriveRandomFoodKey ()
  {
    //set the random number key 
    var randomNumber = Phaser.Math.Between(0, 100);
    var randomKey = '';
    var removedIndex = '';
    var removedIndexAllFoodKeys = '';

    //check for percentage between good and bad food
    //for good food
    if(randomNumber <= 50)
    {
      //check for all food storage keys
      //if its still complete
      if(allFoodKeys.length > 3)
      {
         //check for the good food keys length
         if(goodFoodkeys.length > 0)
         {
            randomKey = Phaser.Utils.Array.GetRandom(goodFoodkeys);

            removedIndex = goodFoodkeys.indexOf(randomKey);

            removedIndexAllFoodKeys = allFoodKeys.indexOf(randomKey);

            goodFoodkeys.splice(removedIndex, 1);

            allFoodKeys.splice(removedIndexAllFoodKeys, 1);
         }
         else
         {
            randomKey = Phaser.Utils.Array.GetRandom(badFoodkeys);
         
            removedIndex = badFoodkeys.indexOf(randomKey);

            removedIndexAllFoodKeys = allFoodKeys.indexOf(randomKey);
      
            badFoodkeys.splice(removedIndex, 1);

            allFoodKeys.splice(removedIndexAllFoodKeys, 1);
         }
      }
      else
      { 
         randomKey = Phaser.Utils.Array.GetRandom(allFoodKeys);

         removedIndexAllFoodKeys = allFoodKeys.indexOf(randomKey);

         allFoodKeys.splice(removedIndexAllFoodKeys, 1);
      }
   }
   else
   {
      if(allFoodKeys.length > 3)
      {
         if(badFoodkeys.length > 0)
         {
            randomKey = Phaser.Utils.Array.GetRandom(badFoodkeys);
         
            removedIndex = badFoodkeys.indexOf(randomKey);

            removedIndexAllFoodKeys = allFoodKeys.indexOf(randomKey);
   
            badFoodkeys.splice(removedIndex, 1);

            allFoodKeys.splice(removedIndexAllFoodKeys, 1);
         }
         else
         {
            randomKey = Phaser.Utils.Array.GetRandom(goodFoodkeys);

            removedIndex = goodFoodkeys.indexOf(randomKey);

            removedIndexAllFoodKeys = allFoodKeys.indexOf(randomKey);

            goodFoodkeys.splice(removedIndex, 1);

            allFoodKeys.splice(removedIndexAllFoodKeys, 1);
         }
      }
      else
      {
         randomKey = Phaser.Utils.Array.GetRandom(allFoodKeys);

         removedIndexAllFoodKeys = allFoodKeys.indexOf(randomKey);

         allFoodKeys.splice(removedIndexAllFoodKeys, 1);
      }
   }

    return randomKey;
  }

  ///update and change value in scene
  UpdateFoodValueInScene (key, index, thisFood)
  {
    //update current value follow what texture is set
    //in the array
    var amount = this.DefineAmountOfFood(key);
    randomAmountInScene[index] = amount;

    thisFood.on('pointerdown',function(pointer){
      this.RandomSprite(thisFood, randomAmountInScene[index], index);
     },this);
  }

  SetPosFoodInScene (foodArr, index, posX, posY, depth)
  {
   if(isDesktop)
   {
      foodArr[index].x = posX;
      foodArr[index].y = posY - 10;
      foodArr[index].depth = depth;
   }
   else
   {
      foodArr[index].x = posX;
      foodArr[index].y = posY + 110;
      foodArr[index].depth = depth;
   }
  }

  SetSensorInScene (sensorArr, index, posX, posY, depth)
  {
     if(isDesktop)
     {
        sensorArr[index].x = posX;
        sensorArr[index].y = posY;
        sensorArr[index].depth = depth;
     }
     else
     {
       sensorArr[index].x = posX;
       sensorArr[index].y = posY;
       sensorArr[index].depth = depth;
     }
  }

  DelayFaceAnimation ()
  {
    this.time.addEvent ({
      delay:600, 
      callback:this.DisableSmileFace,
      callbackScope: this
    });
  }

  DisableSmileFace ()
  {
    //faceImageInGame.alpha = 0;
  }

  ArrayReturnValue (foods)
  {
      let b = 0;

      for(b = 0; b < foodKeys.length; b++)
      {
         if(foods.texture.key == foodKeys[b])
         {
             return foodKeys[b];
         }
      }
  }

  //update bar
  UpdateBar (value)
  {
     var totalValue = barFill + value;
     
     //make sure bar fill didnt increase the limit of the bar
     if(totalValue > maxBarFill) 
     { 
        var substractionValue = totalValue - maxBarFill

        barFill -= substractionValue;
     }
     
     //check current bar value
     if(currentBarValue < maxBarFill && currentBarValue > 0) 
     {
        barFill += value
     }
     else if (currentBarValue >= maxBarFill  && currentBarValue > 0)
     {
       barFill = maxBarFill;
     }
     else if(currentBarValue <= 0)
     {
       if(value <= 0) barFill = 0;
       else barFill += value;
     }

     currentBarValue = barFill;

     this.SetBarFillColorAndValue();
   }

   ///set bar fill color and value
   ///and substract the color based on the total color
   SetBarFillColorAndValue ()
   {
      //check color condition for bar fill condition
     if(barFill == startBarFill)
     {
       progressBar.clear ();
       progressBar.fillStyle(0x00FF00, 1.0);
       progressBar.fillRect(0, 0, barFill, fillBarHeight);
     }
     else if (barFill > startBarFill)
     {
      progressBar.clear ();
      progressBar.fillStyle(0x2F2D97, 1.0);
      progressBar.fillRect(0, 0, barFill, fillBarHeight);
     }
     else if (barFill < startBarFill)
     {
      progressBar.clear ();
      progressBar.fillStyle(0xD23C37, 1.0);
      progressBar.fillRect(0, 0, barFill, fillBarHeight);
     }   
   }

  CheckGameConclusion ()
  {
     if(currentBarValue >= maxBarFill)
     {
        //reset all the important variables
        currentBarValue = startFill;
        barFill = startFill;
        foodArray = [];
        winCondition = true;
        randomAmountInScene = [];

        //go to next scene
        this.scene.start('EndScene');
     }
     else if(currentBarValue <= 0)
     {
       //reset all the important variables
        currentBarValue = startFill;
        barFill = startFill;
        foodArray = [];
        winCondition = false;
        randomAmountInScene = [];

        //go to next scene
        this.scene.start('EndScene');
     }
  }
}
