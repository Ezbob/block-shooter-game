import CircularBuffer from './dataStructures/circularBuffer.js';
import GameStateStack from './dataStructures/gameStateStack.js';
import Scheduler from './dataStructures/scheduler.js';
import Constants from './sharedConstants.js';

let Variables = {
  lastUpdate: 0,
  now: 0,
  dt: 0,
  clouds: new CircularBuffer(Constants.NUMBER_OF_CLOUDS),
  shots: new CircularBuffer(Constants.MAX_SHOTS),
  scenarios: [],
  stateStack: new GameStateStack(),
  keyMap: [],
  isPaused: false,
  scheduler: new Scheduler()
};

export default Variables;