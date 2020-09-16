
import FrameClock from './dataStructures/FrameClock';
import CanvasManager from './CanvasManager';
import EventBus from './dataStructures/EventBus';
import LevelLoader from './LevelLoader';

export default {
  canvasManager: new CanvasManager(),
  frameClock: new FrameClock(),
  eventBus: new EventBus(),
  isPaused: false,
  levelLoader: new LevelLoader(),
  systems: []
};