
import LevelLoader from './LevelLoader';
import Constants from './SharedConstants';
import Variables from './SharedVariables';
import ComponentStage from './states/ComponentState';


new LevelLoader().loadFromJson('data/map1.json').then(() => {
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
})
