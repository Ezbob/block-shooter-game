
import LevelLoader from './LevelLoader';
import Constants from './SharedConstants';
import Variables from './SharedVariables';
import ComponentStage from './states/ComponentState';

Variables.canvasManager.setup();

new LevelLoader().loadFromJson('levels/first.level.json').then(() => {

  Variables.stateStack.pushState(new ComponentStage());

  window.onblur = () => {
    Variables.isPaused = true;
  }

  window.onfocus = () => {
    Variables.isPaused = false;
  }

  const gameLoop = () => {

    if (Variables.isPaused) {
      window.requestAnimationFrame(gameLoop);
      return;
    }

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
})
