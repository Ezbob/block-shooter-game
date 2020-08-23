import GameState from '../dataStructures/gameState.js';
import Constants from '../sharedConstants.js';
import Variables from '../sharedVariables.js';

export default function SplashScreen() {
  var me = this;
  me.__proto__ = new GameState(Constants.STATE_TYPES.get('intro'));
  me.resources = {
    titleFontSize: '28pt',
    subTitleFontSize: '18pt',
    font: 'Helvetica',
    introTitle: 'Block Shooter Game',
    introSubtitle: 'By Anders Busch',
    instructionsText: 'Press Enter to Start',
    drawInstructions: false
  };

  me.blinkText = function() {
    me.resources.drawInstructions = !me.resources.drawInstructions;
  };

  me.start = function() {
    if (!me.blinkHandel) me.blinkHandel = setInterval(me.blinkText, 800);
    me.isPlaying = true;
  };

  me.stop = function() {
    if (me.blinkHandel) clearInterval(me.blinkHandel);
    me.isPlaying = false;
  };

  me.load = function() {
    me.blinkHandel = setInterval(me.blinkText, 800);
    me.isLoaded = true;
  };

  me.draw = function() {
    var ctx = Constants.CONTEXT2D;
    var resources = me.resources;
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

  me.control = function() {
    var keyMap = Variables.keyMap;
    var keyCodes = Constants.KEYS;

    if (keyMap[keyCodes.enter]) {
      me.stop();
    }
  };
};
