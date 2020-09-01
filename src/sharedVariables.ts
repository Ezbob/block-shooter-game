import GameStateStack from './dataStructures/gameStateStack';
import FrameClock from './dataStructures/frameClock';
import CanvasManager from './canvasManager';
import Runtime from './runtime';
import KeyboardInput from './keyboardInput';

export default {
  canvasManager: new CanvasManager(),
  frameClock: new FrameClock(),
  stateStack: new GameStateStack(),
  runtime: new Runtime(),
  keyboardInput: new KeyboardInput(),
  isPaused: false
};