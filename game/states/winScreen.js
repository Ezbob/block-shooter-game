import GameState from '../dataStructures/gameState.js';
import Vector from '../dataStructures/vector.js';
import Constants from '../sharedConstants.js';
import Variables from '../sharedVariables.js';
import Utils from '../utils.js';

export default function WinScreen() {
  var me = this;
  me.__proto__ = new GameState(Constants.STATE_TYPES.get('intro'))
  me.resources = {
    gameWinFont: {
      font: 'Helvetica',
      position:
          new Vector(Constants.CANVAS_WIDTH >> 1, Constants.CANVAS_HEIGHT >> 1),
      color: 'darkgreen',
      text: 'YOU\'RE A WINNER!'
    }
  };

  me.draw = function() {
    var resources = this.resources;
    var ctx = Variables.canvasManager.getCanvasContext();

    ctx.font = '32px ' + resources.gameWinFont.font;
    ctx.fillStyle = resources.gameWinFont.color;
    ctx.textAlign = 'center';
    ctx.fillText(
        resources.gameWinFont.text,
        resources.gameWinFont.position.getX() + Utils.randomBetween(-10, 10),
        resources.gameWinFont.position.getY() + Utils.randomBetween(-10, 10))
  };
};
