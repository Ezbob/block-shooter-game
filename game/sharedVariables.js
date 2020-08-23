import GameStateStack from './dataStructures/gameStateStack.js';
import Scheduler from './dataStructures/scheduler.js';
import PauseScreen from './states/pauseScreen.js';
import FrameClock from './dataStructures/frameClock.js';
import CanvasManager from './canvasManager.js';
import Runtime from './runtime.js';

let Variables = {
  canvasManager: new CanvasManager(),
  frameClock: new FrameClock(),
  stateStack: new GameStateStack(),
  pauseScreen: new PauseScreen(),
  runtime: new Runtime(),
  keyMap: [],
  isPaused: false,
  scheduler: new Scheduler()
};

export default Variables;