import GameStateStack from './dataStructures/GameStateStack';
import FrameClock from './dataStructures/FrameClock';
import CanvasManager from './CanvasManager';

export default {
  canvasManager: new CanvasManager(),
  frameClock: new FrameClock(),
  stateStack: new GameStateStack(),
  isPaused: false
};