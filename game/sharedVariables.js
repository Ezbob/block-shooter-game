import GameStateStack from './dataStructures/gameStateStack.js';
import Scheduler from './dataStructures/scheduler.js';
import PauseScreen from './states/pauseScreen.js';
import FrameClock from './dataStructures/frameClock.js';

let Variables = {
  frameClock: new FrameClock(),
  stateStack: new GameStateStack(),
  pauseScreen: new PauseScreen(),
  keyMap: [],
  isPaused: false,
  scheduler: new Scheduler()
};

export default Variables;