
import FrameClock from './dataStructures/FrameClock';
import CanvasManager from './CanvasManager';
import EventQueue from './dataStructures/EventBus';
import LevelLoader from './LevelLoader';

export default {
  canvasManager: new CanvasManager(),
  frameClock: new FrameClock(),
  timedEventQueue: new EventQueue(),
  isPaused: false,
  levelLoader: new LevelLoader(),
  systems: []
};