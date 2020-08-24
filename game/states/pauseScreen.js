import GameState from '../dataStructures/gameState.js';
import ReversibleEnum from '../dataStructures/reversibleEnum.js';
import Vector from '../dataStructures/vector.js';
import Constants from '../sharedConstants.js';
import Variables from '../sharedVariables.js';

export default class PauseScreen extends GameState {
  constructor() {
    super(Constants.STATE_TYPES.get('pause'));
    this.resources = {
      font: 'Helvetica',
      pausedTitle: {
        text: 'Game Paused',
        position: new Vector(
            Constants.CANVAS_WIDTH >> 1, Constants.CANVAS_HEIGHT / 2.4)
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
  }


  load() {
    this.resources.cursor.pointingAt =
        this.resources.cursor.choices.get('resume');
    this.isLoaded = true;
  };

  draw() {
    var ctx = Variables.canvasManager.getCanvasContext();

    ctx.font = '32px ' + this.resources.font;
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText(
        this.resources.pausedTitle.text,
        this.resources.pausedTitle.position.getX(),
        this.resources.pausedTitle.position.getY());

    ctx.font = '24px ' + this.resources.font;
    ctx.fillText(
        this.resources.resumeText.text,
        this.resources.resumeText.position.getX(),
        this.resources.resumeText.position.getY());

    ctx.font = '24px ' + this.resources.font;
    ctx.fillText(
        this.resources.restartText.text,
        this.resources.restartText.position.getX(),
        this.resources.restartText.position.getY());

    var textWidth;
    if (this.resources.cursor.pointingAt ===
        this.resources.cursor.choices.get('resume')) {
      textWidth = ctx.measureText(this.resources.resumeText.text).width;
    } else {
      textWidth = ctx.measureText(this.resources.restartText.text).width;
    }

    ctx.fillStyle = this.resources.cursor.color;
    ctx.fillRect(
        this.resources.cursor.position.getX() + (textWidth >> 1) + 15,
        this.resources.cursor.position.getY() -
            this.resources.cursor.dimension.getY() + 2,
        this.resources.cursor.dimension.getX(),
        this.resources.cursor.dimension.getY());
  };

  control() {
    var resources = this.resources;
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