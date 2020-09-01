import GameState from '../dataStructures/gameState.js';
import Vector2D from '../dataStructures/vector.js';
import Constants from '../sharedConstants.js';
import Variables from '../sharedVariables.js';
import Utils from '../utils.js';

export default class WinScreen extends GameState {
  constructor() {
    super(Constants.STATE_TYPES.get('intro'));
    this.resources = {
      gameWinFont: {
        font: 'Helvetica',
        position: new Vector2D(
            Constants.CANVAS_WIDTH >> 1, Constants.CANVAS_HEIGHT >> 1),
        color: 'darkgreen',
        text: 'YOU\'RE A WINNER!'
      }
    };
  };

  draw() {
    var resources = this.resources;
    var ctx = Variables.canvasManager.getCanvasContext();

    ctx.font = '32px ' + resources.gameWinFont.font;
    ctx.fillStyle = resources.gameWinFont.color;
    ctx.textAlign = 'center';
    ctx.fillText(
        resources.gameWinFont.text,
        resources.gameWinFont.position.x + Utils.randomBetween(-10, 10),
        resources.gameWinFont.position.y + Utils.randomBetween(-10, 10))
  };
};
