import GameStateStack from './dataStructures/GameStateStack';
import FrameClock from './dataStructures/FrameClock';
import CanvasManager from './CanvasManager';
//import KeyboardInput from './KeyboardInput';

export default {
  canvasManager: new CanvasManager(),
  frameClock: new FrameClock(),
  stateStack: new GameStateStack(),
  //keyboardInput: new KeyboardInput(),
  isPaused: false
};