/// <reference path="../typings/phaser.d.ts" />

///the config for auto reset PX should be
// 630 x 590
//430 x 590
const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'phaser'
  },
  width: 430,
  height: 590,
  dom: {
    createContainer: true
  },
  autoFocus: true,
  physics: {default: 'arcade' },
  scene: [PreloadScene, MainScene, EndScene]
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config);
});




