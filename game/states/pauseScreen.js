import GameState from '../dataStructures/gameState.js';
import ReversibleEnum from '../dataStructures/reversibleEnum.js';
import Vector from '../dataStructures/vector.js';
import Constants from '../sharedConstants.js';
import Variables from '../sharedVariables.js';

export default function PauseScreen() {
  var me = this;
  me.__proto__ = new GameState(Constants.STATE_TYPES.get('pause'));
  me.resources = {
    font: 'Helvetica',
    pausedTitle: {
      text: 'Game Paused',
      position:
          new Vector(Constants.CANVAS_WIDTH >> 1, Constants.CANVAS_HEIGHT / 2.4)
    },
    resumeText: {
      text: 'Resume',
      position: new Vector(
          Constants.CANVAS_WIDTH >> 1, (Constants.CANVAS_HEIGHT / 2.5) + 62)
    },
    restartText: {
      text: 'Restart',
      position: new Vector(
          Constants.CANVAS_WIDTH >> 1, (Constants.CANVAS_HEIGHT / 2.5) + 115)
    },
    cursor: {
      position: new Vector(
          Constants.CANVAS_WIDTH / 2, Constants.CANVAS_HEIGHT / 2.5 + 62),
      dimension: new Vector(16, 16),
      color: 'black',
      choices: new ReversibleEnum('resume', 'restart'),
      pointingAt: null
    }
  };

  me.load = function() {
    this.resources.cursor.pointingAt =
        this.resources.cursor.choices.get('resume');
    me.isLoaded = true;
  };

  me.draw = function() {
    var ctx = Variables.canvasManager.getCanvasContext();

    ctx.font = '32px ' + me.resources.font;
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText(
        me.resources.pausedTitle.text, me.resources.pausedTitle.position.getX(),
        me.resources.pausedTitle.position.getY());

    ctx.font = '24px ' + me.resources.font;
    ctx.fillText(
        me.resources.resumeText.text, me.resources.resumeText.position.getX(),
        me.resources.resumeText.position.getY());

    ctx.font = '24px ' + me.resources.font;
    ctx.fillText(
        me.resources.restartText.text, me.resources.restartText.position.getX(),
        me.resources.restartText.position.getY());

    var textWidth;
    if (me.resources.cursor.pointingAt ===
        me.resources.cursor.choices.get('resume')) {
      textWidth = ctx.measureText(me.resources.resumeText.text).width;
    } else {
      textWidth = ctx.measureText(me.resources.restartText.text).width;
    }

    ctx.fillStyle = me.resources.cursor.color;
    ctx.fillRect(
        me.resources.cursor.position.getX() + (textWidth >> 1) + 15,
        me.resources.cursor.position.getY() -
            me.resources.cursor.dimension.getY() + 2,
        me.resources.cursor.dimension.getX(),
        me.resources.cursor.dimension.getY());
  };

  me.control = function() {
    var resources = me.resources;
    var cursor = resources.cursor

    if (Variables.keyboardInput.isKeyPressed('enter')) {
      if (cursor.pointingAt === cursor.choices.get('resume')) {
        Variables.isPaused = false;
        Variables.stateStack.pop();
      } else {
        location.reload();
      }
    }
    else {
      if (Variables.keyboardInput.isKeyPressed('down') &&
          cursor.pointingAt === cursor.choices.get('resume')) {
        cursor.pointingAt = cursor.choices.get('restart');
      }
      if (Variables.keyboardInput.isKeyPressed('up') &&
          cursor.pointingAt === cursor.choices.get('restart')) {
        cursor.pointingAt = cursor.choices.get('resume');
      }
    }
  };
};