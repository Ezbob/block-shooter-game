
import Variables from './sharedVariables';
import Constants from './SharedConstants';
import ComponentStage from './states/ComponentState';



(function main() {
  //Variables.keyboardInput.setup();
  Variables.canvasManager.setup();

  Variables.stateStack.pushState(new ComponentStage());

  const gameLoop = () => {
    Variables.frameClock.update();

    Variables.canvasManager.getCanvasContext().clearRect(
        0, 0, Constants.CANVAS_WIDTH, Constants.CANVAS_HEIGHT);

    let currentState = Variables.stateStack.getCurrentGameState();
    if (!currentState) return;

    if (!currentState.isLoaded()) {
      currentState.load();
    }

    currentState.update();

    window.requestAnimationFrame(gameLoop);
  };

  window.requestAnimationFrame(gameLoop);
})();
