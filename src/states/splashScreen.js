import GameState from '../dataStructures/gameState.js';
import Constants from '../sharedConstants.js';
import Variables from '../sharedVariables.js';

export default class SplashScreen extends GameState {

  constructor() {
    super(Constants.STATE_TYPES.get('intro'));
    this.resources = {
      titleFontSize: '28pt',
      subTitleFontSize: '18pt',
      font: 'Helvetica',
      introTitle: 'Block Shooter Game',
      introSubtitle: 'By Anders Busch',
      instructionsText: 'Press Enter to Start',
      drawInstructions: false
    };
  }

  blinkText() {
    this.resources.drawInstructions = !this.resources.drawInstructions;
  };

  start() {
    if (!this.blinkHandel) this.blinkHandel = setInterval(this.blinkText.bind(this), 800);
    this.isPlaying = true;
  };

  stop() {
    if (this.blinkHandel) clearInterval(this.blinkHandel);
    this.isPlaying = false;
  };

  load() {
    this.blinkHandel = setInterval(this.blinkText.bind(this), 800);
    this.isLoaded = true;
  };

  draw() {
    var ctx = Variables.canvasManager.getCanvasContext();
    var resources = this.resources;
    ctx.font = resources.titleFontSize + ' ' + resources.font;
    ctx.textAlign = 'center';
    ctx.fillText(
        resources.introTitle, Constants.CANVAS_WIDTH / 2,
        Constants.CANVAS_HEIGHT / 2.2);
    ctx.font = resources.subTitleFontSize + ' ' + resources.font;
    ctx.fillText(
        resources.introSubtitle, Constants.CANVAS_WIDTH / 2,
        Constants.CANVAS_HEIGHT / 2.2 + 26);
    if (resources.drawInstructions) {
      ctx.fillText(
          resources.instructionsText, Constants.CANVAS_WIDTH / 2,
          Constants.CANVAS_HEIGHT - (Constants.CANVAS_HEIGHT / 3));
    }
  };

  control() {
    if (Variables.keyboardInput.isKeyPressed('enter')) {
      this.stop();
    }
  };
};
