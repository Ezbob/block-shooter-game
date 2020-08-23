import GameState from '../dataStructures/gameState.js';
import Vector from '../dataStructures/vector.js';
import Constants from '../sharedConstants.js';
import Utils from '../utils.js';

export default function WinScreen() {
  var me = this;
  me.__proto__ = new GameState(game.constants.STATE_TYPES.get('intro'))
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
    var ctx = Constants.CONTEXT2D;

    ctx.font = '32px ' + me.resources.gameWinFont.font;
    ctx.fillStyle = me.resources.gameWinFont.color;
    ctx.textAlign = 'center';
    ctx.fillText(
        me.resources.gameWinFont.text,
        me.resources.gameWinFont.position.getX() + Utils.randomBetween(-10, 10),
        me.resources.gameWinFont.position.getY() + Utils.randomBetween(-10, 10))
  };

  me.update = function() {
    var cursor = me.resources.cursor;
    if (cursor.pointingAt === cursor.choices.get('resume')) {
      cursor.position = resources.resumeText.position;
    } else {
      cursor.position = resources.restartText.position;
    }
  };
};
