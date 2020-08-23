import GameStateStack from './dataStructures/gameStateStack.js';
import Scheduler from './dataStructures/scheduler.js';
import PauseScreen from './states/pauseScreen.js';

let Variables = {
  lastUpdate: 0,
  now: 0,
  dt: 0,
  stateStack: new GameStateStack(),
  pauseScreen: new PauseScreen(),
  keyMap: [],
  isPaused: false,
  scheduler: new Scheduler()
};

export default Variables;