import SharedConstants from './SharedConstants';
import SharedVariables from './SharedVariables';
import AutoShootSystem from './systems/AutoShootSystem';
import CleanUpSystem from './systems/CleanUpSystem';
import CollideSystem from './systems/CollideSystem';
import DrawingSystem from './systems/DrawingSystem';
import HealthDisplaySystem from './systems/HealthDisplaySystem';
import KeyboardControlSystem from './systems/KeyboardControlSystem';
import MovementSystem from './systems/MovementSystem';
import PathFollowingSystem from './systems/PathFollowingSystem';

SharedVariables.canvasManager.setup();

window.onblur = () => {
  SharedVariables.isPaused = true;
};

window.onfocus = () => {
  SharedVariables.isPaused = false;
};

SharedVariables.systems = [
  new PathFollowingSystem(), new KeyboardControlSystem(), new MovementSystem(),
  new DrawingSystem(), new CleanUpSystem(), new CollideSystem(),
  new AutoShootSystem(), new HealthDisplaySystem()
];

const gameLoop = () => {
  if (SharedVariables.isPaused) {
    window.requestAnimationFrame(gameLoop);
    return;
  }
  let ctx = SharedVariables.canvasManager.getCanvasContext();

  SharedVariables.frameClock.update();

  ctx.clearRect(
      0, 0, SharedConstants.CANVAS_WIDTH, SharedConstants.CANVAS_HEIGHT);

  for (let system of SharedVariables.systems) {
    system.update();
  }

  window.requestAnimationFrame(gameLoop);
};

SharedVariables.levelLoader.loadFromJson('levels/first.level.json');

window.requestAnimationFrame(gameLoop);
