
import FrameClock from './dataStructures/FrameClock';
import CanvasManager from './CanvasManager';
import EventQueue from './dataStructures/EventQueue';
import LevelLoader from './LevelLoader';
import SharedConstants from './SharedConstants';

export default {
  canvasManager: new CanvasManager(),
  frameClock: new FrameClock(SharedConstants.FPS_LIMIT),
  timedEventQueue: new EventQueue(),
  isPaused: false,
  levelLoader: new LevelLoader(),
  systems: [],
  drawSystems: []
};