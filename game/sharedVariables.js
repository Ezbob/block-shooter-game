import CircularBuffer from './dataStructures/circularBuffer.js';
import GameStateStack from './dataStructures/gameStateStack.js';
import Scheduler from './dataStructures/scheduler.js';
import Constants from './sharedConstants.js';

let Variables = {
  lastUpdate: 0,
  now: 0,
  dt: 0,
  stateStack: new GameStateStack(),
  keyMap: [],
  isPaused: false,
  scheduler: new Scheduler()
};

export default Variables;