import GameStateStack from './dataStructures/GameStateStack';
import FrameClock from './dataStructures/FrameClock';
import CanvasManager from './CanvasManager';
import EventBus from './dataStructures/EventBus';
import IdGenerator from './dataStructures/IdGenerator';

export default {
  componentIdGenerator: new IdGenerator(),
  canvasManager: new CanvasManager(),
  frameClock: new FrameClock(),
  stateStack: new GameStateStack(),
  eventBus: new EventBus(),
  isPaused: false
};