
import Variables from './sharedVariables';
import Constants from './sharedConstants';
import ComponentStage from './states/componentStage';


(function main() {
  /*
  window.onblur = function() {
    let currentState = Variables.stateStack.getCurrentGameState();

    if (!Variables.isPaused &&
        Constants.STATE_TYPES.get('action') === currentState.type) {
      Variables.isPaused = true;
      Variables.stateStack.push(Variables.pauseScreen);
    }
  };
  */
  Variables.keyboardInput.setup();
  Variables.canvasManager.setup();

  Variables.stateStack.push(new ComponentStage());
  // Variables.stateStack.push(new WinScreen());
  // Variables.stateStack.push(new FirstStage());
  // Variables.stateStack.push(new SplashScreen());


  const gameLoop = () => {
    Variables.frameClock.update();

    Variables.canvasManager.getCanvasContext().clearRect(
        0, 0, Constants.CANVAS_WIDTH, Constants.CANVAS_HEIGHT);

    let currentState = Variables.stateStack.getCurrentGameState();
    if (!currentState) return;

    if (!currentState.isLoaded()) {
      currentState.load();
    }

    currentState.control();

    currentState.update();

    currentState.draw();

    window.requestAnimationFrame(gameLoop);
  };

  window.requestAnimationFrame(gameLoop);
})();
