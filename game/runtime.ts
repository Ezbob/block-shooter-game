import Constants from './sharedConstants';
import Variables from './sharedVariables';


export default class Runtime {

  gameLoop() {
    Variables.frameClock.update();

    Variables.canvasManager.getCanvasContext().clearRect(
        0, 0, Constants.CANVAS_WIDTH, Constants.CANVAS_HEIGHT);

    var currentState = Variables.stateStack.getCurrentGameState();

    if (!currentState.isLoaded) {
      currentState.load();
    }

    currentState.control();
    currentState.update();
    currentState.draw();

    if (!currentState.isPlaying) {
      Variables.canvasManager.getCanvasContext().clearRect(
          0, 0, Constants.CANVAS_WIDTH, Constants.CANVAS_HEIGHT);

      if (Variables.stateStack.length > 0) {
        Variables.stateStack.pop();
        currentState = Variables.stateStack.getCurrentGameState();
        currentState.load();
      } else {
        return;
      }
    }

    window.requestAnimationFrame(this.gameLoop.bind(this));
  };

  run() {
    window.requestAnimationFrame(this.gameLoop.bind(this));
  };
};